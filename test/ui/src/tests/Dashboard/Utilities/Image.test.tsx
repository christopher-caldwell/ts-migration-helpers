// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onError' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onError' does not exist on type '{}'.
import { shallow } from 'enzyme';

import Image from 'components/Utilities/Image';

jest.mock('images/default.png', () => <div className="test-class" />);

const renderImage = (options = {}) => (
    shallow(
        <Image
            onError={options.onError || undefined}
            src="test src"
        />,
    )
);

describe('<Image />', () => {
    it('should render component', () => {
        const component = renderImage();
        expect(component.find('img')).toHaveLength(1);
    });

    it('default onError should be called', () => {
        const component = renderImage();
        component.simulate('error', {
            currentTarget: {
                src: 'test src',
            },
        });
        expect(component.find('.img')).toHaveLength(0);
    });

    it('onError should be called', () => {
        const onError = jest.fn();
        const component = renderImage({
            onError,
        });
        component.simulate('error');
        expect(onError).toHaveBeenCalled();
    });
});
