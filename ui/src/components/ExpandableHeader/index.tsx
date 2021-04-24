import React from 'react';

import PropTypes from 'prop-types';
import { Panel, OverlayTrigger, Tooltip } from 'react-bootstrap';

const ExpandableHeader = props => (
    <div className="ml-accordion expandable-header">
        <Panel expanded={props.expanded} onToggle={props.onToggle}>
            <Panel.Heading>
                <Panel.Title toggle>
                    <div className="expandable-header__wrapper">
                        <span className="accordion-arrow expandable-header__arrow" />
                        <span className="expandable-header__title">
                            {props.title}
                            {props.description && (
                                <OverlayTrigger
                                    overlay={(
                                        <Tooltip id={`${props.title}-tooltip`}>
                                            <div className="mt-tooltip">
                                                <span className="fa fa-info-circle data-type-info" />
                                                <div className="mt-tooltip-content">
                                                    <span className="mt-tooltip-content-text">
                                                        {props.descriptionTooltipMessage}
                                                    </span>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )}
                                >
                                    <span className="expandable-header__description">{props.description}</span>
                                </OverlayTrigger>
                            )}
                        </span>
                    </div>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
                <Panel.Body>{props.children}</Panel.Body>
            </Panel.Collapse>
        </Panel>
    </div>
);

ExpandableHeader.propTypes = {
    children: PropTypes.node.isRequired,
    expanded: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    description: PropTypes.string,
    descriptionTooltipMessage: PropTypes.string,
};

ExpandableHeader.defaultProps = {
    description: '',
    descriptionTooltipMessage: '',
};

export default ExpandableHeader;
