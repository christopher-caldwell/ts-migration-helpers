// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ButtonLoadingIndicator from 'components/Utilities/ButtonLoadingIndicator';

class ButtonColumnGroupHeader extends Component {
    static propTypes = {
        buttonText: PropTypes.string,
        disabled: PropTypes.bool,
        headerText: PropTypes.string,
        loading: PropTypes.bool,
        onButtonClick: PropTypes.func,
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'headerText' does not exist on type 'Read... Remove this comment to see the full error message
    static defaultProps = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
        buttonText: '',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onButtonClick' does not exist on type 'R... Remove this comment to see the full error message
        disabled: false,
        headerText: '',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'headerText' does not exist on type 'Read... Remove this comment to see the full error message
        loading: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Readon... Remove this comment to see the full error message
        onButtonClick: () => {},
    };

    render() {
        const { headerText, buttonText, disabled, loading, onButtonClick } = this.props;

        return (
            <div className="column-group-header-cell">
                <div className="column-group-header-text-container">{headerText}</div>
                <div className="column-group-header-button-container">
                    <button
                        className="column-header-button btn btn-primary"
                        disabled={disabled}
                        type="button"
                        onClick={onButtonClick}
                    >
                        {buttonText}
                        <ButtonLoadingIndicator loading={loading} />
                    </button>
                </div>
            </div>
        );
    }
}

export default ButtonColumnGroupHeader;
