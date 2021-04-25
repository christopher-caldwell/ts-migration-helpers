// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { Modal, FormGroup, FormControl, ControlLabel, Button, Checkbox } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedPermissions' implicitly has an ... Remove this comment to see the full error message
import Select from 'react-select-plus';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import escapeRegexCharacters from 'utils/escapeRegexCharacters';
import request from 'utils/request';
import { createNewTeam, saveNewPermissionsToTeam } from 'stores/userBoard/userBoardActions';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedPermissions' implicitly has an ... Remove this comment to see the full error message
class TeamModal extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            newPermissions: [],
            newTeamName: '',
        };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedPermissions' implicitly has an ... Remove this comment to see the full error message
    onSelectPermissionsChange = selectedPermissions => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
        const {
            selectedTeam: { permissions },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
        const { newPermissions } = this.state;
        const permissionsToChange = newPermissions.length ? [...newPermissions] : [...permissions];
        const asyncTypes = ['station', 'format', 'market', 'artist'];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        const checkedItems = permissionsToChange.filter(perm => !asyncTypes.includes(perm.type));
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
        if (selectedPermissions.length) {
            const newAsyncItems = [...selectedPermissions].map(perm => ({
                id: perm.value,
                name: perm.label,
                type: perm.type,
            }));
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            return this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
                newPermissions: [...checkedItems, ...newAsyncItems],
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
                hasChanged: true,
            });
        }
        if (checkedItems.length) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'createTeam' does not exist on type 'Read... Remove this comment to see the full error message
            return this.setState({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'newTeam' does not exist on type 'Readonl... Remove this comment to see the full error message
                newPermissions: [...checkedItems],
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
                hasChanged: true,
            });
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
        return this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
            newPermissions: [{ type: 'none' }],
            hasChanged: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanged' does not exist on type 'Read... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    };

    setTeamName = event => this.setState({ newTeamName: event.target.value });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
    closeModal = () => {
        const { handleModalClose } = this.props;
        handleModalClose();
        this.setState({
            newTeamName: '',
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
            newPermissions: [],
            hasChanged: false,
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
    handleCheckbox = event => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
            selectedTeam: { permissions },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'createTeam' does not exist on type 'Read... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newTeam' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { newPermissions } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
        const permissionsToChange = newPermissions.length ? [...newPermissions] : [...permissions];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
        const { checked } = event.target;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
        const { value } = event.target;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanged' does not exist on type 'Read... Remove this comment to see the full error message
        if (value === 'allStations') {
            if (checked) {
                const stationObj = {
                    type: 'special',
                    value: 'allStations',
                    name: 'All Stations',
                };
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
                return this.setState({
                    newPermissions: [...permissionsToChange, stationObj],
                    hasChanged: true,
                });
            }
            return this.setState({
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
                newPermissions: [...permissionsToChange].filter(pm => pm.value !== 'allStations'),
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
                hasChanged: true,
            });
        }
        if (checked) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
            const artistObj = {
                type: 'special',
                value: 'allArtists',
                name: 'All Artists',
            };
            return this.setState({
                newPermissions: [...permissionsToChange, artistObj],
                hasChanged: true,
            });
        }
        return this.setState({
            newPermissions: [...permissionsToChange].filter(perm => perm.value !== 'allArtists'),
            hasChanged: true,
        });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'createTeam' does not exist on type 'Read... Remove this comment to see the full error message
    handlePermissionsSave = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'TeamModal'... Remove this comment to see the full error message
        const {
            createTeam,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userBoardReducer' does not exist on type... Remove this comment to see the full error message
            newTeam,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleModalClose' does not exist on type... Remove this comment to see the full error message
            savePermissions,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
            selectedTeam: { teamId, teamName, permissions },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanged' does not exist on type 'Read... Remove this comment to see the full error message
            userBoardReducer: { allTeams },
            handleModalClose,
        } = this.props;
        const { newPermissions, hasChanged, newTeamName } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
        const permsToSubmit = hasChanged ? newPermissions : permissions;
        // getting rid of empty team that should not be submitted
        const setPermissions = [...permsToSubmit].filter(perm => perm.type !== 'none');

        if (newTeam) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
            // creating new team id that is one higher that current highest team id
            const newTeamId =
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
                Math.max.apply(
                    null,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
                    allTeams.map(team => team.teamId)
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasChanged' does not exist on type 'Read... Remove this comment to see the full error message
                ) + 1;
            const team = {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
                teamId: newTeamId,
                permissions: setPermissions,
                teamName: newTeamName,
            };
            createTeam(team);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        }
        if (!newTeam) {
            const setTeamName = newTeamName !== '' ? newTeamName : teamName;
            const team = {
                teamId,
                permissions: setPermissions,
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                teamName: setTeamName,
            };
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            savePermissions(team);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
        }
        this.setState({
            newPermissions: [],
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            newTeamName: '',
            hasChanged: false,
        });
        handleModalClose();
    };

    isChecked = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        const {
            selectedTeam: { permissions },
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'TeamModal'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'perm' implicitly has an 'any' type.
        let hasAllStations = false;
        let hasAllArtists = false;
        if (permissions) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'input' implicitly has an 'any' type.
            hasAllStations = permissions.some(perm => perm.name === 'All Stations');
            hasAllArtists = permissions.some(perm => perm.name === 'All Artists');
        }
        return { hasAllStations, hasAllArtists };
    };

    loadOptions(input, callback) {
        const escapedValue = escapeRegexCharacters(input);
        if (input === '' || escapedValue === '') return callback(null, { options: [] });
        const uriValue = encodeURIComponent(escapedValue);
        const suggestionTypes = ['station', 'format', 'market', 'artist'];

        return request(`/suggest/${uriValue}`).then(results => {
            try {
                const optns = Object.keys(results)
                    .filter(section =>
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
                        suggestionTypes.includes(results[section].type.toLowerCase())
                    )
                    .map(section => ({
                        label:
                            results[section].type.charAt(0).toUpperCase() +
                            results[section].type.slice(1),
                        options: results[section].entities.map(entity => ({
                            label: entity.name,
                            value: entity.id,
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
                            type: results[section].type,
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'newPermissions' does not exist on type '... Remove this comment to see the full error message
                        })),
                    }));
                return callback(null, { options: optns });
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
            } catch (e) {
                console.error(e);
            }
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newTeam' implicitly has an 'any' type.
    selectedPermissions = () => {
        const {
            selectedTeam: { permissions },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
        } = this.props;
        const { newPermissions, hasChanged } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const perms = newPermissions.length || hasChanged ? [...newPermissions] : [...permissions];

        return perms
            .filter(perm => {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedTeam' does not exist on type 'Re... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                if (perm.type === 'role' || perm.type === 'special' || perm.type === 'none') {
                    return false;
                }
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                return true;
            })
            .map(perm => {
                const returnObj = { ...perm, label: perm.name, value: perm.id };
                return returnObj;
            });
    };

    render() {
        const {
            selectedTeam: { teamName },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'TeamModal'... Remove this comment to see the full error message
        } = this.props;
        const { hasAllStations, hasAllArtists } = this.isChecked();

        return (
            <Modal show>
                <Modal.Header>
                    <Modal.Title>Team Permissions</Modal.Title>
                </Modal.Header>
                <Modal.Body className="team-modal-body">
                    <form
                        className="team-modal-form"
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <FormGroup>
                            <ControlLabel>Team Name</ControlLabel>
                            <FormControl
                                type="text"
                                defaultValue={teamName}
                                onChange={this.setTeamName}
                            />
                        </FormGroup>
                        <ControlLabel>Permissions</ControlLabel>
                        <Select.Async
                            cache={false}
                            loadOptions={this.loadOptions}
                            multi
                            noResultsText="No results found"
                            placeholder="Select Permissions"
                            value={this.selectedPermissions()}
                            onChange={this.onSelectPermissionsChange}
                        />
                        <FormGroup>
                            <Checkbox
                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'userBoardReducer' implicitly has ... Remove this comment to see the full error message
                                onChange={this.handleCheckbox}
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dispatch' implicitly has an 'any' type.
                                defaultChecked={hasAllStations}
                                value="allStations"
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'team' implicitly has an 'any' type.
                            >
                                All Stations
                            </Checkbox>
                            <Checkbox
                                onChange={this.handleCheckbox}
                                defaultChecked={hasAllArtists}
                                value="allArtists"
                            >
                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                All Artists
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            </Checkbox>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer className="user-modal-footer">
                    <Button onClick={this.closeModal}>Cancel</Button>
                    <Button className="admin-save-button" onClick={this.handlePermissionsSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = ({ userBoardReducer }) => ({ userBoardReducer });
const mapDispatchToProps = dispatch => ({
    createTeam: newTeam => dispatch(createNewTeam('POST', newTeam)),
    savePermissions: team => dispatch(saveNewPermissionsToTeam('PUT', team)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TeamModal);

TeamModal.propTypes = {
    createTeam: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    newTeam: PropTypes.bool.isRequired,
    savePermissions: PropTypes.func.isRequired,
    selectedTeam: PropTypes.shape().isRequired,
    userBoardReducer: PropTypes.shape().isRequired,
};
