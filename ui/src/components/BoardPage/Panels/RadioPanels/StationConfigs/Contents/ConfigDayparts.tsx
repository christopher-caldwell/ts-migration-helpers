import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import ConfirmOverlay from 'components/ConfirmOverlay';
import CustomTooltip from 'components/CustomTooltip';
import FeatureToggle from 'components/FeatureToggle';
import ExpandableHeader from 'components/ExpandableHeader/index';
import { NONE_CATEGORY, MISSING_CATEGORY, FEATURE_TITLE, FEATURES } from 'utils/constants';
import { updateSongsAlternateCategory } from 'stores/dayparts/daypartsActions';
import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import SearchField from 'components/SearchField';
import TextButton from 'components/Buttons/TextButton';
import getSyncStatus from 'components/BoardPage/Panels/RadioPanels/StationConfigs/utils';
import AssignmentPanel from '../Components/AssignmentPanel';

class ConfigDayparts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeExpandableHeader: [],
            newDaypartName: '',
            createDaypartError: false,
            categoryChanges: {},
            searchValue: '',
            assignmentPanelOpened: false,
            editDaypartOpened: false,
            daypartToEdit: null,
            daypartSongsResult: [],
            totalSongsMap: new Map(),
        };
        this.DAYPART_NAME_REQUIRED = `
            The daypart name is required in order for you to create a new daypart.
        `;
        this.SYNCHRONIZED_CAN_EDIT = 'Only dayparts synchronized with GSelector can be edited.';
        this.CATEGORIES_LIST = props.categories.filter(
            category => category.label !== NONE_CATEGORY && category.label !== MISSING_CATEGORY
        );
        this.songsByDaypart = [];
        this.filteredSongs = [];
    }

    componentDidMount() {
        this.getSongsByDaypart();
        this.filterSongs();
    }

    componentDidUpdate(prevProps) {
        const { songs } = this.props;
        if (!isEqual(songs, prevProps.songs)) {
            this.getSongsByDaypart();
            this.filterSongs();
        }
    }

    handleDaypartName = e => {
        const {
            target: { value, maxLength },
        } = e;
        const { dayparts } = this.props;
        const daypartNameExists = dayparts.some(
            daypart => daypart.name.toLowerCase().trim() === value.toLowerCase().trim()
        );

        this.setState({
            newDaypartName: value.slice(0, maxLength),
            createDaypartError: daypartNameExists,
        });
    };

    handleCreateDaypart = () => {
        const { createDaypart } = this.props;
        const { newDaypartName } = this.state;
        createDaypart(newDaypartName);
        this.setState({ newDaypartName: '' });
    };

    buildCustomTooltip = (title, message, type) => (
        <CustomTooltip type={type || 'warning'} title={title} message={message} left={5} />
    );

    buildInfoTooltip = message => (
        <Tooltip id="search-count-tooltip">
            <div className="mt-tooltip">
                <span className="fa fa-info-circle data-type-info" />
                <div className="mt-tooltip-content">
                    <span className="mt-tooltip-content-text">{message}</span>
                </div>
            </div>
        </Tooltip>
    );

    handleExpandHeader = key => {
        const { activeExpandableHeader } = this.state;
        let newArray = [];
        if (activeExpandableHeader.includes(key)) {
            newArray = activeExpandableHeader.filter(item => item !== key);
        } else {
            newArray = [...activeExpandableHeader, key];
        }

        this.setState({
            activeExpandableHeader: newArray,
        });
    };

    saveChangeAlternate = (song, daypartId) => {
        const { updateSongsAlternateCategoryAction, boardId } = this.props;
        updateSongsAlternateCategoryAction({
            stationId: boardId,
            songs: [
                {
                    sId: song.sId,
                    media_id: song.media_id,
                    alternate: {
                        [daypartId]: {
                            category_id: null,
                        },
                    },
                },
            ],
        });
    };

    filteredSongsByDaypart = dataSongs => {
        const { categoryChanges } = this.state;
        const filteredSongs = [];

        dataSongs.forEach(song => {
            Object.keys(song.alternate).forEach(daypartId => {
                const categoryName = get(song, 'category.name', song.gs_category);
                const unsavedCategory = get(categoryChanges, `[${song.media_id}].[${daypartId}]`);
                const currentAlternate = get(song, `alternate[${daypartId}].category_id`);
                const currentGSAlternate = get(song, `alternate[${daypartId}].gs_category`);

                if (currentAlternate || currentGSAlternate) {
                    filteredSongs[daypartId] = filteredSongs[daypartId] || {};
                    filteredSongs[daypartId].songs = filteredSongs[daypartId].songs || [];
                    filteredSongs[daypartId].songs.push({
                        ...song,
                        categoryName,
                        unsavedCategory,
                        currentAlternate,
                        currentGSAlternate,
                    });
                }
            });
        });

        return filteredSongs;
    };

    filterSongs = (searchValue = '') => {
        const { songs: dataSongs } = this.props;
        let filteredSongs = [...dataSongs];

        if (searchValue !== '') {
            filteredSongs = dataSongs.filter(
                song =>
                    ((song.aNm && song.aNm.toLowerCase().includes(searchValue.toLowerCase())) ||
                        (song.sNm && song.sNm.toLowerCase().includes(searchValue.toLowerCase()))) &&
                    Object.keys(song.alternate).length > 0
            );
        }

        if (filteredSongs.length > 0) {
            this.setState({ daypartSongsResult: this.filteredSongsByDaypart(filteredSongs) });
        } else {
            this.setState({ daypartSongsResult: [] });
        }

        this.filteredSongs = filteredSongs;
    };

    getSongsByDaypart = () => {
        const { songs: dataSongs } = this.props;
        this.songsByDaypart = this.filteredSongsByDaypart(dataSongs);
    };

    onSearchChange = value => {
        const searchValue = value || '';
        this.filterSongs(searchValue);
        this.setState({ searchValue });
    };

    handleResetSearch = () => {
        this.filterSongs();
        this.setState({ searchValue: '' });
    };

    hasStagedSongAlternateChanges = (song, daypartId) => {
        const { currentSongs } = this.props;
        const currentMedia = currentSongs.find(current => song.media_id === current.media_id);

        return !isEqual(
            get(currentMedia, `alternate[${daypartId}]`),
            get(song, `alternate[${daypartId}]`)
        );
    };

    buildSongRows = (daypartId, synchronized, daypartSongsResult) =>
        daypartSongsResult[daypartId].songs.map(song => {
            const { categoryChanges } = this.state;
            const unsavedCategory = get(categoryChanges, `[${song.media_id}].[${daypartId}]`);
            const currentAlternate = get(song, `alternate[${daypartId}].category_id`);
            const currentGSAlternate = get(song, `alternate[${daypartId}].gs_category`);
            const categoryLabel = get(
                this.CATEGORIES_LIST.find(cat => cat.value === currentAlternate),
                'label'
            );
            const alternateCategoryName =
                (unsavedCategory ? unsavedCategory.label : null) ||
                categoryLabel ||
                currentGSAlternate;

            return (
                <div className="station-configs-dayparts__table-row" key={song.media_id}>
                    <div
                        className={classNames(
                            'station-configs-dayparts__table-col',
                            'station-configs-dayparts__table-col--color',
                            {
                                'station-configs-dayparts__table-col--color-staged': this.hasStagedSongAlternateChanges(
                                    song,
                                    daypartId
                                ),
                            }
                        )}
                    >
                        &nbsp;
                    </div>
                    <div className="station-configs-dayparts__table-col">
                        <span
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={song.sNm}
                        >
                            {song.sNm}
                        </span>
                    </div>
                    <div className="station-configs-dayparts__table-col">
                        <span
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={song.aNm}
                        >
                            {song.aNm}
                        </span>
                    </div>
                    <div className="station-configs-dayparts__table-col">
                        <span
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={song.version_name}
                        >
                            {song.version_name}
                        </span>
                    </div>
                    <div
                        className={`
                            station-configs-dayparts__table-col
                            station-configs-dayparts__table-col--centered
                        `}
                    >
                        <span
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={song.categoryName}
                        >
                            {song.categoryName}
                        </span>
                    </div>
                    <div
                        className={`
                            station-configs-dayparts__table-col
                            station-configs-dayparts__table-col--centered
                        `}
                    >
                        <span
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={alternateCategoryName}
                        >
                            {alternateCategoryName}
                        </span>
                    </div>
                    <div
                        className={`
                            station-configs-dayparts__table-col
                            station-configs-dayparts__table-col--actions
                        `}
                    >
                        {!synchronized && (
                            <OverlayTrigger
                                overlay={this.buildCustomTooltip(
                                    'WARNING',
                                    this.SYNCHRONIZED_CAN_EDIT
                                )}
                                placement="left"
                            >
                                <p className="btn-text--disabled">Remove Alternate Category</p>
                            </OverlayTrigger>
                        )}
                        {!song.unsavedCategory &&
                            (song.currentAlternate || song.currentGSAlternate) &&
                            synchronized && (
                            <TextButton
                                onClick={() => this.handleRemove(song, daypartId)}
                                text="Remove Alternate Category"
                            />
                        )}
                    </div>
                </div>
            );
        });

    stagedData = daypartId => {
        const { stagedDayparts, daypartsChanges } = this.props;
        const templateChanges = stagedDayparts.some(song => song.id === daypartId);

        if (templateChanges) {
            return templateChanges;
        }

        const song = daypartsChanges.find(sg => get(sg, `alternate[${daypartId}]`));

        if (song) {
            return this.hasStagedSongAlternateChanges(song, daypartId);
        }

        return song;
    };

    openEditDaypart = (daypart, daypartSongs) => {
        const daypartWithSongs = {
            ...daypart,
            songs: daypartSongs,
        };
        this.setState({
            editDaypartOpened: true,
            daypartToEdit: daypartWithSongs,
        });
    };

    handleCloseAsideModal = () => {
        this.setState({ editDaypartOpened: false, daypartToEdit: null });
    };

    buildAsideModal = () => {
        const { editDaypartOpened, daypartToEdit } = this.state;
        const { songs, stationCategoriesPermissions } = this.props;

        return (
            <AsideModal
                title={FEATURE_TITLE.ALTERNATE_CATEGORY}
                asideModalOpened={editDaypartOpened}
                handleClose={this.handleCloseAsideModal}
            >
                <AsideModalPanels
                    featureName={FEATURES.ALTERNATE_CATEGORY}
                    daypart={daypartToEdit}
                    handleClose={this.handleCloseAsideModal}
                    versions={songs}
                    categoriesList={this.CATEGORIES_LIST}
                    permissions={stationCategoriesPermissions}
                />
            </AsideModal>
        );
    };

    buildAccordion = (daypartSongsResult = []) => {
        const { dayparts } = this.props;
        const { activeExpandableHeader, searchValue, totalSongsMap } = this.state;
        return dayparts.map(daypart => {
            const syncStatusData = getSyncStatus(daypart.synchronized, this.stagedData(daypart.id));
            const songsResult = get(daypartSongsResult, `${daypart.id}.songs`, []);
            if (this.songsByDaypart.length && totalSongsMap.size < this.songsByDaypart.length) {
                totalSongsMap.set(daypart.id, get(this.songsByDaypart, `${daypart.id}.songs`, []));
            }
            const songsDisplay = totalSongsMap.get(daypart.id);

            return (
                <div className="station-configs-dayparts__accordion" key={daypart.id}>
                    <OverlayTrigger
                        overlay={this.buildCustomTooltip(
                            syncStatusData.title,
                            syncStatusData.message,
                            syncStatusData.type
                        )}
                        placement="right"
                    >
                        <span
                            className={`
                                    station-configs__status
                                    station-configs__status--${syncStatusData.status}
                                `}
                        />
                    </OverlayTrigger>
                    <div className="station-configs-dayparts__info">
                        <p className="station-configs-dayparts__songs-count">
                            (
                            {`${(songsDisplay || []).length} Songs`}
                            )
                        </p>
                        <FeatureToggle featureName={FEATURES.ALTERNATE_CATEGORY}>
                            {!daypart.synchronized ? (
                                <OverlayTrigger
                                    overlay={this.buildCustomTooltip(
                                        'WARNING',
                                        this.SYNCHRONIZED_CAN_EDIT
                                    )}
                                    placement="left"
                                >
                                    <p className="btn-text--disabled">Edit Songs</p>
                                </OverlayTrigger>
                            ) : (
                                <TextButton
                                    onClick={() =>
                                        this.openEditDaypart(
                                            daypart,
                                            get(this.songsByDaypart, `[${daypart.id}].songs`, [])
                                        )}
                                    text="Edit Songs"
                                />
                            )}
                        </FeatureToggle>
                    </div>
                    <ExpandableHeader
                        expanded={activeExpandableHeader.includes(daypart.id)}
                        title={daypart.name}
                        onToggle={() => this.handleExpandHeader(daypart.id)}
                        key={daypart.id}
                        description={
                            searchValue &&
                            daypartSongsResult &&
                            `(${songsResult.length} Search Results)`
                        }
                        descriptionTooltipMessage={
                            searchValue &&
                            daypartSongsResult &&
                            'Search results in this daypart with alternate categories'
                        }
                    >
                        {daypartSongsResult && daypartSongsResult[daypart.id] ? (
                            <div className="ml-table station-configs__table">
                                <div className="station-configs-dayparts__table-row">
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--color
                                        `}
                                    />
                                    <div className="station-configs-dayparts__table-col">Title</div>
                                    <div className="station-configs-dayparts__table-col">
                                        Artist
                                    </div>
                                    <div className="station-configs-dayparts__table-col">
                                        Version
                                    </div>
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--centered
                                        `}
                                    >
                                        Current Category
                                    </div>
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--centered
                                        `}
                                    >
                                        Alternate Category
                                    </div>
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--actions
                                        `}
                                    >
                                        Actions
                                    </div>
                                </div>
                                {this.buildSongRows(
                                    daypart.id,
                                    daypart.synchronized,
                                    daypartSongsResult
                                )}
                            </div>
                        ) : (
                            <div className="ml-table station-configs__table">
                                <div className="station-configs-dayparts__table-row">
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--centered
                                        `}
                                    >
                                        <span
                                            className={`
                                                station-configs-dayparts__table-col--no-song-found
                                            `}
                                        >
                                            No song found
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </ExpandableHeader>
                </div>
            );
        });
    };

    openAssignmentPanel = () => {
        this.setState({ assignmentPanelOpened: true });
    };

    handleRemove = (song, daypartId) => {
        this.setState({
            removingSong: song,
            removingSongDaypartId: daypartId,
            confirmOverlayOpened: true,
            confirmMessage: 'Are you sure you want to remove this song from daypart?',
        });
    };

    cancelRemove = () => {
        this.setState({
            removingSong: undefined,
            removingSongDaypartId: undefined,
            confirmOverlayOpened: false,
        });
    };

    confirmRemove = () => {
        const { removingSong: song, removingSongDaypartId: daypartId } = this.state;

        this.setState({
            removingSong: undefined,
            removingSongDaypartId: undefined,
            confirmOverlayOpened: false,
        });

        this.saveChangeAlternate(song, daypartId);
        this.filterSongs();
    };

    render() {
        const { dayparts, stagedDayparts } = this.props;
        const {
            createDaypartError,
            newDaypartName,
            searchValue,
            assignmentPanelOpened,
            confirmOverlayOpened,
            confirmMessage,
            daypartToEdit,
            daypartSongsResult,
        } = this.state;

        return (
            <div
                className={classNames('station-configs-dayparts', {
                    'station-configs--no-data-found': dayparts < 1,
                })}
            >
                {confirmOverlayOpened && (
                    <ConfirmOverlay
                        confirmAction={this.confirmRemove}
                        cancelAction={this.cancelRemove}
                        confirmMessage={confirmMessage}
                    />
                )}
                {dayparts.length > 0 && (
                    <SearchField
                        placeholder="Artist or Song"
                        onSearchChange={this.onSearchChange}
                        handleReset={this.handleResetSearch}
                        value={searchValue}
                        className="station-configs-dayparts__search-field"
                    />
                )}
                {dayparts.length > 0 && searchValue && (
                    <OverlayTrigger overlay={this.buildInfoTooltip('Total of search results')}>
                        <span
                            className={classNames(
                                'station-configs-dayparts__search-field',
                                'station-configs-dayparts__search-result'
                            )}
                        >
                            {searchValue && `${this.filteredSongs.length} Results`}
                        </span>
                    </OverlayTrigger>
                )}
                <div
                    className={classNames('station-configs__add-action', {
                        'station-configs__add-action--no-data-found': dayparts < 1,
                    })}
                >
                    <div>
                        <input
                            className={classNames('station-configs__input ml-input', {
                                'has-error': createDaypartError,
                            })}
                            type="text"
                            placeholder="New Daypart"
                            onChange={this.handleDaypartName}
                            value={newDaypartName}
                            maxLength="50"
                        />
                        <div
                            className={classNames('station-configs__error-message', {
                                'ml-error-message': createDaypartError,
                            })}
                        >
                            Daypart name already exists!
                        </div>
                    </div>
                    {!newDaypartName ? (
                        <OverlayTrigger
                            overlay={this.buildCustomTooltip('WARNING', this.DAYPART_NAME_REQUIRED)}
                            placement="left"
                        >
                            <p className="btn btn-primary station-configs__button disabled">
                                Create
                            </p>
                        </OverlayTrigger>
                    ) : (
                        <button
                            className="btn btn-primary station-configs__button"
                            type="button"
                            disabled={createDaypartError}
                            onClick={this.handleCreateDaypart}
                        >
                            Create
                        </button>
                    )}
                    <FeatureToggle featureName={FEATURES.ASSIGN_DAYPART}>
                        {dayparts.length > 0 && (
                            <button
                                className="btn btn-primary station-configs__button"
                                type="button"
                                onClick={this.openAssignmentPanel}
                            >
                                Assignment
                            </button>
                        )}
                    </FeatureToggle>
                </div>
                <div className="station-configs__table-container">
                    {dayparts.length < 1 ? (
                        <p className="station-configs--no-data-found">No data found.</p>
                    ) : (
                        this.buildAccordion(daypartSongsResult)
                    )}
                </div>
                {daypartToEdit && this.buildAsideModal()}
                <FeatureToggle featureName={FEATURES.ASSIGN_DAYPART}>
                    <AssignmentPanel
                        onClose={() => this.setState({ assignmentPanelOpened: false })}
                        className={assignmentPanelOpened ? 'assignment-panel--opened' : ''}
                        dayparts={dayparts}
                        stagedDayparts={stagedDayparts}
                    />
                </FeatureToggle>
            </div>
        );
    }
}

ConfigDayparts.propTypes = {
    boardId: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    createDaypart: PropTypes.func.isRequired,
    currentSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
    dayparts: PropTypes.arrayOf(PropTypes.object).isRequired,
    daypartsChanges: PropTypes.arrayOf(PropTypes.object).isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    stagedDayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    updateSongsAlternateCategoryAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    updateSongsAlternateCategoryAction: updateSongsAlternateCategory,
};

export default connect(null, mapDispatchToProps)(ConfigDayparts);
