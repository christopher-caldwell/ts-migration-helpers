// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
import React from 'react';

import Select from 'react-select';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'daypart' implicitly has an 'any' ... Remove this comment to see the full error message
import {
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dayparts' implicitly has an 'any'... Remove this comment to see the full error message
    // css classes!
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'altCategory' implicitly has an 'a... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'removeDaypart' implicitly has an ... Remove this comment to see the full error message
    daypartSelectRow,
    daypartMlModalSelect,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newAltCat' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'daypart' implicitly has an 'any' ... Remove this comment to see the full error message
    altcategoryMlModalSelect,
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'dayparts' implicitly has an 'any'... Remove this comment to see the full error message
    iconButton,
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'altCategory' implicitly has an 'a... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './daypart-single-song.module.s... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'addNewDaypart' implicitly has an ... Remove this comment to see the full error message
} from './daypart-single-song.module.scss';

const DaypartRow = ({
    daypart,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newAltCat' implicitly has an 'any' type... Remove this comment to see the full error message
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
