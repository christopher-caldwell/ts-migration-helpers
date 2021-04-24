import React from 'react';

import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import AnchorBlock from './AnchorBlock';
import buildCustomComponent from './CustomElements';

const itemTarget = {
    hover(props, monitor, component) {
        const { index: dragIndex, id, category } = monitor.getItem();
        const {
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
        // Time to actually perform the action
        props.moveItem(hoverCategory, id, dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
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
                        <div className="category-item-actions">
                            <AnchorBlock />
                        </div>
                    )}
                </div>
            )
        );
};

CategoryItem.propTypes = {
    canDrag: PropTypes.bool.isRequired,
    checkUncheckItem: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isDragging: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    path: PropTypes.shape({
        category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    checked: PropTypes.bool,
    customCategoryComponent: PropTypes.string,
    disabled: PropTypes.bool,
};

CategoryItem.defaultProps = {
    checked: false,
    disabled: false,
    customCategoryComponent: undefined,
};

const DragS = DragSource(
    'category_item',
    {
        canDrag(props) {
            return props.canDrag;
        },
        isDragging(props, monitor) {
            return monitor.getItem().id === props.id;
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
