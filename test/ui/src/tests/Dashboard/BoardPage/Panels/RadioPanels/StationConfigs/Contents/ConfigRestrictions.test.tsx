import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ConfigRestrictions from 'components/BoardPage/Panels/RadioPanels/StationConfigs/Contents/ConfigRestrictions';

const mockAction = jest.fn().mockReturnValue({ type: 'ACTION' });
jest.mock('stores/restrictions/restrictionsActions', () => ({
    createHourRestrictions: mockAction,
    updateHourRestrictions: mockAction,
}));

const mockRestrictions = [
    {
        id: 1,
        lastUpdate: '2019-07-26T13:25:28.562Z',
        name: 'test 1',
        synchronized: true,
        restrictionHour: [
            {
                hour: 20,
                lastUpdate: '2019-07-26T14:11:29.040Z',
            },
        ],
        songs: [
            {
                sId: '9700105',
                sNm: 'Lose Yourself',
                aNm: 'Eminem',
                media_id: '9700105',
                packet_id: null,
                restriction_id: 1,
                version_name: '-',
                modified_date: '2019-07-11T20:52:18.163Z',
                dayparts: {},
                order_by: 999,
            },
            {
                sId: '84850785',
                sNm: 'YOURE NOT THERE',
                aNm: 'Lukas Graham',
                media_id: '400123',
                packet_id: null,
                restriction_id: 2,
                version_name: '-',
                modified_date: '2019-07-11T20:52:18.957Z',
                dayparts: {},
                order_by: 999,
            },
            {
                sId: '84851502',
                sNm: 'IN THE END',
                aNm: 'Linkin Park',
                media_id: '702834',
                packet_id: null,
                restriction_id: 2,
                version_name: '-',
                modified_date: '2019-07-11T20:52:18.451Z',
                dayparts: {
                    EVE: {
                        id: 31,
                        name: 'R1',
                    },
                    MID: {
                        id: 31,
                        name: 'R1',
                    },
                    PMD: {
                        id: 31,
                        name: 'R1',
                    },
                    OVN: {
                        id: 31,
                        name: 'R1',
                    },
                },
                order_by: 90,
            },
        ],
    },
    {
        id: 2,
        lastUpdate: '2019-07-26T14:11:28.562Z',
        name: 'test 2',
        synchronized: false,
        restrictionHour: [
            {
                hour: 16,
                lastUpdate: '2019-07-25T14:11:29.040Z',
            },
        ],
        songs: [
            {
                sId: '9700105',
                sNm: 'Lose Yourself',
                aNm: 'Eminem',
                media_id: '9700105',
                packet_id: null,
                restriction_id: 1,
                version_name: '-',
                modified_date: '2019-07-11T20:52:18.163Z',
                dayparts: {},
                order_by: 999,
            },
            {
                sId: '84850785',
                sNm: 'YOURE NOT THERE',
                aNm: 'Lukas Graham',
                media_id: '400123',
                packet_id: null,
                restriction_id: 2,
                version_name: '-',
                modified_date: '2019-07-11T20:52:18.957Z',
                dayparts: {},
                order_by: 999,
            },
            {
                sId: '84851502',
                sNm: 'IN THE END',
                aNm: 'Linkin Park',
                media_id: '702834',
                packet_id: null,
                restriction_id: 2,
                version_name: '-',
                modified_date: '2019-07-11T20:52:18.451Z',
                dayparts: {
                    EVE: {
                        id: 31,
                        name: 'R1',
                    },
                    MID: {
                        id: 31,
                        name: 'R1',
                    },
                    PMD: {
                        id: 31,
                        name: 'R1',
                    },
                    OVN: {
                        id: 31,
                        name: 'R1',
                    },
                },
                order_by: 90,
            },
        ],
    },
];

const mockStoreRestrictions = {
    loading: false,
    error: null,
    data: [
        {
            id: 123,
            stationId: 3323404,
            name: 'Restriction 1',
            lastUpdate: '2019-07-26',
            restrictionHour: [
                {
                    hour: 10,
                    lastUpdate: '2019-07-26',
                },
            ],
        },
    ],
};

const mockVersions = [
    {
        sNm: "YOU'RE NOT THERE",
        aNm: 'Lukas Graham',
        media_id: 400123,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-07-11T20:52:18.957Z',
        dayparts: {},
        order_by: 999,
    },
    {
        sNm: 'IN THE END',
        aNm: 'Linkin Park',
        media_id: 702834,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-07-11T20:52:18.451Z',
        dayparts: {},
        order_by: 90,
    },
    {
        sNm: 'SINCE U BEEN GONE',
        aNm: 'Kelly Clarkson',
        media_id: 789743,
        packet_id: null,
        version_name: '-',
        modified_date: '2019-08-06T21:07:50.122Z',
        dayparts: {},
        order_by: 50,
    },
];

