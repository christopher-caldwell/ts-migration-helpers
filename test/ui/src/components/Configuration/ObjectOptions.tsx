import React from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import { Dropdown, MenuItem } from 'react-bootstrap';
import shortid from 'shortid';

import ObjectConfig from './ObjectConfig';

/* eslint-disable no-script-url */

class ObjectOptions extends React.Component {
    static propTypes = {
        config: PropTypes.objectOf(PropTypes.any).isRequired,
        objectPath: PropTypes.objectOf(PropTypes.any).isRequired,

        canConfigure: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        printing: PropTypes.bool,
        printingError: PropTypes.bool,
        onConfigSave: PropTypes.func,
        onExpandOpen: PropTypes.func,
        onPrint: PropTypes.func,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    };

    static defaultProps = {
        canConfigure: false,
        children: undefined,
        className: undefined,
        printing: false,
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        printingError: false,
        onConfigSave: () => {},
        onExpandOpen: null,
        onPrint: null,
    };

    constructor() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'config' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onConfigSave' does not exist on type 'Re... Remove this comment to see the full error message
        super();

        this.state = {
            showConfig: false,
        };

        this.onConfigClose = this.onConfigClose.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canConfigure' does not exist on type 'Re... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'config' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'printingError' does not exist on type 'R... Remove this comment to see the full error message
        this.onConfigOpen = this.onConfigOpen.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onPrint' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'objectPath' does not exist on type 'Read... Remove this comment to see the full error message
        this.onConfigSave = this.onConfigSave.bind(this);
    }

    onConfigOpen() {
        this.setState({ showConfig: true });
    }

    onConfigClose() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canConfigure' does not exist on type 'Re... Remove this comment to see the full error message
        this.setState({ showConfig: false });
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'Reado... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'config' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onExpandOpen' does not exist on type 'Re... Remove this comment to see the full error message
    onConfigSave(config) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onPrint' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { objectPath, onConfigSave } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showConfig' does not exist on type 'Read... Remove this comment to see the full error message
        onConfigSave(objectPath, config);

        this.onConfigClose();
    }

    render() {
        const {
            canConfigure,
            children,
            className,
            printing,
            printingError,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'showConfig' does not exist on type 'Read... Remove this comment to see the full error message
            config,
            onExpandOpen,
            onPrint,
        } = this.props;
        const { showConfig } = this.state;

        const toggleClass = classNames({
            fa: true,
            'fa-ellipsis-v': !printing,
            'fa-refresh': printing,
            'fa-spin': printing,
            'fa-warning': printingError,
        });
        const title = printingError ? 'An unexpected error occurred. Try again?' : 'Options';

        return (
            <div className={className}>
                <Dropdown id={shortid.generate()} pullRight>
                    <Dropdown.Toggle className="btn-icon" noCaret title={title}>
                        <i className={toggleClass} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem disabled={printing} onSelect={onPrint}>
                            Print
                        </MenuItem>
                        {canConfigure ? <MenuItem onSelect={this.onConfigOpen}>Configure</MenuItem> : null}
                        {onExpandOpen ? <MenuItem onSelect={onExpandOpen}>Expand</MenuItem> : null}
                    </Dropdown.Menu>
                </Dropdown>
                {canConfigure ? (
                    <ObjectConfig
                        config={config}
                        show={showConfig}
                        onClose={this.onConfigClose}
                        onSave={this.onConfigSave}
                    >
                        {children}
                    </ObjectConfig>
                ) : null}
            </div>
        );
    }
}

export default ObjectOptions;
