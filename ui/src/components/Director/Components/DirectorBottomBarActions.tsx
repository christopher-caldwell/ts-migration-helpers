import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextButton from 'components/Buttons/TextButton';

const DirectorBottomBarActions = ({ count, onClear, className }) => (
    <div className={classNames(`director__bottom-actions ${className}`)}>
        <p className="director__count-stations">
            {count}
            {' '}
            {`${count === 1 ? 'Station' : 'Stations'}`}
            {' selected'}
        </p>
        {count > 0 && (
            <TextButton
                onClick={onClear}
                text={`Clear ${count === 1 ? 'Selection' : 'Selections'}`}
                className="director__clear-selections"
            />
        )}
    </div>
);

DirectorBottomBarActions.propTypes = {
    onClear: PropTypes.func.isRequired,
    className: PropTypes.string,
    count: PropTypes.number,
};

DirectorBottomBarActions.defaultProps = {
    count: 0,
    className: '',
};

export default DirectorBottomBarActions;
