import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Image from 'components/Utilities/Image';

const SongDetailModalTitle = props => {
    const {
        onCustomizeBreakout,
        data: { avatar, name, artist, id },
        loading,
        onCycleSong,
    } = props;

    return loading ? null : (
        <Modal.Title>
            <Image alt="Avatar" src={avatar} />
            <div className="music-tracker-detail-header">
                <h5 className="music-tracker-detail-title">{name}</h5>
                <div className="music-tracker-detail-sub-title">{artist}</div>
            </div>
            <div className="filter-group music-tracker-song-detail-cycle-group">
                <div className="music-tracker-song-detail-cycle">
                    <div className="music-tracker-song-detail-cycle-subtitle">
                        <button
                            type="button"
                            className="music-tracker-song-detail-cycle-arrow"
                            onClick={() => onCycleSong(id, 'prev')}
                        >
                            <i className="fa fa-chevron-left" />
                        </button>
                        <span className="music-tracker-song-detail-subtitle-text">Prev | Next</span>
                        <button
                            type="button"
                            className="music-tracker-song-detail-cycle-arrow"
                            onClick={() => onCycleSong(id, 'next')}
                        >
                            <i className="fa fa-chevron-right" />
                        </button>
                    </div>
                </div>
            </div>
            <Button
                key="customize"
                bsSize="small"
                onClick={() => onCustomizeBreakout(true)}
                bsClass="btn btn-sm btn-default btn-customize"
            >
                <i className="icon fa fa-cog" />
            </Button>
        </Modal.Title>
    );
};

SongDetailModalTitle.propTypes = {
    data: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    onCustomizeBreakout: PropTypes.func.isRequired,
    onCycleSong: PropTypes.func.isRequired,
};

export default SongDetailModalTitle;
