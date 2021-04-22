import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import classNames from 'classnames';
import Select from 'react-select';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';

class SongDetails extends React.Component {
    plus = () => {
        const { song, onChangePercentage } = this.props;
        const number = Number(this.numberInput.value);
        this.numberInput.value = number + 1;
        this.validateValue();
        onChangePercentage(this.numberInput.value, song.media_id);
    };

    minus = () => {
        const { song, onChangePercentage } = this.props;
        const number = Number(this.numberInput.value);
        this.numberInput.value = number - 1;
        this.validateValue();
        onChangePercentage(this.numberInput.value, song.media_id);
    };

    validateValue = e => {
        const value = e ? e.target.value : this.numberInput.value;
        const type = e && e.type;

        if (value < 0) {
            this.numberInput.value = 0;
        } else if (value > 100) {
            this.numberInput.value = 100;
        } else if (typeof value === 'string' && type === 'blur') {
            this.numberInput.value = 0;
        }
    };

    render() {
        const {
            song,
            icon,
            handleClick,
            disableClick,
            enablePercentage,
            onChangePercentage,
            musicTracker, // used to turn off plus button when shown for music tracker
            enableAlternateCategory,
            categoriesList,
            daypartId,
            onAlternateCategory,
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
                            ref={input => {
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
                        <span>%</span>
                        <div className="percentage__buttons">
                            <button type="button" className="btn-plus" onClick={this.plus}>
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
