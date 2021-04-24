import React from 'react';

import classNames from 'classnames';
import { Modal } from 'react-bootstrap';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import PanelOptions from 'components/Configuration/ObjectOptions';

const boxSource = {
    beginDrag(props) {
        return props;
    },
};

const boxTarget = {
    drop(props, monitor) {
        // Trigger onDrop only if swapping different panels
        if (props.id !== monitor.getItem().id) {
            props.onDrop({ ...props, targetType: 'panel' }, monitor.getItem());
        }

        return props;
    },
};

class Panel extends React.Component {
    state = {
        printing: false,
        printingError: false,
        showExpand: false,
    };

    onExpandClose = () => this.setState({ showExpand: false });

    onExpandOpen = () => this.setState({ showExpand: true });

    renderModal() {
        const { children, className, config } = this.props;
        const { showExpand } = this.state;

        const modalClassName = classNames({
            'panel-expanded': true,
            [`modal-${className}`]: true,
        });

        return (
            <Modal bsSize="large" className={modalClassName} show={showExpand} onHide={this.onExpandClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{config.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        );
    }

    render() {
        const {
            canConfigure,
            canDrop,
            children,
            className,
            config,
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
        const titleClass = classNames({
            'panel-title': true,
            'panel-title-can-drag': canConfigure,
        });
        const title = (
            <h2 className={titleClass} title={canConfigure ? 'Move panel' : null}>
                {config.name}
            </h2>
        );

        return (
            <div
                className="panel-container"
                ref={c => {
                    this.panel = c;
                }}
            >
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
                            <div className="panel-body">{children}</div>
                        </div>
                    )
                )}
                {this.renderModal()}
            </div>
        );
    }
}

Panel.propTypes = {
    canDrop: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
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
