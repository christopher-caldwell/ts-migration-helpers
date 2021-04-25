import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'count' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'count' implicitly has an 'any' ty... Remove this comment to see the full error message
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
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
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
