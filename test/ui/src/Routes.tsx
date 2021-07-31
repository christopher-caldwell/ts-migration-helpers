import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { DragDropContext as dragDropContext } from 'react-dnd';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import Html5Backend from 'react-dnd-html5-backend';

import AuthenticatedPage from 'components/AuthenticatedPage';
import HomePage from 'components/HomePage/HomePage';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
import ResultsPage from 'components/ResultsPage';
import BoardView from 'components/BoardPage/BoardView';
import StationConfigs from 'components/BoardPage/Panels/RadioPanels/StationConfigs';
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
import { Router, Route, Switch, Redirect } from 'react-router-dom';
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@okt... Remove this comment to see the full error message
import { Security, SecureRoute } from '@okta/okta-react';
import Login from 'components/LoginPage';
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
import NotFound from 'components/NotFoundPage';
import CustomImplicitCallback from 'components/CustomImplicitCallback';
import HelpPage from 'components/HelpPage';
import { UserTab, TeamTab } from 'components/UserBoard';
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
import MusicPoint from 'components/Director/MusicPoint';
import ProtectedRoute from 'components/ProtectedRoute';
import Navbar from 'components/Navbar';
import MusicTracker from 'components/MusicTracker';

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
import { OKTA_BASE_URL, OKTA_LOGIN_URL, OKTA_CLIENT_ID } from 'environment';
import history from './history';
import { DIRECTOR_ADMINS, DIRECTOR_USERS } from './constants/roles';

const onAuthRequired = () => {
    history.push('/login');
};

const hourRestrictionPath = '/board/radio/:boardId/station-configs/hour-restrictions';

class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route
                    path="/"
                    render={props => (
                        <Security
                            issuer={OKTA_LOGIN_URL}
                            clientId={OKTA_CLIENT_ID}
                            redirectUri={`${window.location.origin}/implicit/callback`}
                            onAuthRequired={onAuthRequired}
                            pkce
                        >
                            <AuthenticatedPage {...props}>
                                {/*
                                 * navbar should be always available after logon on all pages
                                 */}
                                <Route path="/" component={Navbar} />
                                <Switch>
                                    {/*
                                        immediately after logon forward the user to station board
                                         which is the home
                                    */}
                                    <Redirect exact from="/" to="/home" />
                                    <SecureRoute exact path="/home" component={HomePage} />
                                    <SecureRoute exact path="/home/:tabId" component={HomePage} />
                                    <Redirect
                                        exact
                                        from="/board/radio/:boardId/station-configs"
                                        to="/board/radio/:boardId/station-configs/station-packets"
                                    />
                                    <SecureRoute
                                        exact
                                        path="/board/radio/:boardId/new-table"
                                        component={MusicTracker}
                                    />
                                    <SecureRoute
                                        exact
                                        path="/board/radio/:boardId/station-configs/station-packets"
                                        component={StationConfigs}
                                    />
                                    <SecureRoute exact path={hourRestrictionPath} component={StationConfigs} />
                                    <SecureRoute
                                        exact
                                        path="/board/radio/:boardId/station-configs/dayparts"
                                        component={StationConfigs}
                                    />
                                    <Redirect
                                        exact
                                        from="/board/radio/:boardId/station-configs/*"
                                        to="/board/radio/:boardId/station-configs/station-packets"
                                    />
                                    <SecureRoute exact path="/board/radio/:boardId/:tabId" component={BoardView} />
                                    <Redirect
                                        exact
                                        from="/board/radio/:boardId"
                                        to="/board/radio/:boardId/musictracker"
                                    />
                                    <SecureRoute exact path="/results/:tabId/:value" component={ResultsPage} />
                                    <Redirect exact from="/board/users" to="/board/users/user-management" />
                                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ baseUrl: any; }' is not assignable to type... Remove this comment to see the full error message */}
                                    <SecureRoute exact path="/board/users/user-management" component={UserTab} />
                                    <SecureRoute exact path="/board/users/team-management" component={TeamTab} />
                                    <ProtectedRoute
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; component: any; requiredRole... Remove this comment to see the full error message
                                        path="/director/music-point"
                                        component={MusicPoint}
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ baseUrl: any; }' is not assignable to type... Remove this comment to see the full error message
                                        requiredRoles={[DIRECTOR_ADMINS, DIRECTOR_USERS]}
                                    />
                                    <Redirect exact from="/director" to="/director/music-point" />
                                    <ProtectedRoute
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; component: any; requiredRole... Remove this comment to see the full error message
                                        path="/director/music-point/station"
                                        component={MusicPoint}
                                        requiredRoles={[DIRECTOR_ADMINS, DIRECTOR_USERS]}
                                    />
                                    <ProtectedRoute
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; component: any; requiredRole... Remove this comment to see the full error message
                                        path="/director/music-point/reconcile"
                                        component={MusicPoint}
                                        requiredRoles={[DIRECTOR_ADMINS, DIRECTOR_USERS]}
                                    />
                                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ baseUrl: any; }' is not assignable to type... Remove this comment to see the full error message */}
                                    <Route exact path="/login" render={() => <Login baseUrl={OKTA_BASE_URL} />} />
                                    <Route exact path="/implicit/callback" component={CustomImplicitCallback} />
                                    <Route
                                        exact
                                        path="/unauthorized"
                                        render={() => <HelpPage contentType="unauthorized" />}
                                    />
                                    <Route exact path="/help" render={() => <HelpPage contentType="help" />} />
                                    <Redirect exact from="/logout" to="/login" />
                                    <Route exact path="/not-found" component={NotFound} />
                                    <Redirect from="/" to="/not-found" />
                                </Switch>
                            </AuthenticatedPage>
                        </Security>
                    )}
                />
            </Router>
        );
    }
}

export default dragDropContext(Html5Backend)(Routes); // TODO: remove drag/drop library, make Routes a function
