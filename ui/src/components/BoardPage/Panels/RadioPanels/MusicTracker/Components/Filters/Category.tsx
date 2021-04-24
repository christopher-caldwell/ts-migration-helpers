/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import PropTypes from 'prop-types';
import { Panel, PanelGroup } from 'react-bootstrap';
import CustomCheckbox from 'components/CustomCheckbox';
import ContainerDimensions from 'react-container-dimensions';

import { MISSING_CATEGORY } from 'utils/constants';

const CategoryFilter = props => {
    const {
        selectedCategories: { prior, current, new: newCategory, recommendable },
        stationCategories,
        categoriesMetadata,
        recommendableCategories,
        showRecommended,
        handleCategoryFilterSelect,
        onSelect,
        activeCategoryPanel,
    } = props;

    const buildAccordion = (categoryGroup, selectedItems) => {
        const categories =
            categoryGroup === 'recommendable'
                ? Object.keys(recommendableCategories)
                    .reduce((total, current) => {
                        const categoryInfo = categoriesMetadata[current] || false;
                        if (categoryInfo) return [...total, categoryInfo];
                        return total;
                    }, [])
                    .sort((a, b) => a.orderBy - b.orderBy)
                : stationCategories;

        return categories
            .map(category => {
                const { label, description } = category;
                // do not show out of sync for filter for now
                if (label !== MISSING_CATEGORY) {
                    return (
                        <button
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
            .filter(item => item);
    };

    return (
        <ContainerDimensions>
            {({ height, top, bottom }) => (
                <div className="ml-accordion">
                    <PanelGroup
                        accordion
                        id="filter-accordion"
                        onSelect={opened => onSelect(opened, { height, top, bottom })}
                        activeKey={activeCategoryPanel}
                    >
                        <Panel eventKey="1">
                            <Panel.Heading>
                                <Panel.Title toggle>
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
