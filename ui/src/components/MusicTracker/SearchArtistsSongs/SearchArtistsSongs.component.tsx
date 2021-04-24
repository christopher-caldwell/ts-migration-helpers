import React from 'react';

import SearchBar from '../../SearchBar';

const SearchArtistsSongs = ({ musicTrackerList, setSongOrder, songs }) => {
    // helper method to set search value and call the filter
    const handleSearch = searchData => {
        const results = filterSongData(searchData.toLowerCase(), songs, musicTrackerList);
        setSongOrder(results);
    };

    // helper function for reseting the search
    const handleResetSearch = () => setSongOrder(musicTrackerList);

    const searchbarWidthSearchArtistsSongs = { width: '250px' };

    return (
        <SearchBar
            searchbarWidth={searchbarWidthSearchArtistsSongs}
            placeHolder="Artist or Song"
            handleSearch={handleSearch}
            handleResetSearch={handleResetSearch}
        />
    );
};

// find in the store which songs match the search value, grab those song ids
const filterSongData = (searchString, songs, songIds) =>
    songIds.filter(songId => {
        const { songName = '', artistName = '' } = songs[songId];

        // setting to lower case for case-insensitive searching
        const songNameLowerCase = songName.toLowerCase();
        const artistNameLowerCase = artistName.toLowerCase();

        // if a users types in multiple values, split the value into an array so that
        // each word in the search string can be compared with artist and song
        if (searchString.indexOf(' ') >= 0) {
            // filters ONLY truth values
            const searchStringArray = searchString.split(' ').filter(Boolean);
            // each word needs to be compared against both artist and name in one string
            const combinedName = `${songNameLowerCase} ${artistNameLowerCase}`;

            const checkArtistSongData = word => {
                return combinedName.includes(word);
            };

            // with .every will be able to compare an unlimited amount of words to each artist/song record
            return searchStringArray.every(checkArtistSongData);
        }

        return (
            songNameLowerCase.includes(searchString) || artistNameLowerCase.includes(searchString)
        );
    });

export { SearchArtistsSongs as default, filterSongData };
