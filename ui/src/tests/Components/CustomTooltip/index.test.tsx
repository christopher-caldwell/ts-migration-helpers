import React from 'react';
import { shallow } from 'enzyme';

import CustomTooltip from 'components/CustomTooltip';

const renderCustomTooltip = (options = {}) => (
    shallow(
        <CustomTooltip
            message={options.message || 'test message'}
            title={options.title || 'test title'}
            type={options.type || 'warning'}
        />,
    )
);

describe('<CustomTooltip />', () => {
    it('should render warning tooltip', () => {
        const component = renderCustomTooltip();
        expect(component.find('.custom-tooltip__container')).toHaveLength(1);
        expect(component.find('.fa-exclamation-triangle')).toHaveLength(1);
    });

    it('should render error tooltip', () => {
        const component = renderCustomTooltip({
            type: 'error',
        });
        expect(component.find('.fa-times-circle')).toHaveLength(1);
        expect(component.find('.red')).toHaveLength(1);
    });

    it('handleMouseEnter should update state', () => {
        const component = renderCustomTooltip();
        component.setState({
            target: {
                setState: jest.fn(),
            },
        });
        const spyHandleMouseEnter = jest.spyOn(component.instance(), 'handleMouseEnter');
        component.instance().handleMouseEnter();
        expect(spyHandleMouseEnter).toHaveBeenCalled();
    });

    it('handleMouseLeave should update state', () => {
        const component = renderCustomTooltip();
        component.setState({
            target: {
                setState: jest.fn(),
            },
        });
        const spyHandleMouseLeave = jest.spyOn(component.instance(), 'handleMouseLeave');
        component.instance().handleMouseLeave();
        expect(spyHandleMouseLeave).toHaveBeenCalled();
    });

    it('should render info tooltip', () => {
        const component = renderCustomTooltip({
            type: 'info',
            title: 'test title',
            message: 'message for test render',
        });
        expect(component.find('.fa-info-circle')).toHaveLength(1);
        expect(component.find('.purpley')).toHaveLength(1);
    });
});
