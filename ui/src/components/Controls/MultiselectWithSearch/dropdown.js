// eslint-disable
/**
 * React Multi Select Component
 * https://github.com/Khan/react-multi-select
 * Author: BrianGenisio
 * Original file: https://github.com/Khan/react-multi-select/blob/master/src/dropdown.js
 *
 * A generic dropdown component. It takes the children of the component
 * and hosts it in the component. When the component is selected, it
 * drops-down the contentComponent and applies the contentProps.
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import LoadingIndicator from './loading-indicator';

class Dropdown extends Component {
    static propTypes = {
        contentComponent: PropTypes.func.isRequired,
        contentProps: PropTypes.shape().isRequired,
        children: PropTypes.shape(),
        isLoading: PropTypes.bool,
    };

    static defaultProps = {
        children: {},
        isLoading: false,
    };

    state = {
        expanded: false,
        hasFocus: false,
    };

    UNSAFE_componentWillUpdate() {
        document.addEventListener('touchstart', this.handleDocumentClick);
        document.addEventListener('mousedown', this.handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('touchstart', this.handleDocumentClick);
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    // Finds every node in the render tree of the current wrapper
    wrapper;

    handleDocumentClick = event => {
        if (this.wrapper && !this.wrapper.contains(event.target)) {
            this.setState({ expanded: false });
        }
    };

    handleKeyDown = e => {
        switch (e.which) {
            case 27: // Escape
                this.toggleExpanded(false);
                break;
            case 38: // Up Arrow
                this.toggleExpanded(false);
                break;
            case 40: // Down Arrow
                this.toggleExpanded(true);
                break;
            default:
                return;
        }

        e.preventDefault();
    };

    handleFocus = () => {};

    handleBlur = () => {
        const { hasFocus } = this.state;

        if (hasFocus) {
            this.setState({ hasFocus: false });
        }
    };

    toggleExpanded = value => {
        const { isLoading } = this.props;
        const { expanded } = this.state;

        if (isLoading) {
            return;
        }

        const newExpanded = value === undefined ? !expanded : !!value;

        this.setState({ expanded: newExpanded });

        if (!newExpanded && this.wrapper) {
            this.wrapper.focus();
        }
    };

    renderPanel() {
        const { contentComponent: ContentComponent, contentProps } = this.props;

        return (
            <div className="multiselect-panel-container">
                <ContentComponent {...contentProps} />
            </div>
        );
    }

    render() {
        const { expanded, hasFocus } = this.state;
        const { children, isLoading } = this.props;

        const expandedHeaderStyle = expanded ? 'multiselect-dropdown-header-expanded' : '';

        const focusedHeaderStyle = hasFocus ? 'multiselect-dropdown-header-focused' : '';

        const arrowStyle = expanded
            ? 'multiselect-dropdown-arrow-up'
            : 'multiselect-dropdown-arrow-down';

        const focusedArrowStyle = hasFocus ? 'multiselect-dropdown-arrow-down-focused' : '';

        return (
            <div // eslint-disable-line
                tabIndex="0"
                role="combobox" // eslint-disable-line
                aria-expanded={expanded}
                aria-readonly="true"
                className="multiselect-dropdown-container"
                ref={ref => (this.wrapper = ref)} // eslint-disable-line
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                <div // eslint-disable-line
                    className={`
                        multiselect-dropdown-header ${expandedHeaderStyle} ${focusedHeaderStyle}
                    `}
                    onClick={() => this.toggleExpanded()}
                >
                    <span className="multiselect-dropdown-children">{children}</span>
                    <span className="multiselect-loading-container">
                        {isLoading && <LoadingIndicator />}
                    </span>
                    <span className="multiselect-dropdown-arrow">
                        <span className={`${arrowStyle} ${focusedArrowStyle}`} />
                    </span>
                </div>
                {expanded && this.renderPanel()}
            </div>
        );
    }
}

export default Dropdown;
