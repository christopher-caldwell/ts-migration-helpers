import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';
import moment from 'moment';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import Quintile from 'components/BoardPage/Panels/RadioPanels/MusicTracker/Quintile';
import {
    requestDateIntegrity,
    updateDateIntegrity,
} from 'stores/dateIntegrity/dateIntegrityActions';
import getBrowserHeight from 'utils/BrowserFunctions';
import { closeMetricDetails } from 'stores/similarStations/similarStationsActions';
import history from '../../../../../history';

const metricLabels = {
    pop: {
        score: 'Core Pop',
        total: 'Total Pop',
        hisp: 'Hisp Pop',
        white: 'White Pop',
        asian: 'Asian Pop',
        aa: 'AA Pop',
        aahisp: 'AA/Hisp Pop',
        male: 'Male Pop',
        female: 'Female Pop',
        young: 'Young Pop',
        old: 'Old Pop',
    },
    '2pop': {
        score: 'Core 2Pop',
        total: 'Total 2Pop',
        hisp: 'Hisp 2Pop',
        white: 'White 2Pop',
        asian: 'Asian 2Pop',
        aa: 'AA 2Pop',
        aahisp: 'AA/Hisp 2Pop',
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
        male: 'Male 2Pop',
        female: 'Female 2Pop',
        young: 'Young 2Pop',
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ dataValue: any; }' is missing the followin... Remove this comment to see the full error message
        old: 'Old 2Pop',
    },
    ptl: {
        score: 'Core PTL',
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
        total: 'Total PTL',
        hisp: 'Hisp PTL',
        white: 'White PTL',
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{ dataValue: any; }' is missing the followin... Remove this comment to see the full error message
        asian: 'Asian PTL',
        aa: 'AA PTL',
        aahisp: 'AA/Hisp PTL',
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
        male: 'Male PTL',
        female: 'Female PTL',
        young: 'Young PTL',
        old: 'Old PTL',
    },
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
const renderQuintile = (obj, key) => {
    if (obj[key] === null) return <span />;
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ dataValue: any; }' is missing the followin... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
    return <Quintile colorDetails={{ dataValue: obj.score }}>{obj[key]}</Quintile>;
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
const renderDate = (obj, key) => {
    if (obj[key] === null) return <span>No Research</span>;
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    return <span>{moment.utc(obj[key]).format('MM/DD/YY')}</span>;
};

const consolidatedOverview = {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    rank: { label: 'Rank', render: renderQuintile },
    score: { label: 'Score', render: renderQuintile },
    total_respondents: { label: 'Stations' },
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
    test_date: { label: 'Date', render: renderDate },
};

