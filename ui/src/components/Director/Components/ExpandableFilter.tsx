import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import CustomCheckbox from 'components/CustomCheckbox';

class ExpandableFilter extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'list' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'list' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'list' implicitly has an 'any' type.
    buildItems = (list, selectedItems, handleFilterSelect) =>
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentItem' implicitly has an 'any' ty... Remove this comment to see the full error message
        list.map(currentItem => (
            <button
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                type="button"
                key={`category-${currentItem.value}`}
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                className="category-list__item category-list__item-button"
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleFilterSelect' does not exist on ty... Remove this comment to see the full error message
                onClick={() => handleFilterSelect(currentItem, false)}
            >
                <CustomCheckbox
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                    item={currentItem}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleFilter' does not exist on type 'Re... Remove this comment to see the full error message
                    checked={selectedItems.some(item => item.value === currentItem.value)}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'expanded' does not exist on type 'Readon... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                    className="custom-checkbox custom-checkbox-button"
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleFilterSelect' does not exist on ty... Remove this comment to see the full error message
                />
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'Readonly<... Remove this comment to see the full error message */}
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
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                <Panel expanded={expanded} onToggle={() => toggleFilter(title)}>
                    <Panel.Heading>
                        <Panel.Title toggle>
                            {title}
                            <span className="accordion-arrow" />
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            <div className="category-list">
                                <button
                                    type="button"
                                    key="category-select-all"
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                    className="category-list__item category-list__item-button"
                                    onClick={() => handleFilterSelect(null, true)}
                                >
                                    <CustomCheckbox
                                        item={{}}
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                        checked={selectedItems.length === list.length}
                                        className="custom-checkbox custom-checkbox-button"
                                    />
                                    <span className="list-option-label">Select All</span>
                                </button>
                                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
