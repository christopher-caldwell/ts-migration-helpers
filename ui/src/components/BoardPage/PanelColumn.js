import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropTarget as dropTarget } from 'react-dnd';

let scrolling = false;

const boxTarget = {
    hover(props, monitor) {
        const topBoundary = 50;
        const bottomBoundary = window.innerHeight;
        const boundaryPadding = 30;
        const scrollSpeed = 20;
        const clientY = monitor.getClientOffset().y;

        let scrollDirection = 0;

        if (clientY <= topBoundary + boundaryPadding) {
            scrollDirection = -1;
        } else if (bottomBoundary - clientY <= boundaryPadding) {
            scrollDirection = 1;
        }

        if (scrollDirection !== 0 && !scrolling) {
            scrolling = true;

            setTimeout(() => {
                window.scrollBy(0, scrollSpeed * scrollDirection);
                scrolling = false;
            }, 50);
        }
    },

    drop(props, monitor) {
        const hasDroppedOnChild = monitor.didDrop();

        if (hasDroppedOnChild) {
            return undefined;
        }

        props.onDrop(props, monitor.getItem());

        return props;
    },
};

class PanelColumn extends Component {
    static propTypes = {
        canDrop: PropTypes.bool.isRequired,
        children: PropTypes.node.isRequired,
        className: PropTypes.string.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
    };

    render() {
        const { canDrop, isOver, connectDropTarget, className, children } = this.props;
        const isActive = canDrop && isOver;

        const columnClassName = classNames({
            [className]: true,
            'panel-column': true,
            'panel-column-can-drop': canDrop,
            'panel-column-is-active': isActive,
        });

        return connectDropTarget(
            <div className={columnClassName}>
                {React.Children.count(children) > 0 ? children : <div className="panel-placeholder" />}
            </div>
        );
    }
}

export default dropTarget('panel', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
}))(PanelColumn);
