import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import CustomDropdown from 'components/Buttons/CustomDropdown';
import SearchField from 'components/SearchField';

const CategoryListView = props => {
    const {
        toggleListView,
        draggable,
        listViewFilterOpen,
        listFilterExc,
        toggleListViewFilter,
        handleListCheckAll,
        categoryGroups,
        handleListFilterCheck,
        holdPlanner,
        children,
        searchValue,
        onSearchChange,
    } = props;

    return (
        <div className="version-list-view">
            <div className="version-aside-btngroup">
                <button type="button" className="ml-btn-icon version-aside-btn" onClick={toggleListView}>
                    <i className="fa fa-list sidebar-icon ml-btn-icon-selected" />
                </button>
                <button
                    type="button"
                    className={classNames('ml-btn-icon', 'version-aside-btn', {
                        'btn-disable-cursor': !draggable,
                    })}
                    onClick={() => holdPlanner(draggable)}
                >
                    <i className="fa fa-th-large sidebar-icon" />
                </button>
                <CustomDropdown
                    id="category-sidebar-dropdown-button"
                    iconName="fa-filter"
                    className="ml-btn-icon btn-custom"
                    isOpened={listViewFilterOpen}
                    isSelected={listFilterExc.length > 0}
                    onClick={toggleListViewFilter}
                >
                    <div className="list-checkbox-select-container">
                        <span>Categories</span>
                        <button type="button" onClick={handleListCheckAll}>
                            {listFilterExc.length ? 'Select All' : 'Unselect All'}
                        </button>
                    </div>
                    {categoryGroups.map(categoryObj => (
                        <div className="list-view-checkbox-group" key={categoryObj.label}>
                            <input
                                id={categoryObj.label}
                                className="list-view-checkbox"
                                type="checkbox"
                                value={categoryObj.label}
                                onChange={handleListFilterCheck}
                                checked={!listFilterExc.includes(categoryObj.label)}
                            />
                            <label htmlFor={categoryObj.label}>
                                {categoryObj.description
                                    ? `${categoryObj.label} - ${categoryObj.description}`
                                    : categoryObj.label}
                            </label>
                        </div>
                    ))}
                </CustomDropdown>
                <SearchField
                    placeholder="Artist or Song"
                    onSearchChange={onSearchChange}
                    handleReset={() => onSearchChange('')}
                    value={searchValue}
                />
                <button type="button" className="version-close-btn" onClick={toggleListView}>
                    <i className="fa fa-times x-button" />
                </button>
            </div>
            <div className="version-list-view-headers">
                <h3 className="version-list-view-header">Current</h3>
                <h3 className="version-list-view-header">Recurrent</h3>
                <h3 className="version-list-view-header">Gold</h3>
                <h3 className="version-list-view-header">Other Categories</h3>
            </div>
            <div className="list-view-col-container custom-scrollbars--thin">{children}</div>
        </div>
    );
};

CategoryListView.propTypes = {
    categoryGroups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    children: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    draggable: PropTypes.bool.isRequired,
    handleListCheckAll: PropTypes.func.isRequired,
    handleListFilterCheck: PropTypes.func.isRequired,
    holdPlanner: PropTypes.func.isRequired,
    listFilterExc: PropTypes.arrayOf(PropTypes.string).isRequired,
    listViewFilterOpen: PropTypes.bool.isRequired,
    toggleListView: PropTypes.func.isRequired,
    toggleListViewFilter: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    searchValue: PropTypes.string,
};

CategoryListView.defaultProps = {
    searchValue: '',
};

export default CategoryListView;
