import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import AssignDaypart from 'components/AsideModal/Panels/AssignDaypart';

jest.mock('stores/dayparts/daypartsActions', () => ({
    updateDaypart: () => ({ type: 'DAYPART_PENDING' }),
}));

const mockBoardDetails = {
    layout: {
        board: {
            id: 3323404,
            name: 'Z100',
            type: 'RadioBoard',
            config: {
                layout: [{ id: 'playlist-overview' }, { id: 'musictracker' }],
            },
            callLetters: 'WHTZ-FM',
            format: 'Top 40',
            market: 'New York',
        },
    },
};

const mockDayparts = [
    {
        id: 1,
        name: 'Daypart 1',
        synchronized: true,
        scheduling_order: 1,
        hours: [0, 1, 2, 8, 9],
    },
    {
        id: 2,
        name: 'Daypart 2',
        synchronized: true,
        scheduling_order: 2,
        hours: [99, 100, 101, 107, 108, 109],
    },
    {
        id: 3,
        name: 'Daypart 3',
        synchronized: false,
        scheduling_order: 3,
        hours: [],
    },
];

const mockSelectedHours = [120, 121, 122];

const mockStore = configureStore([thunk]);
const store = mockStore({
    boardDetails: mockBoardDetails,
});

const renderAssignDaypart = (options = {}) =>
    shallow(
        <AssignDaypart
            store={store}
            handleClose={options.handleClose || (() => {})}
            selectedHours={options.selectedHours || mockSelectedHours}
            dayparts={options.dayparts || mockDayparts}
        />
    ).dive();

describe('<AssignDaypart />', () => {
    it('should render component', () => {
        const component = renderAssignDaypart();
        expect(component.find('.assign-daypart')).toHaveLength(1);
        expect(component.find('AsideModalControls')).toHaveLength(1);
    });

    it('close button should trigger handleClose', () => {
        const mockHandleClose = jest.fn();
        const component = renderAssignDaypart({ handleClose: mockHandleClose });
        component.find('AsideModalControls').shallow().find('button').at(0).simulate('click');
        expect(mockHandleClose).toHaveBeenCalled();
    });

    it('should open with a daypart selected', () => {
        const component = renderAssignDaypart({ selectedHours: [107, 108, 109] });
        expect(component.state().daypartSelected.value).toBe(2);
        expect(component.state().daypartSelected.label).toBe('Daypart 2');
        expect(component.state().daypartEditId).toBe(2);
    });

    it('should select a daypart', () => {
        const component = renderAssignDaypart();
        component.find('Select').at(0).simulate('change', { value: 3, label: 'Daypart 3' });
        expect(component.state().daypartSelected.value).toBe(3);
        expect(component.state().daypartSelected.label).toBe('Daypart 3');
    });

    it('save button should trigger handleSave ', () => {
        const mockHandleClose = jest.fn();
        const component = renderAssignDaypart({ handleClose: mockHandleClose });
        component.find('Select').at(0).simulate('change', { value: 1, label: 'Daypart 1' });
        component.find('AsideModalControls').shallow().find('button').at(1).simulate('click');
        expect(mockHandleClose).toHaveBeenCalled();
    });

    it('should not shows the delete button when it is creating an assignment', () => {
        const component = renderAssignDaypart();
        expect(component.find('button.assign-daypart__btn-delete')).toHaveLength(0);
    });

    it('should shows the delete button when it is editing an assignment', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        expect(component.find('button.assign-daypart__btn-delete')).toHaveLength(1);
    });

    it('should click on delete button and shows the confirm overlay', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        component.find('button.assign-daypart__btn-delete').simulate('click');
        expect(component.state().confirmOverlayOpened).toBeTruthy();
        expect(component.find('ConfirmOverlay')).toHaveLength(1);
    });

    it('should cancel the delete action', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        component.find('button.assign-daypart__btn-delete').simulate('click');
        const confirmOverlay = component.find('ConfirmOverlay').shallow();
        confirmOverlay.find('button').at(1).simulate('click');
        expect(component.state().confirmOverlayOpened).toBeFalsy();
    });

    it('should confirm the delete action', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        component.find('button.assign-daypart__btn-delete').simulate('click');
        const spyHandleSave = jest.spyOn(component.instance(), 'handleSave');
        const confirmOverlay = component.find('ConfirmOverlay').shallow();
        confirmOverlay.find('button').at(0).simulate('click');
        expect(spyHandleSave).toHaveBeenCalledWith(true);
    });

    it('should add an input', () => {
        const component = renderAssignDaypart();
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(1);
        component.instance().addNewAssignment();
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(2);
    });

    it('should remove an input from the top list', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(3);
        component.instance().removeAssignment('0', 'removeInputList');
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(2);
    });

    it('should remove an input from the bottom list', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(3);
        component.instance().addNewAssignment();
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(4);
        component.instance().removeAssignment('0', 'addInputList');
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(3);
    });

    it('should add multiple inputs', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(3);
        component.instance().addNewAssignment();
        component.instance().addNewAssignment();
        component.instance().addNewAssignment();
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(6);
    });

    it('range from multiple inputs should work together', () => {
        const component = renderAssignDaypart({ selectedHours: [0, 1, 2] });
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(3);
        component.instance().addNewAssignment();
        component.instance().addNewAssignment();
        component.instance().addNewAssignment();
        expect(component.find('DaypartHourRangeSelector')).toHaveLength(6);
        const currentHours = component.instance().handleSave(false).hours;
        component
            .instance()
            .onAssignmentChanged(
                { label: 'SUN', value: 0 },
                { hour: 3, period: 0 },
                { hour: 4, period: 0 },
                '0',
                'add'
            );
        component
            .instance()
            .onAssignmentChanged(
                { label: 'SUN', value: 0 },
                { hour: 10, period: 0 },
                { hour: 11, period: 0 },
                '1',
                'add'
            );
        const newHours = component.instance().handleSave(false).hours;
        expect(newHours).toEqual(currentHours.concat([3, 4, 10, 11]));
    });
});
