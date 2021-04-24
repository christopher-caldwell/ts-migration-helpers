import React from 'react';

import PropTypes from 'prop-types';

const TeamCard = ({
    team, team: { teamName }, handleModalOpen, isRole,
}) => (
    <div className="card-container">
        <div className="userBoard-panel-heading">
            <h5>{teamName}</h5>
            {!isRole && (
                <button type="button" className="button-ellipsis" onClick={() => handleModalOpen(team)}>
                    <i className="fa fa-ellipsis-v user-icon" />
                </button>
            )}
        </div>
    </div>
);

export default TeamCard;

TeamCard.propTypes = {
    handleModalOpen: PropTypes.func.isRequired,
    isRole: PropTypes.bool.isRequired,
    team: PropTypes.shape().isRequired,
};
