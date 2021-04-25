import React, { Component } from 'react';
import { connect } from 'react-redux';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import Waypoint from 'react-waypoint';
import every from 'lodash/every';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
import orderBy from 'lodash/orderBy';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
import { defaultErrorRender } from 'components/Utilities/errorWrapper';
import CategoryTitle from './CategoryTitle';
import CategoryItem from './CategoryItem';
import AnchorBlock from './AnchorBlock';
import MinusPlus from './MinusPlus';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
const isDraggable = category => !category.fixed === true;

// @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoundingClientRect' does not exist on... Remove this comment to see the full error message
const categoryGroupTarget = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    hover(props, monitor, component) {
        const { index: dragIndex, id } = monitor.getItem();
        const { index: hoverIndex, category } = props;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect(); //eslint-disable-line

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.

        // Dragging downwards
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSubItemsOpened' does not exist on type... Remove this comment to see the full error message
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isChecked' implicitly has an 'any' type... Remove this comment to see the full error message
        if (!isDraggable(category)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'Readon... Remove this comment to see the full error message
            return;
        }
        // Dragging upwards
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        if (dragIndex === undefined) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            return;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'Readon... Remove this comment to see the full error message
        // Time to actually perform the action
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragSource' does not exist on typ... Remove this comment to see the full error message
        props.moveGroup(id, dragIndex, hoverIndex, props.path);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragPreview' does not exist on ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onWaypointLeave' does not exist on type ... Remove this comment to see the full error message
        // Note: we're mutating the monitor item here!
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkUncheckItem' does not exist on type... Remove this comment to see the full error message
        // Generally it's better to avoid mutations,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveItem' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSubItemsOpened' does not exist on type... Remove this comment to see the full error message
        // but it's good here for the sake of performance
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSubItemsOpened' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isChecked' implicitly has an 'any' type... Remove this comment to see the full error message
        // to avoid expensive index searches.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        monitor.getItem().index = hoverIndex; //eslint-disable-line
    },
};

class CategoryGroup extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        this.state = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            isSubItemsOpened: false,
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'Readon... Remove this comment to see the full error message
        this.onPlusMinus = this.onPlusMinus.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragSource' does not exist on typ... Remove this comment to see the full error message
        this.onSelectDeselectCategory = this.onSelectDeselectCategory.bind(this);
    }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isDragging' does not exist on type 'Read... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.

    onPlusMinus(e) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkUncheckItem' does not exist on type... Remove this comment to see the full error message
        e.stopPropagation();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleCompetitors' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSubItemsOpened' does not exist on type... Remove this comment to see the full error message
        this.setState({ isSubItemsOpened: !this.state.isSubItemsOpened });
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isSubItemsOpened' does not exist on type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isChecked' implicitly has an 'any' type... Remove this comment to see the full error message
    onSelectDeselectCategory(isChecked) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        const { category, checkUncheckGroup } = this.props;
        checkUncheckGroup(category.id, isChecked);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
    getSearchValue() {
        const { searchValue } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        return searchValue && (searchValue.trim().length > 0 ? searchValue : false);
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'Readon... Remove this comment to see the full error message
            boardDetails,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragSource' does not exist on typ... Remove this comment to see the full error message
            category, // TODO: this is confusing. rename.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDropTarget' does not exist on typ... Remove this comment to see the full error message
            connectDragSource,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isDragging' does not exist on type 'Read... Remove this comment to see the full error message
            connectDropTarget,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onWaypointEnter' does not exist on type ... Remove this comment to see the full error message
            connectDragPreview,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkUncheckItem' does not exist on type... Remove this comment to see the full error message
            isDragging,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveItem' does not exist on type 'Readon... Remove this comment to see the full error message
            groupRef,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'competitors' does not exist on type 'Rea... Remove this comment to see the full error message
            onWaypointEnter,
            onWaypointLeave,
            checkUncheckItem,
            toggleCompetitors,
            moveItem,
            competitors,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            selectedCompetitors,
        } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        const isDragEnabled = isDraggable(category);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        if (!category || !category.items) {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
            return defaultErrorRender({}, 'Something went wrong. Try selecting reset columns.');
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        }

        const { isSubItemsOpened } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
        const categoryItems = category.items;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        const checked = categoryItems
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
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
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ opened: any; onClick: (e: any) => void; }'... Remove this comment to see the full error message */}
                    <CategoryTitle
                        anchor={connectDragSource(<div className="canDrag">{isDragEnabled && <AnchorBlock />}</div>)}
                        beChecked
                        checked={checked}
                        disabled={groupCheckDisabled}
                        plusMinus={
                            <div className="category-title-actions">
                                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                <MinusPlus opened={isSubItemsOpened} onClick={this.onPlusMinus} />
                            </div>
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        }
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        title={`${category.label}`}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        onClick={() => this.onSelectDeselectCategory(checked)}
                    />
                    {isSubItemsOpened && (
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                        <div className="category-items__items">
                            {(() => {
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                let { items } = category;
                                const searchValue = this.getSearchValue();
                                if (searchValue) {
                                    items = items.filter(
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                        item => item.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
                                    );
                                }
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                                if (category.key === 'spins' && competitors.length > 0) {
                                    items = orderBy(
                                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                                        items.filter(item => !item.labelTemplate).concat(competitors),
                                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                                        'order'
                                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                    );
                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                }
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                return items.map((item, key) => {
                                    let { label } = item;
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    if (label.includes('Consolidated')) {
                                        const { cmmFormat } = boardDetails.layout.board;

                                        label = `${cmmFormat || ''} ${label}`.trim();
                                    }

                                    return (
                                        item &&
                                        (item.hidden ? null : (
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            <CategoryItem
                                                key={item.id}
                                                canDrag={category.itemsDraggable}
                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                                checked={item.checked}
                                                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                                                disabled={item.disabled}
                                                customCategoryComponent={item.customCategoryComponent}
                                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                                                id={item.id}
                                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                                                index={key}
                                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                                                label={label}
                                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
                                                path={{ category: category.id }}
                                                selectedCompetitors={selectedCompetitors}
                                                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
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
