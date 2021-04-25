import React from 'react';

import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import MusicTrackerFilterHeader from 'components/BoardPage/Filters/MusicTrackerFilterHeader';
import classNames from 'classnames';

const HeaderCompare = props =>
    !props.hidden && (
        <div
            className={`
                music-tracker-header
                music-tracker-header-compare
                music-tracker-header-songs-selected
            `}
        >
            <div className="music-tracker-filters">
                <MusicTrackerFilterHeader onFilterSave={props.onFilterSave} disabled={props.loading} />
                <h6 className="music-tracker-header-text">{`${props.songsSelected} Songs Selected`}</h6>
            </div>
            <div className="music-tracker-actions">
                <button
                    type="button"
                    className={classNames('music-tracker-filter__button', {
                        'btn-active': props.trendsEnabled,
                    })}
                    onClick={() => props.onToggleTrends()}
                >
                    <i className="fa fa-chart-line" />
                </button>
                <Button bsSize="small" onClick={props.onSongClear}>
                    Clear
                </Button>
                <Button bsSize="small" disabled={props.isCompareDisabled} onClick={props.onSongCompare}>
                    Compare
                </Button>
            </div>
        </div>
    );

HeaderCompare.propTypes = {
    isCompareDisabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    trendsEnabled: PropTypes.bool.isRequired,
    onFilterSave: PropTypes.func.isRequired,
    onSongClear: PropTypes.func.isRequired,
    onSongCompare: PropTypes.func.isRequired,
    onToggleTrends: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
    songsSelected: PropTypes.number,
};

HeaderCompare.defaultProps = {
    hidden: false,
    songsSelected: undefined,
};

export default HeaderCompare;
