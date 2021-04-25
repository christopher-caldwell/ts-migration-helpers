import React, { Component } from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'monitor' implicitly has an 'any' type.
import classNames from 'classnames';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { DropTarget as dropTarget } from 'react-dnd';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
let scrolling = false;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'monitor' implicitly has an 'any' type.
const boxTarget = {
    hover(props, monitor) {
        const topBoundary = 50;
        const bottomBoundary = window.innerHeight;
        const boundaryPadding = 30;
        const scrollSpeed = 20;
        const clientY = monitor.getClientOffset().y;

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        let scrollDirection = 0;

        if (clientY <= topBoundary + boundaryPadding) {
            scrollDirection = -1;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canDrop' does not exist on type 'Readonl... Remove this comment to see the full error message
        } else if (bottomBoundary - clientY <= boundaryPadding) {
            scrollDirection = 1;
        }

        if (scrollDirection !== 0 && !scrolling) {
            scrolling = true;

            setTimeout(() => {
                window.scrollBy(0, scrollSpeed * scrollDirection);
                scrolling = false;
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
            }, 50);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canDrop' does not exist on type 'Readonl... Remove this comment to see the full error message
        }
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isOver' does not exist on type 'Readonly... Remove this comment to see the full error message
    },

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDropTarget' does not exist on typ... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type.
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
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type. */}
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
