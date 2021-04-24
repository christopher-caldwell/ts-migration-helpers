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

    componentDidUpdate(prevProps) {
        const { daypart } = this.props;
        if (!isEqual(daypart, prevProps.daypart)) {
            this.initializeDaypart();
        }
    }

    addSongDaypart = song => {
        const {
            daypartEdited: { songs },
        } = this.state;

        this.setState({
            daypartEdited: {
                ...this.state.daypartEdited,
                songs: [...songs, song],
            },
        });
    };

    removeSongDaypart = song => {
        const { daypartEdited, alternateCategoriesChanges } = this.state;

        const newSongs = daypartEdited.songs.filter(
            songDaypart => song.media_id !== songDaypart.media_id
        );

        this.setState({
            alternateCategoriesChanges: {
                ...alternateCategoriesChanges,
                [song.media_id]: {
                    sId: song.sId,
                    alternate: {
                        [daypartEdited.id]: {
                            category_id: null,
                        },
                    },
                },
            },
            daypartEdited: {
                ...daypartEdited,
                songs: newSongs,
            },
        });
    };

    initializeDaypart = () => {
        const { daypart } = this.props;

        this.setState({ daypartEdited: daypart });
    };

    handleClose = () => {
        const { handleClose } = this.props;

        this.setState({ daypartEdited: {} });
        handleClose();
    };

    canAddSong = (song, template) => {
        const { stationCategoriesPermissions } = this.props;
        if (
            (!song.alternate || // song doesn't have a daypart
                !isEqual(template.id, get(song, `alternate[${template.id}]`))) && // template id not equal daypart id
            !stationCategoriesPermissions[song.gs_category || (song.category || { name: '' }).name]
        )
            return true; // song category is not forbidden
    };

    onAlternateCategory = (category, song, daypartId) => {
        const { daypartEdited } = this.state;
        const updateAlternateSongs = [...daypartEdited.songs];

        const index = updateAlternateSongs.findIndex(
            foundSong => song.media_id === foundSong.media_id
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
            alternateCategoriesChanges: {
                ...this.state.alternateCategoriesChanges,
                [song.media_id]: {
                    sId: song.sId,
                    alternate: {
                        [daypartId]: {
                            category_id: category.value,
                        },
                    },
                },
            },

            daypartEdited: {
                ...daypartEdited,
                songs: updateAlternateSongs,
            },
        });
    };

    handleSave = () => {
        const {
            boardDetails: {
                layout: { board },
            },
            updateSongsAlternateCategoryAction,
            handleClose,
        } = this.props;
        const { alternateCategoriesChanges } = this.state;
        const songs = Object.entries(alternateCategoriesChanges).map(([key, value]) => ({
            ...value,
            media_id: key,
        }));

        updateSongsAlternateCategoryAction({ stationId: board.id, songs });
        handleClose();
    };

    render() {
        const { versions, categoriesList, daypart, stationCategoriesPermissions } = this.props;
        const { daypartEdited, alternateCategoriesChanges } = this.state;
        const saveDisabled = !alternateCategoriesChanges || isEqual(daypart, daypartEdited);

        const filteredCategoryList = categoriesList.filter(
            k => !stationCategoriesPermissions[k.label]
        );

        return (
            <div className="template-song">
                <div className="template-song__header">
                    <p className="template-song__label">Daypart name:</p>
                    <p className="template-song__name" title={daypartEdited.name}>
                        {daypartEdited.name}
                    </p>
                </div>
                <GroupSongs
                    songs={daypartEdited.songs || []}
                    handleClick={this.removeSongDaypart}
                    icon="fa-minus"
                    labelToGroupSongs={{
                        noSong: 'Assign any alternate categories for:',
                        withSong: 'Songs to be assigned to the alternate category:',
                    }}
                    enableAlternateCategory
                    categoriesList={filteredCategoryList}
                    daypartId={daypartEdited.id}
                    onAlternateCategory={this.onAlternateCategory}
                />
                <SearchSong
                    versions={versions}
                    handleClick={this.addSongDaypart}
                    template={daypartEdited}
                    canAddValidation={this.canAddSong}
                />
                <AsideModalControls
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
