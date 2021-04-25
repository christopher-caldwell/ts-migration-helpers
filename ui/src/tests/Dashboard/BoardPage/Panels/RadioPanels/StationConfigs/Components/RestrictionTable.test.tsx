import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import RestrictionTable from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Components/RestrictionTable';

const mockRestrictionItem = {
    id: 1,
    stationId: 3323404,
    name: 'Restriction Name',
    lastUpdate: '2019-07-24T17:31:11.522Z',
    restrictionHour: [
        {
            hour: 30,
            lastUpdate: '2019-07-24T17:31:11.932Z',
        },
        {
            hour: 20,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionItem' does not exist on type ... Remove this comment to see the full error message
            lastUpdate: '2019-07-24T17:31:12.345Z',
        },
        {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'onHourClick' does not exist on type '{}'... Remove this comment to see the full error message
            hour: 10,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleMultiselectHours' does not exist o... Remove this comment to see the full error message
            lastUpdate: '2019-07-24T17:31:12.780Z',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionItem' does not exist on type ... Remove this comment to see the full error message
        },
    ],
};

const renderRestrictionTable = (options = {}) => (
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onHourClick' does not exist on type '{}'... Remove this comment to see the full error message
    shallow(
        <RestrictionTable
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleMultiselectHours' does not exist o... Remove this comment to see the full error message
            restrictionItem={options.restrictionItem || mockRestrictionItem}
            onHourClick={options.onHourClick || (() => {})}
            handleMultiselectHours={options.handleMultiselectHours || (() => {})}
        />,
    )
);

describe('<RestrictionTable />', () => {
    it('should render component', () => {
        const component = renderRestrictionTable();
        expect(component.find('.restriction-table')).toHaveLength(1);
        expect(component.find('thead')).toHaveLength(1);
        expect(component.find('th')).toHaveLength(8);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(25);
        expect(component.find('td').at(0).text()).toBe('12:00 AM');
        expect(component.find('td').at(184).text()).toBe('11:00 PM');
    });

    it('should have hours restrictions selected', () => {
        const component = renderRestrictionTable();
        expect(component.find('.station-configs-restrictions__btn-select--selected')).toHaveLength(3);
    });

    it('should not have any hour restriction selected', () => {
        const mockRestrictionItemTest = {
            id: 1,
            stationId: 3323404,
            name: 'Restriction Name',
            lastUpdate: '2019-07-24T17:31:11.522Z',
        };
        const component = renderRestrictionTable({
            restrictionItem: mockRestrictionItemTest,
        });
        expect(component.find('.station-configs-restrictions__btn-select--selected')).toHaveLength(0);
    });

    it('should select an hour to be restricted', () => {
        const mockOnHourClick = jest.fn();
        const component = renderRestrictionTable({ onHourClick: mockOnHourClick });
        component.find('button').at(8).simulate('click');
        expect(mockOnHourClick).toHaveBeenCalled();
    });

    it('should have default onHourClick', () => {
        RestrictionTable.defaultProps.onHourClick();
        expect(RestrictionTable.defaultProps.onHourClick).toBeDefined();
    });

    it('should select an row of hours to be restricted', () => {
        const mockOnHourClick = jest.fn();
        const component = renderRestrictionTable({ handleMultiselectHours: mockOnHourClick });
        component.find('button').at(7).simulate('click');
        expect(mockOnHourClick).toHaveBeenCalled();
    });

    it('should select an column of hours to be restricted', () => {
        const mockOnHourClick = jest.fn();
        const component = renderRestrictionTable({ handleMultiselectHours: mockOnHourClick });
        component.find('button').at(0).simulate('click');
        component.find('button').at(1).simulate('click');
        component.find('button').at(2).simulate('click');
        component.find('button').at(3).simulate('click');
        component.find('button').at(4).simulate('click');
        component.find('button').at(5).simulate('click');
        component.find('button').at(6).simulate('click');
        expect(mockOnHourClick).toHaveBeenCalled();
    });
});
