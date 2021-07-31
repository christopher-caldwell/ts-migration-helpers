// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import React, { Component } from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type 'Readonl... Remove this comment to see the full error message
class SortButton extends Component {
    static propTypes = {
        sort: PropTypes.shape({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'buttonText' does not exist on type 'Read... Remove this comment to see the full error message
            ascending: PropTypes.bool,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            field: PropTypes.string,
        }).isRequired,
        sortKey: PropTypes.string.isRequired,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type 'Readonl... Remove this comment to see the full error message
        onClick: PropTypes.func.isRequired,
        buttonText: PropTypes.string,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'buttonText' does not exist on type 'Read... Remove this comment to see the full error message
        disabled: PropTypes.bool,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'sortKey' does not exist on type 'Readonl... Remove this comment to see the full error message
    static defaultProps = {
        buttonText: '',
        disabled: false,
    };

    onSortChange = () => {
        const { onClick, sortKey } = this.props;
        onClick(sortKey);
    };

    render() {
        const { buttonText, disabled, sortKey, sort } = this.props;

        const sortDirection = sort.ascending ? 'asc' : 'desc';
        const sortClass = classNames('sort-button', {
            [`sort-button-enabled sort-button-${sortDirection}`]: sortKey === sort.field,
        });

        return (
            <button
                className={sortClass}
                disabled={disabled}
                type="button"
                onClick={this.onSortChange}
            >
                {buttonText}
            </button>
        );
    }
}

export default SortButton;
