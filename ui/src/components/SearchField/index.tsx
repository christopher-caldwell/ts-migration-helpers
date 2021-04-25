import React, { Component } from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'SearchTimeout' does not exist on type 'S... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onSearchChange' does not exist on type '... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'SearchTimeout' does not exist on type 'S... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'SearchTimeout' does not exist on type 'S... Remove this comment to see the full error message
import IconX from 'components/Buttons/IconX';

class SeachField extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSearchChange' does not exist on type '... Remove this comment to see the full error message
    constructor(props) {
        super(props);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleReset' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'SearchTimeout' does not exist on type 'S... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        this.SearchTimeout = null;
        this.state = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'SearchTimeout' does not exist on type 'S... Remove this comment to see the full error message
            searchValue: props.value,
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'SearchTimeout' does not exist on type 'S... Remove this comment to see the full error message
        this.onHandleReset = this.onHandleReset.bind(this);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    onSearchValue = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSearchChange' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const { onSearchChange } = this.props;

        if (this.SearchTimeout) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleReset' does not exist on type 'Rea... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            clearTimeout(this.SearchTimeout);
        }

        this.SearchTimeout = setTimeout(() => {
            onSearchChange(this.state.searchValue);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        }, 500);
    };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hasResetButton' does not exist on type '... Remove this comment to see the full error message

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'placeholder' does not exist on type 'Rea... Remove this comment to see the full error message
    handleChange = e => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        if (!e || !e.target) return;
        const {
            target: { value: searchValue },
        } = e;
        this.setState({ searchValue });

        this.onSearchValue();
    };

    onHandleReset() {
        const { handleReset } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleReset' does not exist on type 'Rea... Remove this comment to see the full error message
        this.setState({ searchValue: '' });
        handleReset();
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        const { className, hasResetButton, placeholder } = this.props;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'placeholder' does not exist on type 'Rea... Remove this comment to see the full error message

        return (
            <div className={classNames(`search-field ${className}`)}>
                <div className="search-field__container">
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
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
