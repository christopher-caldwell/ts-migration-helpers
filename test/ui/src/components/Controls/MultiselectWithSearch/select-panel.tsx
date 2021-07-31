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
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectedChanged' does not exist on typ... Remove this comment to see the full error message
        selectAllLabel: 'Select All',
    };

    state = {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        searchHasFocus: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectedChanged' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectedChanged' does not exist on typ... Remove this comment to see the full error message
        searchText: '',
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checked' implicitly has an 'any' type.
        focusIndex: 0,
    };

    selectAll = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        const { onSelectedChanged, options } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectedChanged' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checked' implicitly has an 'any' type.
        const allValues = options.map(o => o.value);

        onSelectedChanged(allValues);
    };

    selectNone = () => {
        const { onSelectedChanged } = this.props;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        onSelectedChanged([]);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checked' implicitly has an 'any' type.
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchHasFocus' implicitly has an 'any'... Remove this comment to see the full error message
    selectAllChanged = checked => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
        if (checked) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
            this.selectAll();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        } else {
            this.selectNone();
        }
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    handleSearchChange = e => {
        this.setState({
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'offset' implicitly has an 'any' type.
            searchText: e.target.value,
            focusIndex: -1,
        });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'index' implicitly has an 'any' type.
    handleItemClicked = index => {
        this.setState({ focusIndex: index });
    };

    clearSearch = () => {
        this.setState({ searchText: '' });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchHasFocus' implicitly has an 'any'... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    };

    handleKeyDown = e => {
        switch (e.which) {
            case 38: // Up Arrow
                if (e.altKey) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                    return;
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
                }

                this.updateFocus(-1);
                break;
            case 40: // Down Arrow
                if (e.altKey) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
                    return;
                }

                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
                this.updateFocus(1);
                break;
            default:
                return;
        }

        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'offset' implicitly has an 'any' type.
        e.stopPropagation();
        e.preventDefault();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchHasFocus' implicitly has an 'any'... Remove this comment to see the full error message
    };

    handleSearchFocus = searchHasFocus => {
        this.setState({
            searchHasFocus,
            focusIndex: -1,
        });
    };

    allAreSelected() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        const { options, selected } = this.props;
        return options.length === selected.length;
    }

    filteredOptions() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { searchText } = this.state;
        const { options } = this.props;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'option' implicitly has an 'any' type.
        return options.filter(option => option.label.toLowerCase().indexOf(searchText.trim().toLowerCase()) >= 0);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'offset' implicitly has an 'any' type.
    }

    updateFocus(offset) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { focusIndex } = this.state;
        const { options } = this.props;

        let newFocus = focusIndex + offset;
        newFocus = Math.max(0, newFocus);
        newFocus = Math.min(newFocus, options.length);

        this.setState({ focusIndex: newFocus });
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const { focusIndex, searchHasFocus } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectAllLabel' does not exist on type '... Remove this comment to see the full error message
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
                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
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
