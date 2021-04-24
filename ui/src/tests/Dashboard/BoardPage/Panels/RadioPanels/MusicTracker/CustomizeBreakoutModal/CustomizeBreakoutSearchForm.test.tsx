import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CustomizeBreakoutSearchForm from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeBreakoutModal/CustomizeBreakoutSearchForm';

const mockStore = configureStore();
const store = mockStore({
    songVersions: [],
});

const renderCustomizeBreakoutSearchForm = (options = {}) => (
    shallow(
        <CustomizeBreakoutSearchForm
            onChange={options.onChange || (() => {})}
            onReset={options.onReset || (() => {})}
            store={store}
        />,
    ).dive()
);

describe('<CustomizeBreakoutSearchForm />', () => {
    it('should render component', () => {
        const component = renderCustomizeBreakoutSearchForm();
        expect(component.find('.customize-text-search')).toHaveLength(1);
    });

    it('onChange event should work', () => {
        const mockOnChange = jest.fn();
        const component = renderCustomizeBreakoutSearchForm({ onChange: mockOnChange });
        component.find('input').simulate('change', { target: { value: 'SIT' } });
        expect(mockOnChange).toHaveBeenCalled();
    });
});
