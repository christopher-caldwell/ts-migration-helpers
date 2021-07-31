/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/select-list.js
 *
 * This component represents an unadorned list of SelectItem (s).
 */
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SelectItem from './select-item';
import DefaultItemRenderer from './default-item-renderer';

class SelectList extends Component {
    static propTypes = {
        focusIndex: PropTypes.number.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.any.isRequired,
            })
        ).isRequired,
        selected: PropTypes.arrayOf(PropTypes.any).isRequired,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        onClick: PropTypes.func.isRequired,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        onSelectedChanged: PropTypes.func.isRequired,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectedChanged' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        ItemRenderer: PropTypes.func,
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    static defaultProps = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type 'Readonl... Remove this comment to see the full error message
        ItemRenderer: DefaultItemRenderer,
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
    handleSelectionChanged = (option, checked) => {
        const { selected, onSelectedChanged } = this.props;

        if (checked) {
            onSelectedChanged([...selected, option.value]);
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
            const index = selected.indexOf(option.value);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
            const removed = [...selected.slice(0, index), ...selected.slice(index + 1)];
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
            onSelectedChanged(removed);
        }
    };

    renderItems() {
        const { ItemRenderer, options, selected, focusIndex, onClick } = this.props;

        return options.map((o, i) => (
            <li className="multiselect-list-item" key={o.value}>
                <SelectItem
                    focused={focusIndex === i}
                    option={o}
                    onSelectionChanged={c => this.handleSelectionChanged(o, c)}
                    checked={selected.includes(o.value)}
                    onClick={e => onClick(e, i)}
                    ItemRenderer={ItemRenderer}
                />
            </li>
        ));
    }

    render() {
        return <ul className="multiselect-list">{this.renderItems()}</ul>;
    }
}

export default SelectList;
