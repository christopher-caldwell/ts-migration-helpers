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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'callForUsers' does not exist on type 'Re... Remove this comment to see the full error message
        super(props);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        this.state = {
            searchedUsers: [],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchedUsers' implicitly has an 'an... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'callForUsers' does not exist on type 'Re... Remove this comment to see the full error message
            showModal: false,
            selectedUser: {},
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        };
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchedUsers' does not exist on type 'R... Remove this comment to see the full error message
    componentDidMount = () => this.props.callForUsers();

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchedUsers' implicitly has an 'an... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
    handleModalOpen = user => this.setState({ showModal: true, selectedUser: user });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ returnSearchedUsers: (newSearchedUsers: an... Remove this comment to see the full error message
    handleModalClose = () => this.setState({ showModal: false, selectedUser: {} });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchedUsers' does not exist on type 'R... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchedUsers' implicitly has an 'an... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
    returnSearchedUsers = newSearchedUsers => this.setState({ searchedUsers: newSearchedUsers });

    renderUserCards = () => {
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            userBoardReducer: { allUsers },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ returnSearchedUsers: (newSearchedUsers: an... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchedUsers' does not exist on type 'R... Remove this comment to see the full error message
        } = this.props;
        const { searchedUsers } = this.state;
        const correctUsers = searchedUsers && searchedUsers.length ? searchedUsers : allUsers;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'user' implicitly has an 'any' type.
        return sortUsers(correctUsers).map(user => (
            <UserCard handleModalOpen={this.handleModalOpen} key={user.userId} user={user} />
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showModal' does not exist on type 'Reado... Remove this comment to see the full error message
        ));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        const { showModal, selectedUser } = this.state;
        const {
            userBoardReducer: { loading },
        } = this.props;

        if (loading) return <LoadingIndicator />;
        return (
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ returnSearchedUsers: (newSearchedUsers: an... Remove this comment to see the full error message
            <div className="permission-container">
                <UserBoardHeader returnSearchedUsers={this.returnSearchedUsers} boardType="user" />
                <h4 className="admin-sub-heading">Users</h4>
                <div id="PanelGroup" className="panel-container">
                    {this.renderUserCards()}
                </div>
                {showModal && (
                    <UserModal
                        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
                        handleModalClose={this.handleModalClose}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(UserTab);

UserTab.propTypes = {
    callForUsers: PropTypes.func.isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
};
