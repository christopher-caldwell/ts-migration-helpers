import React from 'react';
import { connect } from 'react-redux';

import { forceCheck } from 'react-lazyload';
import PropTypes from 'prop-types';
import unionBy from 'lodash/unionBy';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';
import Select from 'react-select';
import classNames from 'classnames';
import moment from 'moment';

import utils from 'components/ConfirmUpdates/utils';
import { hasAllSlotsFilled } from 'components/AsideModal/utils';
import { CANNOT_APPROVE_EMPTY_SLOTS } from 'utils/constants';
import ConfirmUpdates from 'components/ConfirmUpdates';
import BottomBar from 'components/BottomBar';
import { saveChanges } from 'stores/confirmationStage/confirmationStageActions';
import { clearBox, getBox } from 'stores/box/boxActions';
import MTUtils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import { deleteStagedCategories } from 'stores/songVersions/songVersionsActions';
import { closeOverlay, resetError } from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import MusicLabOverlay from 'components/MusicLabOverlay';
import CategoryGroup from './CategoryGroup';
import CategoryPlanner from './CategoryPlanner';
import CategoryListView from './CategoryListView';

class VersionSidebar extends React.Component {
    constructor(props) {
        super(props);

        const clonedStagedVersions = props.flattenedStagedVersions;

        this.state = {
            changes: [...clonedStagedVersions], // sets initial state as what is in redux
            plannerOpen: false,
            holdPlannerOpen: false,
            reviewPageOpen: false,
            listViewOpen: false,
            selectedJumpTo: { value: '0', label: 'Jump to' },
            checkedSongs: [],
            listViewFilterOpen: false,
            listViewSearch: '',
            listFilterExc: ['X', 'Z', 'Out of sync'],
            // ^ used exclude instead of include to make logic simpler
            dragSongs: [],
            dragCatGroup: null,
            asideModalSongId: null,
        };
    }

    componentDidMount = () => {
        const { boardId, getBoxAction } = this.props;
        if (window.location.hash) {
            this.scrollTo(window.location.hash.slice(1));
        }
        getBoxAction(boardId);
    };

    componentDidUpdate(prevProps) {
        const { flattenedStagedVersions } = this.props;
        if (!isEqual(flattenedStagedVersions, prevProps.flattenedStagedVersions)) {
            this.updateStateChanges();
        }
    }

    updateStateChanges = () => {
        const { flattenedStagedVersions } = this.props;
        this.setState({ changes: [...flattenedStagedVersions] });
    };

    handleSaveReview = () => {
        const {
            saveChangesAction,
            boardId,
            deleteStagedCategoriesAction,
            boxOpenData,
            flattenedCurrentVersions,
            flattenedStagedVersions,
        } = this.props;
        const { changes } = this.state;

        const changeCategories = changes.filter(item =>
            flattenedCurrentVersions.some(
                song => song.media_id === item.media_id && !isEqual(song.category, item.category)
            )
        );

        const undoCategories = changes.filter(item =>
            flattenedStagedVersions.some(
                song => song.media_id === item.media_id && !isEqual(song.category, item.category)
            )
        );

        // if it has a new category change
        if (changeCategories.length > 0) {
            saveChangesAction(changes, boardId);
        }

        // if it is has already same current category compare to one sent to staged,
        // then delete categories from staged (future table)
        if (undoCategories.length > 0 && boxOpenData.box_id && boxOpenData.box_id !== -1) {
            deleteStagedCategoriesAction(boardId, boxOpenData.box_id, undoCategories);
        }

        return this.setState({ reviewPageOpen: true, listViewOpen: false });
    };

