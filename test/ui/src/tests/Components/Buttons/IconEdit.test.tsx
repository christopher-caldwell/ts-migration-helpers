import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import IconEdit from 'components/Buttons/IconEdit';

describe('Render IconEdit component', () => {
    it('Should create a edit button with default values', () => {
        const component = shallow(
            <IconEdit />,
        );
        expect(component.find('.fa-pencil')).toHaveLength(1);
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(0);
        expect(typeof component.props().onClick).toBe('function');
    });

    it('Should create a edit button with arrow-up icon', () => {
        const component = shallow(
            <IconEdit className="arrow-up" disabled={false} onClick={() => { }} />,
        );
        expect(component.find('.arrow-up')).toHaveLength(1);
    });

    it('Should create a edit button with disabled true', () => {
        const component = shallow(
            <IconEdit className="arrow-up" disabled onClick={() => { }} />,
        );
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(1);
    });

    it('Should create a edit button with disabled false', () => {
        const component = shallow(
            <IconEdit className="arrow-up" disabled={false} onClick={() => { }} />,
        );
        expect(component.find('.ml-btn-icon--disabled')).toHaveLength(0);
    });

    it('Should create a edit button with onClick event', () => {
        const mock = jest.fn();
        const component = shallow(
            <IconEdit className="arrow-up" disabled={false} onClick={mock} />,
        );
        component.simulate('click');
        expect(mock).toHaveBeenCalled();
    });

    it('should have default onClick', () => {
        IconEdit.defaultProps.onClick();
        expect(IconEdit.defaultProps.onClick).toBeDefined();
    });
});
