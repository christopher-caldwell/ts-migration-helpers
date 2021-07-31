import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'beChecked' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type '{}'.
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'beChecked' does not exist on type '{}'.
import CategoryTitle from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/CategoryTitle';


// @ts-expect-error ts-migrate(2339) FIXME: Property 'checked' does not exist on type '{}'.
const renderCategoryTitle = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
    shallow(
        <CategoryTitle
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
            beChecked={options.beChecked || false}
            checked={options.checked || true}
            title={options.title || 'test title'}
            onClick={options.onClick || true}
        />,
    )
);

describe('<CategoryTitle />', () => {
    it('should render component', () => {
        const component = renderCategoryTitle();
        expect(component.find('.category-title-label').text()).toBe('test title');
    });
});
