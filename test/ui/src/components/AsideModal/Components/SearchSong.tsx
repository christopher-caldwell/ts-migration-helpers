import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import SearchField from '../../SearchField';
import SongDetails from './SongDetails';

class SearchSong extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
        this.state = { searchValue: '', songsResult: [] };

        this.onSearchChange = this.onSearchChange.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
        this.handleResetSearch = this.handleResetSearch.bind(this);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchValue' implicitly has an 'any' ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'Readon... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchValue' implicitly has an 'any' ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
        const { searchValue } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleResetClickedSong' does not exist o... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (valu... Remove this comment to see the full error message
        if (!!searchValue && !isEqual(this.props.template.songs, prevProps.template.songs)) {
            this.filter(searchValue);
        }
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    onSearchChange(value) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        if (!value) {
            this.setState({ searchValue: '', songsResult: [] });
            return;
        }

        this.filter(value);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchValue' implicitly has an 'any' ty... Remove this comment to see the full error message
    filter(searchValue) {
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleResetClickedSong' does not exist o... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        const { versions, template, canAddValidation } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type 'Rea... Remove this comment to see the full error message
        // Scape special characters. Ex.: \(, \{
        const scapeSearch = searchValue.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (valu... Remove this comment to see the full error message
        const regex = new RegExp(scapeSearch, 'gi');
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const filterSongCriteria = song => {
            const isSongInsideSearchCriteria = searchValue ? !!song.aNm.match(regex) || !!song.sNm.match(regex) : true;

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            const songNotAdded = !template.songs.some(item => item.media_id === song.media_id);

            const hasNoMediaId = !!song.media_id;

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            return isSongInsideSearchCriteria && songNotAdded && canAddValidation(song, template) && hasNoMediaId;
        };

        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const songsResult = versions.filter(filterSongCriteria);
        this.setState({ searchValue, songsResult });
    }

    handleResetSearch() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        this.setState({ searchValue: '', songsResult: [] });
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        this.props.handleResetClickedSong();
    }

    render() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
        const { searchValue, songsResult } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClick' does not exist on type 'Rea... Remove this comment to see the full error message
        const { handleClick } = this.props;

        return (
            <div className="search-song">
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (valu... Remove this comment to see the full error message */}
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
                            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                            {`${songsResult.length === 1 ? ' Result ' : ' Results '}`}
                        </p>
                    )}
                </div>
                {songsResult.map(song => (
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                    <div key={`${song.media_id}`}>
                        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                        <SongDetails song={song} handleClick={handleClick} />
                    </div>
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
