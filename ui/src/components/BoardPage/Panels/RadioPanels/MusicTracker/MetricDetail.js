import React from 'react';
import connect from 'react-redux/lib/connect/connect';

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
        male: 'Male 2Pop',
        female: 'Female 2Pop',
        young: 'Young 2Pop',
        old: 'Old 2Pop',
    },
    ptl: {
        score: 'Core PTL',
        total: 'Total PTL',
        hisp: 'Hisp PTL',
        white: 'White PTL',
        asian: 'Asian PTL',
        aa: 'AA PTL',
        aahisp: 'AA/Hisp PTL',
        male: 'Male PTL',
        female: 'Female PTL',
        young: 'Young PTL',
        old: 'Old PTL',
    },
};

const renderQuintile = (obj, key) => {
    if (obj[key] === null) return <span />;
    return <Quintile colorDetails={{ dataValue: obj.score }}>{obj[key]}</Quintile>;
};

const renderDate = (obj, key) => {
    if (obj[key] === null) return <span>No Research</span>;
    return <span>{moment.utc(obj[key]).format('MM/DD/YY')}</span>;
};

const consolidatedOverview = {
    rank: { label: 'Rank', render: renderQuintile },
    score: { label: 'Score', render: renderQuintile },
    total_respondents: { label: 'Stations' },
    test_date: { label: 'Date', render: renderDate },
};

const HEIGHT_HEADER = 155;

class MetricDetail extends React.Component {
    constructor(props) {
        super(props);
        // initialize the date integrity on the first load
        const { requestDateIntegrityAction } = props;
        requestDateIntegrityAction();

        this.state = { tableHeight: 0 };
    }

    componentDidMount() {
        // TODO: needs refactor, setState should never be called in a life cycle
        this.updateHeight(); // needs better solution
        window.addEventListener('resize', this.updateHeight);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateHeight);
    }

    onClickStation(href) {
        const { updateDateIntegrityAction } = this.props;
        updateDateIntegrityAction({ persist: true });

        history.push(href); // remove this
    }

    updateHeight = () => {
        const browserHeight = Math.round(getBrowserHeight() - HEIGHT_HEADER);
        document
            .querySelector('.customSidebar') // TODO: needs better solution
            .style.setProperty('--scroll-height', `${browserHeight}px`);

        this.setState({ tableHeight: browserHeight });
    };

    renderStationColumn = {
        name: stationObj => {
            const href = `/board/radio/${stationObj.station_id}/`;
            const truncatedCall = stationObj.call_letters.replace(/-FM$/, '');
            const formattedDate = renderDate(stationObj, 'test_date');
            return (
                <button
                    className="similar-station-link not-draggable"
                    onClick={() => this.onClickStation(href)}
                    key={stationObj.station_id}
                >
                    <div className="call-letters">{truncatedCall}</div>
                    <div className="test-date">{formattedDate}</div>
                </button>
            );
        },
        rank: (stationObj, key) => renderQuintile(stationObj, key),
        score: (stationObj, key) => renderQuintile(stationObj, key),
        spins: stationObj => (
            <div>
                <div className="spins-label">Spins 6a-12m</div>
                <div>
                    {stationObj['6a12m'] ? stationObj['6a12m'] : 0}
                    {'/'}
                    {stationObj.total_spins ? stationObj.total_spins : 0}
                </div>
            </div>
        ),
        gauge: stationObj => {
            const similarity = ['C', 'B', 'A'].indexOf(stationObj.heat_label) + 2;
            const icons = [];
            for (let i = 4; i >= 1; i -= 1) {
                icons.push(
                    <div
                        key={i}
                        className={classNames({
                            'gauge-icon': true,
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
                            className="close"
                            aria-label="Close"
                            onClick={metricDetailCloseAction}
                        >
                            <span className="text-white" aria-hidden="true">
                                &times;
                            </span>
                        </button>
                        <span className="music-tracker-title">&nbsp;</span>
                    </div>
                    <div className="music-tracker-detail">
                        <div className="sidebar-detail-overview">
                            <LoadingIndicator className="loading-box" text="" />
                        </div>
                    </div>
                </div>
            );
        }
        const metricsMap = similarStations[selectedRow];
        const selectedMetric = metricsMap[selectedMetricKey];
        let consolidatedItems;
        let similarStationRows;
        let responseType;

        if (selectedMetric) {
            const { consolidated } = selectedMetric;
            const responseCode = selectedMetric.response_type;
            const selectedMetricSimilarStations = selectedMetric.similar_stations;

            responseType = metricLabels[responseCode.field_name][responseCode.breakout_type];
            consolidatedItems =
                consolidated &&
                Object.keys(consolidatedOverview).map(key => (
                    <li key={key}>
                        <div>
                            {consolidatedOverview[key].render
                                ? consolidatedOverview[key].render(consolidated, key)
                                : consolidated[key]}
                        </div>
                        <div className="music-tracker-detail-label">
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
                                <li key={key}>{this.renderStationColumn[key](station, key)}</li>
                            ))}
                        </ul>
                    </div>
                ));
        }

        const style = {
            maxHeight:
                similarStationRows && consolidatedItems
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
                                No Consolidated Data Available
                            </div>
                        )}
                    </div>
                    <div className="sidebar-detail-overview">
                        {similarStationRows ? (
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
