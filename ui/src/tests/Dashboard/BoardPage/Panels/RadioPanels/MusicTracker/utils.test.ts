import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';

describe('Dashboard/BoardPage/Panels/RadioPanels/MusicTracker/utils', () => {
    describe('categoryExtractor', () => {
        it('should return empty value placeholder', () => {
            const result = utils.categoryExtractor(
                null,
                'key1',
                'key2',
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 4.
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 4.
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 4.
                [],
            );
            expect(result).toEqual({ category: '-', lastModifiedDate: '-', versionName: '-' });
        });

        it('should return empty text', () => {
            const mockCategories = {
                key1: [{
                    category: {},
                }],
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 4.
                key2: [{}],
            };
            const result = utils.categoryExtractor(
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 4.
                mockCategories,
                'key1',
                'key2',
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 4.
                [],
            );
            expect(result).toEqual({ category: '-', lastModifiedDate: false, versionName: false });
        });

        it('should filter Music Tracker by category NONE and the song in NONE category is found', () => {
            const mockSong = {
                sId: 807064551,
                metadata: {
                    sNm: 'Nightmare',
                    aNm: 'HALSEY',
                    sRlseDate: '2019-05-01',
                },
                metrics: {
                    crg: 'C',
                },
                category: {
                    current: undefined,
                    prior: undefined,
                    recommended: undefined,
                    staged: undefined,
                },
            };

            const mockFilter = {
                changed: true,
                search: '',
                crg: [
                    'C',
                    'R',
                    'G',
                ],
                category: {
                    prior: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'B',
                            description: 'Sub Power',
                            value: 18,
                            orderBy: 20,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 3,
                        },
                    ],
                    current: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'B',
                            description: 'Sub Power',
                            value: 18,
                            orderBy: 20,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 3,
                        },
                    ],
                    new: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'B',
                            description: 'Sub Power',
                            value: 18,
                            orderBy: 20,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 3,
                        },
                    ],
                },
            };
            const result = utils.isSongInsideCategory(mockSong, mockFilter);
            expect(result).toBeFalsy();
        });

        it('should filter Music Tracker by any category diffent of the song that is checking', () => {
            const mockSong = {
                sId: 807064551,
                metadata: {
                    sNm: 'Nightmare',
                    aNm: 'HALSEY',
                    sRlseDate: '2019-05-01',
                },
                metrics: {
                    crg: 'C',
                },
                category: {
                    current: [
                        {
                            category: {
                                id: 10,
                                name: 'A',
                            },
                        },
                    ],
                    prior: [
                        {
                            category: {
                                id: 10,
                                name: 'A',
                            },
                        },
                    ],
                    recommended: undefined,
                    staged: [
                        {
                            category: {
                                id: 13,
                                name: 'R1',
                            },
                        },
                    ],
                },
            };

            const mockFilter = {
                changed: true,
                search: '',
                crg: [
                    'C',
                    'R',
                    'G',
                ],
                category: {
                    prior: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'B',
                            description: 'Sub Power',
                            value: 18,
                            orderBy: 20,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 3,
                        },
                    ],
                    current: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'B',
                            description: 'Sub Power',
                            value: 18,
                            orderBy: 20,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 3,
                        },
                    ],
                    new: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'B',
                            description: 'Sub Power',
                            value: 18,
                            orderBy: 20,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 3,
                        },
                    ],
                },
            };
            const result = utils.isSongInsideCategory(mockSong, mockFilter);
            expect(result).toBeTruthy();
        });

        it('should filter Music Tracker by any category different of NONE and the song is in NONE category', () => {
            const mockSong = {
                sId: 807064551,
                metadata: {
                    sNm: 'Nightmare',
                    aNm: 'HALSEY',
                    sRlseDate: '2019-05-01',
                },
                metrics: {
                    crg: 'C',
                },
                category: {
                    current: undefined,
                    prior: undefined,
                    recommended: undefined,
                    staged: undefined,
                },
            };
            const mockFilter = {
                changed: true,
                search: '',
                crg: [
                    'C',
                    'R',
                    'G',
                ],
                category: {
                    prior: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'None',
                            value: '',
                            description: '',
                            limit: 0,
                        },
                    ],
                    current: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'None',
                            value: '',
                            description: '',
                            limit: 0,
                        },
                    ],
                    new: [
                        {
                            label: 'A',
                            description: 'Power',
                            value: 17,
                            orderBy: 10,
                            group: 'CURRENT',
                            groupId: 1,
                            limit: 5,
                        },
                        {
                            label: 'None',
                            value: '',
                            description: '',
                            limit: 0,
                        },
                    ],
                },
            };
            const result = utils.isSongInsideCategory(mockSong, mockFilter);
            expect(result).toBeTruthy();
        });
    });

    describe('categoryExtractorByVersion', () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        it('should return a dash (-) value when there is not daypart', () => {
            const version = {
                category: {},
            };
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            const result = utils.categoryExtractorByVersion(version);
            expect(result).toEqual('-');
        });

        it('should return a dash (-) value when there is version', () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            const result = utils.categoryExtractorByVersion();
            expect(result).toEqual('-');
        });

        it('should return categories value', () => {
            const version = {
                category: {
                    id: 10,
                    name: 'A',
                },
            };
            const result = utils.categoryExtractorByVersion(version);
            expect(result).toEqual('A');
        });
    });
});
