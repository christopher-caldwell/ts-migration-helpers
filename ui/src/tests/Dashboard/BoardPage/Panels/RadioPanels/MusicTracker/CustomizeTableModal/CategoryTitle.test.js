import React from 'react';
import { shallow } from 'enzyme';
import CategoryTitle from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/CategoryTitle';


const renderCategoryTitle = (options = {}) => (
    shallow(
        <CategoryTitle
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
