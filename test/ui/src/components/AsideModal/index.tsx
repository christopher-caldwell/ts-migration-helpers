import React, { Component } from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'Readonly<... Remove this comment to see the full error message
import IconX from '../Buttons/IconX';

class AsideModal extends Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    shouldComponentUpdate(nextProps) {
        const {
            asideModalOpened: asideModalOpenedNext,
            title: titleNext,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
            children: childrenNext,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'Readonly<... Remove this comment to see the full error message
        } = nextProps;
        const { asideModalOpened, title, children } = this.props;

        return (
            title !== titleNext ||
            asideModalOpened !== asideModalOpenedNext ||
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
            children !== childrenNext
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'Readonly<... Remove this comment to see the full error message
        );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'subtitle' does not exist on type 'Readon... Remove this comment to see the full error message
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
        const {
            asideModalOpened,
            children,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
