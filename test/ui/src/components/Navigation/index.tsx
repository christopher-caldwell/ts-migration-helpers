import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import { SecureRoute } from '@okta/okta-react';

import PropTypes from 'prop-types';
import { Nav, NavItem } from 'react-bootstrap';
import remove from 'lodash/remove';
import isFeatureActive from 'utils/featureToggle';
import { FEATURES } from 'utils/constants';
import { fetchBoard } from 'stores/boardDetails/boardDetailsActions';
import CategoryGoals from 'components/CategoryGoals';
import history from '../../history'; // prettier places relative paths at bottom

const navMusicTrackerAndOverview = [
    {
        name: 'Categories',
        id: 'categories',
    },
    {
        name: 'Station Configs',
        id: 'station-configs',
        subTabs: ['hour-restrictions', 'station-packets', 'dayparts'],
    },
    {
        name: 'Category Goals',
        id: 'category-goals',
    },
    {
        name: 'New Table',
        id: 'new-table',
    },
];

const navItemsToAppend = {
    musictracker: navMusicTrackerAndOverview,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    'playlist-overview': navMusicTrackerAndOverview,
};

const usersNav = [
    {
        description: 'User Management',
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hrefActive' implicitly has an 'any' typ... Remove this comment to see the full error message
        tab: 'user-management',
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardId' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
    {
        description: 'Team Management',
        tab: 'team-management',
    },
];

class Navigation extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hrefActive' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
    constructor(props) {
        super(props);

        this.state = {
            categoryGoalsOpened: false,
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hrefActive' implicitly has an 'any' typ... Remove this comment to see the full error message
    onSelectRadioTab = (hrefActive, boardId, tabId) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchBoardAction' does not exist on type... Remove this comment to see the full error message
        const { fetchBoardAction, dateIntegrity } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hrefActive' implicitly has an 'any' typ... Remove this comment to see the full error message
        const { categoryGoalsOpened } = this.state;
        const current = window.location.pathname;

        if (categoryGoalsOpened || current.includes(tabId)) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
            this.closeCategoryGoals();
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentTab' implicitly has an 'any' typ... Remove this comment to see the full error message
        if (current.includes(tabId)) return;

        const savedDate = dateIntegrity;
        const boardDetails = {
            boardType: 'RadioBoard',
            tabId: tabId === 'categories' ? 'musictracker' : tabId,
            boardId,
            typeKey: 'radio',
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type 'Readonly... Remove this comment to see the full error message
        const inputs = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureToggle' does not exist on type 'R... Remove this comment to see the full error message
            savedDate,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hrefActive' implicitly has an 'any' typ... Remove this comment to see the full error message
            resetDateIntegrity: false,
            isDateOrTabChanged: savedDate.persist,
        };
        // this retrives the required board info for selected board
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'panel' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
        // such as radio, artist, user etc and store them in redux.
        history.push(hrefActive);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // if we are navigating between categories and musictracker, no need to fetch panel
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (tabId === 'musictracker' && current.includes('categories')) return;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type 'Readonly... Remove this comment to see the full error message
        if (tabId === 'categories' && current.includes('musictracker')) return;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureToggle' does not exist on type 'R... Remove this comment to see the full error message
        if (tabId === 'station-configs' || tabId === 'category-goals') return;
        if (tabId === 'new-table') return;
        fetchBoardAction(boardDetails, inputs);
    };

    onSelectTab = hrefActive => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hrefActive' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'panel' implicitly has an 'any' type.
        const current = window.location.pathname;
        if (current === hrefActive) return;
        history.push(hrefActive);
    };

    checkActiveSubTabs = (href, url, subTabs) =>
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        subTabs.some(currentTab => url === `${href}/${currentTab}`);

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentTab' implicitly has an 'any' typ... Remove this comment to see the full error message
    openCategoryGoals = () => {
        this.setState({ categoryGoalsOpened: true });
    };

    closeCategoryGoals = () => {
        this.setState({ categoryGoalsOpened: false });
    };

    renderRadioItems = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'layout' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { layout, featureToggle, boardFetching } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureToggle' does not exist on type 'R... Remove this comment to see the full error message
        const { categoryGoalsOpened } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
        if (!layout || !layout.board) return null;
        const { board, activeId } = layout;
        const tabMap = { RadioBoard: 'radio' };

        if (boardFetching && categoryGoalsOpened) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            this.closeCategoryGoals();
        }

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const filteredNavItems = board.config.layout.find(panel => panel.id === 'musictracker')
            ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'panel' implicitly has an 'any' type.
              navItemsToAppend
            : { musictracker: [], 'playlist-overview': [] };
        const navbarItems =
            typeof filteredNavItems[activeId] !== 'undefined'
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                ? board.config.layout.concat(filteredNavItems[activeId])
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                : board.config.layout;
        if (window.location.pathname === '/') return null;

        // Feature Toggle for Station Configs page
        const isStationConfigsEnabled =
            isFeatureActive(featureToggle, FEATURES.STATION_CONFIGS) &&
            (isFeatureActive(featureToggle, FEATURES.PACKET_SONG) ||
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
                isFeatureActive(featureToggle, FEATURES.HOUR_RESTRICTION) ||
                isFeatureActive(featureToggle, FEATURES.DAYPARTS));

        if (!isStationConfigsEnabled) {
            remove(navbarItems, {
                name: 'Station Configs',
            });
        }

        // Feature Toggle for Category Goals page
        const isCategoryGoalsEnabled = isFeatureActive(featureToggle, FEATURES.CATEGORY_GOALS);

        if (!isCategoryGoalsEnabled) {
            remove(navbarItems, {
                name: 'Category Goals',
            });
        }

        // Feature Toggle for New Table page
        const isNewTableEnabled = isFeatureActive(featureToggle, FEATURES.NEW_TABLE);
        if (!isNewTableEnabled) {
            remove(navbarItems, {
                name: 'New Table',
            });
        }

        return navbarItems.map(item => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            const { name, id, subTabs } = item;
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const href = `/board/${tabMap[board.type]}/${board.id}/${id}`;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            let isActive = window.location.pathname === href && !categoryGoalsOpened;

            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            if (!isActive && subTabs && !categoryGoalsOpened) {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                isActive = this.checkActiveSubTabs(href, window.location.pathname, subTabs);
            }

            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            if (id === 'category-goals') {
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                return (
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'featureToggle' implicitly has an ... Remove this comment to see the full error message
                    <NavItem
                        eventKey={href}
                        key={href}
                        id={href}
                        active={categoryGoalsOpened}
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
                        onClick={() => this.openCategoryGoals()}
                        disabled={boardFetching}
                    >
                        {name}
                    </NavItem>
                );
            }

            return (
                <NavItem
                    eventKey={href}
                    active={isActive}
                    id={href}
                    onClick={() => this.onSelectRadioTab(href, board.id, id)}
                    key={href}
                    disabled={boardFetching}
                >
                    {name}
                </NavItem>
            );
        });
    };

    renderUserItems = () =>
        usersNav.map(navItem => {
            const href = `/board/users/${navItem.tab}`;
            return (
                <NavItem
                    eventKey={href}
                    active={window.location.pathname === href}
                    id={href}
                    onClick={() => this.onSelectTab(href)}
                    key={href}
                >
                    {navItem.description}
                </NavItem>
            );
        });

    renderDirectorItems = () => {
        const directorKey = 'director';
        const musicPointKey = 'musicpoint';
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const hrefMusicPoint = '/director/music-point';
        const hrefMusicPointStation = '/director/music-point/station';
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const hrefMusicPointReconcile = '/director/music-point/reconcile';

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const musicPointRoutes = [hrefMusicPoint, hrefMusicPointStation, hrefMusicPointReconcile];

        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
        const musicPointIsActive = musicPointRoutes.includes(window.location.pathname);

        return [
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryGoalsOpened' does not exist on t... Remove this comment to see the full error message
            <NavItem id={directorKey} key={directorKey} disabled className="navbar-director">
                Director
            </NavItem>,
            <NavItem
                eventKey={hrefMusicPoint}
                active={musicPointIsActive}
                id={musicPointKey}
                onClick={() => this.onSelectTab(hrefMusicPoint)}
                key={musicPointKey}
            >
                Music Point
            </NavItem>,
        ];
    };

    render() {
        const props = {
            className: 'navigation-header',
            id: 'navigation-header',
        };
        const { categoryGoalsOpened } = this.state;
        return (
            <div>
                <Switch>
                    <SecureRoute
                        path="/board/radio"
                        render={() => {
                            return (
                                <>
                                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                    {categoryGoalsOpened ? (
                                        <CategoryGoals
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            closeCategoryGoals={this.closeCategoryGoals}
                                        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dateIntegrity' implicitly has an ... Remove this comment to see the full error message
                                        />
                                    ) : null}
                                    <Nav {...props}>{this.renderRadioItems()}</Nav>
                                </>
                            );
                        }}
                    />
                    <SecureRoute
                        path="/board/users"
                        render={() => <Nav {...props}>{this.renderUserItems()}</Nav>}
                    />
                    <SecureRoute
                        path="/director"
                        render={() => <Nav {...props}>{this.renderDirectorItems()}</Nav>}
                    />
                    <Route component={() => <div />} />
                </Switch>
            </div>
        );
    }
}

Navigation.propTypes = {
    boardFetching: PropTypes.bool.isRequired,
    dateIntegrity: PropTypes.shape().isRequired,
    featureToggle: PropTypes.shape().isRequired,
    fetchBoardAction: PropTypes.func.isRequired,
    layout: PropTypes.shape().isRequired,
};

const mapStateToProps = ({ boardDetails, dateIntegrity, featureToggle }) => {
    const { layout, fetching: boardFetching } = boardDetails;
    return {
        layout,
        dateIntegrity,
        featureToggle,
        boardFetching,
    };
};

const mapDispatchToProps = { fetchBoardAction: fetchBoard };

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
