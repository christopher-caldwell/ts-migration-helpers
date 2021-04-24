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
        selectAllLabel: '',
        valueRenderer: () => {},
        onSelectedChanged: () => {},
        customLabel: 'Select some items...',
    };

    getSelectedText() {
        const { options, selected } = this.props;
        const selectedOptions = selected.map(s => options.find(o => o.value === s));

        const selectedLabels = selectedOptions.map(s => {
            if (s) {
                return s.label;
            }

            return '';
        });

        return selectedLabels.join('; ');
    }

    renderHeader() {
        const { options, selected, valueRenderer, customLabel } = this.props;

        const noneSelected = selected.length === 0;
        const allSelected = selected.length === options.length;

        const customText = valueRenderer && valueRenderer(selected, options);

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

        return <span>{allSelected ? allSelectedLabel : this.getSelectedText()}</span>;
    }

    render() {
        const {
            ItemRenderer,
            options,
            selected,
            selectAllLabel,
            onSelectedChanged,
            isLoading,
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
