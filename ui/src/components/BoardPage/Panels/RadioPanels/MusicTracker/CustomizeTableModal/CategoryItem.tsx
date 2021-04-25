import React from 'react';

import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import AnchorBlock from './AnchorBlock';
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
import buildCustomComponent from './CustomElements';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoundingClientRect' does not exist on... Remove this comment to see the full error message
const itemTarget = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    hover(props, monitor, component) {
        const { index: dragIndex, id, category } = monitor.getItem();
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBoundingClientRect' does not exist on... Remove this comment to see the full error message
            index: hoverIndex,
            canDrag,
            path: { category: hoverCategory },
        } = props;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        if (category !== hoverCategory) {
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (!canDrag) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        if (dragIndex === undefined) {
            return;
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        // Time to actually perform the action
        props.moveItem(hoverCategory, id, dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        monitor.getItem().index = hoverIndex; // eslint-disable-line
    },
};

const CategoryItem = props => {
    const {
        path: { category: categoryId },
        id,
        checkUncheckItem,
        label,
        checked,
        disabled,
        connectDragSource,
        connectDropTarget,
        connectDragPreview,
        isDragging,
        canDrag,
        customCategoryComponent,
    } = props;

    const onCheckItem = () => checkUncheckItem(categoryId, id);

    return customCategoryComponent
        ? buildCustomComponent(customCategoryComponent, props)
        : connectDropTarget(
            connectDragPreview(
                <div
                    className={classNames('category-item', {
                        checked,
                        isDragging,
                        canDrag,
                    })}
                >
                    <Checkbox checked={checked} disabled={disabled} readOnly onClick={onCheckItem}>
                        {label}
                    </Checkbox>
                    {connectDragSource(
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                        <div className="category-item-actions">
                            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type. */}
                            <AnchorBlock />
                        </div>
                    )}
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type. */}
                </div>
            )
        );
};

CategoryItem.propTypes = {
    canDrag: PropTypes.bool.isRequired,
    checkUncheckItem: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    isDragging: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    path: PropTypes.shape({
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    checked: PropTypes.bool,
    customCategoryComponent: PropTypes.string,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
    disabled: PropTypes.bool,
};

CategoryItem.defaultProps = {
    checked: false,
    disabled: false,
    customCategoryComponent: undefined,
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
const DragS = DragSource(
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'monitor' implicitly has an 'any' type.
    'category_item',
    {
        canDrag(props) {
            return props.canDrag;
        },
        isDragging(props, monitor) {
            return monitor.getItem().id === props.id;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connecter' implicitly has an 'any' type... Remove this comment to see the full error message
        },
        beginDrag(props) {
            return {
                id: props.id,
                index: props.index,
                category: props.path.category,
            };
        },
    },
    (connecter, monitor) => ({
        connectDragSource: connecter.dragSource(),
        connectDragPreview: connecter.dragPreview(),
        isDragging: monitor.isDragging(),
    })
)(CategoryItem);

const collect = connecter => ({
    connectDropTarget: connecter.dropTarget(),
});

const DragT = DropTarget('category_item', itemTarget, collect)(DragS);
export default DragT;
