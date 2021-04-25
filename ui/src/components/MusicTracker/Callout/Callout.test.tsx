import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songOrder' does not exist on type '{}'.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'getCalloutTrendsAction' does not exist o... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songOrder' does not exist on type '{}'.
import { mount } from 'enzyme';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'stationId' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'columnKeys' does not exist on type '{}'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'cmmCalloutData' does not exist on type '... Remove this comment to see the full error message
import Callout from './Callout.component';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'getCalloutDataAction' does not exist on ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2739) FIXME: Type '{ songOrder: any; columnKeys: any; getCallou... Remove this comment to see the full error message
const renderComponent = (options = {}) => mount(
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationId' does not exist on type '{}'.
    <Callout
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type '{}'.
        songOrder={options.songOrder || mockSongOrder}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cmmCalloutData' does not exist on type '... Remove this comment to see the full error message
        columnKeys={options.columnKeys || mockColumnKeys}
        getCalloutDataAction={options.getCalloutDataAction || (() => {})}
        getCalloutTrendsAction={options.getCalloutTrendsAction || (() => {})}
        stationId={options.stationId || '1234567'}
        loading={options.loading || false}
        cmmCalloutData={options.cmmCalloutData || mockCmmCalloutData}
    />,
);

describe('Callout component', () => {
    it('should render component', () => {
        const component = renderComponent();
        expect(component).toBeDefined();
    });

    it('should trigger load actions when rendering the first time', () => {
        const mockGetCalloutDataAction = jest.fn();
        const mockGetCalloutTrendsAction = jest.fn();
        renderComponent({
            getCalloutDataAction: mockGetCalloutDataAction,
            getCalloutTrendsAction: mockGetCalloutTrendsAction,
        });
        expect(mockGetCalloutDataAction).toHaveBeenCalled();
        expect(mockGetCalloutTrendsAction).toHaveBeenCalled();
    });

    it('should render component with loading overlay', () => {
        const component = renderComponent({ loading: true });
        expect(component.find('LoadingIndicator')).toHaveLength(1);
    });

    it('should render component without loading overlay', () => {
        const component = renderComponent();
        expect(component.find('LoadingIndicator')).toHaveLength(0);
        expect(component.find('ColumnGroupHeader')).toHaveLength(1);
        expect(component.find('ColumnHeaders')).toHaveLength(1);
    });

    it('should render without expandable columns', () => {
        const component = renderComponent();
        expect(component.find('TextCell')).toHaveLength(86);
    });

    it('clicking on the expand buttons should display the total columns', () => {
        const component = renderComponent();
        expect(
            component
                .find('ExpandButton')
                .at(0)
                .find('button')
                .text(),
        ).toBe('+');
        component
            .find('ExpandButton')
            .at(0)
            .find('button')
            .simulate('click');
        expect(component.find('TextCell')).toHaveLength(98);
        expect(
            component
                .find('ExpandButton')
                .at(0)
                .find('button')
                .text(),
        ).toBe('-');
        expect(
            component
                .find('ExpandButton')
                .at(1)
                .find('button')
                .text(),
        ).toBe('+');
        component
            .find('ExpandButton')
            .at(1)
            .find('button')
            .simulate('click');
        expect(component.find('TextCell')).toHaveLength(110);
        expect(
            component
                .find('ExpandButton')
                .at(1)
                .find('button')
                .text(),
        ).toBe('-');
    });

    it('data binding should be correct', () => {
        const component = renderComponent();
        expect(
            component
                .find('TextCell')
                .at(0)
                .find('div')
                .text(),
        ).toBe('14');
        expect(
            component
                .find('TextCell')
                .at(1)
                .find('div')
                .text(),
        ).toBe('81');
        expect(
            component
                .find('TextCell')
                .at(2)
                .find('div')
                .text(),
        ).toBe('92');
    });
});

