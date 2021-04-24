import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import { fetchAllTeams, fetchAllUsers } from 'stores/userBoard/userBoardActions';
import { sortUsers } from 'utils/SortFunctions';
import UserBoardHeader from './UserBoardHeader';
import UserCard from './UserCard';
import UserModal from './UserModal';

class UserTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedUsers: [],
            showModal: false,
            selectedUser: {},
        };
    }

    componentDidMount = () => this.props.callForUsers();

    handleModalOpen = user => this.setState({ showModal: true, selectedUser: user });

    handleModalClose = () => this.setState({ showModal: false, selectedUser: {} });

    returnSearchedUsers = newSearchedUsers => this.setState({ searchedUsers: newSearchedUsers });

    renderUserCards = () => {
        const {
            userBoardReducer: { allUsers },
        } = this.props;
        const { searchedUsers } = this.state;
        const correctUsers = searchedUsers && searchedUsers.length ? searchedUsers : allUsers;

        return sortUsers(correctUsers).map(user => (
            <UserCard handleModalOpen={this.handleModalOpen} key={user.userId} user={user} />
        ));
    };

    render() {
        const { showModal, selectedUser } = this.state;
        const {
            userBoardReducer: { loading },
        } = this.props;

        if (loading) return <LoadingIndicator />;
        return (
            <div className="permission-container">
                <UserBoardHeader returnSearchedUsers={this.returnSearchedUsers} boardType="user" />
                <h4 className="admin-sub-heading">Users</h4>
                <div id="PanelGroup" className="panel-container">
                    {this.renderUserCards()}
                </div>
                {showModal && (
                    <UserModal
                        handleModalClose={this.handleModalClose}
                        selectedUser={selectedUser}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ userBoardReducer }) => ({ userBoardReducer });
const mapDispatchToProps = dispatch => ({
    callForUsers: () => {
        dispatch(fetchAllUsers());
        dispatch(fetchAllTeams());
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(UserTab);

UserTab.propTypes = {
    callForUsers: PropTypes.func.isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
};
