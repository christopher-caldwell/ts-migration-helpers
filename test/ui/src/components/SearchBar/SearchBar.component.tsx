import React, { useState } from 'react';

import IconX from 'components/Buttons/IconX';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SearchBar.module.scss' or it... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SearchBar.module.scss' or it... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SearchBar.module.scss' or it... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchValue' implicitly has an 'any'... Remove this comment to see the full error message
import searchbarStyle from './SearchBar.module.scss';

const SearchBar = ({ placeHolder, handleSearch, handleResetSearch, searchbarWidth }) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newSearchValue' implicitly has an 'any'... Remove this comment to see the full error message
    const [searchValue, setSearchValue] = useState('');

    // helper function to soften the delay between user
    // input and the displaying of the search result
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
    const onSearchValue = newSearchValue => setTimeout(() => handleSearch(newSearchValue), 500);

    // handle event of the search and save/set the search value
    const handleChange = e => {
        const newSearchValue = e.target.value;
        setSearchValue(newSearchValue);

        // checking when the user deletes the search value form the searchbar
        if (newSearchValue === '') {
            handleResetSearch();
        } else {
            onSearchValue(newSearchValue);
        }
    };

    // reset the search results and clear search value
    const onHandleReset = () => {
        setSearchValue('');
        handleResetSearch();
    };

    return (
        <div className={searchbarStyle.searchbar} style={searchbarWidth}>
            <div className={searchbarStyle.icon}>
                <i className="fa fa-search" />
            </div>
            <input
                className={searchbarStyle.searchbarInput}
                placeholder={placeHolder}
                onChange={handleChange}
                value={searchValue}
            />
            {searchValue && (
                <IconX onClick={() => onHandleReset()} className={searchbarStyle.btnReset} />
            )}
        </div>
    );
};

export default SearchBar;
