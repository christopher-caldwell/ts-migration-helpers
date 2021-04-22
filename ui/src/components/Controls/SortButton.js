import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

class SortButton extends Component {
    static propTypes = {
        sort: PropTypes.shape({
            ascending: PropTypes.bool,
            field: PropTypes.string,
        }).isRequired,
        sortKey: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        buttonText: PropTypes.string,
        disabled: PropTypes.bool,
    };

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
