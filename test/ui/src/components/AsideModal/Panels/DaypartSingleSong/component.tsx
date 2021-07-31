import React, { useState } from 'react';

import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import difference from 'lodash/difference';

import SongDetails from '../../Components/SongDetails';
import DaypartRow from './DaypartRow';
import AsideModalControls from '../../Components/AsideModalControls';

import {
    daypartModalContainer,
    daypartRowsContainer,
    currentDaypartsContainer,
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'bottomBarOpen' implicitly has an ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'bottomBarOpen' implicitly has an ... Remove this comment to see the full error message
    newDaypartContainer,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dayparts' implicitly has an 'any'... Remove this comment to see the full error message
    songDetailsWrapper,
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedDaypart' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'updateSongsAlternateCategoryActio... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedAltCat' implicitly has an 'any'... Remove this comment to see the full error message
} from './daypart-single-song.module.scss';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changeDaypartId' implicitly has an 'any... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardId' implicitly has an 'any' ... Remove this comment to see the full error message
const DaypartSingleSong = ({
    handleClose,
    selectedSong,
    bottomBarOpen,
    dayparts,
    categoryOptions,
    updateSongsAlternateCategoryAction,
    boardId,
}) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryOptions' does not exist on type ... Remove this comment to see the full error message
    const initialNewDaypart = { value: '', label: 'Add Daypart' };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartToRemove' implicitly has an 'any... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedDaypart' implicitly has an 'any... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSongsAlternateCategoryAction' does... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedAltCat' implicitly has an 'any'... Remove this comment to see the full error message
    const initialNewAltCategory = { value: '', label: '' };

    const [currentDayparts, changeSelectedDayparts] = useState(selectedSong.alternate);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changeDaypartId' implicitly has an 'any... Remove this comment to see the full error message
    const [newDaypart, changeNewDaypart] = useState(initialNewDaypart);
    const [newAltCategory, changeNewAltCategory] = useState(initialNewAltCategory);

    const daypartOnChange = selectedDaypart =>
        selectedDaypart ? changeNewDaypart(selectedDaypart) : initialNewDaypart;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedDaypart' implicitly has an 'any... Remove this comment to see the full error message
    const handleAltCatChange = selectedAltCat =>
        selectedAltCat ? changeNewAltCategory(selectedAltCat) : initialNewAltCategory;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartToRemove' implicitly has an 'any... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectedAltCat' implicitly has an 'any'... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
    const changeCurrentAltCategory = (changeDaypartId, newAltCatId) =>
        changeSelectedDayparts({
            ...currentDayparts,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'category_id' does not exist on type 'unk... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'changeDaypartId' implicitly has an 'any... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
            [changeDaypartId]: { category_id: newAltCatId },
        });

    const addNewDaypart = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catId' implicitly has an 'any' type.
        // click of plus button
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
        changeSelectedDayparts({
            ...currentDayparts,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catId' implicitly has an 'any' type.
            [newDaypart.value]: { category_id: newAltCategory.value },
        });
        changeNewDaypart(initialNewDaypart); // reset new daypart dropdown
        changeNewAltCategory(initialNewAltCategory); // reset new alt cat dropdown
    };

    const removeDaypart = daypartToRemove => {
        const { [daypartToRemove]: altToRemove, ...filteredDayparts } = currentDayparts;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypartToRemove' implicitly has an 'any... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        changeSelectedDayparts(filteredDayparts);
    };

    const saveDaypartChanges = () => {
        const initDpIds = Object.keys(selectedSong.alternate);
        const currDpIds = Object.keys(currentDayparts);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'daypart' implicitly has an 'any' type.
        const removedIds = difference(initDpIds, currDpIds);

        const songs = [
            {
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'id' implicitly has an 'any' type.
                alternate: [...removedIds, ...currDpIds].reduce((total, dpId) => {
                    if (removedIds.includes(dpId))
                        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ key: any; action: string; daypart: { value... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'category_id' does not exist on type 'unk... Remove this comment to see the full error message
                        return { ...total, [dpId]: { category_id: null } };
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category_id' does not exist on type 'unk... Remove this comment to see the full error message
                    const initAltCat = selectedSong.alternate[dpId]
                        ? // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'id' implicitly has an 'any' type.
                          selectedSong.alternate[dpId].category_id
                        : null;
                    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ key: number; action: string; daypart: { va... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catId' implicitly has an 'any' type.
                    const currAltCat = currentDayparts[dpId].category_id;
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catId' implicitly has an 'any' type.
                    if (initAltCat === currAltCat) return total;
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
                    return { ...total, [dpId]: currentDayparts[dpId] };
                }, {}),
                media_id: selectedSong.media_id,
                sId: selectedSong.sId,
            },
        ];

        updateSongsAlternateCategoryAction({ stationId: boardId, songs });
        handleClose();
    };

    const initDaypartArr = Object.entries(selectedSong.alternate);
    const currDaypartsArr = Object.entries(currentDayparts);
    const daypartDropDownOptions = dayparts
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        .filter(daypart => !currDaypartsArr.map(([id]) => Number(id)).includes(daypart.id))
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        .map(({ id, name }) => ({ value: id, label: name }));

    const saveButtonDisabled = isEqual(
        initDaypartArr.map(([dpId, { category_id }]) => [dpId, category_id]),
        currDaypartsArr.map(([dpId, { category_id }]) => [dpId, category_id])
    );

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category_id' does not exist on type 'unk... Remove this comment to see the full error message
    const findDaypart = id => dayparts.find(daypart => daypart.id === id);
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ key: any; action: string; daypart: { value... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category_id' does not exist on type 'unk... Remove this comment to see the full error message
    const findAltCategory = catId => categoryOptions.find(({ value }) => catId === value);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catId' implicitly has an 'any' type.
    const filterCatOptions = catId => categoryOptions.filter(({ value }) => catId !== value);
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message
    const heightLogic =
        currDaypartsArr.length > 4
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'catId' implicitly has an 'any' type.
            ? { height: '650px', overflow: 'auto' }
            : // @ts-expect-error ts-migrate(2739) FIXME: Type '{ key: number; action: string; daypart: { va... Remove this comment to see the full error message
              { height: `${currDaypartsArr.length * 120}` };

    return (
        <div className={daypartModalContainer}>
            <div className="template-song__header">
                <p className="template-song__label">Assign any alternate categories for:</p>
                <div className={songDetailsWrapper}>
                    <SongDetails song={selectedSong} musicTracker />
                </div>
            </div>
            <div className={daypartRowsContainer}>
                {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                {currDaypartsArr.length ? (
                    <div className={currentDaypartsContainer} style={heightLogic}>
                        {currDaypartsArr.map(([assignedDaypartId, altCategoryInfo]) => {
                            const { id, name } = findDaypart(Number(assignedDaypartId));
                            const altCategory = findAltCategory(altCategoryInfo.category_id);
                            const filteredCategoryOptions = filterCatOptions(altCategory.value);

                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                            return (
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                <DaypartRow
                                    key={id}
                                    action="minus"
                                    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ key: any; action: string; daypart: { value... Remove this comment to see the full error message
                                    daypart={{ value: id, label: name }}
                                    categoryOptions={filteredCategoryOptions}
                                    altCategory={altCategory}
                                    changeCurrentAltCategory={changeCurrentAltCategory}
                                    removeDaypart={removeDaypart}
                                />
                            );
                        })}
                    </div>
                ) : null}
                <div className={newDaypartContainer}>
                    <DaypartRow
                        key={999}
                        action="plus"
                        daypart={newDaypart}
                        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ key: number; action: string; daypart: { va... Remove this comment to see the full error message
                        altCategory={newAltCategory}
                        categoryOptions={categoryOptions}
                        dayparts={daypartDropDownOptions}
                        daypartOnChange={daypartOnChange}
                        categoryOnChange={handleAltCatChange}
                        addNewDaypart={addNewDaypart}
                        selectNewDaypart
                    />
                </div>
            </div>
            <AsideModalControls
                handleCancel={handleClose}
                handleSave={saveDaypartChanges}
                saveLabel="Save"
                cancelLabel="Close"
                disabled={saveButtonDisabled}
                bottomBarOpen={bottomBarOpen}
                showTooltip
                tooltipMessage="Please make a change in order to save."
            />
        </div>
    );
};

DaypartSingleSong.propTypes = {
    bottomBarOpen: PropTypes.bool.isRequired,
    dayparts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    handleClose: PropTypes.func.isRequired,
    selectedSong: PropTypes.shape().isRequired,
};

export default DaypartSingleSong;
