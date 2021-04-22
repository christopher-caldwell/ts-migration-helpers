import React, { Component } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import Waypoint from 'react-waypoint';
import every from 'lodash/every';
import orderBy from 'lodash/orderBy';

import { defaultErrorRender } from 'components/Utilities/errorWrapper';
import CategoryTitle from './CategoryTitle';
import CategoryItem from './CategoryItem';
import AnchorBlock from './AnchorBlock';
import MinusPlus from './MinusPlus';

const isDraggable = category => !category.fixed === true;

const categoryGroupTarget = {
    hover(props, monitor, component) {
        const { index: dragIndex, id } = monitor.getItem();
        const { index: hoverIndex, category } = props;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); //eslint-disable-line

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (!isDraggable(category)) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        if (dragIndex === undefined) {
            return;
        }
        // Time to actually perform the action
        props.moveGroup(id, dragIndex, hoverIndex, props.path);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex; //eslint-disable-line
    },
};

class CategoryGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubItemsOpened: false,
        };

        this.onPlusMinus = this.onPlusMinus.bind(this);
        this.onSelectDeselectCategory = this.onSelectDeselectCategory.bind(this);
    }

    onPlusMinus(e) {
        e.stopPropagation();
        this.setState({ isSubItemsOpened: !this.state.isSubItemsOpened });
    }

    onSelectDeselectCategory(isChecked) {
        const { category, checkUncheckGroup } = this.props;
        checkUncheckGroup(category.id, isChecked);
    }

    getSearchValue() {
        const { searchValue } = this.props;
        return searchValue && (searchValue.trim().length > 0 ? searchValue : false);
    }

    render() {
        const {
            boardDetails,
            category, // TODO: this is confusing. rename.
            connectDragSource,
            connectDropTarget,
            connectDragPreview,
            isDragging,
            groupRef,
            onWaypointEnter,
            onWaypointLeave,
            checkUncheckItem,
            toggleCompetitors,
            moveItem,
            competitors,
            selectedCompetitors,
        } = this.props;
        const isDragEnabled = isDraggable(category);

        if (!category || !category.items) {
            return defaultErrorRender({}, 'Something went wrong. Try selecting reset columns.');
        }

        const { isSubItemsOpened } = this.state;
        const categoryItems = category.items;
        const checked = categoryItems
            .filter(item => item.sortKey !== 'spins.competitor')
            .filter(item => (item.hidden ? item.hidden === false : true))
            .every(item => item && item.checked === true);

        const groupCheckDisabled = every(category.items, ['disabled', true]);

        return connectDropTarget(
            connectDragPreview(
                <div
                    className={classNames('category-items', {
                        isDragEnabled,
                        'category-items-is-dragging': isDragging,
                    })}
                    ref={groupRef}
                >
                    <Waypoint bottomOffset={-10} topOffset={10} onEnter={onWaypointEnter} onLeave={onWaypointLeave} />
                    <CategoryTitle
                        anchor={connectDragSource(<div className="canDrag">{isDragEnabled && <AnchorBlock />}</div>)}
                        beChecked
                        checked={checked}
                        disabled={groupCheckDisabled}
                        plusMinus={
                            <div className="category-title-actions">
                                <MinusPlus opened={isSubItemsOpened} onClick={this.onPlusMinus} />
                            </div>
                        }
                        title={`${category.label}`}
                        onClick={() => this.onSelectDeselectCategory(checked)}
                    />
                    {isSubItemsOpened && (
                        <div className="category-items__items">
                            {(() => {
                                let { items } = category;
                                const searchValue = this.getSearchValue();
                                if (searchValue) {
                                    items = items.filter(
                                        item => item.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
                                    );
                                }
                                if (category.key === 'spins' && competitors.length > 0) {
                                    items = orderBy(
                                        items.filter(item => !item.labelTemplate).concat(competitors),
                                        'order'
                                    );
                                }
                                return items.map((item, key) => {
                                    let { label } = item;
                                    if (label.includes('Consolidated')) {
                                        const { cmmFormat } = boardDetails.layout.board;

                                        label = `${cmmFormat || ''} ${label}`.trim();
                                    }

                                    return (
                                        item &&
                                        (item.hidden ? null : (
                                            <CategoryItem
                                                key={item.id}
                                                canDrag={category.itemsDraggable}
                                                checked={item.checked}
                                                disabled={item.disabled}
                                                customCategoryComponent={item.customCategoryComponent}
                                                id={item.id}
                                                index={key}
                                                label={label}
                                                path={{ category: category.id }}
                                                selectedCompetitors={selectedCompetitors}
                                                checkUncheckItem={checkUncheckItem}
                                                toggleCompetitors={toggleCompetitors}
                                                moveItem={moveItem}
                                            />
                                        ))
                                    );
                                });
                            })()}
                        </div>
                    )}
                </div>
            )
        );
    }
}

CategoryGroup.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    category: PropTypes.shape().isRequired,
    checkUncheckGroup: PropTypes.func.isRequired,
    checkUncheckItem: PropTypes.func.isRequired,
    competitors: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveItem: PropTypes.func.isRequired,
    searchValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    selectedCompetitors: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    toggleCompetitors: PropTypes.func.isRequired,
    onWaypointEnter: PropTypes.func.isRequired,
    onWaypointLeave: PropTypes.func.isRequired,
    groupRef: PropTypes.func,
};

CategoryGroup.defaultProps = {
    groupRef: () => {},
};

const mapStateToProps = ({ boardDetails }) => ({ boardDetails });

const mapDispatchToProps = {};

const CGI = 'category_group_item';

const DragS = DragSource(
    CGI,
    {
        canDrag(props) {
            return isDraggable(props.category);
        },
        isDragging(props, monitor) {
            return monitor.getItem().id === props.id;
        },
        beginDrag(props) {
            return { id: props.id, index: props.index };
        },
    },
    (connecter, monitor) => ({
        connectDragSource: connecter.dragSource(),
        connectDragPreview: connecter.dragPreview(),
        isDragging: monitor.isDragging(),
    })
)(CategoryGroup);

const collect = connecter => ({
    connectDropTarget: connecter.dropTarget(),
});

const DragT = DropTarget(CGI, categoryGroupTarget, collect)(DragS);
export default connect(mapStateToProps, mapDispatchToProps)(DragT);
