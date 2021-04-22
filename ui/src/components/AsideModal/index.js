import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconX from '../Buttons/IconX';

class AsideModal extends Component {
    shouldComponentUpdate(nextProps) {
        const {
            asideModalOpened: asideModalOpenedNext,
            title: titleNext,
            children: childrenNext,
        } = nextProps;
        const { asideModalOpened, title, children } = this.props;

        return (
            title !== titleNext ||
            asideModalOpened !== asideModalOpenedNext ||
            children !== childrenNext
        );
    }

    render() {
        const {
            asideModalOpened,
            children,
            title,
            subtitle,
            handleClose,
            musicTracker,
        } = this.props;

        return (
            <div
                className={classNames('aside-modal', {
                    'aside-modal--open': asideModalOpened,
                })}
            >
                <div className="aside-modal__header">
                    <IconX onClick={() => handleClose()} className="btn-close" />
                    <h5>{title}</h5>
                </div>
                <div className="aside-modal__content">
                    {subtitle && (
                        <div className="aside-modal__sub-header">
                            <h6 className="aside-modal__sub-header--title">{subtitle}</h6>
                        </div>
                    )}
                    <div
                        className={classNames('aside-modal__children-content', {
                            'no-content-overflow': musicTracker,
                        })}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

AsideModal.propTypes = {
    asideModalOpened: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    handleClose: PropTypes.func,
    musicTracker: PropTypes.bool,
    subtitle: PropTypes.string,
};

AsideModal.defaultProps = {
    children: null,
    handleClose: () => {},
    subtitle: '',
    musicTracker: false,
};

export default AsideModal;
