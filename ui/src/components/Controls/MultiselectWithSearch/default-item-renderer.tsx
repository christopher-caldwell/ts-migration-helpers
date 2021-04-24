/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/select-item.js
 *
 * This component represents an individual item in the multi-select drop-down
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

class DefaultItemRenderer extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        checked: PropTypes.bool,
        option: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.any,
        }),
    };

    static defaultProps = {
        option: {},
        checked: false,
    };

    render() {
        const { checked, option, onClick } = this.props;

        return (
            <span>
                <input type="checkbox" onChange={onClick} checked={checked} tabIndex="-1" />
                <span className="multiselect-option-label">{option.label}</span>
            </span>
        );
    }
}

export default DefaultItemRenderer;
