import React from 'react';

import PropTypes from 'prop-types';

const UserCard = ({ user, user: { emailAddress, fullName }, handleModalOpen }) => {
    const displayName = fullName.split(' ').map((namePart, index) => {
        const nameKey = index + fullName;
        return namePart && namePart !== 'undefined' ? (
            <span key={nameKey}>
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
