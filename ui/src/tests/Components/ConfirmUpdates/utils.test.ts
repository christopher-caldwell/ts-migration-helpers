import utils from 'components/ConfirmUpdates/utils';

const mockStaged = [
    {
        aNm: 'Linkin Park',
        category: {
            id: 10,
            name: 'A',
        },
        media_id: '702834',
        packet_id: 1,
        sNm: 'IN THE END',
        version_name: '-',
    },
];

const mockCurrent = [
    {
        aNm: 'Linkin Park',
        category: {
            id: 15,
            name: 'R1',
        },
        media_id: '702834',
        packet_id: null,
        sNm: 'IN THE END',
        version_name: '-',
    },
];

const mockPackets = [
    {
        name: 'Packet 1',
        packet_id: 1,
    },
    {
        name: 'Packet 2',
        packet_id: 2,
    },
];

describe('components/ConfirmUpdates/utils', () => {
    describe('getChangesToConfirmUpdates', () => {
        it('should return changes with the previous data', () => {
            const result = utils.getChangesToConfirmUpdates(
                mockStaged,
                mockCurrent,
                mockPackets,
            );
            expect(result[0]).toHaveProperty('packet_id', 1);
            expect(result[0]).toHaveProperty('currentPacketId', null);
            expect(result[0]).toHaveProperty('currentPacket', null);
            expect(result[0]).toHaveProperty('packetName', 'Packet 1');
            expect(result[0].category).toHaveProperty('name', 'A');
        });

        it('should return changes to packet null', () => {
            const mockStagedTest = [
                {
                    aNm: 'Linkin Park',
                    category: {
                        id: 10,
                        name: 'A',
                    },
                    media_id: '702834',
                    packet_id: null,
                    sNm: 'IN THE END',
                    version_name: '-',
                },
            ];

            const mockCurrentTest = [
                {
                    aNm: 'Linkin Park',
                    category: {
                        id: 13,
                        name: 'R1',
                    },
                    media_id: '702834',
                    packet_id: 2,
                    sNm: 'IN THE END',
                    version_name: '-',
                },
            ];
            const result = utils.getChangesToConfirmUpdates(
                mockStagedTest,
                mockCurrentTest,
                mockPackets,
            );
            expect(result[0]).toHaveProperty('packet_id', null);
            expect(result[0]).toHaveProperty('currentPacketId', 2);
            expect(result[0]).toHaveProperty('currentPacket', 'Packet 2');
            expect(result[0]).toHaveProperty('packetName', null);
            expect(result[0].category).toHaveProperty('name', 'A');
        });
    });

    describe('categoriesNotFoundOnGselector', () => {
        const mockCategories = [
            {
                label: 'A',
                description: 'Power',
                value: 17,
                orderBy: 10,
                group: 'CURRENT',
                groupId: 1,
                limit: 5,
                active: true,
            },
            {
                label: 'B',
                description: 'Sub Power',
                value: 18,
                orderBy: 20,
                group: 'CURRENT',
                groupId: 1,
                limit: 3,
                active: false,
            },
            {
                label: 'C',
                description: 'Stress New',
                value: 19,
                orderBy: 30,
                group: 'CURRENT',
                groupId: 1,
                limit: 3,
                active: false,
            },
        ];

        const mockCategoryChanges = [
            {
                sId: 529605503,
                sNm: 'SWEET BUT PSYCHO',
                aNm: 'Ava Max',
                alternate: {
                    1: {
                        category_id: 19,
                    },
                },
                media_id: 410916,
                packet_id: null,
                restriction_id: null,
                version_name: '-',
                modified_date: '2019-09-23T19:41:44.897Z',
                category: {
                    id: 30,
                    name: 'B',
                },
                order_by: 50,
                currentDayparts: {},
                currentPacketId: null,
                currentPacket: null,
                packetName: null,
                currentRestrictionId: null,
            },
        ];

        it('should return categories not found in Gselector', () => {
            const result = utils.categoriesNotFoundOnGselector(
                mockCategories,
                mockCategoryChanges,
                'category',
            );
            expect(result).toHaveLength(1);
            expect(result[0]).toBe('B');
        });

        it('should return alternate categories not found in Gselector', () => {
            const result = utils.categoriesNotFoundOnGselector(
                mockCategories,
                mockCategoryChanges,
                'alternate_category',
            );
            expect(result).toHaveLength(1);
            expect(result[0]).toBe('C');
        });
    });

    describe('getSongsWithDaypartTemplateChanged', () => {
        const mockStagedDayparts = [
            {
                id: 275,
                name: 'test daypart 2',
                hours: [0, 1, 2],
                synchronized: true,
            },
        ];

        const mockChangesToConfirm = [
            {
                sId: 84894023,
                sNm: 'OLD TIME ROCK & ROLL',
                aNm: 'Bob Seger & The Silver Bullet Band',
                media_id: 700579,
                packet_id: null,
                restriction_id: null,
                version_name: '-',
                modified_date: '2019-05-22T17:17:46.820Z',
                gs_category: 'G1',
                alternate: {
                    275: {
                        category_id: 17,
                        gs_category: null,
                    },
                },
                order_by: 900,
                currentPacketId: null,
                currentPacket: null,
                packetName: null,
                currentRestrictionId: null,
                currentAlternate: {
                    275: {
                        category_id: null,
                        gs_category: 'H1',
                    },
                },
            },
        ];

        const mockCurrentSongs = {
            84894023: [
                {
                    sId: 84894023,
                    sNm: 'OLD TIME ROCK & ROLL',
                    aNm: 'Bob Seger & The Silver Bullet Band',
                    media_id: 700579,
                    packet_id: null,
                    restriction_id: null,
                    version_name: '-',
                    modified_date: '2019-05-22T17:17:46.820Z',
                    gs_category: 'G1',
                    alternate: {
                        275: {
                            category_id: null,
                            gs_category: 'H1',
                        },
                    },
                    order_by: 900,
                },
            ],
        };

        it('should return songs songs with daypart template changed', () => {
            const result = utils.getSongsWithDaypartTemplateChanged(
                mockStagedDayparts,
                mockChangesToConfirm,
                mockCurrentSongs,
            );
            expect(result).toHaveLength(1);
        });
    });

    describe('getSongsChangedByDaypartUpdates', () => {
        const mockStagedDayparts = [
            {
                id: 274,
                name: 'test daypart 1',
                hours: [0, 1, 2],
                synchronized: true,
            },
        ];

        const mockChangesToConfirm = [
            {
                sId: 84894023,
                sNm: 'OLD TIME ROCK & ROLL',
                aNm: 'Bob Seger & The Silver Bullet Band',
                media_id: 700579,
                packet_id: null,
                restriction_id: null,
                version_name: '-',
                modified_date: '2019-05-22T17:17:46.820Z',
                gs_category: 'G1',
                alternate: {
                    274: {
                        category_id: 17,
                        gs_category: null,
                    },
                    275: {
                        category_id: null,
                        gs_category: 'H1',
                    },
                },
                order_by: 900,
                currentPacketId: null,
                currentPacket: null,
                packetName: null,
                currentRestrictionId: null,
                currentAlternate: {
                    274: {
                        category_id: null,
                        gs_category: 'H1',
                    },
                    275: {
                        category_id: null,
                        gs_category: 'H1',
                    },
                },
            },
        ];

        const mockCurrentSongs = {
            84894023: [
                {
                    sId: 84894023,
                    sNm: 'OLD TIME ROCK & ROLL',
                    aNm: 'Bob Seger & The Silver Bullet Band',
                    media_id: 700579,
                    packet_id: null,
                    restriction_id: null,
                    version_name: '-',
                    modified_date: '2019-05-22T17:17:46.820Z',
                    gs_category: 'G1',
                    alternate: {
                        274: {
                            category_id: null,
                            gs_category: 'H1',
                        },
                        275: {
                            category_id: null,
                            gs_category: 'H1',
                        },
                    },
                    order_by: 900,
                },
            ],
        };

        it('should return songs songs with daypart template changed', () => {
            const result = utils.getSongsChangedByDaypartUpdates(
                mockStagedDayparts,
                mockChangesToConfirm,
                mockCurrentSongs,
            );
            expect(result).toHaveLength(2);
        });
    });
});
