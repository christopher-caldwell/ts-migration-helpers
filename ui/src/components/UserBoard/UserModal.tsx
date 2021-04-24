import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Modal, Button, Checkbox } from 'react-bootstrap';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import { saveNewTeamsToUser } from 'stores/userBoard/userBoardActions';
import { sortTeams } from 'utils/SortFunctions';

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = { newTeamsForUser: [], hasChanges: false };
    }

    callTeamsSave = () => {
        const {
            handleTeamsSave,
            selectedUser: { teams },
        } = this.props;
        const { hasChanges, newTeamsForUser } = this.state;
        const teamsToSubmit = hasChanges ? newTeamsForUser : teams;
        handleTeamsSave(teamsToSubmit);
        this.setState({ newTeamsForUser: [], hasChanges: false });
    };

    handleCheckBoxClick = event => {
        const {
            selectedUser: { teams = [] },
        } = this.props;
        const { hasChanges, newTeamsForUser } = this.state;
        const { checked } = event.target;
        const eventId = parseInt(event.target.id, 10);
        const oldTeams = hasChanges ? newTeamsForUser : teams;

        if (checked) {
            const {
                userBoardReducer: { allTeams },
            } = this.props;
            const newTeamToAdd = allTeams.find(team => team.teamId === eventId);
            return this.setState({
                newTeamsForUser: [...oldTeams, newTeamToAdd],
                hasChanges: true,
            });
        }
        const removedTeam = oldTeams.filter(team => team.teamId !== eventId);
        return this.setState({
            newTeamsForUser: removedTeam,
            hasChanges: true,
        });
    };

    renderTeamCheckboxes = () => {
        const {
            selectedUser: { teams = [] },
            userBoardReducer: { allTeams, loading },
        } = this.props;
        const selectedUserTeams = teams.map(team => team.teamId);

        if (loading) return <LoadingIndicator />;
        return sortTeams(allTeams).map(team => {
            let checked = false;
            let isRole = false;
            const selectedUserCheck = selectedUserTeams.filter(
                selectedUserTeam => selectedUserTeam === team.teamId
            );
            if (selectedUserCheck.length === 1) checked = true;
            if (team.permissions.some(perm => perm.type === 'role')) isRole = true;

            return (
                <Checkbox
                    className="team-checkbox"
                    key={team.teamId}
                    defaultChecked={checked}
                    disabled={isRole}
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
                <Modal.Footer className="user-modal-footer">
                    <Button onClick={handleModalClose}>Cancel</Button>
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
            handleModalClose,
        } = ownProps;

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
