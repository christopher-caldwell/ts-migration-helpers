// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'beChecked' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type '{}'.
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'beChecked' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'beChecked' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type '{}... Remove this comment to see the full error message
import ButtonColumnGroupHeader from 'components/BoardPage/Panels/RadioPanels/MusicTracker/ButtonColumnGroupHeader';


// @ts-expect-error ts-migrate(2339) FIXME: Property 'beChecked' does not exist on type '{}'.
const renderButtonColumnGroupHeader = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
    shallow(
        <ButtonColumnGroupHeader
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type '{}... Remove this comment to see the full error message
            buttonText={options.beChecked || 'test buttonText'}
            disabled={options.checked || true}
            headerText={options.beChecked || 'test headerText'}
            loading={options.onClick || true}
            onButtonClick={options.onFilterSave || (() => {})}
        />,
    )
);

describe('<ButtonColumnGroupHeader />', () => {
    it('should render component', () => {
        const component = renderButtonColumnGroupHeader();
        expect(component.find('.column-group-header-text-container').text()).toBe('test headerText');
    });
});
