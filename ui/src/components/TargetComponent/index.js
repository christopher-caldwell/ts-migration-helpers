import React from 'react';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import PropTypes from 'prop-types';
import { chain } from 'lodash';

const TargetComponent = ({ navbar }) => {
    const warningHasNoItemActive = () => {
        if (!navbar.length) {
            return;
        }

        const hasNoItemActive = chain(navbar)
            .find(['active', true])
            .isEmpty()
            .value();

        if (hasNoItemActive) {
            console.error(new Error('TargetCompoent - Does not have any active items in the navigation bar.'));
        }
    };

    const renderTargetComponent = () => chain(navbar)
        .find(['active', true])
        .get('targetComponent')
        .value() || LoadingIndicator;

    warningHasNoItemActive();
    const RenderComponent = renderTargetComponent();

    return <RenderComponent />;
};

TargetComponent.propTypes = {
    navbar: PropTypes.arrayOf(
        PropTypes.shape({
            active: PropTypes.bool,
            targetComponent: PropTypes.func,
        }),
    ).isRequired,
};

export default TargetComponent;
