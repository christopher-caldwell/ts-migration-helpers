import React from 'react';
import { shallow } from 'enzyme';

import CustomizeSearchForm from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/CustomizeSearchForm';

const renderCustomizeSearchForm = (options = {}) => (
    shallow(
        <CustomizeSearchForm
            resetColumns={options.resetColumns || (() => {})}
            onChange={options.onChange || (() => {})}
        />,
    )
);

describe('<CustomizeSearchForm />', () => {
    it('should render component', () => {
        const component = renderCustomizeSearchForm();
        expect(component.find('.customize-search-form')).toHaveLength(1);
    });

    it('inputting text to search field should trigger a onChange', done => {
        const mockOnSearchValue = jest.fn();
        const component = renderCustomizeSearchForm({ onChange: mockOnSearchValue });
        const testString = 'test string';
        component.find('input').simulate('change', { target: { value: testString } });
        setTimeout(() => {
            expect(mockOnSearchValue).toHaveBeenCalled();
            done();
        }, 600);
    });
});
