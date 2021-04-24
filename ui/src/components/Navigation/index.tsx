import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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
    'playlist-overview': navMusicTrackerAndOverview,
};

const usersNav = [
    {
        description: 'User Management',
        tab: 'user-management',
    },
    {
        description: 'Team Management',
        tab: 'team-management',
    },
];

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryGoalsOpened: false,
        };
    }

    onSelectRadioTab = (hrefActive, boardId, tabId) => {
        const { fetchBoardAction, dateIntegrity } = this.props;
        const { categoryGoalsOpened } = this.state;
        const current = window.location.pathname;

        if (categoryGoalsOpened || current.includes(tabId)) {
            this.closeCategoryGoals();
        }

        if (current.includes(tabId)) return;

        const savedDate = dateIntegrity;
        const boardDetails = {
            boardType: 'RadioBoard',
            tabId: tabId === 'categories' ? 'musictracker' : tabId,
            boardId,
            typeKey: 'radio',
        };
        const inputs = {
            savedDate,
            resetDateIntegrity: false,
            isDateOrTabChanged: savedDate.persist,
        };
        // this retrives the required board info for selected board
        // such as radio, artist, user etc and store them in redux.
        history.push(hrefActive);
        // if we are navigating between categories and musictracker, no need to fetch panel
        if (tabId === 'musictracker' && current.includes('categories')) return;
        if (tabId === 'categories' && current.includes('musictracker')) return;
        if (tabId === 'station-configs' || tabId === 'category-goals') return;
        if (tabId === 'new-table') return;
        fetchBoardAction(boardDetails, inputs);
    };

    onSelectTab = hrefActive => {
        const current = window.location.pathname;
        if (current === hrefActive) return;
        history.push(hrefActive);
    };

    checkActiveSubTabs = (href, url, subTabs) =>
        subTabs.some(currentTab => url === `${href}/${currentTab}`);

    openCategoryGoals = () => {
        this.setState({ categoryGoalsOpened: true });
    };

    closeCategoryGoals = () => {
        this.setState({ categoryGoalsOpened: false });
    };

    renderRadioItems = () => {
        const { layout, featureToggle, boardFetching } = this.props;
        const { categoryGoalsOpened } = this.state;
        if (!layout || !layout.board) return null;
        const { board, activeId } = layout;
        const tabMap = { RadioBoard: 'radio' };

        if (boardFetching && categoryGoalsOpened) {
            this.closeCategoryGoals();
        }

        const filteredNavItems = board.config.layout.find(panel => panel.id === 'musictracker')
            ? navItemsToAppend
            : { musictracker: [], 'playlist-overview': [] };
        const navbarItems =
            typeof filteredNavItems[activeId] !== 'undefined'
                ? board.config.layout.concat(filteredNavItems[activeId])
                : board.config.layout;
        if (window.location.pathname === '/') return null;

        // Feature Toggle for Station Configs page
        const isStationConfigsEnabled =
            isFeatureActive(featureToggle, FEATURES.STATION_CONFIGS) &&
            (isFeatureActive(featureToggle, FEATURES.PACKET_SONG) ||
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
            const { name, id, subTabs } = item;
            const href = `/board/${tabMap[board.type]}/${board.id}/${id}`;
            let isActive = window.location.pathname === href && !categoryGoalsOpened;

            if (!isActive && subTabs && !categoryGoalsOpened) {
                isActive = this.checkActiveSubTabs(href, window.location.pathname, subTabs);
            }

            if (id === 'category-goals') {
                return (
                    <NavItem
                        eventKey={href}
                        key={href}
                        id={href}
                        active={categoryGoalsOpened}
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
        const hrefMusicPoint = '/director/music-point';
        const hrefMusicPointStation = '/director/music-point/station';
        const hrefMusicPointReconcile = '/director/music-point/reconcile';

        const musicPointRoutes = [hrefMusicPoint, hrefMusicPointStation, hrefMusicPointReconcile];

        const musicPointIsActive = musicPointRoutes.includes(window.location.pathname);

        return [
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
                                    {categoryGoalsOpened ? (
                                        <CategoryGoals
                                            closeCategoryGoals={this.closeCategoryGoals}
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
