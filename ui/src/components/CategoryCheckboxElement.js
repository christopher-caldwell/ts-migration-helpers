import React from 'react';
import PropTypes from 'prop-types';

const CategoryCheckboxElement = ({ song, onCheck, checked }) => (
    <div className="custom-checkbox version-item-checkbox">
        <label htmlFor={song.sId}>
            <input
                id={song.sId}
                value={song.sId}
                type="checkbox"
                onChange={() => onCheck(song)}
                checked={checked}
            />
        </label>
    </div>
);

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
