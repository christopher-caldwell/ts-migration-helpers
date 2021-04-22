import React from 'react';
import { shallow } from 'enzyme';

import CRG from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Components/Filters/CRG';

const renderCRG = (options = {}) => (
    shallow(
        <CRG
            handleSelect={options.handleSelect}
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
