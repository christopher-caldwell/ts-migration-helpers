import React from 'react';
import { shallow } from 'enzyme';

import AsideModal from 'components/AsideModal';

const renderAsideModal = (options = {}) => (
    shallow(
        <AsideModal
            asideModalOpened={options.asideModalOpened}
            title={options.title || 'test title'}
        />,
    )
);

describe('<AsideModal />', () => {
    it('should render opened modal with correct structure', () => {
        const component = renderAsideModal({ asideModalOpened: true });
        expect(component.find('.aside-modal')).toHaveLength(1);
        expect(component.find('.aside-modal--open')).toHaveLength(1);
        expect(component.find('h5').text()).toBe('test title');
        component.find('IconX').simulate('click');
    });

    it('should render closed modal', () => {
        const component = renderAsideModal({ asideModalOpened: false });
        component.update({ test: true });
        expect(component.find('.aside-modal')).toHaveLength(1);
        expect(component.find('.aside-modal--open')).toHaveLength(0);
        expect(component.find('.aside-modal__sub-header')).toHaveLength(0);
        expect(component.find('.aside-modal__content')).toHaveLength(1);
    });

    it('should test component update', () => {
        const component = renderAsideModal({ asideModalOpened: false });
        const shouldUpdate = component.instance().shouldComponentUpdate({}, {});
        expect(shouldUpdate).toBe(true);
    });
});
