// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'emailAddress' implicitly has an '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'namePart' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'emailAddress' implicitly has an '... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'handleModalOpen' implicitly has a... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'namePart' implicitly has an 'any' type.
const UserCard = ({ user, user: { emailAddress, fullName }, handleModalOpen }) => {
    const displayName = fullName.split(' ').map((namePart, index) => {
        const nameKey = index + fullName;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'namePart' implicitly has an 'any' type.
        return namePart && namePart !== 'undefined' ? (
            <span key={nameKey}>
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                {namePart}
                {' '}
            </span>
        ) : <span key={nameKey} />; // ^ string undefined intentional!
    });

    return (
        <div className="card-container">
            <div className="userBoard-panel-heading">
                <h5>{displayName}</h5>
                <button type="button" className="button-ellipsis" onClick={() => handleModalOpen(user)}>
                    <i className="fa fa-ellipsis-v user-icon" />
                </button>
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
            </div>
            <p>{emailAddress}</p>
        </div>
    );
};

export default UserCard;

UserCard.propTypes = {
    handleModalOpen: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
};
