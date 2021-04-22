import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { updateSongsRestriction } from 'stores/restrictions/restrictionsActions';
import SearchSong from '../Components/SearchSong';
import GroupSongs from '../Components/GroupSongs';
import AsideModalControls from '../Components/AsideModalControls';

class RestrictionSongsList extends React.Component {
    state = {
        restrictionEdited: {},
    };

    componentDidMount() {
        this.initializePacket();
    }

    componentDidUpdate(prevProps) {
        const { restriction } = this.props;
        if (!isEqual(restriction, prevProps.restriction)) {
            this.initializePacket();
        }
    }

    initializePacket = () => {
        const { restriction } = this.props;

        this.setState({ restrictionEdited: restriction });
    };

    addSongRestriction = song => {
        const { restrictionEdited } = this.state;

        const newSongs = [...restrictionEdited.songs];
        const newSongToRestriction = song;

        newSongToRestriction.restriction_id = restrictionEdited.id;
        newSongs.push(newSongToRestriction);

        return this.setState({
            restrictionEdited: {
                ...restrictionEdited,
                songs: newSongs,
            },
        });
    };

    removeSong = song => {
        const { restrictionEdited } = this.state;
        const newSongs = restrictionEdited.songs.filter(
            songPacket => song.media_id !== songPacket.media_id
        );

        return this.setState({
            restrictionEdited: {
                ...restrictionEdited,
                songs: newSongs,
            },
        });
    };

    handleClose = () => {
        const { handleClose } = this.props;

        this.setState({ restrictionEdited: {} });
        handleClose();
    };

    handleSave = () => {
        const { restrictionEdited } = this.state;

        const {
            handleUpdateSongsRestriction,
            boardDetails,
            restriction: { songs },
        } = this.props;
        const {
            layout: { board },
        } = boardDetails;

        const addedSongs = restrictionEdited.songs
            .filter(
                songToSend =>
                    // don't send songs that weren't changed
                    !songs.some(
                        songAlreadyInRestriction =>
                            songToSend.media_id === songAlreadyInRestriction.media_id &&
                            songToSend.restriction_id === songAlreadyInRestriction.restriction_id
                    )
            )
            .map(song => ({
                sId: song.sId,
                media_id: song.media_id,
                restriction_id: song.restriction_id,
            }));

        let removedSongs = [];
        if (songs) {
            removedSongs = songs
                .filter(
                    song =>
                        !restrictionEdited.songs.some(
                            currentEditedItem =>
                                song.media_id === currentEditedItem.media_id &&
                                song.restriction_id === currentEditedItem.restriction_id
                        )
                )
                .map(({ sId, media_id }) => ({
                    sId,
                    media_id,
                    restriction_id: null,
                }));
        }

        const changedSongs = addedSongs.concat(removedSongs);
        if (changedSongs.length) {
            handleUpdateSongsRestriction(board.id, changedSongs);
        }

        this.handleClose();
    };

    canAddSong = (song, template) => {
        const { stationCategoriesPermissions } = this.props;
        if (
            (!song.restriction_id || template.id === song.restriction_id) &&
            !stationCategoriesPermissions[song.gs_category || (song.category || { name: '' }).name]
        )
            return true;
    };

    render() {
        const { versions, restriction } = this.props;
        const { restrictionEdited } = this.state;

        const saveButtonDisabled = isEqual(restriction, restrictionEdited);

        return (
            <div className="template-song">
                <div className="template-song__header">
                    <p className="template-song__label">Restriction name:</p>
                    <p className="template-song__name" title={restriction.name}>
                        {restriction.name}
                    </p>
                </div>
                <GroupSongs
                    songs={restrictionEdited.songs || []}
                    handleClick={this.removeSong}
                    icon="fa-minus"
                    labelToGroupSongs={{
                        noSong: 'Select a song to be restricted:',
                        withSong: 'Songs to be added to the restriction:',
                    }}
                />
                <SearchSong
                    versions={versions}
                    handleClick={this.addSongRestriction}
                    template={restrictionEdited}
                    canAddValidation={this.canAddSong}
                />
                <AsideModalControls
                    handleCancel={this.handleClose}
                    handleSave={this.handleSave}
                    saveLabel="Save"
                    cancelLabel="Close"
                    disabled={saveButtonDisabled}
                />
            </div>
        );
    }
}

RestrictionSongsList.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    handleClose: PropTypes.func.isRequired,
    handleUpdateSongsRestriction: PropTypes.func.isRequired,
    restriction: PropTypes.shape().isRequired,
    versions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ boardDetails }) => ({
    boardDetails,
});

const mapDispatchToProps = {
    handleUpdateSongsRestriction: updateSongsRestriction,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestrictionSongsList);
