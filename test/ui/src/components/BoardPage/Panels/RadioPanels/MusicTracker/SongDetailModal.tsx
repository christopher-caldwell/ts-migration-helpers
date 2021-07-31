import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import SongDetail from 'components/BoardPage/Panels/RadioPanels/MusicTracker/SongDetail';
import { Modal } from 'react-bootstrap';

import { getSongDetails } from 'stores/breakout/breakoutActions';
import SongDetailModalTitle from './SongDetailModalTitle';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const SongDetailModal = props => {
    const {
        breakout: { data, loading },
        breakoutPreferences: { disabledBreakouts, breakoutSortOrder },
        boardDetails,
        onClose,
        onCustomizeBreakout,
        getSongDetailsAction,
        songs,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
        onSelectedSong,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'direction' implicitly has an 'any' type... Remove this comment to see the full error message
    } = props;

    const { board } = boardDetails.layout;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
    const onCycleSong = (songId, direction) => {
        const count = songs.length;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type.
        const rowIndex = songs.findIndex(i => i.sId === songId);
        const prevRow = (rowIndex + count - 1) % count; // find the next or previous song id here
        const nextRow = (rowIndex + count + 1) % count; // find the next songId here
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
        const newRowIndex = direction === 'prev' ? prevRow : nextRow;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'direction' implicitly has an 'any' type... Remove this comment to see the full error message
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
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    loading={loading}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    onCycleSong={onCycleSong}
                />
            </Modal.Header>
            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
            <Modal.Body>
                <SongDetail
                    data={data}
                    preferences={{
                        disabledBreakouts,
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                        breakoutSortOrder,
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        stationId: board.id,
                    }}
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
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
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    getSongDetailsAction: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
    onCustomizeBreakout: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
