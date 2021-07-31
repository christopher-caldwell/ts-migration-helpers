// eslint-disable
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

import DefaultItemRenderer from './default-item-renderer';

class SelectItem extends Component {
    static propTypes = {
        checked: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
        ItemRenderer: PropTypes.func,
        focused: PropTypes.bool,
        option: PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.any,
        }),
        onSelectionChanged: PropTypes.func,
    };

    static defaultProps = {
        ItemRenderer: DefaultItemRenderer,
        option: {},
        focused: false,
        onSelectionChanged: () => {},
    };
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.

    state = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectionChanged' does not exist on ty... Remove this comment to see the full error message
        hovered: false,
    };

    componentDidMount() {
        // @ts-expect-error ts-migrate(7008) FIXME: Member 'itemRef' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        this.updateFocus();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectionChanged' does not exist on ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSelectionChanged' does not exist on ty... Remove this comment to see the full error message
    componentDidUpdate() {
        this.updateFocus();
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7008) FIXME: Member 'itemRef' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    onChecked = e => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { onSelectionChanged } = this.props;
        const { checked } = e.target;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        onSelectionChanged(checked);
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7008) FIXME: Member 'itemRef' implicitly has an 'any' type.
    itemRef;

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
    toggleChecked = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { checked, onSelectionChanged } = this.props;
        onSelectionChanged(!checked);
    };

    handleClick = e => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        const { onClick } = this.props;
        this.toggleChecked();
        onClick(e);

        e.preventDefault();
    };

    updateFocus() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ItemRenderer' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'focused' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { focused } = this.props;

        if (focused && this.itemRef) {
            this.itemRef.focus();
        }
    }

    handleKeyDown = e => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        switch (e.which) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
            case 13: // Enter
            case 32: // Space
                this.toggleChecked();
                break;
            default:
                return;
        }

        e.preventDefault();
    };

    render() {
        const { ItemRenderer, option, checked, focused } = this.props;
        const { hovered } = this.state;
        const focusStyle = focused || hovered ? 'multiselect-item-container-hover' : '';
        return (
            <label // eslint-disable-line
                role="option" // eslint-disable-line
                aria-selected={checked}
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                selected={checked}
                tabIndex="-1"
                className={`multiselect-item-container ${focusStyle}`}
                onClick={this.handleClick} // eslint-disable-line
                ref={ref => (this.itemRef = ref)} // eslint-disable-line
                onKeyDown={this.handleKeyDown}
                onMouseOver={() => this.setState({ hovered: true })} // eslint-disable-line
                onMouseOut={() => this.setState({ hovered: false })} // eslint-disable-line
            >
                <ItemRenderer option={option} checked={checked} onClick={this.handleClick} />
            </label>
        );
    }
}

export default SelectItem;
