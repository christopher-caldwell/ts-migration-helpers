import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual, unionBy, remove } from 'lodash';
import classNames from 'classnames';
import CustomModal from 'components/CustomModal';
import { createHourRestrictions, updateHourRestrictions, } from 'stores/restrictions/restrictionsActions';
import { OverlayTrigger } from 'react-bootstrap';
import CustomTooltip from 'components/CustomTooltip';
import TextButton from 'components/Buttons/TextButton';
import AsideModal from 'components/AsideModal';
import AsideModalPanels from 'components/AsideModal/Panels';
import { FEATURE_TITLE, FEATURES } from 'utils/constants';
import getSyncStatus from 'components/BoardPage/Panels/RadioPanels/StationConfigs/utils';
import RestrictionTable from '../Components/RestrictionTable';
class ConfigRestrictions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openRestrictionModal: false,
            restrictionTemplate: this.newTemplate(),
            restrictionTemplateError: false,
            editSongsRestrictionOpened: false,
            restrictionToEdit: null,
        };
        (this as any).RESTRICTION_NAME_REQUIRED = `To create a new hour restriction,
            please name the hour restriction and select at least one hour for the restriction.`;
        (this as any).SYNCHRONIZED_CAN_EDIT = 'Only restrictions synchronized with GSelector can be edited.';
    }
    newTemplate = () => ({ stationId: '', name: '', restrictionHour: [] });
    handleRestrictionName = e => {
        const { value } = e.target;
        const { restrictions } = this.props;
        const { restrictionTemplate } = this.state;
        const restrictionNameExists = value !== '' && restrictions.some(restriction => restriction.name === value);
        this.setState({
            restrictionTemplateError: restrictionNameExists,
            restrictionTemplate: {
                ...restrictionTemplate,
                name: value,
            },
        });
    };
    handleOpenModal = restriction => {
        if (restriction) {
            this.setState({
                openRestrictionModal: true,
                restrictionTemplate: restriction,
            });
        }
        this.setState({ openRestrictionModal: true });
    };
    handleCloseModal = () => {
        this.setState({
            openRestrictionModal: false,
            restrictionTemplate: this.newTemplate(),
            restrictionTemplateError: false,
        });
    };
    handleSaveRestriction = action => {
        const { restrictionTemplate, restrictionTemplateError } = this.state;
        const { boardId, createHourRestrictionsAction, updateHourRestrictionsAction } = this.props;
        if (!restrictionTemplateError) {
            const payload = {
                ...restrictionTemplate,
                stationId: boardId,
                restrictionHour: restrictionTemplate.restrictionHour.map(i => i.hour),
            };
            if (action === 'create') {
                createHourRestrictionsAction(payload);
            }
            else {
                updateHourRestrictionsAction(payload);
            }
            this.handleCloseModal();
        }
    };
    handleRestriction = item => {
        const { restrictions } = this.props;
        const { restrictionTemplate } = this.state;
        const newRestriction = { ...restrictionTemplate };
        const restrictionToBeUpdated = restrictions.find(restriction => restriction.id === restrictionTemplate.id);
        const hourToBeUpdated = restrictionToBeUpdated
            ?              restrictionToBeUpdated.restrictionHour.find(hour => hour.hour === item.hour)
            : false;
        // select a hour to restrict
        if (!item.selected) {
            if (hourToBeUpdated) {
                newRestriction.restrictionHour = [
                    ...newRestriction.restrictionHour,
                    hourToBeUpdated,
                ];
            }
            else {
                newRestriction.restrictionHour = [...newRestriction.restrictionHour, item];
            }
        }
        else {
            // unselect a hour to restrict
            newRestriction.restrictionHour = newRestriction.restrictionHour.filter(i => i.hour !== item.hour);
        }
        // Reorder the restrictionHour array to have the same order as the original array
        // It is necessary to enable and disable the save button properly
        newRestriction.restrictionHour.sort((a, b) => a.hour - b.hour);
        return this.setState({ restrictionTemplate: newRestriction });
    };
    buildCustomTooltip = (title, message, type) => (<CustomTooltip type={type || 'warning'} title={title} message={message} left={5}/>);
    stagedData = restrictionId => {
        const { stagedRestrictions, restrictionsChanges } = this.props;
        const templateChanges = stagedRestrictions.some(song => song.id === restrictionId);
        if (templateChanges) {
            return templateChanges;
        }
        return restrictionsChanges.some(song => song.getChanges.actualChanges.restriction_id === restrictionId ||
            song.getChanges.previousChanges.restriction_id === restrictionId ||
            (!song.getChanges.actualChanges.restriction_id &&
                Object.prototype.hasOwnProperty.call(song.getChanges.actualChanges, 'restriction_id') &&
                song.getChanges.previousChanges.restriction_id === restrictionId));
    };
    buildHourRestrictionsElement = () => {
        const { restrictions, stagedRestrictions } = this.props;
        if (restrictions < 1) {
            return <p className="station-configs--no-data-found">No data found.</p>;
        }
        const hourRestrictionElement = restrictions.map(hourRestriction => {
            const restrictionId = hourRestriction.id;
            const restrictionName = hourRestriction.name;
            const restrictionSynchronized = hourRestriction.synchronized;
            const syncStatusData = getSyncStatus(restrictionSynchronized, this.stagedData(restrictionId));
            const restrictionSongs = hourRestriction.songs.map(song => song.sNm).join(', ');
            const key = `
                station-configs-restrictions-
                ${hourRestriction.hourRestriction}
                -
                ${hourRestriction.name}`;
            let restrictionObj = stagedRestrictions.find(currentItem => currentItem.id === hourRestriction.id);
            if (!restrictionObj) {
                restrictionObj = hourRestriction;
            }
            return (<tr key={key}>
                    <td className="station-configs-restrictions__table-column--name">
                        <OverlayTrigger overlay={this.buildCustomTooltip(syncStatusData.title, syncStatusData.message, syncStatusData.type)} placement="right">
                            <span className={`
                                    station-configs__status
                                    station-configs__status--${syncStatusData.status}
                                `}/>
                        </OverlayTrigger>
                        {restrictionName}
                    </td>
                    <td className="station-configs-restrictions__table-column--songs">
                        <span title={restrictionSongs}>{restrictionSongs}</span>
                    </td>
                    <td className="station-configs-restrictions__table-column--actions">
                        {!restrictionSynchronized && (<OverlayTrigger overlay={this.buildCustomTooltip('WARNING', (this as any).SYNCHRONIZED_CAN_EDIT)} placement="left">
                                <p className="btn-text--disabled">Edit</p>
                            </OverlayTrigger>)}
                        {restrictionSynchronized && (<TextButton onClick={() => this.handleOpenModal(restrictionObj)} text="Edit"/>)}
                    </td>
                    <td className="station-configs-restrictions__table-column--actions">
                        {!restrictionSynchronized && (<OverlayTrigger overlay={this.buildCustomTooltip('WARNING', (this as any).SYNCHRONIZED_CAN_EDIT)} placement="left">
                                <p className="btn-text--disabled">Edit</p>
                            </OverlayTrigger>)}
                        {restrictionSynchronized && (<TextButton onClick={() => this.openEditSongsRestriction(hourRestriction)} text="Edit"/>)}
                    </td>
                </tr>);
        });
        return (<div className="station-configs__table-container">
                <table className="ml-table station-configs__table">
                    <thead>
                        <tr>
                            <th className="station-configs-restrictions__table-column--name">
                                Restriction Name
                            </th>
                            <th className="station-configs-restrictions__table-column--songs">
                                Restriction Songs
                            </th>
                            <th className="station-configs-restrictions__table-column--actions">
                                Hours
                            </th>
                            <th className="station-configs-restrictions__table-column--actions">
                                Songs
                            </th>
                        </tr>
                    </thead>
                    <tbody>{hourRestrictionElement}</tbody>
                </table>
            </div>);
    };
    openEditSongsRestriction = restriction => {
        this.setState({
            editSongsRestrictionOpened: true,
            restrictionToEdit: restriction,
        });
    };
    handleCloseAsideModal = () => {
        this.setState({
            editSongsRestrictionOpened: false,
            restrictionToEdit: null,
        });
    };
    buildAsideModal = () => {
        const { editSongsRestrictionOpened, restrictionToEdit } = this.state;
        const { versions, stationCategoriesPermissions } = this.props;
        return (<AsideModal title={FEATURE_TITLE.HOUR_RESTRICTION} asideModalOpened={editSongsRestrictionOpened} handleClose={this.handleCloseAsideModal}>
                <AsideModalPanels featureName={FEATURES.HOUR_RESTRICTION} restriction={restrictionToEdit} handleClose={this.handleCloseAsideModal} versions={versions} permissions={stationCategoriesPermissions}/>
            </AsideModal>);
    };
    handleMultiselectHours = (firstChild, isRow = false) => {
        const { restrictionTemplate } = this.state;
        const newRestriction = { ...restrictionTemplate };
        const hours = isRow
            ? Array.from({ length: 7 }, (v, i) => 24 * i + firstChild)
            : Array.from({ length: 24 }, (v, i) => i + firstChild);
        const everyHourHasRestriction = hours.every(hour => newRestriction.restrictionHour.map(restriction => restriction.hour).includes(hour));
        // uncheck all restrictions by column or  row.
        if (everyHourHasRestriction) {
            const restrictionsToRemove = [...restrictionTemplate.restrictionHour];
            remove(restrictionsToRemove, ({ hour }) => hours.includes(hour));
            newRestriction.restrictionHour = [...restrictionsToRemove];
        }
        else {
            // check all restrictions by column or row.
            const hoursToCheck = hours.map(hour => ({ hour }));
            newRestriction.restrictionHour = unionBy(newRestriction.restrictionHour, hoursToCheck, 'hour');
        }
        newRestriction.restrictionHour.sort((a, b) => a.hour - b.hour);
        return this.setState({
            restrictionTemplate: newRestriction,
        });
    };
    buildModal = () => {
        const { restrictionTemplate, restrictionTemplateError } = this.state;
        const { restrictions } = this.props;
        const restrictionAction = !restrictionTemplate.id ? 'create' : 'edit';
        const restrictionToBeUpdated = restrictions.find(restriction => restriction.id === restrictionTemplate.id);
        // restrictionTemplate - file which is being updated
        const originalHours = restrictionTemplate.restrictionHour
            .map(i => i.hour)
            .sort((a, b) => a.hour - b.hour);
        // restrictionToBeUpdated - original array before any update -=> select all | unselect all
        const updatedHours = restrictionToBeUpdated
            ? restrictionToBeUpdated.restrictionHour
                .map(i => i.hour)
                .sort((a, b) => a.hour - b.hour)
            : [];
        const saveButtonDisabled = restrictionTemplate.name === '' ||
            !restrictionTemplate.restrictionHour.length ||
            restrictionTemplateError ||
            isEqual(originalHours, updatedHours);
        const tooltipMessage = restrictionTemplate.restrictionHour.length === 0 || restrictionTemplate.name === ''
            ? (this as any).RESTRICTION_NAME_REQUIRED
            : '';
        const titleModal = restrictionAction === 'create' ? 'Create Hour Restriction' : 'Edit Hour Restriction';
        return (<CustomModal title={titleModal} onClose={this.handleCloseModal} onSave={() => this.handleSaveRestriction(restrictionAction)} saveDisabled={saveButtonDisabled} tooltipMessage={tooltipMessage}>
                <div className="station-configs-restrictions-modal__form">
                    {restrictionAction === 'create' ? (<input className={classNames('station-configs__input ml-input', {
            'has-error': restrictionTemplateError,
        })} type="text" placeholder="Restriction Name" onChange={this.handleRestrictionName} maxLength="50"/>) : (<div className="station-configs-restrictions-modal">
                            <p className="station-configs-restrictions-modal__label">
                                Restriction name:
                            </p>
                            <p className="station-configs-restrictions-modal__name" title={restrictionTemplate.name}>
                                {restrictionTemplate.name}
                            </p>
                        </div>)}
                    <div className={classNames('station-configs__error-message', {
            'ml-error-message': restrictionTemplateError,
        })}>
                        Restriction name already exists!
                    </div>
                </div>
                <RestrictionTable restrictionItem={restrictionTemplate} onHourClick={this.handleRestriction} handleMultiselectHours={this.handleMultiselectHours}/>
            </CustomModal>);
    };
    render() {
        const { restrictions } = (this as any).props;
        const { openRestrictionModal, restrictionToEdit } = this.state;
        return (<div className={classNames('station-configs-restrictions', {
            'station-configs--no-data-found': restrictions < 1,
        })}>
                {restrictionToEdit && this.buildAsideModal()}
                {openRestrictionModal && this.buildModal()}
                <div className={classNames('station-configs__add-action', {
            'station-configs__add-action--no-data-found': restrictions < 1,
        })}>
                    <button className="btn btn-primary station-configs__button" type="button" onClick={() => this.handleOpenModal()}>
                        Create
                    </button>
                </div>
                {this.buildHourRestrictionsElement()}
            </div>);
    }
}
const mapDispatchToProps = {
    createHourRestrictionsAction: createHourRestrictions,
    updateHourRestrictionsAction: updateHourRestrictions,
};
ConfigRestrictions.propTypes = {
    boardId: PropTypes.number.isRequired,
    createHourRestrictionsAction: PropTypes.func.isRequired,
    restrictions: PropTypes.arrayOf(PropTypes.object).isRequired,
    restrictionsChanges: PropTypes.arrayOf(PropTypes.object).isRequired,
    stagedRestrictions: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateHourRestrictionsAction: PropTypes.func.isRequired,
    versions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(null, mapDispatchToProps)(ConfigRestrictions);
