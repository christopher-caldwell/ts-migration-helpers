// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Modal, Button, Checkbox } from 'react-bootstrap';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import { saveNewTeamsToUser } from 'stores/userBoard/userBoardActions';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleTeamsSave' does not exist on type ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
import { sortTeams } from 'utils/SortFunctions';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanges' does not exist on type 'Read... Remove this comment to see the full error message
class UserModal extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'newTeamsForUser' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleTeamsSave' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
    constructor(props) {
        super(props);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanges' does not exist on type 'Read... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        this.state = { newTeamsForUser: [], hasChanges: false };
    }

    callTeamsSave = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleTeamsSave' does not exist on type ... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
            handleTeamsSave,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
            selectedUser: { teams },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanges' does not exist on type 'Read... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedUserTeam' implicitly has an 'an... Remove this comment to see the full error message
        const { hasChanges, newTeamsForUser } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        const teamsToSubmit = hasChanges ? newTeamsForUser : teams;
        handleTeamsSave(teamsToSubmit);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
        this.setState({ newTeamsForUser: [], hasChanges: false });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
    handleCheckBoxClick = event => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanges' does not exist on type 'Read... Remove this comment to see the full error message
            selectedUser: { teams = [] },
        } = this.props;
        const { hasChanges, newTeamsForUser } = this.state;
        const { checked } = event.target;
        const eventId = parseInt(event.target.id, 10);
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedUserTeam' implicitly has an 'an... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newTeamsForUser' implicitly has an 'any... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        const oldTeams = hasChanges ? newTeamsForUser : teams;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        if (checked) {
            const {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                userBoardReducer: { allTeams },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            } = this.props;
            const newTeamToAdd = allTeams.find(team => team.teamId === eventId);
            return this.setState({
                newTeamsForUser: [...oldTeams, newTeamToAdd],
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
                hasChanges: true,
            });
        }
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const removedTeam = oldTeams.filter(team => team.teamId !== eventId);
        return this.setState({
            newTeamsForUser: removedTeam,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedUser' does not exist on type 'Re... Remove this comment to see the full error message
            hasChanges: true,
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
    };

    renderTeamCheckboxes = () => {
        const {
            selectedUser: { teams = [] },
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
            userBoardReducer: { allTeams, loading },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
        } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newTeamsForUser' implicitly has an 'any... Remove this comment to see the full error message
        const selectedUserTeams = teams.map(team => team.teamId);

        if (loading) return <LoadingIndicator />;
        return sortTeams(allTeams).map(team => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedUserTeam' implicitly has an 'an... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            let checked = false;
            let isRole = false;
            const selectedUserCheck = selectedUserTeams.filter(
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
                selectedUserTeam => selectedUserTeam === team.teamId
            );
            if (selectedUserCheck.length === 1) checked = true;
            if (team.permissions.some(perm => perm.type === 'role')) isRole = true;

            return (
                <Checkbox
                    className="team-checkbox"
                    key={team.teamId}
                    defaultChecked={checked}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
                    disabled={isRole}
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    onChange={this.handleCheckBoxClick}
                    id={team.teamId}
                >
                    {team.teamName}
                </Checkbox>
            );
        });
    };

    render() {
        const {
            handleModalClose,
            selectedUser: { fullName },
        } = this.props;
        return (
            <Modal className="user-admin-modal" show>
                <Modal.Header>
                    <Modal.Title>{`${fullName}'s Teams`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="user-modal-body">{this.renderTeamCheckboxes()}</Modal.Body>
                {/* @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message */}
                <Modal.Footer className="user-modal-footer">
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type. */}
                    <Button onClick={handleModalClose}>Cancel</Button>
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ownProps' implicitly has an 'any' type. */}
                    <Button className="admin-save-button" onClick={this.callTeamsSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = ({ userBoardReducer }) => ({ userBoardReducer });
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleTeamsSave: newTeamsForUser => {
        const {
            selectedUser: { userId },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            handleModalClose,
        } = ownProps;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        dispatch(saveNewTeamsToUser(userId, newTeamsForUser));
        handleModalClose();
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(UserModal);

UserModal.propTypes = {
    handleModalClose: PropTypes.func.isRequired,
    handleTeamsSave: PropTypes.func.isRequired,
    selectedUser: PropTypes.shape().isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
};
