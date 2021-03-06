import React from 'react';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import PropTypes from 'prop-types';

import ChangeIcon from 'components/Visualizations/ChangeIcon';
import Quintile from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Quintile';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
import LoadingIndicator from 'components/Utilities/LoadingIndicator';

const rankOverview = {
    'corePop.thisPeriod': 'TW Core Pop',
    'corePop.lastPeriod': 'LW Core Pop',
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    'totalPop.thisPeriod': 'TW Total Pop',
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ dataValue: any; }' is missing the followin... Remove this comment to see the full error message
    'totalPop.lastPeriod': 'LW Total Pop',
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const spinOverview = ['6a12m', '24hr', 'totalStation', 'totalMarket'];

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const renderRespondents = value => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ dataValue: any; }' is missing the followin... Remove this comment to see the full error message
    const cNames = classNames({
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        'music-tracker-detail-respondents': true,
        'music-tracker-detail-respondents-under': value < 25,
    });
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    return <span className={cNames}>{value}</span>;
};

const renderQuintile = value => <Quintile colorDetails={{ dataValue: value }}>{value}</Quintile>;

const breakoutColumns = [
    {
        header: '# Resp',
        cellClass: 'music-tracker-detail-respondents-td',
        render: renderRespondents,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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

                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                if (dataValue) parseFloat(dataValue);
                return { dataValue, colorValue: dataValue, isTAA };
            };
            return (
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakoutName' implicitly has an 'any' t... Remove this comment to see the full error message
                <li key={key}>
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
                    <Quintile colorDetails={getColorDetails()}>{rank[keys[0]][keys[1]]}</Quintile>
                    <div className="music-tracker-detail-label">{rankOverview[key]}</div>
                </li>
            );
        })
        : null;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // that does not use redux and has different forms of inputs
    const spinItems = spins
        ? spinOverview.map(overview => (
            <li key={overview}>
                <span className="music-tracker-detail-metric">
                    {/* @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message */}
                    {spins[overview].thisPeriod}
                    {' '}
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakoutName' implicitly has an 'any' t... Remove this comment to see the full error message */}
                    <ChangeIcon value={spins[overview]} />
                </span>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type. */}
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
                // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'breakoutName' implicitly has an 'any' t... Remove this comment to see the full error message
                const { name, respondents } = breakout;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                return prefsAvailable && disabledBreakouts[stationId].includes(name) ? null : (
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    <tr key={`${breakIndex + name}`}>
                        {breakoutColumns.map((column, index) => {
                            const { header, render, cellClass } = column;
                            const CellComponent = index < 1 ? 'th' : 'td';
                            const cell = () => {
                                if (header === '# Resp') return render(respondents);
                                if (render) return render(breakout[header]);
                                // @ts-expect-error ts-migrate(2722) FIXME: Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                );
            })
        ) : (
            <tr>
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
