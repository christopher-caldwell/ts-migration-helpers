import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { updateSongsAlternateCategory } from 'stores/dayparts/daypartsActions';
import SearchSong from '../Components/SearchSong';
import GroupSongs from '../Components/GroupSongs';
import AsideModalControls from '../Components/AsideModalControls';

class DaypartSongsList extends React.Component {
    state = {
        daypartEdited: {},
    };

    componentDidMount() {
        this.initializeDaypart();
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypart' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        const { daypart } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songDaypart' implicitly has an 'any' ty... Remove this comment to see the full error message
        if (!isEqual(daypart, prevProps.daypart)) {
            this.initializeDaypart();
        }
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    addSongDaypart = song => {
        const {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songDaypart' implicitly has an 'any' ty... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypart' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
            daypartEdited: { songs },
        } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        this.setState({
            daypartEdited: {
                ...this.state.daypartEdited,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                songs: [...songs, song],
            },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
        });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    };

    removeSongDaypart = song => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypart' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        const { daypartEdited, alternateCategoriesChanges } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        const newSongs = daypartEdited.songs.filter(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
            songDaypart => song.media_id !== songDaypart.media_id
        );

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        this.setState({
            alternateCategoriesChanges: {
                ...alternateCategoriesChanges,
                [song.media_id]: {
                    sId: song.sId,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
                    alternate: {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                        [daypartEdited.id]: {
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSongsAlternateCategoryAction' does... Remove this comment to see the full error message
                            category_id: null,
                        },
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
                    },
                },
            },
            daypartEdited: {
                // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
                ...daypartEdited,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
                songs: newSongs,
            },
        });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesList' does not exist on type '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'daypart' does not exist on type 'Readonl... Remove this comment to see the full error message
    initializeDaypart = () => {
        const { daypart } = this.props;

        this.setState({ daypartEdited: daypart });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    };

    handleClose = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
        const { handleClose } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
        this.setState({ daypartEdited: {} });
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        handleClose();
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
    canAddSong = (song, template) => {
        const { stationCategoriesPermissions } = this.props;
        if (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
            (!song.alternate || // song doesn't have a daypart
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSongsAlternateCategoryAction' does... Remove this comment to see the full error message
                !isEqual(template.id, get(song, `alternate[${template.id}]`))) && // template id not equal daypart id
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
            !stationCategoriesPermissions[song.gs_category || (song.category || { name: '' }).name]
        )
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
            return true; // song category is not forbidden
    };

    onAlternateCategory = (category, song, daypartId) => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
        const { daypartEdited } = this.state;
        const updateAlternateSongs = [...daypartEdited.songs];

        const index = updateAlternateSongs.findIndex(
            foundSong => song.media_id === foundSong.media_id
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
        );
        updateAlternateSongs[index] = {
            ...song,
            alternate: {
                [daypartId]: {
                    ...song.alternate[daypartId],
                    category_id: category ? category.value : null,
                },
            },
        };

        this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
            alternateCategoriesChanges: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
                ...this.state.alternateCategoriesChanges,
                [song.media_id]: {
                    sId: song.sId,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
                    alternate: {
                        [daypartId]: {
                            category_id: category.value,
                        },
                    },
                },
            },

            daypartEdited: {
                ...daypartEdited,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                songs: updateAlternateSongs,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
            },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSongsAlternateCategoryAction' does... Remove this comment to see the full error message
        });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    handleSave = () => {
        const {
            boardDetails: {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
                layout: { board },
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            updateSongsAlternateCategoryAction,
            handleClose,
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        } = this.props;
        const { alternateCategoriesChanges } = this.state;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const songs = Object.entries(alternateCategoriesChanges).map(([key, value]) => ({
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
            ...value,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
            media_id: key,
        }));
// @ts-expect-error ts-migrate(2339) FIXME: Property 'daypart' does not exist on type 'Readonl... Remove this comment to see the full error message

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        updateSongsAlternateCategoryAction({ stationId: board.id, songs });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'alternateCategoriesChanges' does not exi... Remove this comment to see the full error message
        handleClose();
    };

    render() {
        const { versions, categoriesList, daypart, stationCategoriesPermissions } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'k' implicitly has an 'any' type.
        const { daypartEdited, alternateCategoriesChanges } = this.state;
        const saveDisabled = !alternateCategoriesChanges || isEqual(daypart, daypartEdited);

        const filteredCategoryList = categoriesList.filter(
            k => !stationCategoriesPermissions[k.label]
        );

        return (
            <div className="template-song">
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'. */}
                <div className="template-song__header">
                    <p className="template-song__label">Daypart name:</p>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'. */}
                    <p className="template-song__name" title={daypartEdited.name}>
                        {daypartEdited.name}
                    </p>
                </div>
                <GroupSongs
                    songs={daypartEdited.songs || []}
                    handleClick={this.removeSongDaypart}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
                    icon="fa-minus"
                    labelToGroupSongs={{
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
                        noSong: 'Assign any alternate categories for:',
                        withSong: 'Songs to be assigned to the alternate category:',
                    }}
                    enableAlternateCategory
                    categoriesList={filteredCategoryList}
                    daypartId={daypartEdited.id}
                    onAlternateCategory={this.onAlternateCategory}
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                />
                <SearchSong
                    versions={versions}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    handleClick={this.addSongDaypart}
                    template={daypartEdited}
                    canAddValidation={this.canAddSong}
                />
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                <AsideModalControls
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
                    handleCancel={this.handleClose}
                    handleSave={this.handleSave}
                    saveLabel="Save"
                    cancelLabel="Close"
                    disabled={saveDisabled}
                />
            </div>
        );
    }
}

DaypartSongsList.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    daypart: PropTypes.shape().isRequired,
    handleClose: PropTypes.func.isRequired,
    updateSongsAlternateCategoryAction: PropTypes.func.isRequired,
    versions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ boardDetails }) => ({
    boardDetails,
});

const mapDispatchToProps = {
    updateSongsAlternateCategoryAction: updateSongsAlternateCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(DaypartSongsList);
