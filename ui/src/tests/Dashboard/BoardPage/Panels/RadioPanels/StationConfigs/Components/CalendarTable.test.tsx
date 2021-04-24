import React from 'react';
import { shallow } from 'enzyme';

import CalendarTable from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/CalendarTable';

// week range (sun - sat): [0, 23], [24, 47], [48, 71], [72, 95], [96, 119], [120, 143], [144, 167]
const mockDayparts = [
    {
        id: 1,
        name: 'test daypart 1',
        hours: [0, 1, 2, 20, 21, 22, 23, 40, 41], // sunday and monday
        synchronized: true,
    },
    {
        id: 2,
        name: 'test daypart 2',
        hours: [72, 73], // wednesday
        synchronized: false,
    },
    {
        id: 3,
        name: 'test daypart 3',
        hours: [96, 97], // thursday
        synchronized: true,
    },
];

const mockStagedDayparts = [
    {
        id: 1,
        name: 'test daypart 1',
        hours: [0, 1, 2, 20, 21, 22, 23, 40],
    },
];

const mockAssignedSlots = [0, 1, 2, 8, 9, 10, 99, 100, 101];

const renderCalendarTable = (options = {}) => (
    shallow(
        <CalendarTable
            dayparts={options.dayparts || mockDayparts}
            stagedDayparts={options.stagedDayparts || mockStagedDayparts}
        />,
    )
);

describe('<CalendarTable />', () => {
    it('should render component', () => {
        const component = renderCalendarTable();
        expect(component.find('.calendar-table')).toHaveLength(1);
        expect(component.find('.calendar-table__content .calendar-table__col')).toHaveLength(8);
        expect(component.find('.calendar-table__content .calendar-table__cell').at(1).text()).toBe('1:00 AM');
        expect(component.find('.calendar-table__content .calendar-table__cell').at(23).text()).toBe('11:00 PM');
    });

    it('should populate correct columns according to dayparts array', () => {
        const component = renderCalendarTable();
        const sundayColumn = component.find('.calendar-table__content .calendar-table__col').at(1);
        expect(sundayColumn.find('.calendar-table__btn-assigned--first')).toHaveLength(2);
        expect(sundayColumn.find('.calendar-table__btn-assigned')).toHaveLength(7);
        expect(sundayColumn.find('.calendar-table__btn-assigned--last')).toHaveLength(2);
        expect(sundayColumn.find('.calendar-table__btn-assigned--first').at(0).text()).toBe(mockDayparts[0].name);

        const mondayColumn = component.find('.calendar-table__content .calendar-table__col').at(2);
        expect(mondayColumn.find('.calendar-table__btn-assigned--first')).toHaveLength(1);
        expect(mondayColumn.find('.calendar-table__btn-assigned')).toHaveLength(1);
        expect(mondayColumn.find('.calendar-table__btn-assigned--last')).toHaveLength(1);
        expect(mondayColumn.find('.calendar-table__btn-assigned--first').text()).toBe(mockDayparts[0].name);

        const wednesdayColumn = component.find('.calendar-table__content .calendar-table__col').at(4);
        expect(wednesdayColumn.find('.calendar-table__btn-assigned--first')).toHaveLength(1);
        expect(wednesdayColumn.find('.calendar-table__btn-assigned')).toHaveLength(2);
        expect(wednesdayColumn.find('.calendar-table__btn-assigned--last')).toHaveLength(1);
        expect(wednesdayColumn.find('.calendar-table__btn-assigned--first').text()).toBe(mockDayparts[1].name);
    });

    it('should verify the mouseDown and mouseUp over empty slot', () => {
        const component = renderCalendarTable();
        component.instance().mouseDown(5, null, mockAssignedSlots);
        expect(component.state().selectedHours).toEqual([5]);
        expect(component.state().cancelSelection).toBeFalsy();
        expect(component.state().endHour).toEqual(null);
        component.instance().mouseUp(5);
        expect(component.state().asideModalVisible).toBeTruthy();
        expect(component.state().endHour).toEqual(5);
    });

    it('should verify the mouseDown and mouseUp over a filled slot', () => {
        const mockCurrentDaypart = {
            id: 1,
            name: 'Daypart 1',
            synchronized: true,
            scheduling_order: 1,
            hours: [0, 1, 2, 8, 9],
        };
        const component = renderCalendarTable();
        const spyMouseLeave = jest.spyOn(component.instance(), 'mouseLeave');
        component.instance().mouseDown(2, mockCurrentDaypart, mockAssignedSlots);
        expect(component.state().cancelSelection).toBeTruthy();
        expect(component.state().selectedHours).toEqual([0, 1, 2]);
        expect(component.state().asideModalVisible).toBeTruthy();
        expect(spyMouseLeave).toHaveBeenCalled();
        component.instance().mouseUp(3);
        expect(component.state().cancelSelection).toBeFalsy();
    });

    it('should select empty slots in ascending order', () => {
        const component = renderCalendarTable();
        component.instance().mouseDown(3, null, mockAssignedSlots);
        component.instance().mouseOver(4);
        component.instance().mouseUp(4, mockAssignedSlots);
        expect(component.state().selectedHours).toEqual([3, 4]);
    });

    it('should select empty slots in decending order', () => {
        const component = renderCalendarTable();
        component.instance().mouseDown(4, null, mockAssignedSlots);
        component.instance().mouseOver(3);
        component.instance().mouseUp(3);
        expect(component.state().selectedHours).toEqual([3, 4]);
    });

    it('should not be possible to start in one column and finish in another', () => {
        const component = renderCalendarTable();
        component.instance().mouseDown(4, null, mockAssignedSlots);
        component.instance().mouseLeave();
        expect(component.state().selectedHours).toEqual([]);
    });

    it('should reset to initial state on handleClose', () => {
        const component = renderCalendarTable();
        component.instance().handleClose();
        expect(component.state().asideModalVisible).toBeFalsy();
        expect(component.state().beginHour).toEqual(null);
        expect(component.state().endHour).toEqual(null);
        expect(component.state().selectedHours).toEqual([]);
        expect(component.state().cancelSelection).toBeFalsy();
    });

    it('should have pending approval slots', () => {
        const component = renderCalendarTable();
        const sundayColumn = component.find('.calendar-table__col').at(9);
        const slot = sundayColumn.find('.calendar-table__cell').at(1);
        expect(slot.find('OverlayTrigger').props().overlay.props.message.includes('This item has been modified and requires approval before it can be synced with GSelector')).toBeTruthy();
    });

    it('should have synchronizing slots', () => {
        const component = renderCalendarTable();
        const wednesdayColumn = component.find('.calendar-table__col').at(12);
        const slot = wednesdayColumn.find('.calendar-table__cell').at(1);
        expect(slot.find('OverlayTrigger').props().overlay.props.message.includes('This item is being synchronized with GSelector')).toBeTruthy();
    });

    it('should have synchronized slots', () => {
        const component = renderCalendarTable();
        const thursdayColumn = component.find('.calendar-table__col').at(13);
        const slot = thursdayColumn.find('.calendar-table__cell').at(1);
        expect(slot.find('OverlayTrigger').props().overlay.props.message.includes('This item has been successfully synced with GSelector')).toBeTruthy();
    });
});
