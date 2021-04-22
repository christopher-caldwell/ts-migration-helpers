import React from 'react';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import { FEATURES } from 'utils/constants';
import CustomTooltip from 'components/CustomTooltip';
import FeatureToggle from 'components/FeatureToggle';
import { SIDERAIL_ACTION } from 'stores/actionTypes';
import packetIcon from 'images/packet-ab-white.png';
import bluePacketIcon from 'images/packet-ab-blue.png';
import clockIcon from 'images/clock-regular-white.png';
import blueClockIcon from 'images/clock-regular-blue.png';
import blueDaypartIcon from 'images/pie-chart-blue.png';
import DaypartIcon from 'images/pie-chart.png';
import CustomCheckbox from '../CategoryCheckboxElement';

class CategoryItem extends React.Component {
    state = {
        dpHover: false,
        rstHover: false,
        pHover: false,
        restrictionOpen: false,
        packetOpen: false,
        daypartOpen: false,
        dragging: false,
    };

    buildCustomTooltip = isModalSong => {
        // don't show tooltip if a modal is opened from icon
        const {
            song: { sNm, aNm, version_name, gs_category },
            limit,
            overLimit,
            catChange,
        } = this.props;
        // TODO: revisit the need for wrapping songs for a single song
        const songs = [
            {
                sNm,
                aNm,
                version_name,
                gs_category,
            },
        ];

        if (isModalSong) {
            return <CustomTooltip type="" title="" songs={[]} enabled={false} />;
        }
        if (catChange) {
            // TODO this is half baked. will need to revisit when multiple day parts
            const {
                song,
                songVersions: {
                    data: { current, staged },
                },
            } = this.props;
            const getSong = data =>
                flatten(Object.values(data)).find(({ media_id: id }) => id === song.media_id);
            const previousCategory =
                (getSong(current) &&
                    ((getSong(current).category && getSong(current).category.name) ||
                        getSong(current).gs_category)) ||
                'NONE';
            const updatedCategory = (getSong(staged) || song).category
                ? (getSong(staged) || song).category.name
                : 'NONE';
            // ^ use staged song if user has hit save/review; if not, use local song.

            return (
                <CustomTooltip
                    type="info"
                    title="THIS SONG HAS BEEN EDITED"
                    message={`This song was updated from ${previousCategory} to ${updatedCategory}`}
                    left={5}
                    songs={songs}
                    enabled={!this.state.dragging}
                />
            );
        }

        if (overLimit) {
            return (
                <CustomTooltip
                    type="warning"
                    title="WARNING"
                    message={`This song exceeds the maximum of ${limit} for this category.`}
                    left={5}
                    songs={songs}
                    enabled={!this.state.dragging}
                />
            );
        }

        return (
            <CustomTooltip
                type="info"
                title="SONG DETAILS"
                left={5}
                songs={songs}
                enabled={!this.state.dragging}
            />
        );
    };

    compareCategoryVersionSelection = song => {
        const { songId, mediaId: highlightId } = this.props.categoryHighlight.data;
        const { sId, media_id: songMediaId } = song;

        return songMediaId ? songId === sId && highlightId === songMediaId : songId === sId;
    };

    onRowClick = song => {
        const { highlightAction, dehighlightAction } = this.props;

        const highlight = this.compareCategoryVersionSelection(song);
        return highlight ? dehighlightAction() : highlightAction(song, SIDERAIL_ACTION);
    };

    toggleHover = hover => this.setState({ [hover]: !this.state[hover] });

    toggleAsideModal = type => this.setState({ [type]: !this.state[type] });

    toggleDragging = dragging => this.setState({ dragging });

    openModal = modalToOpen => {
        const {
            openAsideModal,
            song: { media_id: mediaId },
        } = this.props;
        openAsideModal(mediaId);
        this.setState({
            restrictionOpen: false,
            daypartOpen: false,
            packetOpen: false,
        });
        this.setState({ [modalToOpen]: true });
    };