    endDrag = ({ groupId, label }) => {
        const { categories, notifyBottomBarOpened } = this.props;
        const { changes, dragSongs } = this.state;

        // find the order by of the dropped category
        const droppedIn = categories.find(item => item.label === label);
        const changesMinusDragSongs = changes.filter(
            change => !dragSongs.some(song => song.media_id === change.media_id)
        );

        const newDragSongs = dragSongs
            .map(song => ({
                ...song, // when changing cat from none to something else, need to build category
                order_by: droppedIn.orderBy || 999,
                category: { id: groupId, name: label },
                ...(song.categoryBeforeDragged === undefined && {
                    categoryBeforeDragged: song.category,
                }),
            }))
            .filter(
                song =>
                    !song.categoryBeforeDragged ||
                    !isEqual(song.categoryBeforeDragged, song.category)
            );

        // update staged on local state
        const updatedChanges = [...changesMinusDragSongs, ...newDragSongs];
        this.setState({
            changes: updatedChanges,
            checkedSongs: [],
            dragSongs: [],
            dragCatGroup: null,
        });
        this.props.sendCategoryChangeSongs(
            [...changesMinusDragSongs, ...newDragSongs].map(song => song)
        );

        if (updatedChanges.length > 0) {
            notifyBottomBarOpened(this.bottomBarOpened(updatedChanges));
        }
    };

    onCheckVersion = version => {
        const { checkedSongs } = this.state;
        if (checkedSongs.includes(version)) {
            const filtered = checkedSongs.filter(song => song.media_id !== version.media_id);
            return this.setState({ checkedSongs: filtered });
        }
        return this.setState({ checkedSongs: [...checkedSongs, version] });
    };

    groupByCategory = () => {
        const { categories, songVersions } = this.props;
        const initialGroups = categories.map(category => ({
            ...category,
            songs: [],
        }));
        const mergedSongs = unionBy(this.state.changes, songVersions, 'media_id').filter(
            song => song.media_id
        ); // filter to make sure there are no duplicates
        const outOfSync = songVersions.filter(song => !song.media_id);
        return mergedSongs.concat(outOfSync).reduce((groups, song) => {
            if (!song.media_id) {
                // this handles "Out of sync" category
                return groups.map(group => {
                    if (group.label === 'Out of sync') {
                        return { ...group, songs: group.songs.concat(song) };
                    }
                    return group;
                });
            }
            if (isEmpty(song.category)) {
                // this handles "None" category
                return groups.map(group => {
                    if (group.label === 'None') {
                        return { ...group, songs: group.songs.concat(song) };
                    }
                    return group;
                });
            }
            const currentCategory = song.category;
            return groups.map(group => {
                // handles all other categories
                if (group.label === currentCategory.name) {
                    return { ...group, songs: group.songs.concat(song) };
                }
                return group;
            });
        }, initialGroups);
    };

    holdPlanner = draggable => {
        if (this.state.holdPlannerOpen) return this.setState({ holdPlannerOpen: false });
        return draggable ? this.setState({ holdPlannerOpen: true, listViewOpen: false }) : null;
    };

    saveDragSongs = (songs, group) => this.setState({ dragSongs: songs, dragCatGroup: group });

    setAsideModalSong = mediaId => this.setState({ asideModalSongId: mediaId });

    closeAsideModal = () => this.setState({ asideModalSongId: null });

    toggleListView = () => {
        if (this.state.listViewOpen) return this.setState({ listViewOpen: false });
        return this.setState({ listViewOpen: true, holdPlannerOpen: false });
    };

    togglePlanner = boolean => this.setState({ plannerOpen: boolean });

    handleListFilterCheck = ({ target: { value: label } }) => {
        // destructured the event
        const { listFilterExc } = this.state;
        if (listFilterExc.includes(label)) {
            const removedLabel = listFilterExc.filter(savedLabel => savedLabel !== label);
            return this.setState({ listFilterExc: removedLabel });
        }
        return this.setState({ listFilterExc: [...listFilterExc, label] });
    };

    handleListCheckAll = () => {
        const { listFilterExc } = this.state;
        const allCategoryLabels = this.props.categories
            .filter(category => category.active)
            .map(category => category.label);
        if (listFilterExc.length) return this.setState({ listFilterExc: [] });
        return this.setState({ listFilterExc: allCategoryLabels });
    };

    overlayApproveCancel = () => {
        const {
            clearBoxAction,
            boardId,
            resetErrorOverlayAction,
            notifyBottomBarOpened,
        } = this.props;

        this.setState({ reviewPageOpen: false, changes: [], checkedSongs: [] });
        resetErrorOverlayAction();
        clearBoxAction(boardId);
        notifyBottomBarOpened(false);
    };

