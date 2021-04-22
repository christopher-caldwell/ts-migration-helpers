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

    static defaultProps = {
        buttonText: '',
        disabled: false,
        headerText: '',
        loading: false,
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
