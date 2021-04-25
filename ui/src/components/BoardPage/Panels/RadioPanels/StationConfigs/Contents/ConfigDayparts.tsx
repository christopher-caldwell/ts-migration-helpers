import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import SearchField from 'components/SearchField';
import TextButton from 'components/Buttons/TextButton';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import getSyncStatus from 'components/BoardPage/Panels/RadioPanels/StationConfigs/utils';
import AssignmentPanel from '../Components/AssignmentPanel';

class ConfigDayparts extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'DAYPART_NAME_REQUIRED' does not exist on... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.state = {
            activeExpandableHeader: [],
            newDaypartName: '',
            createDaypartError: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'SYNCHRONIZED_CAN_EDIT' does not exist on... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'DAYPART_NAME_REQUIRED' does not exist on... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            categoryChanges: {},
            searchValue: '',
            assignmentPanelOpened: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
            editDaypartOpened: false,
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'SYNCHRONIZED_CAN_EDIT' does not exist on... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
            daypartToEdit: null,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
            daypartSongsResult: [],
            totalSongsMap: new Map(),
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'CATEGORIES_LIST' does not exist on type ... Remove this comment to see the full error message
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        this.DAYPART_NAME_REQUIRED = `
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            The daypart name is required in order for you to create a new daypart.
        `;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypart' does not exist on type 'R... Remove this comment to see the full error message
        this.SYNCHRONIZED_CAN_EDIT = 'Only dayparts synchronized with GSelector can be edited.';
        this.CATEGORIES_LIST = props.categories.filter(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            category => category.label !== NONE_CATEGORY && category.label !== MISSING_CATEGORY
        );
        this.songsByDaypart = [];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
        this.filteredSongs = [];
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    componentDidMount() {
        this.getSongsByDaypart();
        this.filterSongs();
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSongsAlternateCategoryAction' does... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypart' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { songs } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dataSongs' implicitly has an 'any' type... Remove this comment to see the full error message
        if (!isEqual(songs, prevProps.songs)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryChanges' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: any; title: any; message: any; left:... Remove this comment to see the full error message
            this.getSongsByDaypart();
            this.filterSongs();
        }
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    handleDaypartName = e => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        const {
            target: { value, maxLength },
        } = e;
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
        const { dayparts } = this.props;
        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        const daypartNameExists = dayparts.some(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
            daypart => daypart.name.toLowerCase().trim() === value.toLowerCase().trim()
        );

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        this.setState({
            newDaypartName: value.slice(0, maxLength),
            createDaypartError: daypartNameExists,
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypart' does not exist on type 'R... Remove this comment to see the full error message
    handleCreateDaypart = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newDaypartName' does not exist on type '... Remove this comment to see the full error message
        const { createDaypart } = this.props;
        const { newDaypartName } = this.state;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
        createDaypart(newDaypartName);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'title' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dataSongs' implicitly has an 'any' type... Remove this comment to see the full error message
        this.setState({ newDaypartName: '' });
    // @ts-expect-error ts-migrate(7034) FIXME: Variable 'filteredSongs' implicitly has type 'any[... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'current' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
    buildCustomTooltip = (title, message, type) => (
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'message' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
        <CustomTooltip type={type || 'warning'} title={title} message={message} left={5} />
    );

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    buildInfoTooltip = message => (
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryChanges' does not exist on type ... Remove this comment to see the full error message
        <Tooltip id="search-count-tooltip">
            <div className="mt-tooltip">
                {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message */}
                <span className="fa fa-info-circle data-type-info" />
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'CATEGORIES_LIST' does not exist on type ... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message */}
                <div className="mt-tooltip-content">
                    {/* @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message */}
                    <span className="mt-tooltip-content-text">{message}</span>
                {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message */}
                </div>
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type. */}
            </div>
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableHeader' does not exist o... Remove this comment to see the full error message */}
        {/* @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message */}
        </Tooltip>
    );

    handleExpandHeader = key => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { activeExpandableHeader } = this.state;
        let newArray = [];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        if (activeExpandableHeader.includes(key)) {
            newArray = activeExpandableHeader.filter(item => item !== key);
        } else {
            newArray = [...activeExpandableHeader, key];
        }

        this.setState({
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            activeExpandableHeader: newArray,
        });
    };

    // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSongsAlternateCategoryAction' does... Remove this comment to see the full error message
    saveChangeAlternate = (song, daypartId) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const { updateSongsAlternateCategoryAction, boardId } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
        updateSongsAlternateCategoryAction({
            stationId: boardId,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            songs: [
                {
                    sId: song.sId,
                    media_id: song.media_id,
                    alternate: {
                        [daypartId]: {
                            category_id: null,
                        },
                    },
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentSongs' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dataSongs' implicitly has an 'any' type... Remove this comment to see the full error message
            ],
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'SYNCHRONIZED_CAN_EDIT' does not exist on... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryChanges' does not exist on type ... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartSongsResult' implicitly has an '... Remove this comment to see the full error message
    filteredSongsByDaypart = dataSongs => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'filteredSongs' implicitly has type 'any[... Remove this comment to see the full error message
        const { categoryChanges } = this.state;
        const filteredSongs = [];

        dataSongs.forEach(song => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
            Object.keys(song.alternate).forEach(daypartId => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                const categoryName = get(song, 'category.name', song.gs_category);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sg' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'CATEGORIES_LIST' does not exist on type ... Remove this comment to see the full error message
                const unsavedCategory = get(categoryChanges, `[${song.media_id}].[${daypartId}]`);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                const currentAlternate = get(song, `alternate[${daypartId}].category_id`);
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartSongs' implicitly has an 'any' t... Remove this comment to see the full error message
                const currentGSAlternate = get(song, `alternate[${daypartId}].gs_category`);

                // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
                if (currentAlternate || currentGSAlternate) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'editDaypartOpened' does not exist on typ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
                    filteredSongs[daypartId] = filteredSongs[daypartId] || {};
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; daypart: any; handleC... Remove this comment to see the full error message
                    filteredSongs[daypartId].songs = filteredSongs[daypartId].songs || [];
                    filteredSongs[daypartId].songs.push({
                        ...song,
                        categoryName,
                        unsavedCategory,
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'CATEGORIES_LIST' does not exist on type ... Remove this comment to see the full error message
                        currentAlternate,
                        currentGSAlternate,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7005) FIXME: Variable 'filteredSongs' implicitly has an 'any[]'... Remove this comment to see the full error message
                    });
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableHeader' does not exist o... Remove this comment to see the full error message
                }
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalSongsMap' does not exist on type 'R... Remove this comment to see the full error message
        return filteredSongs;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
    };

    filterSongs = (searchValue = '') => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
        const { songs: dataSongs } = this.props;
        let filteredSongs = [...dataSongs];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        if (searchValue !== '') {
            filteredSongs = dataSongs.filter(
                song =>
                    ((song.aNm && song.aNm.toLowerCase().includes(searchValue.toLowerCase())) ||
                        (song.sNm && song.sNm.toLowerCase().includes(searchValue.toLowerCase()))) &&
                    Object.keys(song.alternate).length > 0
            );
        }

        if (filteredSongs.length > 0) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
            this.setState({ daypartSongsResult: this.filteredSongsByDaypart(filteredSongs) });
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
            this.setState({ daypartSongsResult: [] });
        }

        this.filteredSongs = filteredSongs;
    };