    renderOverlay = () => {
        const {
            loading,
            error,
            showConfirm,
            closeOverlayAction,
            sendCategoryChangeSongs,
        } = this.props;

        const { reviewPageOpen } = this.state;

        let successMessage = 'Your request has been processed successfully!';

        if (reviewPageOpen) {
            successMessage = 'Your request has been submitted for processing!';
        }

        return (
            <MusicLabOverlay
                approveCancel={this.overlayApproveCancel}
                denyCancel={closeOverlayAction}
                successClose={() => {
                    this.setState({
                        reviewPageOpen: false,
                        changes: [],
                        checkedSongs: [],
                    });
                    sendCategoryChangeSongs([]);
                    closeOverlayAction();
                }}
                failClose={() => {
                    closeOverlayAction();
                    this.setState({ reviewPageOpen: false });
                }}
                showConfirm={showConfirm}
                loading={loading}
                error={error}
                backToMessage="Back To Music Tracker"
                successMessage={successMessage}
            />
        );
    };

    scrollTo = value => {
        const categoryItem = document.getElementById(`Category-Group-${value}`);
        if (categoryItem) categoryItem.scrollIntoView();
    };

    changeSelectedJumpTo = selectedJumpTo => {
        this.setState({ selectedJumpTo });
        this.scrollTo(selectedJumpTo.value);
    };

    listViewSearchChange = searchValue => {
        if (searchValue) {
            return this.setState({
                listViewSearch: searchValue,
                listFilterExc: [],
            });
        }
        return this.setState({
            listViewSearch: searchValue,
            listFilterExc: ['X', 'Z', 'Out of sync'],
        });
    };

    bottomBarOpened = changes => {
        const {
            dayparts: { staged: stagedDayparts },
            stagedRestrictions,
            flattenedStagedVersions,
        } = this.props;

        return (
            changes.length > 0 ||
            flattenedStagedVersions.length > 0 ||
            stagedRestrictions.length > 0 ||
            stagedDayparts.length > 0
        );
    };

