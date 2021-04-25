// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'isSelected' implicitly has an 'an... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'onClick' implicitly has an 'any' ... Remove this comment to see the full error message
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
