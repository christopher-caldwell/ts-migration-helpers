import React from 'react';

import Select from 'react-select';

import {
    // css classes!
    daypartSelectRow,
    daypartMlModalSelect,
    altcategoryMlModalSelect,
    iconButton,
} from './daypart-single-song.module.scss';

const DaypartRow = ({
    daypart,
    dayparts,
    altCategory,
    categoryOptions,
    action,
    daypartOnChange,
    categoryOnChange,
    selectNewDaypart,
    changeCurrentAltCategory,
    addNewDaypart,
    removeDaypart,
}) => {
    const handleAltCategoryChange = newAltCat => {
        if (selectNewDaypart) {
            return newAltCat
                ? categoryOnChange(newAltCat)
                : categoryOnChange({ value: '', label: '' });
        }
        return newAltCat
            ? changeCurrentAltCategory(daypart.value, newAltCat.value)
            : changeCurrentAltCategory(daypart.value, altCategory.value);
    };

    const showPlus = selectNewDaypart && daypart.value !== '' && altCategory.value !== '';

    const sendDaypartToRemove = () => removeDaypart(daypart.value);

    return (
        <div className={daypartSelectRow}>
            {selectNewDaypart ? ( // new daypart dropdown
                <Select
                    name="react-select-container"
                    className={`react-select-container ${daypartMlModalSelect}`}
                    value={daypart}
                    options={dayparts}
                    onChange={daypartOnChange}
                    clearable={false}
                />
            ) : (
                <h6 className={daypartMlModalSelect}>{daypart.label}</h6>
            )}
            <Select
                name="react-select-container"
                className={`react-select-container ${altcategoryMlModalSelect}`}
                value={altCategory}
                options={categoryOptions}
                onChange={handleAltCategoryChange}
                clearable={false}
            />
            {showPlus ? (
                <button className={iconButton} onClick={() => addNewDaypart(altCategory.value)}>
                    <i className={`azure fa fa-${action}`} />
                </button>
            ) : null}
            {action === 'minus' ? (
                <button className={iconButton} onClick={sendDaypartToRemove}>
                    <i className={`azure fa fa-${action}`} />
                </button>
            ) : null}
        </div>
    );
};

export default DaypartRow;
