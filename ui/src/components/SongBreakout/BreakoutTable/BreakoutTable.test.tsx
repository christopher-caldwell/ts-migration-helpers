import React from 'react';
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'mount' is declared but its value is never read.
import { shallow, mount } from 'enzyme';

import BreakoutTable, { headers } from './BreakoutTable.component';
import { changeDragItemLocation } from './helperFunctions';

test('table output', () => {
    const component = shallow(<BreakoutTable {...props} />);
    const headersAbv = headers.map(header => header.substring(0, 4));
    const breakoutArr = Object.entries(props.breakouts);

    expect(component).toBeDefined();
    expect(component.find('div.headerRow')).toHaveLength(1);
    expect(component.find('div.headerRow').find('div.breakoutNameContainer').text()).toBe('Breakout Name');
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cell' implicitly has an 'any' type.
    expect(component.find('div.headerRow').find('button.headerCell')).toHaveLength(headers.length);
    expect(component.find('div.breakoutTable')).toHaveLength(1);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cell' implicitly has an 'any' type.
    component
        .find('div.headerRow')
        .find('button.headerCell')
        .forEach((cell, idx) => expect(cell.text()).toBe(headersAbv[idx]));
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'row' implicitly has an 'any' type.
    expect(component.find('div.row').length).toBe(breakoutArr.length);
    component.find('div.row').forEach((row, rowIdx) => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cell' implicitly has an 'any' type.
        const [breakoutName, breakoutDataObj] = breakoutArr[rowIdx];
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        expect(row.find('div.breakoutNameContainer')).toHaveLength(1);
        expect(row.find('div.dragIcon')).toHaveLength(1);
        expect(row.find('span.breakoutName').text()).toBe(breakoutName);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'cell' implicitly has an 'any' type.
        expect(row.find('div.cell')).toHaveLength(headers.length);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        row.find('div.cell').forEach((cell, cellIdx) => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const columnName = headers[cellIdx];
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (!breakoutDataObj[columnName] && typeof breakoutDataObj[columnName] !== 'number') {
                return expect(cell.text()).toBe('-');
            }
            return expect(Number(cell.text())).toBe(breakoutDataObj[columnName]);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        });
    });
});

// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
test('header click makes header "active" for sorting, dragButton sets sort back to prefs', () => {
    const component = shallow(<BreakoutTable {...props} />);
    expect(component.find('button.headerCell')).toHaveLength(10);
    expect(component.find('button.headerCell').find('button.active')).toHaveLength(0);
    expect(component.find('button.headerCell').find('i.arrowIcon')).toHaveLength(0);
    expect(component.find('span.breakoutName').at(0).text().toLowerCase()).toBe(
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        props.breakouts[props.currentBreakoutOrder[0]].name.toLowerCase()
    );
    const headerNum = 0;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const clickHeader = component.find('button.headerCell').at(headerNum);
    const clickHeaderText = clickHeader.text();
    clickHeader.simulate('click');
    expect(component.find('button.headerCell').find('button.active')).toHaveLength(1);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    expect(component.find('button.headerCell').at(headerNum).hasClass('active')).toBeTruthy();
    expect(component.find('button.headerCell').at(headerNum).text()).toBe(clickHeaderText);
    expect(component.find('button.headerCell').at(headerNum).find('i.arrowIcon')).toHaveLength(1);
    expect(component.find('span.breakoutName').at(0).text().toLowerCase()).not.toBe(
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        props.breakouts[props.currentBreakoutOrder[0]].name.toLowerCase()
    );
    component.find('button.dragButton').simulate('click');
    expect(component.find('span.breakoutName').at(0).text().toLowerCase()).toBe(
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        props.breakouts[props.currentBreakoutOrder[0]].name.toLowerCase()
    );
});

test('changeDragItemLocation function', () => {
    const currentOrder = ['name 1', 'name 2', 'name 3'];
    const generateNum = () => Math.floor(Math.random() * Math.floor(currentOrder.length));
    const dropIdx = generateNum();
    const dragItemIdx = generateNum();
    const dragItem = currentOrder[dragItemIdx];
    expect(changeDragItemLocation(dropIdx, currentOrder, dragItem)[dropIdx]).toBe(dragItem);
});

const props = {
    breakouts: {
        TOTAL: {
            name: 'Total',
            new_name: 'TOTAL',
            rank: 1,
            custom_rank: null,
            is_visible: true,
            respondents: 130,
            POP: 93,
            '2POP': 106,
            PTL: 93,
            UNF: 0,
            NEG: 3,
            DDL: 11,
            NOP: 13,
            LIK: 47,
            FAV: 26,
        },
        'CORE (WHTZ)': {
            name: 'CORE (WHTZ)',
            new_name: 'CORE (WHTZ)',
            rank: 2,
            custom_rank: null,
            is_visible: true,
            respondents: 72,
            POP: 88,
            '2POP': 100,
            PTL: 88,
            UNF: 0,
            NEG: 6,
            DDL: 14,
            NOP: 8,
            LIK: 49,
            FAV: 24,
        },
        HISPANIC: {
            name: 'Hispanic',
            new_name: 'HISPANIC',
            rank: 3,
            custom_rank: null,
            is_visible: true,
            respondents: 46,
            POP: 87,
            '2POP': 101,
            PTL: 87,
            UNF: 0,
            NEG: 7,
            DDL: 15,
            NOP: 11,
            LIK: 39,
            FAV: 28,
        },
    },
    currentBreakoutOrder: ['TOTAL', 'CORE (WHTZ)', 'HISPANIC'],
    setBreakoutOrder: jest.fn(),
};
