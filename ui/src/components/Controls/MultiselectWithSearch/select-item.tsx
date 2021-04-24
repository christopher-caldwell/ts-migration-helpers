// eslint-disable
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

    state = {
        hovered: false,
    };

    componentDidMount() {
        this.updateFocus();
    }

    componentDidUpdate() {
        this.updateFocus();
    }

    onChecked = e => {
        const { onSelectionChanged } = this.props;
        const { checked } = e.target;

        onSelectionChanged(checked);
    };

    itemRef;

    toggleChecked = () => {
        const { checked, onSelectionChanged } = this.props;
        onSelectionChanged(!checked);
    };

    handleClick = e => {
        const { onClick } = this.props;
        this.toggleChecked();
        onClick(e);

        e.preventDefault();
    };

    updateFocus() {
        const { focused } = this.props;

        if (focused && this.itemRef) {
            this.itemRef.focus();
        }
    }

    handleKeyDown = e => {
        switch (e.which) {
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
