import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { DropdownButton, Form, FormControl, MenuItem, InputGroup } from 'react-bootstrap';

import TeamModal from './TeamModal';

class UserBoardHeader extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.state = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchType' implicitly has an 'any' typ... Remove this comment to see the full error message
            searchText: '',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
            searchType: 'name',
            showModal: false,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchType' implicitly has an 'any' typ... Remove this comment to see the full error message
            teamSearchType: 'teamName',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
            placeHolder: 'Name',
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchType' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedUsers' does not exist on t... Remove this comment to see the full error message
    handleDropDown = searchType => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
        const { boardType } = this.props;

        if (boardType === 'user') {
            let searchBy = 'Name';
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            if (searchType === 'email') searchBy = 'Email';
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedUsers' does not exist on t... Remove this comment to see the full error message
            if (searchType === 'team') searchBy = 'Team';

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedTeams' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            return this.setState({ searchType, placeHolder: searchBy });
        }
        let searchBy = 'Name';
        if (searchType === 'permission') searchBy = 'Permission';

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        return this.setState({
            teamSearchType: searchType,
            placeHolder: searchBy,
        });
    };

    handleSearchText = event => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        event.preventDefault();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
        const { boardType, returnSearchedUsers, returnSearchedTeams } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedTeams' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedTeams' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        const searchText = event.target.value;

        if (boardType === 'user') {
            if (searchText === '') {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
                this.setState({ searchText: null });
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
                return returnSearchedUsers([]);
            }
            return this.setState({ searchText });
        }
        if (searchText === '') {
            this.setState({ searchText: null });
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
            return returnSearchedTeams([]);
        }
        return this.setState({ searchText });
    };

    handleSubmit = event => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        event.preventDefault();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
        const { boardType, returnSearchedUsers } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedTeams' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchText' does not exist on type 'Read... Remove this comment to see the full error message
        const { searchText, searchType, teamSearchType } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'teamSearchType' does not exist on type '... Remove this comment to see the full error message
        if (searchText === null) return returnSearchedUsers([]);

        let searchedItem;
        if (boardType === 'user') {
            const {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
                userBoardReducer: { allUsers },
            } = this.props;

            if (searchType === 'name') {
                searchedItem = allUsers.filter(user =>
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
                    user.fullName.toLowerCase().includes(`${searchText.toLowerCase()}`)
                );
            }
            if (searchType === 'email') {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
                searchedItem = allUsers.filter(user =>
                    user.emailAddress.toLowerCase().includes(`${searchText.toLowerCase()}`)
                );
            }
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleModalClose: () => void; selectedTeam... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
            if (searchType === 'team') {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
                searchedItem = allUsers.filter(user => {
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
                    const didFind = user.teams.filter(team =>
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                        team.teamName.toLowerCase().includes(`${searchText.toLowerCase()}`)
                    );

                    return didFind.length > 0;
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'returnSearchedTeams' does not exist on t... Remove this comment to see the full error message
                });
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            }
            return returnSearchedUsers(searchedItem);
        }

        const {
            returnSearchedTeams,
            userBoardReducer: { allTeams },
        } = this.props;

        if (teamSearchType === 'teamName') {
            searchedItem = [...allTeams].filter(team =>
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
                team.teamName.toLowerCase().includes(`${searchText.toLowerCase()}`)
            );
        }
        if (teamSearchType === 'permission') {
            searchedItem = [...allTeams].filter(team =>
                team.permissions.some(perm => perm.name.toLowerCase().includes(`${searchText.toLowerCase()}`))
            );
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardType' does not exist on type 'Reado... Remove this comment to see the full error message
        return returnSearchedTeams(searchedItem);
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
    handleModalClose = () => this.setState({ showModal: false });

    newTeamModal = () => this.setState({ showModal: true });

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleModalClose: () => void; selectedTeam... Remove this comment to see the full error message
    render() {
        const { boardType } = this.props;
        const { showModal, placeHolder } = this.state;

        return (
            <div className="admin-board-header">
                <div className="board-title-group">
                    <h3>Account Management</h3>
                </div>
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message */}
                <div className="board-header-interactive">
                    <Form inline onSubmit={this.handleSubmit}>
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                        <InputGroup>
                            <InputGroup.Addon>
                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                <i className="fa fa-search" />
                            </InputGroup.Addon>
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                            <FormControl
                                type="text"
                                placeholder={placeHolder}
                                bsSize="small"
                                onChange={this.handleSearchText}
                            />
                        </InputGroup>
                        <DropdownButton
                            title={`Filter by: ${placeHolder}`}
                            bsSize="small"
                            id="dropdown-button"
                            onSelect={this.handleDropDown}
                        >
                            {boardType === 'user'
                                ? [
                                    <MenuItem key="1" eventKey="name">
                                        Name
                                    </MenuItem>,
                                    <MenuItem key="2" eventKey="email">
                                        Email
                                    </MenuItem>,
                                    <MenuItem key="3" eventKey="team">
                                        Team
                                    </MenuItem>,
                                ]
                                : [
                                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleModalClose: () => void; selectedTeam... Remove this comment to see the full error message
                                    <MenuItem key="1" eventKey="teamName">
                                        Name
                                    </MenuItem>,
                                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
                                    <MenuItem key="2" eventKey="permission">
                                        Permission
                                    </MenuItem>,
                                ]}
                        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                        </DropdownButton>
                    </Form>
                    {boardType === 'team' ? (
                        <button type="button" className="btn btn-primary" onClick={this.newTeamModal}>
                            + New Team
                        </button>
                    ) : (
                        ''
                    )}
                    {showModal && (
                        <TeamModal
                            handleModalClose={this.handleModalClose}
                            selectedTeam={{ permissions: [], teamName: '' }}
                            newTeam
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ userBoardReducer }) => ({ userBoardReducer });
export default connect(mapStateToProps)(UserBoardHeader);

UserBoardHeader.propTypes = {
    boardType: PropTypes.string.isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
    returnSearchedTeams: PropTypes.func,
    returnSearchedUsers: PropTypes.func,
};

UserBoardHeader.defaultProps = {
    returnSearchedTeams: () => {},
    returnSearchedUsers: () => {},
};
