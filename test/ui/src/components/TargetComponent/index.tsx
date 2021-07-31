import React from 'react';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import { chain } from 'lodash';

type Props = {
    navbar: {
        active?: boolean;
        targetComponent?: (...args: any[]) => any;
    }[];
};

const TargetComponent = ({ navbar }: Props) => {
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

export default TargetComponent;
