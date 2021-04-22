import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import SearchField from '../../SearchField';
import SongDetails from './SongDetails';

class SearchSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchValue: '', songsResult: [] };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.handleResetSearch = this.handleResetSearch.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { searchValue } = this.state;

        if (!!searchValue && !isEqual(this.props.template.songs, prevProps.template.songs)) {
            this.filter(searchValue);
        }
    }

    onSearchChange(value) {
        if (!value) {
            this.setState({ searchValue: '', songsResult: [] });
            return;
        }

        this.filter(value);
    }

    filter(searchValue) {
        const { versions, template, canAddValidation } = this.props;
        // Scape special characters. Ex.: \(, \{
        const scapeSearch = searchValue.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(scapeSearch, 'gi');
        const filterSongCriteria = song => {
            const isSongInsideSearchCriteria = searchValue ? !!song.aNm.match(regex) || !!song.sNm.match(regex) : true;

            const songNotAdded = !template.songs.some(item => item.media_id === song.media_id);

            const hasNoMediaId = !!song.media_id;

            return isSongInsideSearchCriteria && songNotAdded && canAddValidation(song, template) && hasNoMediaId;
        };

        const songsResult = versions.filter(filterSongCriteria);
        this.setState({ searchValue, songsResult });
    }

    handleResetSearch() {
        this.setState({ searchValue: '', songsResult: [] });
        this.props.handleResetClickedSong();
    }

    render() {
        const { searchValue, songsResult } = this.state;
        const { handleClick } = this.props;

        return (
            <div className="search-song">
                <SearchField
                    placeholder="Artist or Song"
                    onSearchChange={this.onSearchChange}
                    handleReset={this.handleResetSearch}
                    value={searchValue}
                />
                <div className="aside-modal__search-result">
                    {searchValue && songsResult && (
                        <p className="p3">
                            {songsResult.length}
                            {`${songsResult.length === 1 ? ' Result ' : ' Results '}`}
                        </p>
                    )}
                </div>
                {songsResult.map(song => (
                    <div key={`${song.media_id}`}>
                        <SongDetails song={song} handleClick={handleClick} />
                    </div>
                ))}
            </div>
        );
    }
}

SearchSong.propTypes = {
    canAddValidation: PropTypes.func.isRequired,
    template: PropTypes.shape().isRequired,
    versions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    handleClick: PropTypes.func,
    handleResetClickedSong: PropTypes.func,
};

SearchSong.defaultProps = {
    handleClick: () => {},
    handleResetClickedSong: () => {},
};

export default SearchSong;
