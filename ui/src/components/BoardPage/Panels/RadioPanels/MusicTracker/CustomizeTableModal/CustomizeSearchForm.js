import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

class CustomizeSearchForm extends Component {
    constructor(props) {
        super(props);
        this.onSearchValue = this.onSearchValue.bind(this);
        this.onSearchReset = this.onSearchReset.bind(this);
        this.state = {
            searchValue: '',
        };
    }

    onSearchReset() {
        const { resetColumns } = this.props;
        resetColumns();
    }

    onSearchValue(e) {
        const {
            target: { value: searchValue },
        } = e;
        const { onChange } = this.props;
        this.setState({ searchValue }, () => onChange(searchValue));
    }

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
