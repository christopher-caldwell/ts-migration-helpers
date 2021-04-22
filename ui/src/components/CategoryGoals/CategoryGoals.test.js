import React from 'react';
import { mount } from 'enzyme';
import CategoryGoals from './CategoryGoals.component';

jest.mock('components/MusicLabOverlay', () => () => <div />);

const mockBoardDetails = {
    layout: {
        board: { id: 1 },
    },
};

const mockCategoriesMetadata = {
    data: {
        12: {
            id: 12,
            description: '85-89 Power',
            label: '81',
            orderBy: 390,
            groupId: '5',
            group: '1970s - 1980s',
            readOnly: false,
        },
        13: {
            id: 13,
            description: '80-84 Power',
            label: '82',
            orderBy: 400,
            groupId: '5',
            group: '1970s - 1980s',
            readOnly: false,
        },
    },
};

const mockStationCategories = {
    data: {
        12: {
            active: true,
            limit: '2',
        },
    },
};

const renderCategoryGoalsComponent = (options = {}) => mount(
    <CategoryGoals
        boardDetails={options.boardDetails || mockBoardDetails}
        categoriesMetadata={options.categoriesMetadata || mockCategoriesMetadata}
        stationCategories={options.stationCategories || mockStationCategories}
        closeCategoryGoals={options.closeCategoryGoals || (() => {})}
        updateStationCategoriesAction={options.updateStationCategoriesAction || (() => {})}
    />,
);

describe('<CategoryGoals />', () => {
    it('should render component correctly', () => {
        const component = renderCategoryGoalsComponent();
        expect(component).toBeDefined();
        expect(component.find('h5')).toHaveLength(1);
        expect(component.find('h5').text()).toBe('Category Goals');
        expect(component.find('StationHeader')).toHaveLength(1);
        expect(component.find('CategoryGoalsTable')).toHaveLength(1);
    });

    it('apply button should start disabled', () => {
        const component = renderCategoryGoalsComponent();
        const applyButton = component.find('button').at(2);
        expect(applyButton.text()).toBe('Apply');
        expect(applyButton.prop('disabled')).toBeTruthy();
    });

    it('clicking on the apply button should call the correct action', () => {
        const mockAction = jest.fn();
        const component = renderCategoryGoalsComponent({ updateStationCategoriesAction: mockAction });
        expect(component.find('button').at(2).text()).toBe('Apply');
        expect(component.find('button').at(2).prop('disabled')).toBeTruthy();
        const firstInput = component.find('CategoryGoalsTable').find('input').at(0);
        expect(firstInput.prop('disabled')).toBeFalsy();
        firstInput.simulate('change', { target: { value: '5' } });
        expect(component.find('button').at(2).text()).toBe('Apply');
        expect(component.find('button').at(2).prop('disabled')).toBeFalsy();
        component.find('button').at(2).simulate('click');
        expect(mockAction).toHaveBeenCalled();
    });

    it('clicking on the X button should call the close action', () => {
        const mockClose = jest.fn();
        const component = renderCategoryGoalsComponent({ closeCategoryGoals: mockClose });
        component.find('button').at(0).simulate('click');
        expect(mockClose).toHaveBeenCalled();
    });

    it('clicking on the close button should call the close action', () => {
        const mockClose = jest.fn();
        const component = renderCategoryGoalsComponent({ closeCategoryGoals: mockClose });
        component.find('button').at(1).simulate('click');
        expect(mockClose).toHaveBeenCalled();
    });
});
