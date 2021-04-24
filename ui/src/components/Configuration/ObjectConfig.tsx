import React from 'react';

import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

class ObjectConfig extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        config: PropTypes.objectOf(PropTypes.any).isRequired,
        show: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onSave: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        const form = {};
        Object.keys(props.config).forEach(key => {
            form[key] = props.config[key];
        });

        this.state = {
            form,
        };

        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { form } = this.state;

        form[event.target.name] = event.target.value;

        this.setState({ form });
    }

    onSave() {
        const { onSave } = this.props;

        onSave(this.state.form);
    }

    onSubmit(event) {
        event.preventDefault();

        this.onSave();
    }

    renderControls() {
        const { children } = this.props;
        const { form } = this.state;

        return React.Children.map(children, Control => {
            const { name } = Control.props;

            return React.cloneElement(Control, {
                value: form[name],
                onChange: this.onChange,
            });
        });
    }

    render() {
        const { show, onClose } = this.props;

        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Configure Board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>{this.renderControls()}</form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={this.onSave}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ObjectConfig;
