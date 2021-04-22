/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/select-panel.js
 *
 * This component represents the entire panel which gets dropped down when the
 * user selects the component.  It encapsulates the search filter, the
 * Select-all item, and the list of options.
 *
 */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import SelectList from './select-list';
import SelectItem from './select-item';

class SelectPanel extends Component {
    static propTypes = {
        ItemRenderer: PropTypes.func.isRequired,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.any.isRequired,
            })
        ).isRequired,
        onSelectedChanged: PropTypes.func.isRequired,

        selectAllLabel: PropTypes.string,
        selected: PropTypes.arrayOf(PropTypes.any),
    };

    static defaultProps = {
        selected: false,
        selectAllLabel: 'Select All',
    };

    state = {
        searchHasFocus: false,
        searchText: '',
        focusIndex: 0,
    };

    selectAll = () => {
        const { onSelectedChanged, options } = this.props;
        const allValues = options.map(o => o.value);

        onSelectedChanged(allValues);
    };

    selectNone = () => {
        const { onSelectedChanged } = this.props;

        onSelectedChanged([]);
    };

    selectAllChanged = checked => {
        if (checked) {
            this.selectAll();
        } else {
            this.selectNone();
        }
    };

    handleSearchChange = e => {
        this.setState({
            searchText: e.target.value,
            focusIndex: -1,
        });
    };

    handleItemClicked = index => {
        this.setState({ focusIndex: index });
    };

    clearSearch = () => {
        this.setState({ searchText: '' });
    };

    handleKeyDown = e => {
        switch (e.which) {
            case 38: // Up Arrow
                if (e.altKey) {
                    return;
                }

                this.updateFocus(-1);
                break;
            case 40: // Down Arrow
                if (e.altKey) {
                    return;
                }

                this.updateFocus(1);
                break;
            default:
                return;
        }

        e.stopPropagation();
        e.preventDefault();
    };

    handleSearchFocus = searchHasFocus => {
        this.setState({
            searchHasFocus,
            focusIndex: -1,
        });
    };

    allAreSelected() {
        const { options, selected } = this.props;
        return options.length === selected.length;
    }

    filteredOptions() {
        const { searchText } = this.state;
        const { options } = this.props;

        return options.filter(option => option.label.toLowerCase().indexOf(searchText.trim().toLowerCase()) >= 0);
    }

    updateFocus(offset) {
        const { focusIndex } = this.state;
        const { options } = this.props;

        let newFocus = focusIndex + offset;
        newFocus = Math.max(0, newFocus);
        newFocus = Math.min(newFocus, options.length);

        this.setState({ focusIndex: newFocus });
    }

    render() {
        const { focusIndex, searchHasFocus } = this.state;
        const { ItemRenderer, selectAllLabel } = this.props;

        const selectAllOption = {
            label: selectAllLabel || 'Select All',
            value: '',
        };

        const focusedSearchStyle = searchHasFocus ? 'multiselect-search-focused' : '';

        return (
            <div // eslint-disable-line
                className="multiselect-panel"
                role="listbox"
                onKeyDown={this.handleKeyDown}
            >
                <div className="multiselect-search-container">
                    <input
                        placeholder="Search"
                        type="text"
                        onChange={this.handleSearchChange}
                        className={`multiselect-search ${focusedSearchStyle}`}
                        onFocus={() => this.handleSearchFocus(true)}
                        onBlur={() => this.handleSearchFocus(false)}
                    />
                </div>

                <SelectItem
                    focused={focusIndex === 0}
                    checked={this.allAreSelected()}
                    option={selectAllOption}
                    onSelectionChanged={this.selectAllChanged}
                    onClick={() => this.handleItemClicked(0)}
                    ItemRenderer={ItemRenderer}
                />

                <SelectList
                    {...this.props}
                    options={this.filteredOptions()}
                    focusIndex={focusIndex - 1}
                    onClick={(e, index) => this.handleItemClicked(index + 1)}
                    ItemRenderer={ItemRenderer}
                />
            </div>
        );
    }
}

export default SelectPanel;
