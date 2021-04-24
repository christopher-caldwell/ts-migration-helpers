import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import SongDetail from 'components/BoardPage/Panels/RadioPanels/MusicTracker/SongDetail';
import { Modal } from 'react-bootstrap';

import { getSongDetails } from 'stores/breakout/breakoutActions';
import SongDetailModalTitle from './SongDetailModalTitle';

const SongDetailModal = props => {
    const {
        breakout: { data, loading },
        breakoutPreferences: { disabledBreakouts, breakoutSortOrder },
        boardDetails,
        onClose,
        onCustomizeBreakout,
        getSongDetailsAction,
        songs,
        onSelectedSong,
    } = props;

    const { board } = boardDetails.layout;

    const onCycleSong = (songId, direction) => {
        const count = songs.length;
        const rowIndex = songs.findIndex(i => i.sId === songId);
        const prevRow = (rowIndex + count - 1) % count; // find the next or previous song id here
        const nextRow = (rowIndex + count + 1) % count; // find the next songId here
        const newRowIndex = direction === 'prev' ? prevRow : nextRow;
        const row = songs[newRowIndex];

        onSelectedSong(row.sId);
        getSongDetailsAction(row.sId);
    };

    return (
        <Modal bsSize="large" className="music-tracker-detail-modal" onHide={() => onClose()} show>
            <Modal.Header className="song-detail-modal-header custom-scrollbars--thin" closeButton>
                <SongDetailModalTitle
                    data={data}
                    onCustomizeBreakout={onCustomizeBreakout}
                    loading={loading}
                    onCycleSong={onCycleSong}
                />
            </Modal.Header>
            <Modal.Body>
                <SongDetail
                    data={data}
                    preferences={{
                        disabledBreakouts,
                        breakoutSortOrder,
                        stationId: board.id,
                    }}
                    loading={loading}
                />
            </Modal.Body>
        </Modal>
    );
};

SongDetailModal.propTypes = {
    boardDetails: PropTypes.shape().isRequired,
    breakout: PropTypes.shape().isRequired,
    breakoutPreferences: PropTypes.shape().isRequired,
    getSongDetailsAction: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
    onCustomizeBreakout: PropTypes.func.isRequired,
    onSelectedSong: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    boardDetails: state.boardDetails,
    breakout: state.breakout,
    breakoutPreferences: state.breakoutPreferences,
});

const mapDispatchToProps = {
    getSongDetailsAction: getSongDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(SongDetailModal);
