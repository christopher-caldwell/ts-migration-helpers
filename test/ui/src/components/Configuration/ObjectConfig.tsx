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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        super(props);
        const form = {};
        Object.keys(props.config).forEach(key => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type 'Readonly... Remove this comment to see the full error message
            form[key] = props.config[key];
        });

        this.state = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            form,
        };

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
        this.onChange = this.onChange.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.onSave = this.onSave.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type 'Readonly... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    onChange(event) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { form } = this.state;

        // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
        form[event.target.name] = event.target.value;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'string | ... Remove this comment to see the full error message
        this.setState({ form });
    }

    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    onSave() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSave' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { onSave } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        onSave(this.state.form);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    onSubmit(event) {
        event.preventDefault();

        this.onSave();
    }

    renderControls() {
        const { children } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'form' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { form } = this.state;

        return React.Children.map(children, Control => {
            // @ts-expect-error ts-migrate(2533) FIXME: Object is possibly 'null' or 'undefined'.
            const { name } = Control.props;

            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            return React.cloneElement(Control, {
                value: form[name],
                onChange: this.onChange,
            });
        });
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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
