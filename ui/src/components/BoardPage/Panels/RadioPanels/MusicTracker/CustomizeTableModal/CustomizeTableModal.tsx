import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Waypoint from 'react-waypoint';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
import flatten from 'lodash/flatten';
import cloneDeep from 'lodash/cloneDeep';

import {
    closeModal,
    saveCustomizeGroups,
    getDefaultMTPreferences,
} from 'stores/preferences/preferencesActions';
import { getCompetitors } from 'stores/songCompetitor/songCompetitorActions';
import CategoryTab from './CategoryTab';
import CustomizeSearchForm from './CustomizeSearchForm';
import CategoryGroup from './CategoryGroup';

// Most of the Waypoint logic is taken from react-bootstrap's documentation source code
// https://github.com/react-bootstrap/react-bootstrap/blob/master/docs/src/ComponentsPage.js
class CustomizeTableModal extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        const { musictracker = [], competitors = {} } = props.preferences;
        // avoid mutating
        const musictrackerCp = cloneDeep(musictracker);
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        const competitorsCp =
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'heightModal' does not exist on type 'Cus... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideLeft' does not exist on typ... Remove this comment to see the full error message
            competitors[props.match.params.boardId] || [].map(competitor => ({ ...competitor }));
        // ==== Modal height ====
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'marginModal' does not exist on type 'Cus... Remove this comment to see the full error message
        // Header 70
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'heightHeaderSideRight' does not exist on... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'heightModal' does not exist on type 'Cus... Remove this comment to see the full error message
        // Actions buttons 61
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideLeft' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'actionsButtons' does not exist on type '... Remove this comment to see the full error message
        // Height header side right 75
        // Margin modal = 60
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideLeft' does not exist on typ... Remove this comment to see the full error message
        // minHeightWindow = 45 + 61 + marginModal + minHeightSideLeft
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideRight' does not exist on ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveCustomizeGroupsAction' does not exis... Remove this comment to see the full error message
        // minHeightSideRight = minHeightSideLeft - heightHeaderSideRight
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCompetitorsAction' does not exist on ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'heightHeaderSideRight' does not exist on... Remove this comment to see the full error message
        this.heightModal = 70;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'groupRefs' does not exist on type 'Custo... Remove this comment to see the full error message
        this.actionsButtons = 61;
        this.minHeightWindow = 626; // TODO: refactor resizing logic here with plain css
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
        this.minHeightSideLeft = 460;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideLeft' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        this.minHeightSideRight = 385;
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        this.marginModal = 60;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideRight' does not exist on ty... Remove this comment to see the full error message
        this.heightHeaderSideRight = 75;

        this.groupRefs = [];

        this.state = {
            searchValue: '',
            afterSections: this.getAfterSections(),
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeModalAction' does not exist on type... Remove this comment to see the full error message
            heightSideLeft: this.minHeightSideLeft,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            heightSideRight: this.minHeightSideRight,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
            musictracker: orderBy(musictrackerCp, ['order']) || [],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'groupRefs' does not exist on type 'Custo... Remove this comment to see the full error message
            competitors: competitorsCp || [],
        };

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        this.onChangeSearchForm = this.onChangeSearchForm.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'above' does not exist on type 'typeof Wa... Remove this comment to see the full error message
        this.onWaypointEnter = this.onWaypointEnter.bind(this);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        this.onWaypointLeave = this.onWaypointLeave.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'above' does not exist on type 'typeof Wa... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveCustomizeGroupsAction' does not exis... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
        this.onColumnGroupClick = this.onColumnGroupClick.bind(this);
    }

    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'key' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'itemId' implicitly has an 'any' type.
    onSave = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toIndex' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveCustomizeGroupsAction' does not exis... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
        const { saveCustomizeGroupsAction, getCompetitorsAction } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCompetitorsAction' does not exist on ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const { musictracker, competitors } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        saveCustomizeGroupsAction(orderBy(musictracker, ['order']), competitors);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        if (competitors.length > 0) getCompetitorsAction(competitors); // get competitors
    };

    onResetColumns = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeModalAction' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        const musictracker = getDefaultMTPreferences();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        // update competitors order to default value
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        const newCompetitors = this.state.competitors.map(competitor => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'groupRefs' does not exist on type 'Custo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            const spinsCategory = musictracker.find(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupItems' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitor' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
                currentCategory => currentCategory.key === 'spins'
            );
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'above' does not exist on type 'typeof Wa... Remove this comment to see the full error message
            const defaultCompetitor = spinsCategory.items.find(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupEntry' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                currentItem => currentItem.id === competitor.id
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'key' implicitly has an 'any' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
            );
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return {
                ...competitor,
                order: defaultCompetitor.order,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
                checked: defaultCompetitor.checked,
            };
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
        this.setState({ musictracker: cloneDeep(musictracker), competitors: newCompetitors });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'toIndex' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    onCancel = () => this.props.closeModalAction();

    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
    onChangeSearchForm = value => this.setState({ searchValue: value });

    onColumnGroupClick(id) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitor' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        this.groupRefs[id].scrollIntoView();
        this.activateSection(id);
    }

    onWaypointEnter(id, { previousPosition }) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        if (previousPosition !== Waypoint.above) return;
        this.activateSection(id, false);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
    onWaypointLeave(id, { currentPosition }) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        if (currentPosition !== Waypoint.above) return;
        this.activateSection(id);
    }

    getAfterSections() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
        const { musictracker } = this.props.preferences;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightWindow' does not exist on type ... Remove this comment to see the full error message
        const afterSections = {};
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideLeft' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideRight' does not exist on ty... Remove this comment to see the full error message
        musictracker.forEach(({ key }) => {
            afterSections[key] = false;
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'marginModal' does not exist on type 'Cus... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'actionsButtons' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'key' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'actionsButtons' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        return afterSections;
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    getSearchValue() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        const { searchValue } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSections' does not exist on type 'R... Remove this comment to see the full error message
        return searchValue.trim().length > 0 ? searchValue : false;
    }

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; active: any; label: any; onClick... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
    moveItem = (groupId, itemId, fromIndex, toIndex) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{ toStrin... Remove this comment to see the full error message
        const group = this.state.musictracker.find(g => g.id === groupId);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupItems' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: any; key: any; category: any; groupRef... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
        const moving = group.items.find(g => g.order === fromIndex + 1);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
        const movingTo = group.items.find(g => g.order === toIndex + 1);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
        const newItems = [
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
            { ...moving, order: toIndex + 1 },
            { ...movingTo, order: fromIndex + 1 },
        ];
        const newGroup = {
            ...group,
            items: orderBy(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeModalAction' does not exist on type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                group.items
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupEntry' implicitly has an 'any' typ... Remove this comment to see the full error message
                    .filter(item => !newItems.map(i => i.order).includes(item.order))
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
                    .concat(newItems),
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onChange: (value: any) => void; resetColum... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                ['order']
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupEntry' implicitly has an 'any' typ... Remove this comment to see the full error message
            ),
        };
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
        const newCompetitors = this.state.competitors.map(competitor => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
            if (competitor.id === moving.id) return { ...competitor, order: toIndex + 1 };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            if (competitor.id === movingTo.id) return { ...competitor, order: fromIndex + 1 };
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            return competitor;
        });
        this.setState({
            musictracker: orderBy(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                this.state.musictracker.filter(g => g.order !== newGroup.order).concat(newGroup),
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'g' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                ['order']
            ),
            competitors: newCompetitors,
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
    moveGroup = (groupId, fromIndex, toIndex) => {
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'fromIndex' implicitly has an 'any' type... Remove this comment to see the full error message
        const musictracker = orderBy(this.state.musictracker, ['order']);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitor' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        const moving = musictracker.find(group => group.order === fromIndex + 1);
        const groupTwo = musictracker.find(group => group.order === toIndex + 1);
        const newGroups = [
            {
                ...moving,
                order: toIndex + 1,
            },
            {
                ...groupTwo,
                order: fromIndex + 1,
            },
        ];

        this.setState({
            musictracker: orderBy(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                this.state.musictracker
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                    .filter(group => !newGroups.map(g => g.order).includes(group.order))
                    .concat(newGroups),
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
                ['order']
            ),
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupItems' implicitly has an 'any' typ... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightWindow' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checked' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideRight' does not exist on ty... Remove this comment to see the full error message
    checkUncheckChildItems = (groupItems, checked) =>
        groupItems.map(groupItem => {
            const newItem = groupItem;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marginModal' does not exist on type 'Cus... Remove this comment to see the full error message
            if ('checked' in groupItem && !groupItem.hidden && !groupItem.disabled) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'actionsButtons' does not exist on type '... Remove this comment to see the full error message
                newItem.checked = !checked;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marginModal' does not exist on type 'Cus... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupId' implicitly has an 'any' type.
            }
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'actionsButtons' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checked' implicitly has an 'any' type.
            return newItem;
        });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
    checkUncheckGroup = (groupId, checked) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        const group = this.state.musictracker.find(groupEntry => groupEntry.id === groupId);
        const newGroup = {
            ...group,
            items: this.checkUncheckChildItems(group.items, checked),
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSections' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
        };
        this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupEntry' implicitly has an 'any' typ... Remove this comment to see the full error message
            musictracker: orderBy(
                this.state.musictracker
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{ toStrin... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
                    .filter(groupEntry => groupEntry.id !== groupId)
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'itemId' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: any; key: any; category: any; groupRef... Remove this comment to see the full error message
                    .concat(newGroup),
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                ['order']
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'groupEntry' implicitly has an 'any' typ... Remove this comment to see the full error message
            ),
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    checkUncheckItem = (categoryId, itemId) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
        const group = this.state.musictracker.find(groupEntry => groupEntry.id === categoryId);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entry' implicitly has an 'any' type.
        const item = group.items.find(entry => entry.id === itemId);
        const newItem = { ...item, checked: !item.checked };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeModalAction' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
        const newGroupItems = group.items.map(entry => (entry.id === itemId ? newItem : entry));
        const newGroup = { ...group, items: newGroupItems };
        const newCompetitors = this.state.competitors.map(competitor => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
            if (competitor.id === newItem.id) return { ...competitor, checked: newItem.checked };
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'change' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onChange: (value: any) => void; resetColum... Remove this comment to see the full error message
            return competitor;
        });
        this.setState({
            musictracker: orderBy(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryId' implicitly has an 'any' typ... Remove this comment to see the full error message
                this.state.musictracker.filter(change => change.id !== categoryId).concat(newGroup),
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                ['order']
            ),
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            competitors: newCompetitors,
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    toggleCompetitors = (categoryId, competitors) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const spins = this.state.musictracker.find(group => group.key === 'spins');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const competitorSpins = spins.items.find(item => item.id === 1);
        const defaultCompetitorItems = getDefaultMTPreferences()
            .find(group => group.key === 'spins')
            .items.filter(item => item.labelTemplate);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
        // clean competitors array from the competitors that are already in the items array
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'competitor' implicitly has an 'any' typ... Remove this comment to see the full error message
        const spinsItems = uniqBy([...spins.items, ...defaultCompetitorItems], 'id');
        // set the new competitors
        const competitorSpinsTemplates = flatten(
            competitors.map((competitor, index) => {
                const templates = spinsItems.filter(
                    item => item.competitorOrder && item.competitorOrder - 1 === index
                );
                return templates.map(template => ({
                    ...template,
                    ...competitor,
                    label: template.labelTemplate.replace('{callLetters}', competitor.label),
                    hidden: false,
                    callLetter: competitor.label,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musictracker' does not exist on type 'Re... Remove this comment to see the full error message
                }));
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            })
        );
        const newSpins = {
            ...spins,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
            items: orderBy(uniqBy([competitorSpins, ...spinsItems], 'id'), ['order']),
        };
        this.setState({
            musictracker: orderBy(
                this.state.musictracker.filter(group => group.id !== categoryId).concat(newSpins),
                ['order']
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightWindow' does not exist on type ... Remove this comment to see the full error message
            ),
            competitors: competitorSpinsTemplates,
        });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideLeft' does not exist on typ... Remove this comment to see the full error message
    activateSection(id, state = true) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minHeightSideRight' does not exist on ty... Remove this comment to see the full error message
        const afterSections = { ...this.getAfterSections(), [id]: state };
        this.setState({ afterSections });
    }

    updateDimensions() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'marginModal' does not exist on type 'Cus... Remove this comment to see the full error message
        if (window.innerHeight < this.minHeightWindow) {
            this.setState({
                heightSideLeft: this.minHeightSideLeft,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'marginModal' does not exist on type 'Cus... Remove this comment to see the full error message
                heightSideRight: this.minHeightSideRight,
            });
        } else {
            this.setState({
                heightSideLeft:
                    window.innerHeight - this.marginModal - this.actionsButtons - this.heightModal,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
                heightSideRight:
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                    window.innerHeight -
                    this.marginModal -
                    this.actionsButtons -
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                    this.heightModal -
                    this.heightHeaderSideRight,
            });
        }
    }

    renderCategories() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSections' does not exist on type 'R... Remove this comment to see the full error message
            preferences: { musictracker },
            boardDetails,
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; active: any; label: any; onClick... Remove this comment to see the full error message
        } = this.props;
        const { hasTAA } = boardDetails.filters.applied.options;

        return musictracker.map(group => {
            if (group.key === 'enhanced' && !hasTAA) return null;
            return (
                <CategoryTab
                    key={group.id}
                    active={this.state.afterSections[group.key]}
                    label={group.label}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{ toStrin... Remove this comment to see the full error message
                    onClick={() => this.onColumnGroupClick(group.key)}
                />
            );
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
    renderItems() {
        const { boardDetails } = this.props;
        const { musictracker, competitors } = this.state;
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: any; key: any; category: any; groupRef... Remove this comment to see the full error message
        const { hasTAA } = boardDetails.filters.applied.options;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
        const selectedCompetitors = uniqBy(competitors, 'value').map(competitor => ({
            value: competitor.value,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            label: competitor.callLetter,
        }));
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        return musictracker.map((category, key) => {
            if (category.key === 'enhanced' && !hasTAA) return null;
            return (
                <CategoryGroup
                    id={category.id}
                    key={category.id}
                    category={category}
                    groupRef={c => {
                        this.groupRefs[category.key] = c;
                    }}
                    index={key}
                    searchValue={this.getSearchValue()}
                    onWaypointEnter={e => this.onWaypointEnter(category.key, e)}
                    onWaypointLeave={e => this.onWaypointLeave(category.key, e)}
                    checkUncheckItem={this.checkUncheckItem}
                    toggleCompetitors={this.toggleCompetitors}
                    checkUncheckGroup={this.checkUncheckGroup}
                    moveItem={this.moveItem}
                    moveGroup={this.moveGroup}
                    competitors={competitors}
                    selectedCompetitors={selectedCompetitors}
                />
            );
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onChange: (value: any) => void; resetColum... Remove this comment to see the full error message
        });
    }

    render() {
        const { closeModalAction } = this.props;
        const { heightSideLeft, heightSideRight } = this.state;

        return (
            <Modal className="customize-table-modal" onHide={() => closeModalAction()} show>
                <Modal.Header closeButton>
                    <Modal.Title componentClass="h5">Customize Table</Modal.Title>
                </Modal.Header>
                <Modal.Body bsClass="customize-table-modal__body">
                    <div className="side left" style={{ height: `${heightSideLeft}px` }}>
                        {this.renderCategories()}
                    </div>
                    <div className="side right">
                        <CustomizeSearchForm
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                            onChange={this.onChangeSearchForm}
                            resetColumns={this.onResetColumns}
                        />
                        <div
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            className="customize-table-modal__category-items"
                            style={{ height: `${heightSideRight}px` }}
                        >
                            {this.renderItems()}
                        </div>
                    </div>
                </Modal.Body>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
                <Modal.Footer>
                    <button className="btn btn-default" onClick={this.onCancel} type="button">
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={this.onSave} type="button">
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CustomizeTableModal.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    closeModalAction: PropTypes.func.isRequired,
    getCompetitorsAction: PropTypes.func.isRequired,
    match: PropTypes.shape().isRequired,
    preferences: PropTypes.shape().isRequired,
    saveCustomizeGroupsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    closeModalAction: closeModal,
    saveCustomizeGroupsAction: saveCustomizeGroups,
    getCompetitorsAction: getCompetitors,
};

const mapStateToProps = state => ({
    boardDetails: state.boardDetails,
    preferences: state.preferences,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTableModal);
