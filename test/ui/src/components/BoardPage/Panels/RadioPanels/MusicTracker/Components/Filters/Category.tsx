/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';
import { Panel, PanelGroup } from 'react-bootstrap';
import CustomCheckbox from 'components/CustomCheckbox';
import ContainerDimensions from 'react-container-dimensions';

import { MISSING_CATEGORY } from 'utils/constants';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const CategoryFilter = props => {
    const {
        selectedCategories: { prior, current, new: newCategory, recommendable },
        stationCategories,
        categoriesMetadata,
        recommendableCategories,
        showRecommended,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryGroup' implicitly has an 'any' ... Remove this comment to see the full error message
        handleCategoryFilterSelect,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedItems' implicitly has an 'any' ... Remove this comment to see the full error message
        onSelect,
        activeCategoryPanel,
    } = props;

    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryGroup' implicitly has an 'any' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'prior' does not exist on type '{ prior?:... Remove this comment to see the full error message
    const buildAccordion = (categoryGroup, selectedItems) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'string'.
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const categories =
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesMetadata' does not exist on ty... Remove this comment to see the full error message
            categoryGroup === 'recommendable'
                ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'string'.
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'showRecommended' does not exist on type ... Remove this comment to see the full error message
                  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
                  Object.keys(recommendableCategories)
                    .reduce((total, current) => {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryGroup' implicitly has an 'any' ... Remove this comment to see the full error message
                        const categoryInfo = categoriesMetadata[current] || false;
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedItems' implicitly has an 'any' ... Remove this comment to see the full error message
                        if (categoryInfo) return [...total, categoryInfo];
                        return total;
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'opened' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                    }, [])
                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                    .sort((a, b) => a.orderBy - b.orderBy)
                : stationCategories;

        return categories
            .map(category => {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                const { label, description } = category;
                // do not show out of sync for filter for now
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'string'.
                if (label !== MISSING_CATEGORY) {
                    return (
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'opened' implicitly has an 'any' type.
                        <button
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
                            key={`${categoryGroup}-category-${label}`}
                            className="category-list__item"
                            onClick={() => handleCategoryFilterSelect(categoryGroup, category)}
                        >
                            <CustomCheckbox
                                item={category}
                                checked={!selectedItems.find(item => item.label === label)}
                            />
                            {`${label} ${description ? `- ${description}` : ''}`}
                        </button>
                    );
                }
                return undefined;
            })
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            .filter(item => item);
    };

    return (
        <ContainerDimensions>
            {({ height, top, bottom }) => (
                <div className="ml-accordion">
                    <PanelGroup
                        accordion
                        id="filter-accordion"
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                        onSelect={opened => onSelect(opened, { height, top, bottom })}
                        activeKey={activeCategoryPanel}
                    >
                        <Panel eventKey="1">
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'opened' implicitly has an 'any' type. */}
                                    Prior Category
                                    <span className="accordion-arrow" />
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <div className="category-list">
                                    <button
                                        className="category-list__item"
                                        onClick={() => handleCategoryFilterSelect('prior')}
                                    >
                                        <CustomCheckbox item={{}} checked={!prior.length} />
                                        Select All
                                    </button>
                                    {buildAccordion('prior', prior)}
                                </div>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey="2">
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    Current Category
                                    <span className="accordion-arrow" />
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <div className="category-list">
                                    <button
                                        className="category-list__item"
                                        onClick={() => handleCategoryFilterSelect('current')}
                                    >
                                        <CustomCheckbox item={{}} checked={!current.length} />
                                        Select All
                                    </button>
                                    {buildAccordion('current', current)}
                                </div>
                            </Panel.Body>
                        </Panel>
                        <Panel eventKey="3">
                            <Panel.Heading>
                                <Panel.Title toggle>
                                    New Category
                                    <span className="accordion-arrow" />
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <div className="category-list">
                                    <button
                                        className="category-list__item"
                                        onClick={() => handleCategoryFilterSelect('new')}
                                    >
                                        <CustomCheckbox item={{}} checked={!newCategory.length} />
                                        Select All
                                    </button>
                                    {buildAccordion('new', newCategory)}
                                </div>
                            </Panel.Body>
                        </Panel>
                        {showRecommended && (
                            <Panel eventKey="4">
                                <Panel.Heading>
                                    <Panel.Title toggle>
                                        Recommended Category
                                        <span className="accordion-arrow" />
                                    </Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <div className="category-list">
                                        <button
                                            className="category-list__item"
                                            onClick={() =>
                                                handleCategoryFilterSelect('recommendable')}
                                        >
                                            <CustomCheckbox
                                                item={{}}
                                                checked={!recommendable.length}
                                            />
                                            Select All
                                        </button>
                                        {buildAccordion('recommendable', recommendable)}
                                    </div>
                                </Panel.Body>
                            </Panel>
                        )}
                    </PanelGroup>
                </div>
            )}
        </ContainerDimensions>
    );
};

CategoryFilter.propTypes = {
    activeCategoryPanel: PropTypes.string.isRequired,
    handleCategoryFilterSelect: PropTypes.func.isRequired,
    stationCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedCategories: PropTypes.shape({
        prior: PropTypes.arrayOf(PropTypes.object),
        current: PropTypes.arrayOf(PropTypes.object),
        new: PropTypes.arrayOf(PropTypes.object),
        recommendable: PropTypes.arrayOf(PropTypes.object),
    }),
    onSelect: PropTypes.func,
};

CategoryFilter.defaultProps = {
    onSelect: () => {},
    selectedCategories: {
        prior: [],
        current: [],
        new: [],
        recommendable: [],
    },
};

export default CategoryFilter;
