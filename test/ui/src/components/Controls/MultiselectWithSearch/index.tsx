/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/index.js
 *
 * Arguments:
 * - options: The { value, label }[] options to be displayed
 * - values: The currently selected values []
 * - onSelectedChanged: An event to notify the caller of new values
 * - valueRenderer: A fn to support overriding the message in the component
 * - isLoading: Show a loading indicator
 */
// TODO: this whole feature needs to be refactored
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SelectPanel from './select-panel';
import Dropdown from './dropdown';
import DefaultItemRenderer from './default-item-renderer';

class MultiSelect extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.any.isRequired,
            })
        ).isRequired,
        selected: PropTypes.arrayOf(PropTypes.any).isRequired,
        ItemRenderer: PropTypes.func,
        customLabel: PropTypes.string,
        isLoading: PropTypes.bool,
        selectAllLabel: PropTypes.string,
        valueRenderer: PropTypes.func,
        onSelectedChanged: PropTypes.func,
    };

    static defaultProps = {
        ItemRenderer: DefaultItemRenderer,
        isLoading: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        selectAllLabel: '',
        valueRenderer: () => {},
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
        onSelectedChanged: () => {},
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        customLabel: 'Select some items...',
    };

    getSelectedText() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
        const { options, selected } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
        const selectedOptions = selected.map(s => options.find(o => o.value === s));

        const selectedLabels = selectedOptions.map(s => {
            if (s) {
                return s.label;
            }

            return '';
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        return selectedLabels.join('; ');
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    renderHeader() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        const { options, selected, valueRenderer, customLabel } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
        const noneSelected = selected.length === 0;
        const allSelected = selected.length === options.length;

        const customText = valueRenderer && valueRenderer(selected, options);

        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        if (noneSelected) {
            return <span className="multiselect-none-selected">{customText || customLabel}</span>;
        }

        if (customText) {
            return <span>{customText}</span>;
        }

        const allSelectedLabel =
            customLabel !== 'Select some items...'
                ? `All ${customLabel} are selected`
                : 'All items are selected';

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        return <span>{allSelected ? allSelectedLabel : this.getSelectedText()}</span>;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectAllLabel' does not exist on type '... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectedChanged' does not exist on typ... Remove this comment to see the full error message
            ItemRenderer,
            options,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
            selected,
            selectAllLabel,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            onSelectedChanged,
            isLoading,
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        } = this.props;

        return (
            <div className="multiselect-container">
                <Dropdown
                    isLoading={isLoading}
                    contentComponent={SelectPanel}
                    contentProps={{
                        ItemRenderer,
                        options,
                        selected,
                        selectAllLabel,
                        onSelectedChanged,
                    }}
                >
                    {this.renderHeader()}
                </Dropdown>
            </div>
        );
    }
}

export default MultiSelect;
export { Dropdown };
