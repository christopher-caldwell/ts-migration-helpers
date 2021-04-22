import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import CustomCheckbox from 'components/CustomCheckbox';

class ExpandableFilter extends Component {
    buildItems = (list, selectedItems, handleFilterSelect) =>
        list.map(currentItem => (
            <button
                type="button"
                key={`category-${currentItem.value}`}
                className="category-list__item category-list__item-button"
                onClick={() => handleFilterSelect(currentItem, false)}
            >
                <CustomCheckbox
                    item={currentItem}
                    checked={selectedItems.some(item => item.value === currentItem.value)}
                    className="custom-checkbox custom-checkbox-button"
                />
                <span className="list-option-label">{currentItem.label}</span>
            </button>
        ));

    render() {
        const {
            list,
            selectedItems,
            toggleFilter,
            handleFilterSelect,
            title,
            expanded,
        } = this.props;
        return (
            <div className="ml-accordion">
                <Panel expanded={expanded} onToggle={() => toggleFilter(title)}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            {title}
                            <span className="accordion-arrow" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <div className="category-list">
                                <button
                                    type="button"
                                    key="category-select-all"
                                    className="category-list__item category-list__item-button"
                                    onClick={() => handleFilterSelect(null, true)}
                                >
                                    <CustomCheckbox
                                        item={{}}
                                        checked={selectedItems.length === list.length}
                                        className="custom-checkbox custom-checkbox-button"
                                    />
                                    <span className="list-option-label">Select All</span>
                                </button>
                                {this.buildItems(list, selectedItems, handleFilterSelect)}
                            </div>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
            </div>
        );
    }
}

ExpandableFilter.propTypes = {
    expanded: PropTypes.bool.isRequired,
    handleFilterSelect: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    title: PropTypes.string.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.shape()),
};

ExpandableFilter.defaultProps = {
    selectedItems: [],
};

export default ExpandableFilter;
