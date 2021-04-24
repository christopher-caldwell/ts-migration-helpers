import { merge } from 'lodash';

import Layout from 'models/Layout';

global.fetch = () => {};

const testBoard = {
    config: {
        layout: [
            {
                id: 'tab-id-1',
                name: 'Tab 1',
                rows: [
                    {
                        columns: [
                            {
                                size: 8,
                                panels: ['1'],
                            },
                            {
                                size: 8,
                                panels: ['2'],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'tab-id-2',
                name: 'Tab 2',
                rows: [],
            },
        ],
    },
    panels: {
        1: { type: '1' },
        2: { type: '2' },
        3: { type: '3' },
    },
};
const activeLayout = [
    { columns: [{ size: 12, panels: [] }] },
    {
        columns: [
            {
                size: 8,
                panels: ['1'],
            },
            {
                size: 8,
                panels: ['2'],
            },
        ],
    },
];

describe('models/Layout', () => {
    describe('getActive', () => {
        it('should return the tabId specified', () => {
            const layout = new Layout();

            layout.setBoard(merge({}, testBoard));

            const { tabId } = layout.getActive();

            expect(tabId).toBe('tab-id-1');
        });

        it('should resolve a tabIndex given a tabId', () => {
            const layout = new Layout();

            layout.setBoard(merge({}, testBoard));

            const { tabIndex } = layout.getActive();

            expect(tabIndex).toBe(0);
        });

        it('should return the available (unused) panels', () => {
            const layout = new Layout();

            layout.setBoard(merge({}, testBoard));

            const { available } = layout.getActive();

            expect(available).toEqual(['3']);
        });
    });

    describe('swapPanels', () => {
        it('should swap the position of panel A and B', () => {
            const expected = merge([], activeLayout);
            expected[1].columns[0].panels = ['2'];
            expected[1].columns[1].panels = ['1'];

            const layout = new Layout();

            layout.setBoard(merge({}, testBoard));

            const a = { id: '1', objectPath: [1, 0, 0] };
            const b = { id: '2', objectPath: [1, 1, 0] };

            expect(layout.swapPanels(a, b)).toEqual(expected);
        });
    });

    describe('movePanel', () => {
        it('should swap the position of panel A and B', () => {
            const expected = merge([], activeLayout);
            expected[0].columns[0].panels = ['2'];
            expected[1].columns[1].panels = [];

            const layout = new Layout();

            layout.setBoard(merge({}, testBoard));

            const target = { objectPath: [0, 0] };
            const panel = { id: '2', objectPath: [1, 1, 0] };

            expect(layout.movePanel(target, panel)).toEqual(expected);
        });
    });
});
