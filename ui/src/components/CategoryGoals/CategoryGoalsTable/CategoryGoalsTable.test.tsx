import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import CategoryGoalsTable from './CategoryGoalsTable.component';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './CategoryGoalsTable.module.sc... Remove this comment to see the full error message
import style from './CategoryGoalsTable.module.scss';

const mockCategoryList = [
    {
        id: 12,
        description: '85-89 Power',
        label: '81',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryList' does not exist on type '{}... Remove this comment to see the full error message
        orderBy: 390,
        groupId: '5',
        group: '1970s - 1980s',
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIdealCount' does not exist on type... Remove this comment to see the full error message
        readOnly: false,
        active: true,
    },
    {
        id: 13,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryList' does not exist on type '{}... Remove this comment to see the full error message
        description: '80-84 Power',
        label: '82',
        orderBy: 400,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIdealCount' does not exist on type... Remove this comment to see the full error message
        groupId: '5',
        group: '1970s - 1980s',
        readOnly: false,
    },
];

const renderCategoryGoalsTableComponent = (options = {}) =>
    shallow(
        <CategoryGoalsTable
            categoryList={options.categoryList || mockCategoryList}
            handleIdealCount={options.handleIdealCount || (() => {})}
        />
    );

describe('<CategoryGoalsTable />', () => {
    it('should render component correctly', () => {
        const component = renderCategoryGoalsTableComponent();
        expect(component).toBeDefined();
        expect(component.find(`.${style.tableContainer}`)).toHaveLength(1);
        expect(component.find(`.${style.table}`)).toHaveLength(1);
        expect(component.find(`.${style.tableHeader}`)).toHaveLength(1);
        expect(component.find(`.${style.tableContent}`)).toHaveLength(1);
    });

    it('should render table with correct number of rows (including header)', () => {
        const component = renderCategoryGoalsTableComponent();
        expect(component.find(`.${style.tableRow}`)).toHaveLength(3);
    });

    it('category data should be correctly binded to row', () => {
        const component = renderCategoryGoalsTableComponent();
        const firstRow = component.find(`.${style.tableRow}`).at(1);
        expect(firstRow.find(`.${style.tableCol}`).at(1).text()).toBe(
            mockCategoryList[0].description
        );
    });

    it('limit input should be visible only for categories assigned to station', () => {
        const component = renderCategoryGoalsTableComponent();
        expect(component.find('input')).toHaveLength(mockCategoryList.length);
        expect(component.find('input').at(0).prop('disabled')).toBeFalsy();
        expect(component.find('input').at(1).prop('disabled')).toBeTruthy();
    });

    it('editing the limit for a category should trigger correct action', () => {
        const mockHandleIdealCount = jest.fn();
        const component = renderCategoryGoalsTableComponent({
            handleIdealCount: mockHandleIdealCount,
        });
        component.find('input').at(0).simulate('change', 'abc');
        expect(mockHandleIdealCount).toHaveBeenCalled();
    });
});