const HEIGHT_HEADER = 155;

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
class MetricDetail extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        // initialize the date integrity on the first load
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        const { requestDateIntegrityAction } = props;
        requestDateIntegrityAction();

        this.state = { tableHeight: 0 };
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
    componentDidMount() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        // TODO: needs refactor, setState should never be called in a life cycle
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        this.updateHeight(); // needs better solution
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        window.addEventListener('resize', this.updateHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeight);
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'href' implicitly has an 'any' type.
    onClickStation(href) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        const { updateDateIntegrityAction } = this.props;
        updateDateIntegrityAction({ persist: true });

        history.push(href); // remove this
    }

    updateHeight = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'metricDetailCloseAction' does not exist ... Remove this comment to see the full error message
        const browserHeight = Math.round(getBrowserHeight() - HEIGHT_HEADER);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'tableHeight' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
            .querySelector('.customSidebar') // TODO: needs better solution
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            .style.setProperty('--scroll-height', `${browserHeight}px`);

        this.setState({ tableHeight: browserHeight });
    };

    renderStationColumn = {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        name: stationObj => {
            const href = `/board/radio/${stationObj.station_id}/`;
            const truncatedCall = stationObj.call_letters.replace(/-FM$/, '');
            const formattedDate = renderDate(stationObj, 'test_date');
            return (
                <button
                    className="similar-station-link not-draggable"
                    onClick={() => this.onClickStation(href)}
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
                    key={stationObj.station_id}
                >
                    {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message */}
                    <div className="call-letters">{truncatedCall}</div>
                    {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'metricDetailCloseAction' does not exist ... Remove this comment to see the full error message */}
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'station' implicitly has an 'any' type. */}
                    <div className="test-date">{formattedDate}</div>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                </button>
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
            );
        },
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message
        rank: (stationObj, key) => renderQuintile(stationObj, key),
        score: (stationObj, key) => renderQuintile(stationObj, key),
        spins: stationObj => (
            <div>
                <div className="spins-label">Spins 6a-12m</div>
                <div>
                    {stationObj['6a12m'] ? stationObj['6a12m'] : 0}
                    {'/'}
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stationObj' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                    {stationObj.total_spins ? stationObj.total_spins : 0}
                </div>
            </div>
        ),
        gauge: stationObj => {
            const similarity = ['C', 'B', 'A'].indexOf(stationObj.heat_label) + 2;
            const icons = [];
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            for (let i = 4; i >= 1; i -= 1) {
                icons.push(
                    <div
                        key={i}
                        className={classNames({
                            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'similarStations' does not exist on type ... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            'gauge-icon': true,
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'metricDetailCloseAction' does not exist ... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            active: similarity >= i,
                        })}
                    />
                );
            }
            return <div>{icons}</div>;
        },
    };

    render() {
        const {
            similarStations,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'station' implicitly has an 'any' type.
            similarStations: { loading, selectedRow, selectedMetricKey },
            metricDetailCloseAction,
        } = this.props;
        const { tableHeight } = this.state;
        if (loading) {
            return (
                <div>
                    <div className="sidebar-header">
                        <button
                            type="button"
                            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                            className="close"
                            aria-label="Close"
                            onClick={metricDetailCloseAction}
                        >
                            <span className="text-white" aria-hidden="true">
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                &times;
                            </span>
                        </button>
                        <span className="music-tracker-title">&nbsp;</span>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    </div>
                    <div className="music-tracker-detail">
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
                        <div className="sidebar-detail-overview">
                            <LoadingIndicator className="loading-box" text="" />
                        </div>
                    </div>
                </div>
            );
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        }
        const metricsMap = similarStations[selectedRow];
        const selectedMetric = metricsMap[selectedMetricKey];
        let consolidatedItems;
        let similarStationRows;
        let responseType;

        if (selectedMetric) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const { consolidated } = selectedMetric;
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const responseCode = selectedMetric.response_type;
            const selectedMetricSimilarStations = selectedMetric.similar_stations;

            responseType = metricLabels[responseCode.field_name][responseCode.breakout_type];
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            consolidatedItems =
                consolidated &&
                Object.keys(consolidatedOverview).map(key => (
                    <li key={key}>
                        <div>
                            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'station' implicitly has an 'any' type. */}
                            {consolidatedOverview[key].render
                                ? consolidatedOverview[key].render(consolidated, key)
                                : consolidated[key]}
                        </div>
                        <div className="music-tracker-detail-label">
                            {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                            {consolidatedOverview[key].label}
                        </div>
                    </li>
                ));

            similarStationRows =
                selectedMetricSimilarStations &&
                selectedMetricSimilarStations.map(station => (
                    <div
                        key={shortid.generate()}
                        className="sidebar-detail-rank full-width similar-station"
                    >
                        <ul className="sidebar-detail-list five-column">
                            {Object.keys(this.renderStationColumn).map(key => (
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                <li key={key}>{this.renderStationColumn[key](station, key)}</li>
                            ))}
                        </ul>
                    </div>
                ));
        }

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const style = {
            maxHeight:
                similarStationRows && consolidatedItems
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                    ? `${tableHeight - 200}px`
                    : `${tableHeight - 125}px`,
            overflow: 'auto',
        };

        const info = (
            <Tooltip id={shortid.generate()}>
                This gauge denotes level of overall station similarity (research scores)
            </Tooltip>
        );

        return (
            <div>
                <div className="sidebar-header">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={metricDetailCloseAction}
                    >
                        <span className="text-white" aria-hidden="true">
                            &times;
                        </span>
                    </button>
                    <span className="music-tracker-title">
                        {selectedMetric && (
                            <div>
                                <span className="p3">{selectedMetric.song_name}</span>
                                <div className="test-date">{selectedMetric.artist_name}</div>
                            </div>
                        )}
                    </span>
                </div>
                <div className="music-tracker-detail">
                    <div className="sidebar-detail-overview">
                        {consolidatedItems ? (
                            <div className="sidebar-detail-rank full-width">
                                <p className="p3">
                                    {responseType}
                                    {' Consolidated'}
                                </p>
                                <ul className="sidebar-detail-list">{consolidatedItems}</ul>
                            </div>
                        ) : (
                            <div className="sidebar-detail-rank full-width">
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                No Consolidated Data Available
                            </div>
                        )}
                    </div>
                    <div className="sidebar-detail-overview">
                        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                        {similarStationRows ? (
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                            <div className="sidebar-detail-rank full-width">
                                <span className="p3">
                                    {responseType}
                                    {' Similar Stations'}
                                    <OverlayTrigger placement="top" overlay={info}>
                                        <i className="fa fa-info-circle gauge-info" />
                                    </OverlayTrigger>
                                </span>
                            </div>
                        ) : (
                            <div className="sidebar-detail-rank full-width">
                                No Similar Stations Data Available
                            </div>
                        )}
                    </div>
                    <div style={style}>{similarStationRows}</div>
                </div>
            </div>
        );
    }
}

MetricDetail.propTypes = {
    metricDetailCloseAction: PropTypes.func.isRequired,
    requestDateIntegrityAction: PropTypes.func.isRequired,
    similarStations: PropTypes.shape().isRequired,
    updateDateIntegrityAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    similarStations: state.similarStations,
});

const mapDispatchToProps = {
    requestDateIntegrityAction: requestDateIntegrity,
    updateDateIntegrityAction: updateDateIntegrity,
    metricDetailCloseAction: closeMetricDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(MetricDetail);