    render() {
        const {
            startDate,
            showOverlay,
            match: {
                params: { boardId },
            },
            flattenedCurrentVersions,
            packets,
            dayparts: { data: dataDayparts, staged: stagedDayparts },
            loading,
            categories,
            tabId,
            hasChangesToConfirm,
            currentVersionSongs,
            changedVersions,
            stationCategoriesPermissions,
        } = this.props;
        const {
            changes,
            plannerOpen,
            holdPlannerOpen,
            listViewOpen,
            reviewPageOpen,
            selectedJumpTo,
            checkedSongs,
            listViewFilterOpen,
            listFilterExc,
            listViewSearch,
            dragSongs,
            dragCatGroup,
            asideModalSongId,
        } = this.state;

        const hasEmptySlots = !hasAllSlotsFilled(dataDayparts, stagedDayparts);
        const approveDisabled = hasEmptySlots && stagedDayparts.length > 0;
        const emptySlotError = {
            approveDisabled,
            tooltipMessage: approveDisabled ? CANNOT_APPROVE_EMPTY_SLOTS : '',
            tooltipType: approveDisabled ? 'error' : 'warning',
        };

        const allCategories = [{ value: '0', label: 'Jump to' }];
        const catGroupsUnsorted = this.groupByCategory();
        const categoryGroups = [
            ...catGroupsUnsorted.filter(({ active }) => active),
            ...catGroupsUnsorted.filter(({ label }) => label === 'Out of sync' || label === 'None'),
        ];
        const categoryOptions = categoryGroups
            .map(({ label, value }) => ({ label, value }))
            .filter(group => !(group.value === '')); // used for dayparts modal
        const goldFilter = name =>
            name === 'CURRENT' || name === 'RECURRENT' || name === 'OTHER CATEGORIES';

        const current = categoryGroups.filter(group => group.group === 'CURRENT');
        const recurrent = categoryGroups.filter(group => group.group === 'RECURRENT');
        const gold = categoryGroups.filter(({ group }) => group && !goldFilter(group));
        const other = categoryGroups.filter(({ group }) => group === 'OTHER CATEGORIES' || !group);

        const transform = groups =>
            groups.map(({ label, description, limit, songs, value }) => {
                const dropDownLabel = description ? `${label} - ${description}` : label;
                allCategories.push({ value: label, label: dropDownLabel });
                return {
                    label,
                    limit,
                    description,
                    length: songs.length,
                    id: value,
                };
            });
        const plannerGroups = {
            current: transform(current),
            recurrent: transform(recurrent),
            gold: transform(gold),
            other: transform(other),
        };
        const dragCutoffDate = moment.utc().startOf('week').subtract(7, 'days');
        const draggable = moment.utc(startDate).isSameOrAfter(dragCutoffDate) && !reviewPageOpen;
        const clonedCurrentVersions = [...flattenedCurrentVersions];
        const changesToUse =
            !changes.length && !isEmpty(changedVersions) ? Object.values(changedVersions) : changes;
        const changesToConfirm = utils.getChangesToConfirmUpdates(
            changesToUse,
            clonedCurrentVersions,
            packets
        );

        const listColumn = catGrp => catGrp.filter(({ label }) => !listFilterExc.includes(label));
        // ^ displays only the groups that are checked in filter

        // Get songs changed by daypart updates
        const daypartUpdates = utils.getSongsChangedByDaypartUpdates(
            stagedDayparts,
            changesToConfirm,
            currentVersionSongs
        );

        const showConfirmComponent = () => (
            <ConfirmUpdates
                stagedSongs={changesToConfirm}
                categoryGroups={categoryGroups}
                closeConfirmUpdates={() => this.setState({ reviewPageOpen: false })}
                daypartUpdates={daypartUpdates}
            />
        );

        const listViewRawColumns = [
            { name: 'current', column: listColumn(current) },
            { name: 'recurrent', column: listColumn(recurrent) },
            { name: 'gold', column: listColumn(gold) },
            { name: 'other', column: listColumn(other) },
        ];

        const searchSongCompare = ({ aNm, sNm }, userSearch) => {
            const shapeString = str => str.trim().toLowerCase();
            const [artist, songName, search] = [aNm, sNm, userSearch].map(str => shapeString(str));
            return artist.includes(search) || songName.includes(search);
        };

        const songFilter = search =>
            listViewRawColumns.map(group => ({
                ...group,
                column: group.column.map(category => ({
                    ...category,
                    songs: category.songs.filter(song => searchSongCompare(song, search)),
                })),
            }));

        const listViewColumns = listViewSearch ? songFilter(listViewSearch) : listViewRawColumns;

        const categoriesChanges = Object.values(changedVersions).filter(
            item => item.getChanges && item.getChanges.actualChanges.category
        );

        const alternateCategoriesChanges = Object.values(changedVersions).filter(
            item => item.getChanges && item.getChanges.actualChanges.alternate
        );

        let categoriesNotFoundOnGselector = utils.categoriesNotFoundOnGselector(
            categories,
            categoriesChanges,
            'category'
        );

        const alternateCategoriesNotFoundOnGselector = utils.categoriesNotFoundOnGselector(
            categories,
            alternateCategoriesChanges,
            'alternate_category'
        );

        categoriesNotFoundOnGselector = [
            ...new Set([
                // Concatenate and remove duplicates
                ...categoriesNotFoundOnGselector,
                ...alternateCategoriesNotFoundOnGselector,
            ]),
        ];

        const bottomBarOpen = this.bottomBarOpened(changes);

        const hidden = tabId !== 'categories' && !reviewPageOpen;
        const hiddenStyle = hidden ? { left: -400, width: 0, position: 'relative' } : {};
        return (
            <aside className="version-aside" onScroll={throttle(forceCheck, 100)}>
                <div className="version-aside-btngroup" style={hiddenStyle}>
                    <Select
                        name="react-select-container"
                        className="react-select-container"
                        clearable={false}
                        value={selectedJumpTo}
                        options={allCategories}
                        onChange={this.changeSelectedJumpTo}
                    />
                    <button
                        type="button"
                        className="ml-btn-icon version-aside-btn"
                        onClick={this.toggleListView}
                    >
                        <i className="fa fa-list sidebar-icon" />
                    </button>
                    <button
                        type="button"
                        className={classNames('ml-btn-icon', 'version-aside-btn', {
                            'btn-disable-cursor': !draggable,
                        })}
                        onClick={() => this.holdPlanner(draggable)}
                    >
                        <i
                            className={classNames('fa', 'fa-th-large', 'sidebar-icon', {
                                'ml-btn-icon-selected': holdPlannerOpen || plannerOpen,
                            })}
                        />
                    </button>
                </div>
                <div
                    className={classNames('version-sidebar', 'custom-scrollbars--thin', {
                        'bottom-bar-open': changes.length,
                    })}
                    style={hiddenStyle}
                >
                    {categoryGroups.map((group, index) => (
                        <CategoryGroup
                            index={index}
                            key={group.label}
                            categoryOptions={categoryOptions}
                            group={group}
                            togglePlanner={this.togglePlanner}
                            endDrag={this.endDrag}
                            multiSelect={holdPlannerOpen} // when planner is open, show checkboxes
                            checkedSongs={checkedSongs}
                            onCheckVersion={this.onCheckVersion}
                            draggable={draggable}
                            saveDragSongs={this.saveDragSongs}
                            dragSongs={dragSongs}
                            dragCatGroup={dragCatGroup}
                            catChanges={changes}
                            boardId={boardId}
                            asideModalSongId={asideModalSongId}
                            openAsideModal={this.setAsideModalSong}
                            closeAsideModal={this.closeAsideModal}
                            bottomBarOpen={bottomBarOpen}
                            stationCategoriesPermissions={stationCategoriesPermissions}
                        />
                    ))}
                </div>
                <CategoryPlanner
                    open={holdPlannerOpen || plannerOpen}
                    groups={plannerGroups}
                    endDrag={this.endDrag}
                    togglePlanner={this.togglePlanner}
                    closePlanner={this.holdPlanner}
                    dragCatGroup={dragCatGroup}
                    stationCategoriesPermissions={stationCategoriesPermissions}
                />
                {listViewOpen ? (
                    <CategoryListView
                        toggleListView={this.toggleListView}
                        draggable={draggable}
                        listViewFilterOpen={listViewFilterOpen}
                        listFilterExc={listFilterExc}
                        holdPlanner={this.holdPlanner}
                        handleListCheckAll={this.handleListCheckAll}
                        categoryGroups={categoryGroups}
                        toggleListViewFilter={() =>
                            this.setState({
                                listViewFilterOpen: !listViewFilterOpen,
                            })}
                        handleListFilterCheck={this.handleListFilterCheck}
                        searchValue={listViewSearch}
                        onSearchChange={this.listViewSearchChange}
                    >
                        {listViewColumns.map(({ column, name }) => (
                            <div className="list-view-col" key={name}>
                                {column.map((group, index) => (
                                    <CategoryGroup
                                        index={index}
                                        key={group.label}
                                        categoryOptions={categoryOptions}
                                        group={group}
                                        togglePlanner={this.togglePlanner}
                                        endDrag={this.endDrag}
                                        list
                                        draggable={draggable}
                                        saveDragSongs={this.saveDragSongs}
                                        dragSongs={dragSongs}
                                        dragCatGroup={dragCatGroup}
                                        catChanges={changes}
                                        bottomBarOpen={bottomBarOpen}
                                        boardId={boardId}
                                        openAsideModal={this.setAsideModalSong}
                                        asideModalSongId={asideModalSongId}
                                        closeAsideModal={this.closeAsideModal}
                                        stationCategoriesPermissions={stationCategoriesPermissions}
                                    />
                                ))}
                            </div>
                        ))}
                    </CategoryListView>
                ) : null}
                {reviewPageOpen ? showConfirmComponent() : null}
                {showOverlay ? this.renderOverlay() : null}
                {bottomBarOpen ? (
                    <BottomBar
                        boardId={boardId}
                        closeReviewPage={() => this.setState({ reviewPageOpen: false })}
                        isReviewOpen={reviewPageOpen}
                        disableApprove={
                            loading || !hasChangesToConfirm || emptySlotError.approveDisabled
                        }
                        onSaveAndReview={this.handleSaveReview}
                        categoriesNotFoundOnGselector={categoriesNotFoundOnGselector}
                        tooltipMessage={emptySlotError.tooltipMessage}
                        tooltipType={emptySlotError.tooltipType}
                    />
                ) : null}
            </aside>
        );
    }
}

