import request from 'utils/request';
import { getCategoriesMetadata, getStationCategories, updateStationCategories } from './categoriesActions';
import {
    CATEGORIES_METADATA_PENDING,
    CATEGORIES_METADATA_SUCCESS,
    CATEGORIES_METADATA_FAILURE,
    STATION_CATEGORIES_PENDING,
    STATION_CATEGORIES_SUCCESS,
    STATION_CATEGORIES_FAILURE,
} from '../actionTypes';

jest.mock('utils/request', () => jest.fn());
const dispatch = jest.fn();

const mockUpdateCategories = [0, 1];

const mockStationCategories = {
    1: {},
    2: {},
};

describe('categories actions', () => {
    beforeEach(() => {
        dispatch.mockReset();
    });

    describe('get categories metadata', () => {
        it('call to metadata API should work', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve());
            await getCategoriesMetadata()(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(request).toHaveBeenCalledWith('/metadata/category');
        });

        it('dispatch should be called with pending status', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getCategoriesMetadata()(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: CATEGORIES_METADATA_PENDING });
        });

        it('dispatch should be called with correct payload', async () => {
            const mockCategoriesMetadata = {
                1: {},
                2: {},
            };
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve(mockCategoriesMetadata));
            await getCategoriesMetadata()(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CATEGORIES_METADATA_SUCCESS,
                payload: { data: { ...mockCategoriesMetadata } },
            });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with failure status when fetch fails', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.reject('mission failed'));
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            await getCategoriesMetadata()(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: CATEGORIES_METADATA_FAILURE,
                payload: { error: 'mission failed' },
            });
        });
    });

    describe('get station categories', () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('call to metadata API should work', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve());
            await getStationCategories('3323404')(dispatch);
            expect(request).toHaveBeenCalledWith('/metadata/station/3323404/category');
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with pending status', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue();
            await getStationCategories('3323404')(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: STATION_CATEGORIES_PENDING });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with correct payload', async () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve(mockStationCategories));
            await getStationCategories('3323404')(dispatch);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: STATION_CATEGORIES_SUCCESS,
                payload: { data: { ...mockStationCategories } },
            });
            expect(dispatch).toHaveBeenCalledTimes(3);
        });

        it('dispatch should be called with failure status when fetch fails', async () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.reject('mission failed'));
            await getStationCategories('3323404')(dispatch);
            expect(dispatch).toHaveBeenLastCalledWith({
                type: STATION_CATEGORIES_FAILURE,
                payload: { error: 'mission failed' },
            });
        });
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
    describe('update station categories', () => {
        it('call to metadata API should work', async () => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
            request.mockReturnValue(Promise.resolve());
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            await updateStationCategories('3323404', mockUpdateCategories)(dispatch);
            expect(request).toHaveBeenCalledWith('/metadata/station/3323404/category');
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with pending status', async () => {
            request.mockReturnValue();
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            await updateStationCategories('3323404', mockUpdateCategories)(dispatch);
            expect(dispatch).toHaveBeenNthCalledWith(1, { type: STATION_CATEGORIES_PENDING });
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
        it('dispatch should be called with correct payload', async () => {
            const mockGetState = () => ({ stationCategories: { data: mockStationCategories } });
            request.mockReturnValue(Promise.resolve(mockStationCategories));
            await updateStationCategories('3323404', mockUpdateCategories)(dispatch, mockGetState);
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: STATION_CATEGORIES_SUCCESS,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockReturnValue' does not exist on type ... Remove this comment to see the full error message
                payload: { data: { ...mockStationCategories } },
            });
        });

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        it('dispatch should be called with failure status when fetch fails', async () => {
            request.mockReturnValue(Promise.reject('mission failed'));
            await updateStationCategories('3323404', mockUpdateCategories)(dispatch);
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            expect(dispatch).toHaveBeenLastCalledWith({
                type: STATION_CATEGORIES_FAILURE,
                payload: { error: 'mission failed' },
            });
        });
    });
});
