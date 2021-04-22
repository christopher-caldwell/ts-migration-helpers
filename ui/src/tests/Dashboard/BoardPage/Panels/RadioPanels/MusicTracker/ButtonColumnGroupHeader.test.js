import React from 'react';
import { shallow } from 'enzyme';
import ButtonColumnGroupHeader from 'components/BoardPage/Panels/RadioPanels/MusicTracker/ButtonColumnGroupHeader';


const renderButtonColumnGroupHeader = (options = {}) => (
    shallow(
        <ButtonColumnGroupHeader
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
