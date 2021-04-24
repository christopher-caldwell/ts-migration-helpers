import React from 'react';
import { shallow } from 'enzyme';

import BoardPagination from './BoardPagination.component';

const renderBoardPagination = (options = {}) => shallow(
    <BoardPagination
        numPages={options.numPages || 10}
        page={options.page || 1}
        size={options.size || 12}
        handlePaginate={options.handlePaginate || (() => {})}
    />,
);

describe('<BoardPagination />', () => {
    it('should render only skip button', () => {
        const component = renderBoardPagination();
        expect(component.find('Button').length).toBe(1);
        expect(
            component
                .find('Button')
                .shallow()
                .text(),
        ).toBe('Skip 12');
    });

    it('should render both skip and back buttons', () => {
        const component = renderBoardPagination({ page: 2 });
        expect(component.find('Button').length).toBe(2);
        expect(
            component
                .find('Button')
                .first()
                .shallow()
                .text(),
        ).toBe('Back 12');
        expect(
            component
                .find('Button')
                .last()
                .shallow()
                .text(),
        ).toBe('Skip 12');
    });

    it('should render only back button', () => {
        const component = renderBoardPagination({ page: 10 });
        expect(component.find('Button').length).toBe(1);
        expect(
            component
                .find('Button')
                .shallow()
                .text(),
        ).toBe('Back 12');
    });

    it('clicking skip button on fist page should call handlePaginate with next page number', () => {
        const handlePaginateMock = jest.fn();
        const component = renderBoardPagination({ handlePaginate: handlePaginateMock });
        component
            .find('Button')
            .shallow()
            .simulate('click');
        expect(handlePaginateMock).toHaveBeenCalledWith(2);
    });
});
