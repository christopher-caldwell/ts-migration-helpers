// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'handleSelect' implicitly has an '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'handleSelect' implicitly has an '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
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
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    value={item}
                    onClick={() => handleSelect(item)}
                    className={`${classNames({
                        'btn-active': selectedItems && selectedItems.includes(item),
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
