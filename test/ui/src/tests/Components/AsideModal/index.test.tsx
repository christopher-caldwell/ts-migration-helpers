// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalOpened' does not exist on type... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
import { shallow } from 'enzyme';

import AsideModal from 'components/AsideModal';

const renderAsideModal = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
