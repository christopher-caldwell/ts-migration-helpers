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
    constructor(props) {
        super(props);
        const { musictracker = [], competitors = {} } = props.preferences;
        // avoid mutating
        const musictrackerCp = cloneDeep(musictracker);
        const competitorsCp =
            competitors[props.match.params.boardId] || [].map(competitor => ({ ...competitor }));
        // ==== Modal height ====
        // Header 70
        // Actions buttons 61
        // Height header side right 75
        // Margin modal = 60
        // minHeightWindow = 45 + 61 + marginModal + minHeightSideLeft
        // minHeightSideRight = minHeightSideLeft - heightHeaderSideRight
        this.heightModal = 70;
        this.actionsButtons = 61;
        this.minHeightWindow = 626; // TODO: refactor resizing logic here with plain css
        this.minHeightSideLeft = 460;
        this.minHeightSideRight = 385;
        this.marginModal = 60;
        this.heightHeaderSideRight = 75;

        this.groupRefs = [];

        this.state = {
            searchValue: '',
            afterSections: this.getAfterSections(),
            heightSideLeft: this.minHeightSideLeft,
            heightSideRight: this.minHeightSideRight,
            musictracker: orderBy(musictrackerCp, ['order']) || [],
            competitors: competitorsCp || [],
        };

        this.onChangeSearchForm = this.onChangeSearchForm.bind(this);
        this.onWaypointEnter = this.onWaypointEnter.bind(this);
        this.onWaypointLeave = this.onWaypointLeave.bind(this);
        this.onColumnGroupClick = this.onColumnGroupClick.bind(this);
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    onSave = () => {
        const { saveCustomizeGroupsAction, getCompetitorsAction } = this.props;
        const { musictracker, competitors } = this.state;

        saveCustomizeGroupsAction(orderBy(musictracker, ['order']), competitors);
        if (competitors.length > 0) getCompetitorsAction(competitors); // get competitors
    };

    onResetColumns = () => {
        const musictracker = getDefaultMTPreferences();
        // update competitors order to default value
        const newCompetitors = this.state.competitors.map(competitor => {
            const spinsCategory = musictracker.find(
                currentCategory => currentCategory.key === 'spins'
            );
            const defaultCompetitor = spinsCategory.items.find(
                currentItem => currentItem.id === competitor.id
            );
            return {
                ...competitor,
                order: defaultCompetitor.order,
                checked: defaultCompetitor.checked,
            };
        });
        this.setState({ musictracker: cloneDeep(musictracker), competitors: newCompetitors });
    };

    onCancel = () => this.props.closeModalAction();

    onChangeSearchForm = value => this.setState({ searchValue: value });

    onColumnGroupClick(id) {
        this.groupRefs[id].scrollIntoView();
        this.activateSection(id);
    }

    onWaypointEnter(id, { previousPosition }) {
        if (previousPosition !== Waypoint.above) return;
        this.activateSection(id, false);
    }

    onWaypointLeave(id, { currentPosition }) {
        if (currentPosition !== Waypoint.above) return;
        this.activateSection(id);
    }

    getAfterSections() {
        const { musictracker } = this.props.preferences;
        const afterSections = {};
        musictracker.forEach(({ key }) => {
            afterSections[key] = false;
        });

        return afterSections;
    }

    getSearchValue() {
        const { searchValue } = this.state;
        return searchValue.trim().length > 0 ? searchValue : false;
    }

    moveItem = (groupId, itemId, fromIndex, toIndex) => {
        const group = this.state.musictracker.find(g => g.id === groupId);
        const moving = group.items.find(g => g.order === fromIndex + 1);
        const movingTo = group.items.find(g => g.order === toIndex + 1);
        const newItems = [
            { ...moving, order: toIndex + 1 },
            { ...movingTo, order: fromIndex + 1 },
        ];
        const newGroup = {
            ...group,
            items: orderBy(
                group.items
                    .filter(item => !newItems.map(i => i.order).includes(item.order))
                    .concat(newItems),
                ['order']
            ),
        };
        const newCompetitors = this.state.competitors.map(competitor => {
            if (competitor.id === moving.id) return { ...competitor, order: toIndex + 1 };
            if (competitor.id === movingTo.id) return { ...competitor, order: fromIndex + 1 };
            return competitor;
        });
        this.setState({
            musictracker: orderBy(
                this.state.musictracker.filter(g => g.order !== newGroup.order).concat(newGroup),
                ['order']
            ),
            competitors: newCompetitors,
        });
    };

    moveGroup = (groupId, fromIndex, toIndex) => {
        const musictracker = orderBy(this.state.musictracker, ['order']);
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
                this.state.musictracker
                    .filter(group => !newGroups.map(g => g.order).includes(group.order))
                    .concat(newGroups),
                ['order']
            ),
        });
    };

    checkUncheckChildItems = (groupItems, checked) =>
        groupItems.map(groupItem => {
            const newItem = groupItem;
            if ('checked' in groupItem && !groupItem.hidden && !groupItem.disabled) {
                newItem.checked = !checked;
            }
            return newItem;
        });

    checkUncheckGroup = (groupId, checked) => {
        const group = this.state.musictracker.find(groupEntry => groupEntry.id === groupId);
        const newGroup = {
            ...group,
            items: this.checkUncheckChildItems(group.items, checked),
        };
        this.setState({
            musictracker: orderBy(
                this.state.musictracker
                    .filter(groupEntry => groupEntry.id !== groupId)
                    .concat(newGroup),
                ['order']
            ),
        });
    };

    checkUncheckItem = (categoryId, itemId) => {
        const group = this.state.musictracker.find(groupEntry => groupEntry.id === categoryId);
        const item = group.items.find(entry => entry.id === itemId);
        const newItem = { ...item, checked: !item.checked };
        const newGroupItems = group.items.map(entry => (entry.id === itemId ? newItem : entry));
        const newGroup = { ...group, items: newGroupItems };
        const newCompetitors = this.state.competitors.map(competitor => {
            if (competitor.id === newItem.id) return { ...competitor, checked: newItem.checked };
            return competitor;
        });
        this.setState({
            musictracker: orderBy(
                this.state.musictracker.filter(change => change.id !== categoryId).concat(newGroup),
                ['order']
            ),
            competitors: newCompetitors,
        });
    };

    toggleCompetitors = (categoryId, competitors) => {
        const spins = this.state.musictracker.find(group => group.key === 'spins');
        const competitorSpins = spins.items.find(item => item.id === 1);
        const defaultCompetitorItems = getDefaultMTPreferences()
            .find(group => group.key === 'spins')
            .items.filter(item => item.labelTemplate);
        // clean competitors array from the competitors that are already in the items array
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
                }));
            })
        );
        const newSpins = {
            ...spins,
            items: orderBy(uniqBy([competitorSpins, ...spinsItems], 'id'), ['order']),
        };
        this.setState({
            musictracker: orderBy(
                this.state.musictracker.filter(group => group.id !== categoryId).concat(newSpins),
                ['order']
            ),
            competitors: competitorSpinsTemplates,
        });
    };

    activateSection(id, state = true) {
        const afterSections = { ...this.getAfterSections(), [id]: state };
        this.setState({ afterSections });
    }

    updateDimensions() {
        if (window.innerHeight < this.minHeightWindow) {
            this.setState({
                heightSideLeft: this.minHeightSideLeft,
                heightSideRight: this.minHeightSideRight,
            });
        } else {
            this.setState({
                heightSideLeft:
                    window.innerHeight - this.marginModal - this.actionsButtons - this.heightModal,
                heightSideRight:
                    window.innerHeight -
                    this.marginModal -
                    this.actionsButtons -
                    this.heightModal -
                    this.heightHeaderSideRight,
            });
        }
    }

    renderCategories() {
        const {
            preferences: { musictracker },
            boardDetails,
        } = this.props;
        const { hasTAA } = boardDetails.filters.applied.options;

        return musictracker.map(group => {
            if (group.key === 'enhanced' && !hasTAA) return null;
            return (
                <CategoryTab
                    key={group.id}
                    active={this.state.afterSections[group.key]}
                    label={group.label}
                    onClick={() => this.onColumnGroupClick(group.key)}
                />
            );
        });
    }

    renderItems() {
        const { boardDetails } = this.props;
        const { musictracker, competitors } = this.state;
        const { hasTAA } = boardDetails.filters.applied.options;
        const selectedCompetitors = uniqBy(competitors, 'value').map(competitor => ({
            value: competitor.value,
            label: competitor.callLetter,
        }));
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
                            onChange={this.onChangeSearchForm}
                            resetColumns={this.onResetColumns}
                        />
                        <div
                            className="customize-table-modal__category-items"
                            style={{ height: `${heightSideRight}px` }}
                        >
                            {this.renderItems()}
                        </div>
                    </div>
                </Modal.Body>
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