    render() {
        const {
            song,
            song: {
                sNm,
                aNm,
                taaNum,
                packet_id: packetId,
                restriction_id: restrictionId,
                media_id: mediaId,
                alternate,
            },
            togglePlanner,
            overLimit,
            catChange,
            list,
            multiSelect,
            checkedSongs,
            onCheckVersion,
            draggable,
            saveDragSongs,
            outOfSync,
            boardId,
            closeAsideModal,
            asideModalSongId,
            bottomBarOpen,
            categoryOptions,
            stationCategoriesPermissions,
        } = this.props;
        const { rstHover, restrictionOpen, pHover, dpHover, daypartOpen, packetOpen } = this.state;

        const isModalSong = asideModalSongId === mediaId;
        // ^ this will be used to highlight the song when modal opens in MT
        // checkedSongs not used in list view
        const songChecked =
            checkedSongs && checkedSongs.some(checkSong => checkSong.media_id === mediaId);
        const highlight = this.compareCategoryVersionSelection(song);
        const titleClasses = classNames('version-title', {
            'version-title-list': list,
        });
        const showCheckbox = multiSelect && !outOfSync; // out of sync gets no checkbox
        const enableDrag = draggable && !outOfSync; // out of sync can never be dragged
        const permitted =
            stationCategoriesPermissions[song.gs_category || (song.category || { name: '' }).name];
        return (
            <div className="version-item-checkbox-container">
                {showCheckbox ? (
                    <CustomCheckbox song={song} onCheck={onCheckVersion} checked={songChecked} />
                ) : null}
                <OverlayTrigger overlay={this.buildCustomTooltip(isModalSong)} delay={0}>
                    {!permitted ? (
                        <div
                            className={classNames('version-item', {
                                'version-item-highlight': isModalSong || highlight,
                                'version-limit-border': overLimit,
                                'version-cat-change-border': catChange,
                                'grab-cursor': enableDrag,
                                'no-drag-icon': !draggable,
                                'version-item-multi': showCheckbox,
                            })}
                            draggable={enableDrag}
                            onDragStart={() => {
                                this.toggleDragging(true);
                                if (multiSelect && checkedSongs.length) saveDragSongs(checkedSongs);
                                else saveDragSongs([song]);
                                togglePlanner(true);
                            }}
                            onDragEnd={() => {
                                this.toggleDragging(false);
                                togglePlanner(false);
                            }}
                        >
                            {enableDrag ? <i className="icon fa fa-bars drag-icon" /> : null}
                            <div className="version-titles">
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {sNm}
                                </p>
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {aNm}
                                </p>
                            </div>
                            <FeatureToggle featureName={FEATURES.HOUR_RESTRICTION}>
                                <button
                                    type="button"
                                    className="sidebar-icon-btn"
                                    onMouseEnter={() => this.toggleHover('rstHover')}
                                    onMouseLeave={() => this.toggleHover('rstHover')}
                                    onClick={() => this.openModal('restrictionOpen')}
                                >
                                    <img
                                        alt="Hour Restriction Icon"
                                        className={classNames(
                                            'sidebar-icons',
                                            { magnify: rstHover },
                                            { 'icon-no-opacity': restrictionId || rstHover }
                                        )}
                                        src={rstHover ? blueClockIcon : clockIcon}
                                    />
                                </button>
                            </FeatureToggle>
                            <FeatureToggle featureName={FEATURES.PACKET_SONG}>
                                <button
                                    type="button"
                                    className="sidebar-icon-btn"
                                    onMouseEnter={() => this.toggleHover('pHover')}
                                    onMouseLeave={() => this.toggleHover('pHover')}
                                    onClick={() => this.openModal('packetOpen')}
                                >
                                    <img
                                        alt="Packet Icon"
                                        className={classNames(
                                            'sidebar-icons',
                                            'packet',
                                            { magnify: pHover },
                                            { 'icon-no-opacity': packetId || pHover }
                                        )}
                                        src={pHover ? bluePacketIcon : packetIcon}
                                    />
                                </button>
                            </FeatureToggle>
                            <FeatureToggle featureName={FEATURES.DAYPARTS}>
                                <button
                                    className="sidebar-icon-btn"
                                    onMouseEnter={() => this.toggleHover('dpHover')}
                                    onMouseLeave={() => this.toggleHover('dpHover')}
                                    onClick={() => this.openModal('daypartOpen')}
                                >
                                    <img
                                        alt="Alternate Daypart Icon"
                                        className={classNames(
                                            'sidebar-icons',
                                            { magnify: dpHover },
                                            { 'icon-no-opacity': !isEmpty(alternate) || dpHover }
                                        )}
                                        src={dpHover ? blueDaypartIcon : DaypartIcon}
                                    />
                                </button>
                            </FeatureToggle>
                            {list && <span className="version-item-taa">{taaNum || '-'}</span>}
                        </div>
                    ) : (
                        <div
                            className={classNames('version-item', {
                                'version-item-highlight': isModalSong || highlight,
                                'version-limit-border': overLimit,
                                'version-cat-change-border': catChange,
                                'grab-cursor': enableDrag,
                                'no-drag-icon': !draggable,
                                'version-item-multi': showCheckbox,
                            })}
                            draggable={enableDrag}
                            onDragStart={() => {
                                this.toggleDragging(true);
                                if (multiSelect && checkedSongs.length) saveDragSongs(checkedSongs);
                                else saveDragSongs([song]);
                                togglePlanner(true);
                            }}
                            onDragEnd={() => {
                                this.toggleDragging(false);
                                togglePlanner(false);
                            }}
                        >
                            {enableDrag ? <i className="icon fa fa-bars drag-icon" /> : null}
                            <div className="version-titles">
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {sNm}
                                </p>
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {aNm}
                                </p>
                            </div>
                        </div>
                    )}
                </OverlayTrigger>
                {isModalSong && restrictionOpen && (
                    <AsideModal
                        title="Hour Restriction"
                        asideModalOpened
                        handleClose={closeAsideModal}
                        musicTracker
                    >
                        <AsideModalPanels
                            featureName={FEATURES.HOUR_RESTRICTION}
                            handleClose={closeAsideModal}
                            musicTrackerSong={song}
                            boardId={boardId}
                            bottomBarOpen={bottomBarOpen}
                        />
                    </AsideModal>
                )}
                {isModalSong && packetOpen && (
                    <AsideModal
                        title="Packet Song"
                        asideModalOpened
                        handleClose={closeAsideModal}
                        musicTracker
                    >
                        <AsideModalPanels
                            featureName={FEATURES.PACKET_SONG}
                            handleClose={closeAsideModal}
                            musicTrackerSong={song}
                            boardId={boardId}
                            bottomBarOpen={bottomBarOpen}
                            stationCategoriesPermissions={stationCategoriesPermissions}
                        />
                    </AsideModal>
                )}
                {isModalSong && daypartOpen && (
                    <AsideModal
                        title="Alternate Daypart"
                        asideModalOpened
                        handleClose={() => closeAsideModal()}
                        musicTracker
                    >
                        <AsideModalPanels
                            featureName={FEATURES.ASSIGN_DAYPART}
                            handleClose={() => closeAsideModal()}
                            musicTrackerSong={song}
                            boardId={boardId}
                            bottomBarOpen={bottomBarOpen}
                            categoryOptions={categoryOptions}
                        />
                    </AsideModal>
                )}
            </div>
        );
    }
}

