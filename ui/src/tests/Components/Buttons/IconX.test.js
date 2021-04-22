import React from 'react';
import { shallow } from 'enzyme';

import IconX from 'components/Buttons/IconX';

describe('Render IconX component', () => {
    it('Should create a x button with default values', () => {
        const component = shallow(
            <IconX />,
        );
        expect(component.find('.x-button')).toHaveLength(1);
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(0);
        expect(typeof component.props().onClick).toBe('function');
    });

    it('Should create a x button with x icon', () => {
        const component = shallow(
            <IconX className="x-icon" disabled={false} onClick={() => {}} />,
        );

        expect(component.find('.x-icon')).toHaveLength(1);
    });

    it('Should create a x button with disabled true', () => {
        const component = shallow(
            <IconX className="x-icon" disabled onClick={() => {}} />,
        );
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(1);
    });

    it('Should create a x button with disabled false', () => {
        const component = shallow(
            <IconX className="x-icon" disabled={false} onClick={() => {}} />,
        );
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(0);
    });

    it('Should create a x button with onClick event', () => {
        const mock = jest.fn();
        const component = shallow(
            <IconX className="x-icon" disabled={false} onClick={mock} />,
        );
        component.simulate('click');
        expect(mock).toHaveBeenCalled();
    });

    it('should have default onClick', () => {
        IconX.defaultProps.onClick();
        expect(IconX.defaultProps.onClick).toBeDefined();
    });
});