VersionSidebar.propTypes = {
    boardId: PropTypes.number.isRequired,
    boxOpenData: PropTypes.shape().isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    changedVersions: PropTypes.shape().isRequired,
    clearBoxAction: PropTypes.func.isRequired,
    closeOverlayAction: PropTypes.func.isRequired,
    currentVersionSongs: PropTypes.shape().isRequired,
    dayparts: PropTypes.shape().isRequired,
    deleteStagedCategoriesAction: PropTypes.func.isRequired,
    flattenedCurrentVersions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    flattenedStagedVersions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    getBoxAction: PropTypes.func.isRequired,
    hasChangesToConfirm: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    match: PropTypes.shape().isRequired,
    notifyBottomBarOpened: PropTypes.func.isRequired,
    packets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    resetErrorOverlayAction: PropTypes.func.isRequired,
    saveChangesAction: PropTypes.func.isRequired,
    sendCategoryChangeSongs: PropTypes.func.isRequired,
    showConfirm: PropTypes.bool.isRequired,
    showOverlay: PropTypes.bool.isRequired,
    songVersions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    stagedRestrictions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    startDate: PropTypes.string.isRequired,
    tabId: PropTypes.string.isRequired,
    error: PropTypes.shape(),
};

VersionSidebar.defaultProps = { error: null };

