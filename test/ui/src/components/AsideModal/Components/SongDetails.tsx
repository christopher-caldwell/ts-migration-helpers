import React from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import get from 'lodash/get';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
import Select from 'react-select';
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'onChangePercentage' does not exist on ty... Remove this comment to see the full error message
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
class SongDetails extends React.Component {
    plus = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        const { song, onChangePercentage } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        const number = Number(this.numberInput.value);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
        this.numberInput.value = number + 1;
        this.validateValue();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'enableAlternateCategory' does not exist ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'enableRemoveButton' does not exist on ty... Remove this comment to see the full error message
        onChangePercentage(this.numberInput.value, song.media_id);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
    };

    minus = () => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const { song, onChangePercentage } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        const number = Number(this.numberInput.value);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
        this.numberInput.value = number - 1;
        this.validateValue();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        onChangePercentage(this.numberInput.value, song.media_id);
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
    validateValue = e => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableClick' does not exist on type 'Re... Remove this comment to see the full error message
        const value = e ? e.target.value : this.numberInput.value;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onChangePercentage' does not exist on ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesList' does not exist on type '... Remove this comment to see the full error message
        const type = e && e.type;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onAlternateCategory' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        if (value < 0) {
            this.numberInput.value = 0;
        } else if (value > 100) {
            this.numberInput.value = 100;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        } else if (typeof value === 'string' && type === 'blur') {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            this.numberInput.value = 0;
        }
    // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
        const {
            song,
            icon,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
            handleClick,
            disableClick,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
            enablePercentage,
            onChangePercentage,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
            musicTracker, // used to turn off plus button when shown for music tracker
            enableAlternateCategory,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
            categoriesList,
            daypartId,
            onAlternateCategory,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message
            enableRemoveButton,
            handleRemoveClick,
        } = this.props;

        const artistAndVersion = `${song.aNm} ${
            get(song, 'version_name', '-') === '-' ? '' : `| ${song.version_name}`
        }`;

        const categories = utils.categoryExtractorByVersion(song);

        const currentAlternate = get(song, `alternate[${daypartId}].category_id`);
        const currentGSAlternate = get(song, `alternate[${daypartId}].gs_category`);

        return (
            <div
                className={classNames('song-details', {
                    'percentage-enabled': enablePercentage,
                    'mt-song-detail': musicTracker,
                })}
            >
                <div>
                    <p className="song-details--info p3-bold azure ellipsis" title={song.sNm}>
                        {song.sNm}
                    </p>
                    <p className="song-details--info p5 ellipsis" title={artistAndVersion}>
                        {artistAndVersion}
                    </p>
                </div>
                {!enableRemoveButton ? (
                    <span className="song-details__categories" title={`${categories}`}>
                        {categories}
                    </span>
                ) : (
                    <button type="button" className="btn-text" onClick={handleRemoveClick}>
                        <i className="azure fa fa-minus" />
                    </button>
                )}
                {enablePercentage && (
                    <div className="percentage">
                        <input
                            className="percentage__field"
                            type="number"
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                            ref={input => {
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                this.numberInput = input;
                            }}
                            onChange={e => {
                                this.validateValue(e);
                                onChangePercentage(this.numberInput.value, song.media_id);
                            }}
                            onBlur={this.validateValue}
                            defaultValue="0"
                            value={song.value}
                        />
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message */}
                        <span>%</span>
                        <div className="percentage__buttons">
                            {/* @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message */}
                            <button type="button" className="btn-plus" onClick={this.plus}>
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'numberInput' does not exist on type 'Son... Remove this comment to see the full error message */}
                                +
                            </button>
                            <button type="button" className="btn-minus" onClick={this.minus}>
                                -
                            </button>
                        </div>
                    </div>
                )}
                {!disableClick && !musicTracker && (
                    <button type="button" className="btn-text" onClick={() => handleClick(song)}>
                        <i
                            className={classNames('azure', {
                                'x-button': enablePercentage,
                                [`fa ${icon}`]: !enablePercentage,
                            })}
                        />
                    </button>
                )}
                {enableAlternateCategory && (
                    <Select
                        // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                        name="react-select-container"
                        className="react-select-container"
                        clearable={false}
                        value={currentAlternate}
                        options={categoriesList}
                        onChange={onAlternateCategory}
                        placeholder={currentGSAlternate || 'Select Alternate Category'}
                    />
                )}
            </div>
        );
    }
}

SongDetails.propTypes = {
    song: PropTypes.shape().isRequired,
    categoriesList: PropTypes.arrayOf(PropTypes.object),
    daypartId: PropTypes.number,
    disableClick: PropTypes.bool,
    enableAlternateCategory: PropTypes.bool,
    enablePercentage: PropTypes.bool,
    enableRemoveButton: PropTypes.bool,
    handleClick: PropTypes.func,
    handleRemoveClick: PropTypes.func,
    icon: PropTypes.string,
    musicTracker: PropTypes.bool,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    onChangePercentage: PropTypes.func,
    onAlternateCategory: PropTypes.func,
};

SongDetails.defaultProps = {
    icon: 'fa-plus',
    disableClick: false,
    handleClick: () => {},
    handleRemoveClick: () => {},
    musicTracker: false,
    onChangePercentage: () => {},
    enablePercentage: false,
    enableRemoveButton: false,
    enableAlternateCategory: false,
    categoriesList: [],
    daypartId: null,
    onAlternateCategory: () => {},
};

export default SongDetails;
