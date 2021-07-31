import { getFlattenedVersions } from 'stores/songVersions/songVersionsSelectors';

const mockSongs = {
    loading: false,
    error: null,
    data: [
        {
            sId: 211398030,
            metadata: {
                sNm: 'Temperature',
                aNm: 'SEAN PAUL',
                sRlseDate: '2005-06-01',
            },
        },
        {
            sId: 84906225,
            metadata: {
                sNm: "Mo' Money, Mo' Problems",
                aNm: 'NOTORIOUS B.I.G.',
                sRlseDate: '1997-03-01',
            },
        },
    ],
    count: 2,
};

const mockSongVersions = {
    loading: false,
    error: null,
    data: {
        type: 'category',
        config: {
            name: 'Category',
            last_categories_updated_date: 'Wed Mar 11 2020 20:46:03 GMT+0000',
        },
        current: {
            211398030: [
                {
                    sId: 211398030,
                    sNm: 'TEMPERATURE',
                    aNm: 'Sean Paul',
                    media_id: 706926,
                    packet_id: null,
                    restriction_id: null,
                    version_name: 'Album Version',
                    modified_date: '2020-03-10T23:18:55.641Z',
                    category: {
                        id: 32,
                        name: 'R2',
                    },
                    alternate: {},
                    order_by: 260,
                },
            ],
            354731386: [
                {
                    sId: 354731386,
                    sNm: 'NO TEARS LEFT TO CRY',
                    aNm: 'Ariana Grande',
                    media_id: 408293,
                    packet_id: null,
                    restriction_id: null,
                    version_name: 'Premiere Bobby 04/20',
                    modified_date: '2019-11-25T12:47:57.016Z',
                    category: {
                        id: 31,
                        name: 'R1',
                    },
                    alternate: {},
                    order_by: 240,
                },
            ],
        },
        prior: {
            211398030: [
                {
                    sId: 211398030,
                    sNm: 'TEMPERATURE',
                    aNm: 'Sean Paul',
                    media_id: 706926,
                    packet_id: null,
                    restriction_id: null,
                    version_name: 'Album Version',
                    modified_date: '2020-03-10T23:18:55.641Z',
                    category: {
                        id: 32,
                        name: 'R2',
                    },
                    alternate: {},
                    order_by: 260,
                },
            ],
        },
        staged: {},
        recommended: {},
    },
};

const mockSongsEmpty = {
    loading: false,
    error: null,
    data: [],
    count: 0,
};

const mockSongVersionsEmpty = {
    loading: false,
    error: null,
    data: {
        type: 'category',
        config: {
            name: 'Category',
            last_categories_updated_date: 'Wed Mar 11 2020 20:46:03 GMT+0000',
        },
    },
};

describe('stores/songVersions/songVersionsSelectors', () => {
    it('should return flattened versions', () => {
        const result = getFlattenedVersions(mockSongs, mockSongVersions);
        expect(result).toHaveLength(3);
    });

    it('should return flattened versions', () => {
        const result = getFlattenedVersions(mockSongsEmpty, mockSongVersionsEmpty);
        expect(result).toHaveLength(0);
    });
});