const mapStateToProps = (state, ownProps) => {
    const flattenedSongs = ownProps.songs.reduce((flattened, song) => {
        const {
            category,
            sId,
            metadata: { aNm, sNm },
            metrics,
        } = song;
        const parentSong = { sId, sNm, aNm };
        const concatted = ['staged', 'current'].reduce((consolidated, time) => {
            const versions = category[time] ? Object.values(category[time]) : null;
            if (!versions) return consolidated;
            const versionsToAdd = versions.filter(
                v => !consolidated.find(c => c.media_id === v.media_id)
            );

            return consolidated.concat(versionsToAdd);
        }, []);

        if (concatted.length === 0) return flattened.concat({ ...parentSong, category: null });

        return flattened.concat(
            concatted.map(version => {
                const categoryKey = version.category ? 'category' : 'gs_category';
                const categoryValue = version.category ? version.category : version.gs_category;
                return {
                    media_id: version.media_id,
                    sId,
                    sNm,
                    aNm,
                    version_name: version.version_name,
                    modified_date: version.modified_date,
                    alternate: version.alternate,
                    [categoryKey]: categoryValue,
                    taaNum: metrics && metrics.enhanced ? metrics.enhanced.pop.num : null,
                    packet_id: version.packet_id,
                    restriction_id: version.restriction_id,
                };
            })
        );
    }, []);
    const stagedVersionSongs = { ...state.songVersions.data.staged };
    const currentVersionSongs = { ...state.songVersions.data.current };
    const { showOverlay, showConfirm, error } = state.musicTrackerOverlay;
    const loading = state.box.loading || state.musicTrackerOverlay.loading;
    const packets = state.packets.data;
    const changedVersions = { ...state.songVersions.changedVersions };
    const hasChangesToConfirm = Object.values(changedVersions).some(
        item => item.getChanges && Object.values(item.getChanges.actualChanges).length > 0
    );

    return {
        songVersions: flattenedSongs,
        flattenedStagedVersions: MTUtils.flatVersions(stagedVersionSongs),
        flattenedCurrentVersions: MTUtils.flatVersions(currentVersionSongs),
        currentVersionSongs,
        packets,
        showOverlay,
        showConfirm,
        error,
        loading,
        stagedRestrictions: state.restrictions.staged,
        boxOpenData: state.box.open,
        dayparts: state.dayparts,
        hasChangesToConfirm,
        changedVersions,
    };
};

const mapDispatchToProps = {
    clearBoxAction: clearBox,
    closeOverlayAction: closeOverlay,
    saveChangesAction: saveChanges,
    resetErrorOverlayAction: resetError,
    deleteStagedCategoriesAction: deleteStagedCategories,
    getBoxAction: getBox,
};

export default connect(mapStateToProps, mapDispatchToProps)(VersionSidebar);
