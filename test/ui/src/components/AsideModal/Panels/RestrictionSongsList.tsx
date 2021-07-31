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

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
    componentDidUpdate(prevProps) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const { restriction } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        if (!isEqual(restriction, prevProps.restriction)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
            this.initializePacket();
        }
    }

    initializePacket = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction' does not exist on type 'Rea... Remove this comment to see the full error message
        const { restriction } = this.props;

        this.setState({ restrictionEdited: restriction });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsRestriction' does not e... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songToSend' implicitly has an 'any' typ... Remove this comment to see the full error message
    addSongRestriction = song => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songAlreadyInRestriction' implicitly ha... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songPacket' implicitly has an 'any' typ... Remove this comment to see the full error message
        const { restrictionEdited } = this.state;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        const newSongs = [...restrictionEdited.songs];
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const newSongToRestriction = song;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        newSongToRestriction.restriction_id = restrictionEdited.id;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        newSongs.push(newSongToRestriction);

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentEditedItem' implicitly has an 'a... Remove this comment to see the full error message
        return this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsRestriction' does not e... Remove this comment to see the full error message
            restrictionEdited: {
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
                ...restrictionEdited,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'restriction' does not exist on type 'Rea... Remove this comment to see the full error message
                songs: newSongs,
            },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    removeSong = song => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songToSend' implicitly has an 'any' typ... Remove this comment to see the full error message
        const { restrictionEdited } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songAlreadyInRestriction' implicitly ha... Remove this comment to see the full error message
        const newSongs = restrictionEdited.songs.filter(
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songPacket' implicitly has an 'any' typ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
            songPacket => song.media_id !== songPacket.media_id
        );
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.

        return this.setState({
            restrictionEdited: {
                ...restrictionEdited,
                songs: newSongs,
            },
        });
    };

    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
    handleClose = () => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentEditedItem' implicitly has an 'a... Remove this comment to see the full error message
        const { handleClose } = this.props;

        this.setState({ restrictionEdited: {} });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        handleClose();
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    handleSave = () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleUpdateSongsRestriction' does not e... Remove this comment to see the full error message
        const { restrictionEdited } = this.state;

        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardDetails' does not exist on type 'Re... Remove this comment to see the full error message
            handleUpdateSongsRestriction,
            boardDetails,
            restriction: { songs },
        } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
            layout: { board },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songToSend' implicitly has an 'any' typ... Remove this comment to see the full error message
        } = boardDetails;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
        const addedSongs = restrictionEdited.songs
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songAlreadyInRestriction' implicitly ha... Remove this comment to see the full error message
            .filter(
                songToSend =>
                    // don't send songs that weren't changed
                    !songs.some(
                        songAlreadyInRestriction =>
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                            songToSend.media_id === songAlreadyInRestriction.media_id &&
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
                            songToSend.restriction_id === songAlreadyInRestriction.restriction_id
                    )
            )
            .map(song => ({
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                sId: song.sId,
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentEditedItem' implicitly has an 'a... Remove this comment to see the full error message
                media_id: song.media_id,
                restriction_id: song.restriction_id,
            }));

        let removedSongs = [];
        if (songs) {
            // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'sId' implicitly has an 'any' type... Remove this comment to see the full error message
            removedSongs = songs
                .filter(
                    song =>
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                        !restrictionEdited.songs.some(
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            currentEditedItem =>
                                song.media_id === currentEditedItem.media_id &&
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                song.restriction_id === currentEditedItem.restriction_id
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                        )
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'template' implicitly has an 'any' type.
                )
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
                .map(({ sId, media_id }) => ({
                    sId,
                    media_id,
                    restriction_id: null,
                }));
        }

        const changedSongs = addedSongs.concat(removedSongs);
        if (changedSongs.length) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
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

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'songs' does not exist on type '{}'.
        const saveButtonDisabled = isEqual(restriction, restrictionEdited);

        return (
            <div className="template-song">
                <div className="template-song__header">
                    <p className="template-song__label">Restriction name:</p>
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ versions: any; handleClick: (song: any) =>... Remove this comment to see the full error message */}
                    <p className="template-song__name" title={restriction.name}>
                        {restriction.name}
                    </p>
                </div>
                <GroupSongs
                    songs={restrictionEdited.songs || []}
                    handleClick={this.removeSong}
                    icon="fa-minus"
                    labelToGroupSongs={{
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        noSong: 'Select a song to be restricted:',
                        withSong: 'Songs to be added to the restriction:',
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    }}
                />
                <SearchSong
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    versions={versions}
                    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'boardDetails' implicitly has an '... Remove this comment to see the full error message
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