    getSongsByDaypart = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        const { songs: dataSongs } = this.props;
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        this.songsByDaypart = this.filteredSongsByDaypart(dataSongs);
    };

    onSearchChange = value => {
        const searchValue = value || '';
        this.filterSongs(searchValue);
        this.setState({ searchValue });
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    handleResetSearch = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'SYNCHRONIZED_CAN_EDIT' does not exist on... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
        this.filterSongs();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'SYNCHRONIZED_CAN_EDIT' does not exist on... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentSongs' does not exist on type 'Re... Remove this comment to see the full error message
        this.setState({ searchValue: '' });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'current' implicitly has an 'any' type.
    hasStagedSongAlternateChanges = (song, daypartId) => {
        const { currentSongs } = this.props;
        const currentMedia = currentSongs.find(current => song.media_id === current.media_id);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
        return !isEqual(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'synchronized' implicitly has an 'any' t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
            get(currentMedia, `alternate[${daypartId}]`),
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            get(song, `alternate[${daypartId}]`)
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sg' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryChanges' does not exist on type ... Remove this comment to see the full error message
        );
    };

    buildSongRows = (daypartId, synchronized, daypartSongsResult) =>
        daypartSongsResult[daypartId].songs.map(song => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
            const { categoryChanges } = this.state;
            const unsavedCategory = get(categoryChanges, `[${song.media_id}].[${daypartId}]`);
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cat' implicitly has an 'any' type.
            const currentAlternate = get(song, `alternate[${daypartId}].category_id`);
            const currentGSAlternate = get(song, `alternate[${daypartId}].gs_category`);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'editDaypartOpened' does not exist on typ... Remove this comment to see the full error message
            const categoryLabel = get(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message
                this.CATEGORIES_LIST.find(cat => cat.value === currentAlternate),
                'label'
            );
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            const alternateCategoryName =
                (unsavedCategory ? unsavedCategory.label : null) ||
                categoryLabel ||
                currentGSAlternate;

            return (
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; daypart: any; handleC... Remove this comment to see the full error message
                <div className="station-configs-dayparts__table-row" key={song.media_id}>
                    <div
                        className={classNames(
                            'station-configs-dayparts__table-col',
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'CATEGORIES_LIST' does not exist on type ... Remove this comment to see the full error message
                            'station-configs-dayparts__table-col--color',
                            {
                                'station-configs-dayparts__table-col--color-staged': this.hasStagedSongAlternateChanges(
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                                    song,
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableHeader' does not exist o... Remove this comment to see the full error message
                                    daypartId
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
                                ),
                            }
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                        )}
                    >
                        &nbsp;
                    </div>
                    <div className="station-configs-dayparts__table-col">
                        <span
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={song.sNm}
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
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
                            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                            className="station-configs-dayparts__table-col--ellipsis"
                            title={song.categoryName}
                        >
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2. */}
                            {song.categoryName}
                        </span>
                    </div>
                    <div
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'removingSong' does not exist on type 'Re... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'SYNCHRONIZED_CAN_EDIT' does not exist on... Remove this comment to see the full error message
                        className={`
                            station-configs-dayparts__table-col
                            station-configs-dayparts__table-col--centered
                        `}
                    >
                        <span
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartId' implicitly has an 'any' type... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'assignmentPanelOpened' does not exist on... Remove this comment to see the full error message
                            className="station-configs-dayparts__table-col--ellipsis"
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmMessage' does not exist on type '... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songsByDaypart' does not exist on type '... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartsChanges' does not exist on type ... Remove this comment to see the full error message
                            title={alternateCategoryName}
                        >
                            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                            {alternateCategoryName}
                        </span>
                    </div>
                    <div
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (valu... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sg' implicitly has an 'any' type.
                        className={`
                            station-configs-dayparts__table-col
                            station-configs-dayparts__table-col--actions
                        `}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
                    >
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartSongs' implicitly has an 'any' t... Remove this comment to see the full error message */}
                        {!synchronized && (
                            <OverlayTrigger
                                overlay={this.buildCustomTooltip(
                                    // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
                                    'WARNING',
                                    this.SYNCHRONIZED_CAN_EDIT
                                )}
                                placement="left"
                            >
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'editDaypartOpened' does not exist on typ... Remove this comment to see the full error message */}
                                <p className="btn-text--disabled">Remove Alternate Category</p>
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type 'Readonly<... Remove this comment to see the full error message */}
                            </OverlayTrigger>
                        )}
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                        {!song.unsavedCategory &&
                            (song.currentAlternate || song.currentGSAlternate) &&
                            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; daypart: any; handleC... Remove this comment to see the full error message
                            synchronized && (
                            <TextButton
                                onClick={() => this.handleRemove(song, daypartId)}
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                                text="Remove Alternate Category"
                            />
                        )}
                    </div>
                </div>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            );
        });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableHeader' does not exist o... Remove this comment to see the full error message
    stagedData = daypartId => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        const { stagedDayparts, daypartsChanges } = this.props;
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
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
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        const { songs, stationCategoriesPermissions } = this.props;

        return (
            <AsideModal
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                title={FEATURE_TITLE.ALTERNATE_CATEGORY}
                asideModalOpened={editDaypartOpened}
                handleClose={this.handleCloseAsideModal}
            >
                <AsideModalPanels
                    featureName={FEATURES.ALTERNATE_CATEGORY}
                    daypart={daypartToEdit}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                    handleClose={this.handleCloseAsideModal}
                    versions={songs}
                    categoriesList={this.CATEGORIES_LIST}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                    permissions={stationCategoriesPermissions}
                />
            </AsideModal>
        );
    };

    buildAccordion = (daypartSongsResult = []) => {
        const { dayparts } = this.props;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
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
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'removingSong' does not exist on type 'Re... Remove this comment to see the full error message */}
                    <div className="station-configs-dayparts__info">
                        <p className="station-configs-dayparts__songs-count">
                            (
                            {`${(songsDisplay || []).length} Songs`}
                            )
                        </p>
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message */}
                        <FeatureToggle featureName={FEATURES.ALTERNATE_CATEGORY}>
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message */}
                            {!daypart.synchronized ? (
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypartError' does not exist on ty... Remove this comment to see the full error message
                                <OverlayTrigger
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
                                    overlay={this.buildCustomTooltip(
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmOverlayOpened' does not exist on ... Remove this comment to see the full error message
                                        'WARNING',
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartToEdit' does not exist on type 'R... Remove this comment to see the full error message
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
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (valu... Remove this comment to see the full error message
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
                            // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
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
                                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                                            station-configs-dayparts__table-col
                                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                                            station-configs-dayparts__table-col--color
                                        `}
                                    />
                                    <div className="station-configs-dayparts__table-col">Title</div>
                                    <div className="station-configs-dayparts__table-col">
                                        Artist
                                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'removingSong' does not exist on type 'Re... Remove this comment to see the full error message */}
                                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2. */}
                                    </div>
                                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'removingSongDaypartId' does not exist on... Remove this comment to see the full error message */}
                                    <div className="station-configs-dayparts__table-col">
                                        Version
                                    </div>
                                    <div
                                        className={`
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                                            station-configs-dayparts__table-col
                                            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'createDaypartError' does not exist on ty... Remove this comment to see the full error message
                                            station-configs-dayparts__table-col--centered
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmOverlayOpened' does not exist on ... Remove this comment to see the full error message
                                        `}
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypartToEdit' does not exist on type 'R... Remove this comment to see the full error message
                                    >
                                        Current Category
                                    </div>
                                    <div
                                        className={`
                                            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                                            station-configs-dayparts__table-col
                                            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                            station-configs-dayparts__table-col--centered
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (valu... Remove this comment to see the full error message
                                        `}
                                    >
                                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                        Alternate Category
                                    </div>
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--actions
                                        `}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    // @ts-expect-error ts-migrate(2551) FIXME: Property 'filteredSongs' does not exist on type 'C... Remove this comment to see the full error message
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
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message */}
                                <div className="station-configs-dayparts__table-row">
                                    <div
                                        className={`
                                            station-configs-dayparts__table-col
                                            station-configs-dayparts__table-col--centered
                                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
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
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
