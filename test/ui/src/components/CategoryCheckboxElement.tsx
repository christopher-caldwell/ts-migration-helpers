// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'song' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'song' implicitly has an 'any' typ... Remove this comment to see the full error message
import React from 'react';
import PropTypes from 'prop-types';

const CategoryCheckboxElement = ({ song, onCheck, checked }) => (
    <div className="custom-checkbox version-item-checkbox">
        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
        <label htmlFor={song.sId}>
            <input
                id={song.sId}
                value={song.sId}
                type="checkbox"
                onChange={() => onCheck(song)}
                checked={checked}
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            />
        </label>
    </div>
);

// @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
CategoryCheckboxElement.propTypes = {
    song: PropTypes.shape().isRequired,
    checked: PropTypes.bool,
    className: PropTypes.string,
    onCheck: PropTypes.func,
};

CategoryCheckboxElement.defaultProps = {
    className: '',
    checked: false,
    onCheck: () => {},
};

export default CategoryCheckboxElement;
