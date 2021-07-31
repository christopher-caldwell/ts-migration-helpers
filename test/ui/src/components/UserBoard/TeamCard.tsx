// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'teamName' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'teamName' implicitly has an 'any'... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'isRole' implicitly has an 'any' t... Remove this comment to see the full error message
import PropTypes from 'prop-types';

const TeamCard = ({
    team, team: { teamName }, handleModalOpen, isRole,
}) => (
    <div className="card-container">
        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    handleModalOpen: PropTypes.func.isRequired,
    isRole: PropTypes.bool.isRequired,
    team: PropTypes.shape().isRequired,
};
