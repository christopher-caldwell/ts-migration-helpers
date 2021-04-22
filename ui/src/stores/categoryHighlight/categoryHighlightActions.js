import { DEHIGHLIGHT_CATEGORY_VERSION, HIGHLIGHT_CATEGORY_VERSION } from '../actionTypes';

export const dehighlightCategoryVersion = () => ({ type: DEHIGHLIGHT_CATEGORY_VERSION });

export const highlightCategoryVersion = (item, source) => {
    const { sId, media_id: mediaId } = item;
    const songId = parseInt(sId, 10);
    return {
        type: HIGHLIGHT_CATEGORY_VERSION,
        payload: { source, songId, mediaId },
    };
};
