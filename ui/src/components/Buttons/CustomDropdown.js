import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownButton } from 'react-bootstrap';

const CustomDropdown = ({
    id,
    iconName,
    className,
    isSelected,
    isOpened,
    onClick,
    onToggle,
    children,
}) => (
    <div className="custom-dropdown">
        <DropdownButton
            className="ml-btn-dropdown"
            onClick={onClick}
            onToggle={onToggle}
            noCaret
            title={
                <div
                    className={classNames('ml-btn-dropdown-group', `${className}`, {
                        'ml-btn-icon-selected': isSelected,
                    })}
                >
                    <i className={`fa ${iconName}`} aria-hidden="true" />
                    <i className={`icon fa fa-angle-${isOpened ? 'down' : 'up'}`} />
                </div>
            }
            bsSize="small"
            id={id}
        >
            <div className="dropdown-body">
                <div className="dropdown-body__header set-border">
                    <h5 className="dropdown-body__title">Apply Filters</h5>
                </div>
                {children}
            </div>
        </DropdownButton>
    </div>
);

CustomDropdown.propTypes = {
    iconName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isOpened: PropTypes.bool,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    onToggle: PropTypes.func,
};

CustomDropdown.defaultProps = {
    className: '',
    disabled: false,
    isSelected: false,
    isOpened: false,
    onClick: () => {},
    onToggle: () => {},
    children: null,
};

export default CustomDropdown;
