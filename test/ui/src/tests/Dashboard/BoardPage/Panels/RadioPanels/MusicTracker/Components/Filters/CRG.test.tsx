import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleSelect' does not exist on type '{}... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleSelect: any; selectedItems: any; onC... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleSelect' does not exist on type '{}... Remove this comment to see the full error message
import CRG from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/Filters/CRG';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedItems' does not exist on type '{... Remove this comment to see the full error message

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleSelect: any; selectedItems: any; onC... Remove this comment to see the full error message
const renderCRG = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClick' does not exist on type '{}'.
    shallow(
        <CRG
            handleSelect={options.handleSelect}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleSelect: any; selectedItems: any; onC... Remove this comment to see the full error message
            selectedItems={options.selectedItems}
            onClick={options.onClick}
        />,
    )
);

describe('<Category />', () => {
    it('Should component render', () => {
        const mockHandleSelect = jest.fn();
        const mockOnClick = jest.fn();
        const component = renderCRG({
            handleSelect: mockHandleSelect,
            selectedItems: ['test1', 'test2', 'test3'],
            onClick: mockOnClick,
        });
        expect(component.find('.crg-filter')).toHaveLength(1);
    });
    it('Click should trigger handleSelect', () => {
        const mockHandleSelect = jest.fn();
        const mockOnClick = jest.fn();
        const component = renderCRG({
            handleSelect: mockHandleSelect,
            selectedItems: ['test1', 'test2', 'test3'],
            onClick: mockOnClick,
        });
        component.find('button[value|=\'C\']').simulate('click');
        expect(mockHandleSelect).toBeCalled();
    });
});
