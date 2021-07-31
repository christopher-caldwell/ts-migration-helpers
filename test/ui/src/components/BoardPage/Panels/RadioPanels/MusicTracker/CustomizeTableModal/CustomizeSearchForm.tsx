// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import React, { Component } from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetColumns' does not exist on type 'Re... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';

class CustomizeSearchForm extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetColumns' does not exist on type 'Re... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        this.onSearchValue = this.onSearchValue.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
        this.onSearchReset = this.onSearchReset.bind(this);
        this.state = {
            searchValue: '',
        };
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    onSearchReset() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'resetColumns' does not exist on type 'Re... Remove this comment to see the full error message
        const { resetColumns } = this.props;
        resetColumns();
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    onSearchValue(e) {
        const {
            target: { value: searchValue },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        } = e;
        const { onChange } = this.props;
        this.setState({ searchValue }, () => onChange(searchValue));
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    render() {
        const { searchValue } = this.state;
        return (
            <div className="customize-search-form">
                <input
                    className="customize-text-search"
                    type="text"
                    placeholder="Search"
                    onChange={this.onSearchValue}
                    value={searchValue}
                />
                <button className={classNames('reset-columns')} type="button" onClick={this.onSearchReset}>
                    Reset Columns
                </button>
            </div>
        );
    }
}

CustomizeSearchForm.propTypes = {
    resetColumns: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CustomizeSearchForm;
