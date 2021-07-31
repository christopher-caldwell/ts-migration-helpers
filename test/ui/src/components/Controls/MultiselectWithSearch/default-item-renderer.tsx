/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/select-item.js
 *
 * This component represents an individual item in the multi-select drop-down
 */
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';

import PropTypes from 'prop-types';

class DefaultItemRenderer extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        checked: PropTypes.bool,
        option: PropTypes.shape({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
            value: PropTypes.any,
            label: PropTypes.any,
        }),
    };

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
    static defaultProps = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type 'Readonl... Remove this comment to see the full error message
        option: {},
        checked: false,
    };

    render() {
        const { checked, option, onClick } = this.props;

        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        return (
            <span>
                {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
                <input type="checkbox" onChange={onClick} checked={checked} tabIndex="-1" />
                <span className="multiselect-option-label">{option.label}</span>
            </span>
        );
    }
}

export default DefaultItemRenderer;
