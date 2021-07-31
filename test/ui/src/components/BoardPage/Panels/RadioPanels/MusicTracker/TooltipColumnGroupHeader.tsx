// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';

class TooltipColumnGroupHeader extends Component {
    static propTypes = {
        headerText: PropTypes.string,
        tooltip: PropTypes.string,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'headerText' does not exist on type 'Read... Remove this comment to see the full error message
        tooltipTitle: PropTypes.string,
    };

    static defaultProps = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'headerText' does not exist on type 'Read... Remove this comment to see the full error message
        headerText: '',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tooltip' does not exist on type 'Readonl... Remove this comment to see the full error message
        tooltip: '',
        tooltipTitle: '',
    };

    render() {
        const { headerText, tooltip, tooltipTitle } = this.props;

        const info = (
            <Tooltip id={shortid.generate()}>
                <div className="mt-tooltip">
                    <span className="fa fa-info-circle data-type-info" />
                    <div className="mt-tooltip-content">
                        <span className="mt-tooltip-content-title">{tooltipTitle}</span>
                        <p className="mt-tooltip-content-text">{tooltip}</p>
                    </div>
                </div>
            </Tooltip>
        );

        return (
            <div className="column-group-header-cell">
                <div className="column-group-header-text-container">
                    <OverlayTrigger overlay={info} placement="left">
                        <span>{headerText}</span>
                    </OverlayTrigger>
                </div>
            </div>
        );
    }
}

export default TooltipColumnGroupHeader;
