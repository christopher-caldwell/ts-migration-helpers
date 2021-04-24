import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import ChangeIcon from 'components/Visualizations/ChangeIcon';
import Quintile from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Quintile';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';

const rankOverview = {
    'corePop.thisPeriod': 'TW Core Pop',
    'corePop.lastPeriod': 'LW Core Pop',
    'totalPop.thisPeriod': 'TW Total Pop',
    'totalPop.lastPeriod': 'LW Total Pop',
};

const spinOverview = ['6a12m', '24hr', 'totalStation', 'totalMarket'];

const renderRespondents = value => {
    const cNames = classNames({
        'music-tracker-detail-respondents': true,
        'music-tracker-detail-respondents-under': value < 25,
    });
    return <span className={cNames}>{value}</span>;
};

const renderQuintile = value => <Quintile colorDetails={{ dataValue: value }}>{value}</Quintile>;

const breakoutColumns = [
    {
        header: '# Resp',
        cellClass: 'music-tracker-detail-respondents-td',
        render: renderRespondents,
    },
    { header: 'Breakout' },
    { header: 'POP', render: renderQuintile },
    { header: '2POP', render: renderQuintile },
    { header: 'PTL', render: renderQuintile },
    { header: 'UNF' },
    { header: 'NEG' },
    { header: 'DDL' },
    { header: 'NOP' },
    { header: 'LIK' },
    { header: 'FAV' },
];

const SongDetail = props => {
    const {
        data: { breakouts, spins, score, rank },
        preferences,
        loading,
    } = props;
    const { disabledBreakouts, breakoutSortOrder, stationId } = preferences;

    if (loading || !breakoutSortOrder || !breakoutSortOrder[stationId])
        return (
            <div className="song-detail-body-div">
                <LoadingIndicator />
            </div>
        );

    const rankItems = score
        ? Object.keys(rankOverview).map(key => {
            const keys = key.split('.');
            const getColorDetails = () => {
                const dataValue = score[keys[0]] ? score[keys[0]][keys[1]] : 6;
                const isTAA = false;

                if (dataValue) parseFloat(dataValue);
                return { dataValue, colorValue: dataValue, isTAA };
            };
            return (
                <li key={key}>
                    <Quintile colorDetails={getColorDetails()}>{rank[keys[0]][keys[1]]}</Quintile>
                    <div className="music-tracker-detail-label">{rankOverview[key]}</div>
                </li>
            );
        })
        : null;
    // that does not use redux and has different forms of inputs
    const spinItems = spins
        ? spinOverview.map(overview => (
            <li key={overview}>
                <span className="music-tracker-detail-metric">
                    {spins[overview].thisPeriod}
                    {' '}
                    <ChangeIcon value={spins[overview]} />
                </span>
                <div className="music-tracker-detail-label">{overview}</div>
            </li>
        ))
        : null;

    const tableHeader = breakoutColumns.map(column => <th key={column.header}>{column.header}</th>);

    const prefsAvailable = preferences && disabledBreakouts && disabledBreakouts[stationId];

    const tableBody =
        breakouts && breakouts.length ? (
            breakoutSortOrder[stationId].map((breakoutName, breakIndex) => {
                const breakout = breakouts.find(item => item.name === breakoutName);
                const { name, respondents } = breakout;
                return prefsAvailable && disabledBreakouts[stationId].includes(name) ? null : (
                    <tr key={`${breakIndex + name}`}>
                        {breakoutColumns.map((column, index) => {
                            const { header, render, cellClass } = column;
                            const CellComponent = index < 1 ? 'th' : 'td';
                            const cell = () => {
                                if (header === '# Resp') return render(respondents);
                                if (render) return render(breakout[header]);
                                if (header === 'Breakout') return name;
                                return breakout[header];
                            };

                            return (
                                <CellComponent key={`${index + header}`} className={cellClass}>
                                    {cell()}
                                </CellComponent>
                            );
                        })}
                    </tr>
                );
            })
        ) : (
            <tr>
                <th className="song-detail-modal-no-data">No data to display!</th>
            </tr>
        );

    return (
        <>
            <div className="music-tracker-detail-overview">
                <div className="music-tracker-detail-rank">
                    <p className="p3">Rank</p>
                    <ul>{rankItems}</ul>
                </div>
                <div className="music-tracker-detail-spins">
                    <p className="p3">Spins</p>
                    <ul>{spinItems}</ul>
                </div>
            </div>
            <table className="table music-tracker-detail-breakouts">
                <thead>
                    <tr>{tableHeader}</tr>
                </thead>
                <tbody className="song-detail-modal-table">{tableBody}</tbody>
            </table>
        </>
    );
};

SongDetail.propTypes = {
    data: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    preferences: PropTypes.shape(),
};

SongDetail.defaultProps = {
    preferences: {},
};

export default SongDetail;
