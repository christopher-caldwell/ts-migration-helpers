// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/BoardPage/Panels/Ra... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/BoardPage/Panels/Ra... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onReset' does not exist on type '{}'.
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onChange' does not exist on type '{}'.
import configureStore from 'redux-mock-store';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onReset' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/BoardPage/Panels/Ra... Remove this comment to see the full error message
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
