import React from 'react';
import { connect } from 'react-redux';

import { forceCheck } from 'react-lazyload';
import PropTypes from 'prop-types';
import unionBy from 'lodash/unionBy';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';
import Select from 'react-select';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { closeOverlay, resetError } from 'stores/musicTrackerOverlay/musicTrackerOverlayActions';
import MusicLabOverlay from 'components/MusicLabOverlay';
import CategoryGroup from './CategoryGroup';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import CategoryPlanner from './CategoryPlanner';
import CategoryListView from './CategoryListView';

class VersionSidebar extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        const clonedStagedVersions = props.flattenedStagedVersions;

        this.state = {
            changes: [...clonedStagedVersions], // sets initial state as what is in redux
            plannerOpen: false,
            holdPlannerOpen: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
            reviewPageOpen: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoxAction' does not exist on type 'Re... Remove this comment to see the full error message
            listViewOpen: false,
            selectedJumpTo: { value: '0', label: 'Jump to' },
            checkedSongs: [],
            listViewFilterOpen: false,
            listViewSearch: '',
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
            listFilterExc: ['X', 'Z', 'Out of sync'],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedStagedVersions' does not exist ... Remove this comment to see the full error message
            // ^ used exclude instead of include to make logic simpler
            dragSongs: [],
            dragCatGroup: null,
            asideModalSongId: null,
        };
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveChangesAction' does not exist on typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedCurrentVersions' does not exist... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    componentDidMount = () => {
        const { boardId, getBoxAction } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedStagedVersions' does not exist ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        if (window.location.hash) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            this.scrollTo(window.location.hash.slice(1));
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveChangesAction' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
        getBoxAction(boardId);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boxOpenData' does not exist on type 'Rea... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedCurrentVersions' does not exist... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'groupId' implicitly has an 'any' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedStagedVersions' does not exist ... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'change' implicitly has an 'any' type.
        const { flattenedStagedVersions } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        if (!isEqual(flattenedStagedVersions, prevProps.flattenedStagedVersions)) {
            this.updateStateChanges();
        }
    }
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedStagedVersions' does not exist ... Remove this comment to see the full error message

    updateStateChanges = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const { flattenedStagedVersions } = this.props;
        this.setState({ changes: [...flattenedStagedVersions] });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveChangesAction' does not exist on typ... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
    handleSaveReview = () => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'sendCategoryChangeSongs' does not exist ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'groupId' implicitly has an 'any' ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'version' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boxOpenData' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'Read... Remove this comment to see the full error message
            saveChangesAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'Read... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedStagedVersions' does not exist ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type '{ toSt... Remove this comment to see the full error message
            boardId,
            deleteStagedCategoriesAction,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'change' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type '{ toSt... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            boxOpenData,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            flattenedCurrentVersions,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type '{ toSt... Remove this comment to see the full error message
            flattenedStagedVersions,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        } = this.props;
        const { changes } = this.state;

        const changeCategories = changes.filter(item =>
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type '{ toSt... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            flattenedCurrentVersions.some(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                song => song.media_id === item.media_id && !isEqual(song.category, item.category)
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'draggable' implicitly has an 'any' type... Remove this comment to see the full error message
            )
        );

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'holdPlannerOpen' does not exist on type ... Remove this comment to see the full error message
        const undoCategories = changes.filter(item =>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'sendCategoryChangeSongs' does not exist ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
            flattenedStagedVersions.some(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mediaId' implicitly has an 'any' type.
                song => song.media_id === item.media_id && !isEqual(song.category, item.category)
            )
        );

        // if it has a new category change
        if (changeCategories.length > 0) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'listViewOpen' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'version' implicitly has an 'any' type.
            saveChangesAction(changes, boardId);
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boolean' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listFilterExc' does not exist on type 'R... Remove this comment to see the full error message
        // if it is has already same current category compare to one sent to staged,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'savedLabel' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // then delete categories from staged (future table)
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'groupId' implicitly has an 'any' ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listFilterExc' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'Read... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        if (undoCategories.length > 0 && boxOpenData.box_id && boxOpenData.box_id !== -1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'clearBoxAction' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'Read... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
            deleteStagedCategoriesAction(boardId, boxOpenData.box_id, undoCategories);
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'error' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type '{ toSt... Remove this comment to see the full error message
        return this.setState({ reviewPageOpen: true, listViewOpen: false });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    endDrag = ({ groupId, label }) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type '{ toSt... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'change' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        const { categories, notifyBottomBarOpened } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const { changes, dragSongs } = this.state;

        // find the order by of the dropped category
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type '{ toSt... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedJumpTo' implicitly has an 'any'... Remove this comment to see the full error message
        const droppedIn = categories.find(item => item.label === label);
        const changesMinusDragSongs = changes.filter(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchValue' implicitly has an 'any' ty... Remove this comment to see the full error message
            change => !dragSongs.some(song => song.media_id === change.media_id)
        );

        const newDragSongs = dragSongs
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type '{ toSt... Remove this comment to see the full error message
            .map(song => ({
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changes' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                ...song, // when changing cat from none to something else, need to build category
                order_by: droppedIn.orderBy || 999,
                category: { id: groupId, name: label },
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'Reado... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'draggable' implicitly has an 'any' type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedCurrentVersions' does not exist... Remove this comment to see the full error message
                ...(song.categoryBeforeDragged === undefined && {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'holdPlannerOpen' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentVersionSongs' does not exist on t... Remove this comment to see the full error message
                    categoryBeforeDragged: song.category,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
                }),
            }))
            .filter(
                song =>
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
                    !song.categoryBeforeDragged ||
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'holdPlannerOpen' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
                    !isEqual(song.categoryBeforeDragged, song.category)
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'listViewSearch' does not exist on type '... Remove this comment to see the full error message
            );

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dragSongs' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mediaId' implicitly has an 'any' type.
        // update staged on local state
        const updatedChanges = [...changesMinusDragSongs, ...newDragSongs];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listViewOpen' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'version' implicitly has an 'any' type.
        this.setState({
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boolean' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'active' implicitly has an 'any' t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
            changes: updatedChanges,
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
            checkedSongs: [],
            dragSongs: [],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
            dragCatGroup: null,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listFilterExc' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        });
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'savedLabel' implicitly has an 'any' typ... Remove this comment to see the full error message
        this.props.sendCategoryChangeSongs(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
            [...changesMinusDragSongs, ...newDragSongs].map(song => song)
        );

        if (updatedChanges.length > 0) {
            notifyBottomBarOpened(this.bottomBarOpened(updatedChanges));
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listFilterExc' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'Read... Remove this comment to see the full error message
        }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
    };

    onCheckVersion = version => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'clearBoxAction' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetErrorOverlayAction' does not exist ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catGrp' implicitly has an 'any' type.
        const { checkedSongs } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'notifyBottomBarOpened' does not exist on... Remove this comment to see the full error message
        if (checkedSongs.includes(version)) {
            const filtered = checkedSongs.filter(song => song.media_id !== version.media_id);
            return this.setState({ checkedSongs: filtered });
        }
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ stagedSongs: any; categoryGroups: any[]; c... Remove this comment to see the full error message
        return this.setState({ checkedSongs: [...checkedSongs, version] });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'sendCategoryChangeSongs' does not exist ... Remove this comment to see the full error message
    groupByCategory = () => {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'aNm' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'reviewPageOpen' does not exist on type '... Remove this comment to see the full error message
        const { categories, songVersions } = this.props;
        const initialGroups = categories.map(category => ({
            ...category,
            songs: [],
        }));
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'search' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        const mergedSongs = unionBy(this.state.changes, songVersions, 'media_id').filter(
            song => song.media_id
        ); // filter to make sure there are no duplicates
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const outOfSync = songVersions.filter(song => !song.media_id);
        return mergedSongs.concat(outOfSync).reduce((groups, song) => {
            if (!song.media_id) {
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // this handles "Out of sync" category
                return groups.map(group => {
                    if (group.label === 'Out of sync') {
                        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                        return { ...group, songs: group.songs.concat(song) };
                    }
                    return group;
                });
            }
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            if (isEmpty(song.category)) {
                // this handles "None" category
                return groups.map(group => {
                    if (group.label === 'None') {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedJumpTo' implicitly has an 'any'... Remove this comment to see the full error message
                        return { ...group, songs: group.songs.concat(song) };
                    }
                    return group;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchValue' implicitly has an 'any' ty... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ left: number; width: number; position: str... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'draggable' implicitly has an 'any' type... Remove this comment to see the full error message
                });
            }
            const currentCategory = song.category;
            return groups.map(group => {
                // handles all other categories
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changes' implicitly has an 'any' type.
                if (group.label === currentCategory.name) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
                    return { ...group, songs: group.songs.concat(song) };
                }
                return group;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'mediaId' implicitly has an 'any' type.
            });
        }, initialGroups);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'Reado... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showOverlay' does not exist on type 'Rea... Remove this comment to see the full error message
    holdPlanner = draggable => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ left: number; width: number; position: str... Remove this comment to see the full error message
        if (this.state.holdPlannerOpen) return this.setState({ holdPlannerOpen: false });
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type 'Readonl... Remove this comment to see the full error message
        return draggable ? this.setState({ holdPlannerOpen: true, listViewOpen: false }) : null;
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boolean' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentVersionSongs' does not exist on t... Remove this comment to see the full error message
    saveDragSongs = (songs, group) => this.setState({ dragSongs: songs, dragCatGroup: group });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
    setAsideModalSong = mediaId => this.setState({ asideModalSongId: mediaId });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'plannerOpen' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'listViewFilterOpen' does not exist on ty... Remove this comment to see the full error message
    closeAsideModal = () => this.setState({ asideModalSongId: null });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dragSongs' does not exist on type 'Reado... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'listFilterExc' does not exist on type 'R... Remove this comment to see the full error message
    toggleListView = () => {
        if (this.state.listViewOpen) return this.setState({ listViewOpen: false });
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'savedLabel' implicitly has an 'any' typ... Remove this comment to see the full error message
        return this.setState({ listViewOpen: true, holdPlannerOpen: false });
    };

    togglePlanner = boolean => this.setState({ plannerOpen: boolean });

    handleListFilterCheck = ({ target: { value: label } }) => {
        // destructured the event
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'active' implicitly has an 'any' t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listFilterExc' does not exist on type 'R... Remove this comment to see the full error message
        const { listFilterExc } = this.state;
        if (listFilterExc.includes(label)) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
            const removedLabel = listFilterExc.filter(savedLabel => savedLabel !== label);
            return this.setState({ listFilterExc: removedLabel });
        }
        return this.setState({ listFilterExc: [...listFilterExc, label] });
    };

    handleListCheckAll = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'clearBoxAction' does not exist on type '... Remove this comment to see the full error message
        const { listFilterExc } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
        const allCategoryLabels = this.props.categories
            .filter(category => category.active)
            .map(category => category.label);
        if (listFilterExc.length) return this.setState({ listFilterExc: [] });
        return this.setState({ listFilterExc: allCategoryLabels });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
    overlayApproveCancel = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeOverlayAction' does not exist on ty... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'sendCategoryChangeSongs' does not exist ... Remove this comment to see the full error message
            clearBoxAction,
            boardId,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'reviewPageOpen' does not exist on type '... Remove this comment to see the full error message
            resetErrorOverlayAction,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catGrp' implicitly has an 'any' type.
            notifyBottomBarOpened,
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
        } = this.props;

        this.setState({ reviewPageOpen: false, changes: [], checkedSongs: [] });
        resetErrorOverlayAction();
        clearBoxAction(boardId);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        notifyBottomBarOpened(false);
    };

    renderOverlay = () => {
        const {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            loading,
            error,
            showConfirm,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            closeOverlayAction,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            sendCategoryChangeSongs,
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ stagedSongs: any; categoryGroups: any[]; c... Remove this comment to see the full error message
        } = this.props;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const { reviewPageOpen } = this.state;

        let successMessage = 'Your request has been processed successfully!';

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        if (reviewPageOpen) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            successMessage = 'Your request has been submitted for processing!';
        }

        return (
            <MusicLabOverlay
                approveCancel={this.overlayApproveCancel}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
                denyCancel={closeOverlayAction}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                successClose={() => {
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'aNm' implicitly has an 'any' type... Remove this comment to see the full error message
                    this.setState({
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'str' implicitly has an 'any' type.
                        reviewPageOpen: false,
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        changes: [],
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedJumpTo' implicitly has an 'any'... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'search' implicitly has an 'any' type.
                        checkedSongs: [],
                    });
                    sendCategoryChangeSongs([]);
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
                    closeOverlayAction();
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchValue' implicitly has an 'any' ty... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                }}
                failClose={() => {
                    closeOverlayAction();
                    this.setState({ reviewPageOpen: false });
                }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                showConfirm={showConfirm}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                loading={loading}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
                error={error}
                backToMessage="Back To Music Tracker"
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'version_name' does not exist on type 'ne... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'modified_date' does not exist on type 'n... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changes' implicitly has an 'any' type.
                successMessage={successMessage}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type 'never... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
            />
        );
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
    scrollTo = value => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedStagedVersions' does not exist ... Remove this comment to see the full error message
        const categoryItem = document.getElementById(`Category-Group-${value}`);
        if (categoryItem) categoryItem.scrollIntoView();
    };

    changeSelectedJumpTo = selectedJumpTo => {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        this.setState({ selectedJumpTo });
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ left: number; width: number; position: str... Remove this comment to see the full error message
        this.scrollTo(selectedJumpTo.value);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'flattenedCurrentVersions' does not exist... Remove this comment to see the full error message
    listViewSearchChange = searchValue => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'packets' does not exist on type 'Readonl... Remove this comment to see the full error message
        if (searchValue) {
            return this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message
                listViewSearch: searchValue,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentVersionSongs' does not exist on t... Remove this comment to see the full error message
                listFilterExc: [],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changedVersions' does not exist on type ... Remove this comment to see the full error message
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        }
        return this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'changes' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ left: number; width: number; position: str... Remove this comment to see the full error message
            listViewSearch: searchValue,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'holdPlannerOpen' does not exist on type ... Remove this comment to see the full error message
            listFilterExc: ['X', 'Z', 'Out of sync'],
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'listViewFilterOpen' does not exist on ty... Remove this comment to see the full error message
    bottomBarOpened = changes => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listViewSearch' does not exist on type '... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dragSongs' does not exist on type 'Reado... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'active' implicitly has an 'any' t... Remove this comment to see the full error message
            loading,
            categories,
            tabId,
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'name' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groups' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            approveDisabled,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'label' implicitly has an 'any' ty... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catGrp' implicitly has an 'any' type.
        const other = categoryGroups.filter(({ group }) => group === 'OTHER CATEGORIES' || !group);

        const transform = groups =>
            groups.map(({ label, description, limit, songs, value }) => {
                const dropDownLabel = description ? `${label} - ${description}` : label;
                allCategories.push({ value: label, label: dropDownLabel });
                return {
                    label,
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ stagedSongs: any; categoryGroups: any[]; c... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'aNm' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const draggable = moment.utc(startDate).isSameOrAfter(dragCutoffDate) && !reviewPageOpen;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'str' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const clonedCurrentVersions = [...flattenedCurrentVersions];
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const changesToUse =
            !changes.length && !isEmpty(changedVersions) ? Object.values(changedVersions) : changes;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'search' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const changesToConfirm = utils.getChangesToConfirmUpdates(
            changesToUse,
            clonedCurrentVersions,
            packets
        );
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const listColumn = catGrp => catGrp.filter(({ label }) => !listFilterExc.includes(label));
        // ^ displays only the groups that are checked in filter

        // Get songs changed by daypart updates
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const daypartUpdates = utils.getSongsChangedByDaypartUpdates(
            stagedDayparts,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            changesToConfirm,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            currentVersionSongs
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2693) FIXME: 'any' only refers to a type, but is being used as ... Remove this comment to see the full error message
        );

        const showConfirmComponent = () => (
            <ConfirmUpdates
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                stagedSongs={changesToConfirm}
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                categoryGroups={categoryGroups}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
                closeConfirmUpdates={() => this.setState({ reviewPageOpen: false })}
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                daypartUpdates={daypartUpdates}
            />
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        );

        const listViewRawColumns = [
            { name: 'current', column: listColumn(current) },
            { name: 'recurrent', column: listColumn(recurrent) },
            { name: 'gold', column: listColumn(gold) },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
            { name: 'other', column: listColumn(other) },
        ];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
        const searchSongCompare = ({ aNm, sNm }, userSearch) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'gs_category' does not exist on type 'nev... Remove this comment to see the full error message
            const shapeString = str => str.trim().toLowerCase();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'never'... Remove this comment to see the full error message
            const [artist, songName, search] = [aNm, sNm, userSearch].map(str => shapeString(str));
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'version_name' does not exist on type 'ne... Remove this comment to see the full error message
            return artist.includes(search) || songName.includes(search);
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'modified_date' does not exist on type 'n... Remove this comment to see the full error message
        const songFilter = search =>
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternate' does not exist on type 'never... Remove this comment to see the full error message
            listViewRawColumns.map(group => ({
                ...group,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet_id' does not exist on type 'never... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ left: number; width: number; position: str... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction_id' does not exist on type '... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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

        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ left: number; width: number; position: str... Remove this comment to see the full error message
        categoriesNotFoundOnGselector = [
            ...new Set([
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
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
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                            togglePlanner={this.togglePlanner}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                            endDrag={this.endDrag}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                            multiSelect={holdPlannerOpen} // when planner is open, show checkboxes
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                            checkedSongs={checkedSongs}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                            onCheckVersion={this.onCheckVersion}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
                            draggable={draggable}
                            saveDragSongs={this.saveDragSongs}
                            dragSongs={dragSongs}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            dragCatGroup={dragCatGroup}
                            catChanges={changes}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            boardId={boardId}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            asideModalSongId={asideModalSongId}
                            openAsideModal={this.setAsideModalSong}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            closeAsideModal={this.closeAsideModal}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            bottomBarOpen={bottomBarOpen}
                            stationCategoriesPermissions={stationCategoriesPermissions}
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        />
                    ))}
                </div>
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                <CategoryPlanner
                    open={holdPlannerOpen || plannerOpen}
                    groups={plannerGroups}
                    endDrag={this.endDrag}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    togglePlanner={this.togglePlanner}
                    closePlanner={this.holdPlanner}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    dragCatGroup={dragCatGroup}
                    stationCategoriesPermissions={stationCategoriesPermissions}
                />
                {listViewOpen ? (
                    <CategoryListView
                        toggleListView={this.toggleListView}
                        draggable={draggable}
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        listViewFilterOpen={listViewFilterOpen}
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        listFilterExc={listFilterExc}
                        holdPlanner={this.holdPlanner}
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        handleListCheckAll={this.handleListCheckAll}
                        categoryGroups={categoryGroups}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                        toggleListViewFilter={() =>
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'flattened' implicitly has an 'any' type... Remove this comment to see the full error message
                            this.setState({
                                listViewFilterOpen: !listViewFilterOpen,
                            })}
                        handleListFilterCheck={this.handleListFilterCheck}
                        searchValue={listViewSearch}
                        onSearchChange={this.listViewSearchChange}
                    >
                        {listViewColumns.map(({ column, name }) => (
                            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                            <div className="list-view-col" key={name}>
                                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
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
                {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                {reviewPageOpen ? showConfirmComponent() : null}
                {/* @ts-expect-error ts-migrate(2693) FIXME: 'any' only refers to a type, but is being used as ... Remove this comment to see the full error message */}
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