CategoryItem.propTypes = {
    boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    catChange: PropTypes.bool.isRequired,
    categoryHighlight: PropTypes.shape().isRequired,
    closeAsideModal: PropTypes.func.isRequired,
    dehighlightAction: PropTypes.func.isRequired,
    draggable: PropTypes.bool.isRequired,
    highlightAction: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool.isRequired,
    openAsideModal: PropTypes.func.isRequired,
    saveDragSongs: PropTypes.func.isRequired,
    song: PropTypes.shape().isRequired,
    songVersions: PropTypes.shape().isRequired,
    togglePlanner: PropTypes.func.isRequired,
    asideModalSongId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottomBarOpen: PropTypes.bool,
    checkedSongs: PropTypes.arrayOf(PropTypes.shape()),
    ellipsisOpen: PropTypes.bool,
    limit: PropTypes.number,
    list: PropTypes.bool,
    outOfSync: PropTypes.bool,
    overLimit: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    toggleEllipsis: PropTypes.func,
    onCheckVersion: PropTypes.func,
};

CategoryItem.defaultProps = {
    asideModalSongId: undefined,
    checkedSongs: null,
    ellipsisOpen: false,
    list: false,
    toggleEllipsis: null,
    limit: 0,
    outOfSync: false,
    overLimit: 0 || false,
    onCheckVersion: null,
    bottomBarOpen: false,
};

export default CategoryItem;
