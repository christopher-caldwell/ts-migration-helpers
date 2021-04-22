import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { DropdownButton, Form, FormControl, MenuItem, InputGroup } from 'react-bootstrap';

import TeamModal from './TeamModal';

class UserBoardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'name',
            showModal: false,
            teamSearchType: 'teamName',
            placeHolder: 'Name',
        };
    }

    handleDropDown = searchType => {
        const { boardType } = this.props;

        if (boardType === 'user') {
            let searchBy = 'Name';
            if (searchType === 'email') searchBy = 'Email';
            if (searchType === 'team') searchBy = 'Team';

            return this.setState({ searchType, placeHolder: searchBy });
        }
        let searchBy = 'Name';
        if (searchType === 'permission') searchBy = 'Permission';

        return this.setState({
            teamSearchType: searchType,
            placeHolder: searchBy,
        });
    };

    handleSearchText = event => {
        event.preventDefault();
        const { boardType, returnSearchedUsers, returnSearchedTeams } = this.props;
        const searchText = event.target.value;

        if (boardType === 'user') {
            if (searchText === '') {
                this.setState({ searchText: null });
                return returnSearchedUsers([]);
            }
            return this.setState({ searchText });
        }
        if (searchText === '') {
            this.setState({ searchText: null });
            return returnSearchedTeams([]);
        }
        return this.setState({ searchText });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { boardType, returnSearchedUsers } = this.props;
        const { searchText, searchType, teamSearchType } = this.state;

        if (searchText === null) return returnSearchedUsers([]);

        let searchedItem;
        if (boardType === 'user') {
            const {
                userBoardReducer: { allUsers },
            } = this.props;

            if (searchType === 'name') {
                searchedItem = allUsers.filter(user =>
                    user.fullName.toLowerCase().includes(`${searchText.toLowerCase()}`)
                );
            }
            if (searchType === 'email') {
                searchedItem = allUsers.filter(user =>
                    user.emailAddress.toLowerCase().includes(`${searchText.toLowerCase()}`)
                );
            }
            if (searchType === 'team') {
                searchedItem = allUsers.filter(user => {
                    const didFind = user.teams.filter(team =>
                        team.teamName.toLowerCase().includes(`${searchText.toLowerCase()}`)
                    );

                    return didFind.length > 0;
                });
            }
            return returnSearchedUsers(searchedItem);
        }

        const {
            returnSearchedTeams,
            userBoardReducer: { allTeams },
        } = this.props;

        if (teamSearchType === 'teamName') {
            searchedItem = [...allTeams].filter(team =>
                team.teamName.toLowerCase().includes(`${searchText.toLowerCase()}`)
            );
        }
        if (teamSearchType === 'permission') {
            searchedItem = [...allTeams].filter(team =>
                team.permissions.some(perm => perm.name.toLowerCase().includes(`${searchText.toLowerCase()}`))
            );
        }
        return returnSearchedTeams(searchedItem);
    };

    handleModalClose = () => this.setState({ showModal: false });

    newTeamModal = () => this.setState({ showModal: true });

    render() {
        const { boardType } = this.props;
        const { showModal, placeHolder } = this.state;

        return (
            <div className="admin-board-header">
                <div className="board-title-group">
                    <h3>Account Management</h3>
                </div>
                <div className="board-header-interactive">
                    <Form inline onSubmit={this.handleSubmit}>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-search" />
                            </InputGroup.Addon>
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
                                    <MenuItem key="1" eventKey="teamName">
                                        Name
                                    </MenuItem>,
                                    <MenuItem key="2" eventKey="permission">
                                        Permission
                                    </MenuItem>,
                                ]}
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
