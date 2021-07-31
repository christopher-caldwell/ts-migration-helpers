import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import classNames from 'classnames';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import { Modal } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'monitor' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'monitor' implicitly has an 'any' type.
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import PanelOptions from 'components/Configuration/ObjectOptions';

const boxSource = {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    beginDrag(props) {
        return props;
    },
};

const boxTarget = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    drop(props, monitor) {
        // Trigger onDrop only if swapping different panels
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
        if (props.id !== monitor.getItem().id) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'canConfigure' does not exist on type 'Re... Remove this comment to see the full error message
            props.onDrop({ ...props, targetType: 'panel' }, monitor.getItem());
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canDrop' does not exist on type 'Readonl... Remove this comment to see the full error message
        return props;
    },
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
class Panel extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'config' does not exist on type 'Readonly... Remove this comment to see the full error message
    state = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'configControls' does not exist on type '... Remove this comment to see the full error message
        printing: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragSource' does not exist on typ... Remove this comment to see the full error message
        printingError: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragPreview' does not exist on ty... Remove this comment to see the full error message
        showExpand: false,
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDropTarget' does not exist on typ... Remove this comment to see the full error message
    onExpandClose = () => this.setState({ showExpand: false });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isOver' does not exist on type 'Readonly... Remove this comment to see the full error message
    onExpandOpen = () => this.setState({ showExpand: true });

    renderModal() {
        const { children, className, config } = this.props;
        const { showExpand } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canConfigure' does not exist on type 'Re... Remove this comment to see the full error message
        const modalClassName = classNames({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'canDrop' does not exist on type 'Readonl... Remove this comment to see the full error message
            'panel-expanded': true,
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            [`modal-${className}`]: true,
        });
// @ts-expect-error ts-migrate(2339) FIXME: Property 'panel' does not exist on type 'Panel'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'config' does not exist on type 'Readonly... Remove this comment to see the full error message

        return (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'configControls' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'config' is missing in type '{ children: ... Remove this comment to see the full error message
            <Modal bsSize="large" className={modalClassName} show={showExpand} onHide={this.onExpandClose}>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Readonly<{}>... Remove this comment to see the full error message */}
                <Modal.Header closeButton>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'isOver' does not exist on type 'Readonly... Remove this comment to see the full error message */}
                    <Modal.Title>{config.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        );
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canConfigure' does not exist on type 'Re... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canDrop' does not exist on type 'Readonl... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
            canConfigure,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'panel' does not exist on type 'Panel'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'configControls' does not exist on type '... Remove this comment to see the full error message
            canDrop,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDragPreview' does not exist on ty... Remove this comment to see the full error message
            children,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'config' is missing in type '{ children: ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'connectDropTarget' does not exist on typ... Remove this comment to see the full error message
            className,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Readonly<{}>... Remove this comment to see the full error message
            config,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isOver' does not exist on type 'Readonly... Remove this comment to see the full error message
            configControls,
            connectDragSource,
            connectDragPreview,
            connectDropTarget,
            id,
            isDragging,
            isOver,
        } = this.props;
        const { printing, printingError } = this.state;
        const panelClass = classNames({
            panel: true,
            'panel-is-dragging': isDragging,
            'panel-can-drop': !isDragging && canDrop,
            'panel-is-active': !isDragging && canDrop && isOver,
            [className]: className !== '',
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
        const titleClass = classNames({
            'panel-title': true,
            'panel-title-can-drag': canConfigure,
        });
        const title = (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'panel' does not exist on type 'Panel'.
            <h2 className={titleClass} title={canConfigure ? 'Move panel' : null}>
                {config.name}
            </h2>
        );

        return (
            <div
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                className="panel-container"
                ref={c => {
                    this.panel = c;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2741) FIXME: Property 'config' is missing in type '{ children: ... Remove this comment to see the full error message
                }}
            >
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type. */}
                {connectDragPreview(
                    connectDropTarget(
                        <div className={panelClass}>
                            <div className="panel-heading">
                                {canConfigure ? connectDragSource(title) : title}
                                <PanelOptions
                                    {...this.props}
                                    className="panel-tools"
                                    objectPath={{ panelId: id }}
                                    printing={printing}
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                    printingError={printingError}
                                    onExpandOpen={this.onExpandOpen}
                                >
                                    {React.Children.map(configControls, control =>
                                        React.cloneElement(control, {
                                            key: control.name,
                                        })
                                    )}
                                </PanelOptions>
                            </div>
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                            <div className="panel-body">{children}</div>
                        </div>
                    )
                )}
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type. */}
                {this.renderModal()}
            </div>
        );
    }
}

Panel.propTypes = {
    canDrop: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'connect' implicitly has an 'any' type.
    config: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    canConfigure: PropTypes.bool,
    className: PropTypes.string,
    configControls: PropTypes.node,
};

Panel.defaultProps = {
    canConfigure: false,
    className: '',
    configControls: undefined,
};

export default dropTarget('panel', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(
    dragSource('panel', boxSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }))(Panel)
);
