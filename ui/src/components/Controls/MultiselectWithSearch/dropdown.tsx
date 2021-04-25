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

// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';

import PropTypes from 'prop-types';

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
import LoadingIndicator from './loading-indicator';

// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
class Dropdown extends Component {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    static propTypes = {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        contentComponent: PropTypes.func.isRequired,
        contentProps: PropTypes.shape().isRequired,
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        children: PropTypes.shape(),
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        isLoading: PropTypes.bool,
    };

    static defaultProps = {
        children: {},
        isLoading: false,
    };

    // @ts-expect-error ts-migrate(7008) FIXME: Member 'wrapper' implicitly has an 'any' type.
    state = {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        expanded: false,
        hasFocus: false,
    };

    UNSAFE_componentWillUpdate() {
        document.addEventListener('touchstart', this.handleDocumentClick);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        document.addEventListener('mousedown', this.handleDocumentClick);
    // @ts-expect-error ts-migrate(7008) FIXME: Member 'wrapper' implicitly has an 'any' type.
    }

    componentWillUnmount() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        document.removeEventListener('touchstart', this.handleDocumentClick);
        document.removeEventListener('mousedown', this.handleDocumentClick);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // Finds every node in the render tree of the current wrapper
    wrapper;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7008) FIXME: Member 'wrapper' implicitly has an 'any' type.
    handleDocumentClick = event => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        if (this.wrapper && !this.wrapper.contains(event.target)) {
            this.setState({ expanded: false });
        }
    };

    handleKeyDown = e => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentComponent' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        switch (e.which) {
            case 27: // Escape
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
                this.toggleExpanded(false);
                break;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentComponent' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        const { hasFocus } = this.state;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'contentProps' does not exist on type 'Re... Remove this comment to see the full error message

        if (hasFocus) {
            this.setState({ hasFocus: false });
        }
    };

    toggleExpanded = value => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
        const { isLoading } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentComponent' does not exist on type... Remove this comment to see the full error message
        const { contentComponent: ContentComponent, contentProps } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentProps' does not exist on type 'Re... Remove this comment to see the full error message
        return (
            <div className="multiselect-panel-container">
                <ContentComponent {...contentProps} />
            </div>
        );
    }

    render() {
        const { expanded, hasFocus } = this.state;
        const { children, isLoading } = this.props;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
        const expandedHeaderStyle = expanded ? 'multiselect-dropdown-header-expanded' : '';

        const focusedHeaderStyle = hasFocus ? 'multiselect-dropdown-header-focused' : '';

        const arrowStyle = expanded
            ? 'multiselect-dropdown-arrow-up'
            : 'multiselect-dropdown-arrow-down';

        const focusedArrowStyle = hasFocus ? 'multiselect-dropdown-arrow-down-focused' : '';

        return (
            <div // eslint-disable-line
                tabIndex="0"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
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
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
