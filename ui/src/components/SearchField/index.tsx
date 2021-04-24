import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconX from 'components/Buttons/IconX';

class SeachField extends Component {
    constructor(props) {
        super(props);
        this.SearchTimeout = null;
        this.state = {
            searchValue: props.value,
        };

        this.onHandleReset = this.onHandleReset.bind(this);
    }

    onSearchValue = () => {
        const { onSearchChange } = this.props;

        if (this.SearchTimeout) {
            clearTimeout(this.SearchTimeout);
        }

        this.SearchTimeout = setTimeout(() => {
            onSearchChange(this.state.searchValue);
        }, 500);
    };

    handleChange = e => {
        if (!e || !e.target) return;
        const {
            target: { value: searchValue },
        } = e;
        this.setState({ searchValue });

        this.onSearchValue();
    };

    onHandleReset() {
        const { handleReset } = this.props;
        this.setState({ searchValue: '' });
        handleReset();
    }

    render() {
        const { className, hasResetButton, placeholder } = this.props;

        return (
            <div className={classNames(`search-field ${className}`)}>
                <div className="search-field__container">
                    <div className="search-field__icon">
                        <i className="fa fa-search" />
                    </div>
                    <input
                        className={classNames({
                            'has-reset-button': hasResetButton,
                        })}
                        placeholder={placeholder}
                        onChange={this.handleChange}
                        value={this.state.searchValue}
                    />
                    {hasResetButton && this.state.searchValue && (
                        <IconX onClick={() => this.onHandleReset()} className="btn-reset" />
                    )}
                </div>
            </div>
        );
    }
}

SeachField.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    handleReset: PropTypes.func,
    hasResetButton: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
};

SeachField.defaultProps = {
    className: '',
    handleReset: () => {},
    hasResetButton: true,
    placeholder: 'Search',
    value: '',
};

export default SeachField;
