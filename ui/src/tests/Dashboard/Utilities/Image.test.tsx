import React from 'react';
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
