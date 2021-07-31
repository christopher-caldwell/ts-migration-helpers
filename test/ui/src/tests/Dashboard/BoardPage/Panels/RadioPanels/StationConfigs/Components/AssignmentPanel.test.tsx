// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import AssignmentPanel from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/AssignmentPanel';

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

const mockStagedDayparts = [
    {
        id: 3,
        name: 'Daypart 3',
        hours: [3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
            27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
            49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
            93, 94, 95, 96, 97, 98, 102, 103, 104, 105, 106, 110, 111, 112, 113, 114, 115, 116, 117,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type '{}'.
            135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedDayparts' does not exist on type '... Remove this comment to see the full error message
            152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167],
    },
];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onClose' does not exist on type '{}'.
const renderAssignmentPanel = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type '{}'.
    shallow(
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        <AssignmentPanel
            dayparts={options.dayparts || mockDayparts}
            stagedDayparts={options.stagedDayparts || mockStagedDayparts}
            onClose={options.onClose || (() => {})}
            className={options.className || ''}
        />,
    )
);

describe('<AssignmentPanel />', () => {
    it('Should render component', () => {
        const component = renderAssignmentPanel();
        expect(component.find('.assignment-panel')).toHaveLength(1);
        expect(component.find('CalendarTable')).toHaveLength(1);
    });

    it('close button should trigger onClose', () => {
        const mockOnClose = jest.fn();
        const component = renderAssignmentPanel({ onClose: mockOnClose });
        component.find('button').at(0).simulate('click');
        expect(mockOnClose).toHaveBeenCalled();
    });
});
