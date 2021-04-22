import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const crgList = ['C', 'R', 'G'];

const CRGFilter = ({ handleSelect, selectedItems }) => (
    <div className="crg-filter">
        <p className="crg-filter__label">CRG</p>
        <div className="crg-filter__buttons">
            {crgList.map(item => (
                <button
                    type="button"
                    key={`cr-filter-${item}`}
                    value={item}
                    onClick={() => handleSelect(item)}
                    className={`${classNames({
                        'btn-active': selectedItems && selectedItems.includes(item),
                    })}`}
                >
                    {item}
                </button>
            ))}
        </div>
    </div>
);

CRGFilter.propTypes = {
    handleSelect: PropTypes.func.isRequired,
    selectedItems: PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.string)]).isRequired,
};

export default CRGFilter;
