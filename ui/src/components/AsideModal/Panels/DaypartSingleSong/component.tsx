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
    newDaypartContainer,
    songDetailsWrapper,
} from './daypart-single-song.module.scss';

const DaypartSingleSong = ({
    handleClose,
    selectedSong,
    bottomBarOpen,
    dayparts,
    categoryOptions,
    updateSongsAlternateCategoryAction,
    boardId,
}) => {
    const initialNewDaypart = { value: '', label: 'Add Daypart' };
    const initialNewAltCategory = { value: '', label: '' };

    const [currentDayparts, changeSelectedDayparts] = useState(selectedSong.alternate);
    const [newDaypart, changeNewDaypart] = useState(initialNewDaypart);
    const [newAltCategory, changeNewAltCategory] = useState(initialNewAltCategory);

    const daypartOnChange = selectedDaypart =>
        selectedDaypart ? changeNewDaypart(selectedDaypart) : initialNewDaypart;

    const handleAltCatChange = selectedAltCat =>
        selectedAltCat ? changeNewAltCategory(selectedAltCat) : initialNewAltCategory;

    const changeCurrentAltCategory = (changeDaypartId, newAltCatId) =>
        changeSelectedDayparts({
            ...currentDayparts,
            [changeDaypartId]: { category_id: newAltCatId },
        });

    const addNewDaypart = () => {
        // click of plus button
        changeSelectedDayparts({
            ...currentDayparts,
            [newDaypart.value]: { category_id: newAltCategory.value },
        });
        changeNewDaypart(initialNewDaypart); // reset new daypart dropdown
        changeNewAltCategory(initialNewAltCategory); // reset new alt cat dropdown
    };

    const removeDaypart = daypartToRemove => {
        const { [daypartToRemove]: altToRemove, ...filteredDayparts } = currentDayparts;
        changeSelectedDayparts(filteredDayparts);
    };

    const saveDaypartChanges = () => {
        const initDpIds = Object.keys(selectedSong.alternate);
        const currDpIds = Object.keys(currentDayparts);
        const removedIds = difference(initDpIds, currDpIds);

        const songs = [
            {
                alternate: [...removedIds, ...currDpIds].reduce((total, dpId) => {
                    if (removedIds.includes(dpId))
                        return { ...total, [dpId]: { category_id: null } };
                    const initAltCat = selectedSong.alternate[dpId]
                        ? selectedSong.alternate[dpId].category_id
                        : null;
                    const currAltCat = currentDayparts[dpId].category_id;
                    if (initAltCat === currAltCat) return total;
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
        .filter(daypart => !currDaypartsArr.map(([id]) => Number(id)).includes(daypart.id))
        .map(({ id, name }) => ({ value: id, label: name }));

    const saveButtonDisabled = isEqual(
        initDaypartArr.map(([dpId, { category_id }]) => [dpId, category_id]),
        currDaypartsArr.map(([dpId, { category_id }]) => [dpId, category_id])
    );

    const findDaypart = id => dayparts.find(daypart => daypart.id === id);
    const findAltCategory = catId => categoryOptions.find(({ value }) => catId === value);
    const filterCatOptions = catId => categoryOptions.filter(({ value }) => catId !== value);
    const heightLogic =
        currDaypartsArr.length > 4
            ? { height: '650px', overflow: 'auto' }
            : { height: `${currDaypartsArr.length * 120}` };

    return (
        <div className={daypartModalContainer}>
            <div className="template-song__header">
                <p className="template-song__label">Assign any alternate categories for:</p>
                <div className={songDetailsWrapper}>
                    <SongDetails song={selectedSong} musicTracker />
                </div>
            </div>
            <div className={daypartRowsContainer}>
                {currDaypartsArr.length ? (
                    <div className={currentDaypartsContainer} style={heightLogic}>
                        {currDaypartsArr.map(([assignedDaypartId, altCategoryInfo]) => {
                            const { id, name } = findDaypart(Number(assignedDaypartId));
                            const altCategory = findAltCategory(altCategoryInfo.category_id);
                            const filteredCategoryOptions = filterCatOptions(altCategory.value);

                            return (
                                <DaypartRow
                                    key={id}
                                    action="minus"
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
