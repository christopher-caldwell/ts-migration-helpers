import React from 'react';

import PropTypes from 'prop-types';
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
    };

    static defaultProps = {
        canConfigure: false,
        children: undefined,
        className: undefined,
        printing: false,
        printingError: false,
        onConfigSave: () => {},
        onExpandOpen: null,
        onPrint: null,
    };

    constructor() {
        super();

        this.state = {
            showConfig: false,
        };

        this.onConfigClose = this.onConfigClose.bind(this);
        this.onConfigOpen = this.onConfigOpen.bind(this);
        this.onConfigSave = this.onConfigSave.bind(this);
    }

    onConfigOpen() {
        this.setState({ showConfig: true });
    }

    onConfigClose() {
        this.setState({ showConfig: false });
    }

    onConfigSave(config) {
        const { objectPath, onConfigSave } = this.props;

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
