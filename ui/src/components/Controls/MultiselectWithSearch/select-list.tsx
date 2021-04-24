/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/select-list.js
 *
 * This component represents an unadorned list of SelectItem (s).
 */
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
        onClick: PropTypes.func.isRequired,
        onSelectedChanged: PropTypes.func.isRequired,
        ItemRenderer: PropTypes.func,
    };

    static defaultProps = {
        ItemRenderer: DefaultItemRenderer,
    };

    handleSelectionChanged = (option, checked) => {
        const { selected, onSelectedChanged } = this.props;

        if (checked) {
            onSelectedChanged([...selected, option.value]);
        } else {
            const index = selected.indexOf(option.value);
            const removed = [...selected.slice(0, index), ...selected.slice(index + 1)];
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