const mockSongOrder = ['123456_12345678', '234567_456789456'];
const mockColumnKeys = [
    'popTotalRank',
    'popTotal',
    'twoPopTotal',
    'ptlTotal',
    'popTotalPeak',
    'popTotalPeakDate',
    'unfTotal',
    'negTotal',
    'ddlTotal',
    'nopTotal',
    'favTotal',
    'likTotal',
    'popCoreRank',
    'popCore',
    'twoPopCore',
    'ptlCore',
    'unfCore',
    'negCore',
    'ddlCore',
    'nopCore',
    'favCore',
    'likCore',
    'popAa',
    'twoPopAa',
    'ptlAa',
    'popHispanic',
    'twoPopHispanic',
    'ptlHispanic',
    'popAaHisp',
    'twoPopAaHisp',
    'ptlAaHisp',
    'popWhite',
    'twoPopWhite',
    'ptlWhite',
    'popAsian',
    'twoPopAsian',
    'ptlAsian',
    'popMale',
    'twoPopMale',
    'ptlMale',
    'popFemale',
    'twoPopFemale',
    'ptlFemale',
    'popYoung',
    'twoPopYoung',
    'ptlYoung',
    'popOld',
    'twoPopOld',
    'ptlOld',
    'popTotalConsolidated1Rank',
    'popTotalConsolidated1',
    'popTotalConsolidated2Rank',
    'popTotalConsolidated2',
    'popTotalConsolidated3Rank',
    'popTotalConsolidated3',
];
const mockCmmCalloutData = {
    '123456_12345678': {
        mediaId: '407487',
        songId: 290037532,
        popTotalRank: '14',
        popTotal: 81,
        twoPopTotal: 92,
        ptlTotal: 84,
        unfTotal: 3,
        negTotal: 8,
        ddlTotal: 12,
        nopTotal: 13,
        likTotal: 42,
        favTotal: 22,
        popTotalConsolidated1Rank: null,
        popTotalConsolidated1: null,
        popTotalConsolidated2Rank: null,
        popTotalConsolidated2: null,
        popTotalConsolidated3Rank: null,
        popTotalConsolidated3: null,
        popTotalPeak: 94,
        popTotalPeakDate: '2018-12-30',
        popCoreRank: '21',
        popCore: 83,
        twoPopCore: 93,
        ptlCore: 85,
        unfCore: 3,
        negCore: 7,
        ddlCore: 11,
        nopCore: 14,
        likCore: 44,
        favCore: 21,
        popHispanic: 87,
        twoPopHispanic: 101,
        ptlHispanic: 93,
        popWhite: 74,
        twoPopWhite: 83,
        ptlWhite: 75,
        popAsian: null,
        twoPopAsian: null,
        ptlAsian: null,
        popAa: null,
        twoPopAa: null,
        ptlAa: null,
        popAaHisp: null,
        twoPopAaHisp: null,
        ptlAaHisp: null,
        popMale: null,
        twoPopMale: null,
        ptlMale: null,
        popFemale: null,
        twoPopFemale: null,
        ptlFemale: null,
        popYoung: 83,
        twoPopYoung: 94,
        ptlYoung: 84,
        popOld: 79,
        twoPopOld: 90,
        ptlOld: 83,
    },
    '234567_456789456': {
        mediaId: '409526',
        songId: 447105228,
        popTotalRank: '27',
        popTotal: 76,
        twoPopTotal: 87,
        ptlTotal: 79,
        unfTotal: 4,
        negTotal: 7,
        ddlTotal: 17,
        nopTotal: 13,
        likTotal: 38,
        favTotal: 21,
        popTotalConsolidated1Rank: null,
        popTotalConsolidated1: null,
        popTotalConsolidated2Rank: null,
        popTotalConsolidated2: null,
        popTotalConsolidated3Rank: null,
        popTotalConsolidated3: null,
        popTotalPeak: 95,
        popTotalPeakDate: '2018-12-30',
        popCoreRank: '30',
        popCore: 78,
        twoPopCore: 90,
        ptlCore: 80,
        unfCore: 3,
        negCore: 7,
        ddlCore: 17,
        nopCore: 15,
        likCore: 35,
        favCore: 24,
        popHispanic: 99,
        twoPopHispanic: 113,
        ptlHispanic: 99,
        popWhite: 62,
        twoPopWhite: 70,
        ptlWhite: 67,
        popAsian: null,
        twoPopAsian: null,
        ptlAsian: null,
        popAa: null,
        twoPopAa: null,
        ptlAa: null,
        popAaHisp: null,
        twoPopAaHisp: null,
        ptlAaHisp: null,
        popMale: null,
        twoPopMale: null,
        ptlMale: null,
        popFemale: null,
        twoPopFemale: null,
        ptlFemale: null,
        popYoung: 81,
        twoPopYoung: 91,
        ptlYoung: 83,
        popOld: 71,
        twoPopOld: 82,
        ptlOld: 75,
    },
};
