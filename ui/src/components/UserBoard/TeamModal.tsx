import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Modal, FormGroup, FormControl, ControlLabel, Button, Checkbox } from 'react-bootstrap';
import Select from 'react-select-plus';

import escapeRegexCharacters from 'utils/escapeRegexCharacters';
import request from 'utils/request';
import { createNewTeam, saveNewPermissionsToTeam } from 'stores/userBoard/userBoardActions';

class TeamModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false,
            newPermissions: [],
            newTeamName: '',
        };
    }

    onSelectPermissionsChange = selectedPermissions => {
        const {
            selectedTeam: { permissions },
        } = this.props;
        const { newPermissions } = this.state;
        const permissionsToChange = newPermissions.length ? [...newPermissions] : [...permissions];
        const asyncTypes = ['station', 'format', 'market', 'artist'];
        const checkedItems = permissionsToChange.filter(perm => !asyncTypes.includes(perm.type));
        if (selectedPermissions.length) {
            const newAsyncItems = [...selectedPermissions].map(perm => ({
                id: perm.value,
                name: perm.label,
                type: perm.type,
            }));
            return this.setState({
                newPermissions: [...checkedItems, ...newAsyncItems],
                hasChanged: true,
            });
        }
        if (checkedItems.length) {
            return this.setState({
                newPermissions: [...checkedItems],
                hasChanged: true,
            });
        }
        return this.setState({
            newPermissions: [{ type: 'none' }],
            hasChanged: true,
        });
    };

    setTeamName = event => this.setState({ newTeamName: event.target.value });

    closeModal = () => {
        const { handleModalClose } = this.props;
        handleModalClose();
        this.setState({
            newTeamName: '',
            newPermissions: [],
            hasChanged: false,
        });
    };

    handleCheckbox = event => {
        const {
            selectedTeam: { permissions },
        } = this.props;
        const { newPermissions } = this.state;
        const permissionsToChange = newPermissions.length ? [...newPermissions] : [...permissions];
        const { checked } = event.target;
        const { value } = event.target;

        if (value === 'allStations') {
            if (checked) {
                const stationObj = {
                    type: 'special',
                    value: 'allStations',
                    name: 'All Stations',
                };
                return this.setState({
                    newPermissions: [...permissionsToChange, stationObj],
                    hasChanged: true,
                });
            }
            return this.setState({
                newPermissions: [...permissionsToChange].filter(pm => pm.value !== 'allStations'),
                hasChanged: true,
            });
        }
        if (checked) {
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

    handlePermissionsSave = () => {
        const {
            createTeam,
            newTeam,
            savePermissions,
            selectedTeam: { teamId, teamName, permissions },
            userBoardReducer: { allTeams },
            handleModalClose,
        } = this.props;
        const { newPermissions, hasChanged, newTeamName } = this.state;
        const permsToSubmit = hasChanged ? newPermissions : permissions;
        // getting rid of empty team that should not be submitted
        const setPermissions = [...permsToSubmit].filter(perm => perm.type !== 'none');

        if (newTeam) {
            // creating new team id that is one higher that current highest team id
            const newTeamId =
                Math.max.apply(
                    null,
                    allTeams.map(team => team.teamId)
                ) + 1;
            const team = {
                teamId: newTeamId,
                permissions: setPermissions,
                teamName: newTeamName,
            };
            createTeam(team);
        }
        if (!newTeam) {
            const setTeamName = newTeamName !== '' ? newTeamName : teamName;
            const team = {
                teamId,
                permissions: setPermissions,
                teamName: setTeamName,
            };
            savePermissions(team);
        }
        this.setState({
            newPermissions: [],
            newTeamName: '',
            hasChanged: false,
        });
        handleModalClose();
    };

    isChecked = () => {
        const {
            selectedTeam: { permissions },
        } = this.props;
        let hasAllStations = false;
        let hasAllArtists = false;
        if (permissions) {
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
                        suggestionTypes.includes(results[section].type.toLowerCase())
                    )
                    .map(section => ({
                        label:
                            results[section].type.charAt(0).toUpperCase() +
                            results[section].type.slice(1),
                        options: results[section].entities.map(entity => ({
                            label: entity.name,
                            value: entity.id,
                            type: results[section].type,
                        })),
                    }));
                return callback(null, { options: optns });
            } catch (e) {
                console.error(e);
            }
        });
    }

    selectedPermissions = () => {
        const {
            selectedTeam: { permissions },
        } = this.props;
        const { newPermissions, hasChanged } = this.state;
        const perms = newPermissions.length || hasChanged ? [...newPermissions] : [...permissions];

        return perms
            .filter(perm => {
                if (perm.type === 'role' || perm.type === 'special' || perm.type === 'none') {
                    return false;
                }
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
                                onChange={this.handleCheckbox}
                                defaultChecked={hasAllStations}
                                value="allStations"
                            >
                                All Stations
                            </Checkbox>
                            <Checkbox
                                onChange={this.handleCheckbox}
                                defaultChecked={hasAllArtists}
                                value="allArtists"
                            >
                                All Artists
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