const mockRestrictionsChanges = [
    {
        sId: 84846481,
        sNm: 'COULD YOU BE LOVED',
        aNm: 'Bob Marley & The Wailers',
        media_id: 791573,
        packet_id: 3600,
        restriction_id: null,
        version_name: '-',
        modified_date: '2019-11-19T18:21:14.128Z',
        gs_category: 'H1',
        alternate: {
            241: {
                category_id: 18,
                gs_category: null,
            },
            247: {
                category_id: 18,
                gs_category: null,
            },
        },
        order_by: 900,
        getChanges: {
            actualChanges: {
                restriction_id: 123,
            },
            previousChanges: {
                packet_id: null,
                restriction_id: null,
                category: '',
                alternate: {
                    241: {
                        category_id: 18,
                        gs_category: null,
                    },
                    247: {
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ overlayError: null; createHourRestrictions... Remove this comment to see the full error message
                        category_id: 18,
                        gs_category: null,
                    },
                },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ overlayError: null; createHourRestrictions... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type '{}... Remove this comment to see the full error message
            undoneChanges: {},
            isEqualMedia: false,
        },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionTemplate' does not exist on t... Remove this comment to see the full error message
    },
];

const mockStore = configureStore([thunk]);
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRestrictionsToBeUpdated' does not ex... Remove this comment to see the full error message
const store = mockStore({
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stagedRestrictions' does not exist on ty... Remove this comment to see the full error message
    restrictions: mockStoreRestrictions,
});

// @ts-expect-error ts-migrate(2339) FIXME: Property 'store' does not exist on type '{}'.
const renderConfigRestrictions = (options = {}) =>
    shallow(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictions' does not exist on type '{}... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ overlayError: null; createHourRestrictions... Remove this comment to see the full error message
        <ConfigRestrictions
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockRestrictionsToBeUpdated' does not ex... Remove this comment to see the full error message
            overlayError={null}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type '{}'.
            createHourRestrictionsAction={mockAction}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionsChanges' does not exist on t... Remove this comment to see the full error message
            updateHourRestrictionsAction={mockAction}
            stagedRestrictions={options.stagedRestrictions || []}
            store={options.store || store}
            boardId={3323404}
            restrictions={options.restrictions || mockRestrictions}
            restrictionTemplate={options.restrictionTemplate || ''}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionTemplate' does not exist on t... Remove this comment to see the full error message
            restrictionToBeUpdated={options.mockRestrictionsToBeUpdated || []}
            versions={options.versions || mockVersions}
            restrictionsChanges={options.restrictionsChanges || mockRestrictionsChanges}
        />
    );

describe('<ConfigRestrictions />', () => {
    it('should render component', () => {
        const component = renderConfigRestrictions().shallow();
        expect(component.find('.station-configs-restrictions')).toHaveLength(1);
    });

    it('should open and close create restrition modal', () => {
        const component = renderConfigRestrictions().shallow();
        component.find('.station-configs__button').simulate('click');
        expect(component.state().openRestrictionModal).toBe(true);
        component.find('CustomModal').shallow().find('.btn-default').simulate('click');
        expect(component.state().openRestrictionModal).toBe(false);
    });

    it('should change text for a new restriction name', () => {
        const component = renderConfigRestrictions().shallow();
        const handleRestrictionName = jest.spyOn(component.instance(), 'handleRestrictionName');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restrictionTemplate' does not exist on t... Remove this comment to see the full error message
        component.instance().handleRestrictionName({ target: { value: 'Restriction 2' } });
        expect(handleRestrictionName).toHaveBeenCalled();
    });

    it('should open a restriction modal a edit a existents restriction', () => {
        const mockRestrictionTemplate = [...mockRestrictions];
        const component = renderConfigRestrictions().shallow();
        component.setState({
            restrictionTemplate: mockRestrictionTemplate[0].restrictionTemplate,
        });
        const handleOpenModal = jest.spyOn(component.instance(), 'handleOpenModal');
        component.instance().handleOpenModal({
            id: 123,
            stationId: 3323404,
            name: 'Restriction 1',
            lastUpdate: '2019-07-26',
            restrictionHour: [
                {
                    hour: 10,
                    lastUpdate: '2019-07-26',
                },
            ],
        });

        component.find('TextButton').at(1).shallow().find('button').simulate('click');
        expect(component.state().editSongsRestrictionOpened).toBe(true);
        component.find('AsideModal').shallow().find('IconX').simulate('click');
        expect(component.state().editSongsRestrictionOpened).toBe(false);
        expect(handleOpenModal).toHaveBeenCalled();
    });

    it('should do not save if has restrictionTemplateError', () => {
        const component = renderConfigRestrictions().shallow();

        component.setState({
            restrictionTemplateError: true,
        });

        expect(mockAction).not.toHaveBeenCalled();
    });

    it('should save new restriction', () => {
        const component = renderConfigRestrictions().shallow();
        const handleSaveRestriction = jest.spyOn(component.instance(), 'handleSaveRestriction');
        component.instance().handleSaveRestriction('create');
        component.instance().handleSaveRestriction('edit');
        expect(mockAction).toHaveBeenCalled();
        expect(handleSaveRestriction).toHaveBeenCalledTimes(2);
    });

    it('should handle a click on restriction', () => {
        const component = renderConfigRestrictions().shallow();
        const handleRestriction = jest.spyOn(component.instance(), 'handleRestriction');
        component.instance().handleRestriction({ hour: 0, selected: false });
        component.instance().handleRestriction({ hour: 0, selected: true });
        expect(handleRestriction).toHaveBeenCalled();
    });

    it('should not render component', () => {
        const component = renderConfigRestrictions({ restrictions: [] }).shallow();
        expect(component.find('.station-configs-restrictions')).toHaveLength(1);
        expect(component.find('p').text()).toBe('No data found.');
    });

    it('should open and close the edit restriction modal', () => {
        const component = renderConfigRestrictions().shallow();
        component.find('TextButton').at(1).shallow().find('button').simulate('click');
        expect(component.state().editSongsRestrictionOpened).toBe(true);
        component.find('AsideModal').shallow().find('IconX').simulate('click');
        expect(component.state().editSongsRestrictionOpened).toBe(false);
    });

    it('should handleMultiselectHours update state and uncheck row', () => {
        const mockRestrictionsHours = [
            {
                id: 1332,
                stationId: 3322022,
                name: '3p - 2a ONLY',
                synchronized: true,
                lastupdate: '2019-09-02T13:32:22.818Z',
                restrictionHour: [
                    {
                        hour: 3,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 4,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 5,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 6,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                ],
                songs: [
                    {
                        sId: '86001043',
                        sNm: 'YOUNG FOREVER',
                        aNm: 'Jay-Z / Mr. Hudson',
                        media_id: '708047',
                        packet_id: null,
                        restriction_id: 1332,
                        version_name: 'CHR PC Clean',
                        modified_date: '2019-02-19T17:46:58.861Z',
                        dayparts: {},
                        order_by: 999,
                    },
                    {
                        sId: '93036535',
                        sNm: 'HEY EVERYBODY!',
                        aNm: '5 Seconds Of Summer',
                        media_id: '887454',
                        packet_id: null,
                        restriction_id: 1332,
                        version_name: 'Radio Mix/No Spoken Intro',
                        modified_date: '2019-02-19T17:47:00.830Z',
                        dayparts: {},
                        order_by: 999,
                    },
                ],
            },
        ];

        const component = renderConfigRestrictions({
            restrictions: mockRestrictionsHours,
        }).shallow();
        const oldState = JSON.stringify(component.state());
        const firstChild = 0;
        const isRow = true;
        component.instance().handleMultiselectHours(firstChild, isRow);
        const newState = JSON.stringify(component.state());
        expect(oldState).not.toBe(newState);
    });

    it('should handleMultiselectHours update state and uncheck column', () => {
        const mockRestrictionsHours = [
            {
                id: 1332,
                stationId: 3322022,
                name: '3p - 2a ONLY',
                synchronized: true,
                lastupdate: '2019-09-02T13:32:22.818Z',
                restrictionHour: [
                    {
                        hour: 3,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 4,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 5,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 6,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 7,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                    {
                        hour: 8,
                        lastupdate: '2019-09-02T13:32:23.753Z',
                    },
                ],
                songs: [
                    {
                        sId: '86001043',
                        sNm: 'YOUNG FOREVER',
                        aNm: 'Jay-Z / Mr. Hudson',
                        media_id: '708047',
                        packet_id: null,
                        restriction_id: 1332,
                        version_name: 'CHR PC Clean',
                        modified_date: '2019-02-19T17:46:58.861Z',
                        dayparts: {},
                        order_by: 999,
                    },
                    {
                        sId: '93036535',
                        sNm: 'HEY EVERYBODY!',
                        aNm: '5 Seconds Of Summer',
                        media_id: '887454',
                        packet_id: null,
                        restriction_id: 1332,
                        version_name: 'Radio Mix/No Spoken Intro',
                        modified_date: '2019-02-19T17:47:00.830Z',
                        dayparts: {},
                        order_by: 999,
                    },
                ],
            },
        ];

        const component = renderConfigRestrictions({
            restrictions: mockRestrictionsHours,
        }).shallow();
        const oldState = JSON.stringify(component.state());
        const firstChild = 0;
        const isRow = false;
        component.instance().handleMultiselectHours(firstChild, isRow);
        const newState = JSON.stringify(component.state());
        expect(oldState).not.toBe(newState);
    });
});
