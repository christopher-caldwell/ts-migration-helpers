// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ resetColumns: any; onChange: any; }' is no... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ resetColumns: any; onChange: any; }' is no... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetColumns' does not exist on type '{}... Remove this comment to see the full error message
import CustomizeSearchForm from 'components/BoardPage/Panels/RadioPanels/MusicTracker/CustomizeTableModal/CustomizeSearchForm';

const renderCustomizeSearchForm = (options = {}) => (
    shallow(
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ resetColumns: any; onChange: any; }' is no... Remove this comment to see the full error message
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
