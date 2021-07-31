import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

import escapeRegexCharacters from 'utils/escapeRegexCharacters';
import Image from 'components/Utilities/Image';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import request from 'utils/request';
import {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    requestDateIntegrity,
    updateDateIntegrity,
} from 'stores/dateIntegrity/dateIntegrityActions';

const STATIONS = 'Stations';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const sections = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'options' implicitly has an 'any' type.
    Stations: {
        listKey: 'station',
        name: 'Stations',
        icon: 'podcast',
        path: 'radio',
    },
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
const getList = (value, options) => {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'pages' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
    const escapedValue = escapeRegexCharacters(value.trim());
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    if (escapedValue === '') {
        return Promise.resolve([]);
    }

    const uriValue = encodeURIComponent(escapedValue);
    return request(`/search/${uriValue}`, options || {}).then(results => results);
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'pages' implicitly has an 'any' type.
const getSubname = entity => {
    const {
        type,
        sub_name: subName,
        station_format_name: stationFormatName,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
        station_market_name: stationMarketName,
    } = entity;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
    if (type === 'song') return subName;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
    if (type === 'station') return `${stationFormatName} - ${stationMarketName}`;
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'pages' implicitly has an 'any' type.
    return null;
};

const limitPages = (pages, limit = 100) => (pages < limit ? pages : limit);

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prev' implicitly has an 'any' type.
class ResultsPage extends React.Component {
    constructor(props) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
        super(props);
        const {
            requestDateIntegrityAction,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
            match: {
                params: { tabId, value },
            },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        } = props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabName' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // initialize the date integrity on the first load
        requestDateIntegrityAction();

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        this.state = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newPage' implicitly has an 'any' type.
            tab: tabId.charAt(0).toUpperCase() + tabId.substr(1).toLowerCase(),
            value,
            lists: null,
            activePage: null,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'lists' does not exist on type 'Readonly<... Remove this comment to see the full error message
            loading: true,
        };

        this.onTabSelect = this.onTabSelect.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prev' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this.onPaginate = this.onPaginate.bind(this);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
    componentDidMount() {
        this.reInit();
    }

    reInit() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabName' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const { updateDateIntegrityAction, match } = this.props;
        updateDateIntegrityAction({ persist: true });

        getList(match.params.value).then(lists => {
            this.setState({
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                // TODO: should not use setState in lifecycle method
                lists,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newPage' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'prev' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'lists' does not exist on type 'Readonly<... Remove this comment to see the full error message
                activePage: lists.page,
                loading: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
            });
        });
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type '{}'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
    componentDidUpdate(prev) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tab' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'location' does not exist on type 'Readon... Remove this comment to see the full error message
        if (prev.location.key !== this.props.location.key) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            this.reInit();
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
            let newValue = this.props.location.pathname.split('/');
            newValue = newValue[newValue.length - 1];
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
            this.setState({ value: newValue }); // eslint-disable-line
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'tabName' implicitly has an 'any' type.
            // TODO: refactor this component, do not call setState from componentDidUpdate
        }
    }

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
    onTabSelect(tabName) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
        const { activePage, lists } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
        const section = sections[tabName];

        this.setState({ tab: tabName });

        if (section.listKey !== null) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sectionKey' implicitly has an 'any' typ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const maxPage = limitPages(this.getListPages(lists, section.listKey));

            if (activePage > maxPage) {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newPage' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                this.onPaginate(maxPage);
            }
        }
    }

    onPaginate(newPage) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'lists' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const options = {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sectionKey' implicitly has an 'any' typ... Remove this comment to see the full error message
            page: newPage,
            size: this.state.lists.size,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        this.setState({ activePage: newPage });
        getList(this.props.match.params.value, {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
            params: { options: JSON.stringify(options) },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
        }).then(lists => this.setState({ lists, activePage: lists.page }));
    }

    getNumberOfPages(lists, tab) {
        if (!lists || !lists.numPages) {
            return 0;
        }
        if (tab === 'Everything') {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'activePage' does not exist on type 'Read... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'lists' does not exist on type 'Readonly<... Remove this comment to see the full error message
            return limitPages(lists.numPages);
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
        return limitPages(this.getListPages(lists, sections[tab].listKey));
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    getListPages(lists, key) {
        return Math.ceil(lists[key].found / lists.size);
    }

    getSearchValue() {
        let { value: searchValue } = this.state;
        searchValue = searchValue.replace(/%\^/g, '').replace(/%\*/g, '');
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        if (searchValue.trim().length < 2) {
            searchValue = searchValue.split('%').join('%25');
            return decodeURIComponent(searchValue);
        }
        searchValue = searchValue.split('%%').join('%25%').replace(/%$/g, '%25');
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
        return decodeURIComponent(searchValue);
    }

    renderListItem(type, entity) {
        const subname = getSubname(entity);
        const entityType = entity.type;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return (
            <Link
                key={entity.id}
                className="list-item"
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type.
                to={`/board/${sections[type].path}/${entity.id}`}
            >
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sectionKey' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                <button type="button" className="search-item-button btn btn-primary">
                    {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                    View
                </button>
                <div className="search-item-container">
                    <Image
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        src={entity.image_url}
                        className={`search-item-image ${entityType}`}
                        alt="avatar"
                    />
                    {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                    <div className="search-item-name-container">
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'value' implicitly has an 'any' type. */}
                        <div className={`search-item-name ${entityType}`}>{entity.name}</div>
                        {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sectionKey' implicitly has an 'any' typ... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type '{}'. */}
                        {subname && <div className="search-sub-item-name">{subname}</div>}
                    </div>
                </div>
            </Link>
        );
    }

    renderSearchResultsPage(value, activePage, tab, lists = {}) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
        const stationResults = lists.station ? lists.station.entities : [];
        return (
            <div className="board-panels search-results">
                <div className="results-header">
                    <h3>
                        {stationResults.length > 0
                            ? `Search results for  "${value}"`
                            : 'No Station Results'}
                    </h3>
                </div>
                {stationResults.length > 0 && (
                    <div className="results-body row">
                        <div className="col-md-12">
                            {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'activePage' does not exist on type 'Read... Remove this comment to see the full error message */}
                            <div className="search-results-list">
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message */}
                                {this.renderResultLists(lists, tab)}
                            </div>
                            {this.getNumberOfPages(lists, tab) > 1 && (
                                <div className="pagination-container">
                                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'lists' implicitly has an 'any' type. */}
                                    <Pagination
                                        prev
                                        next
                                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sectionKey' implicitly has an 'any' typ... Remove this comment to see the full error message
                                        first
                                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                        last
                                        ellipsis
                                        boundaryLinks
                                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                        items={this.getNumberOfPages(lists, tab)}
                                        maxButtons={5}
                                        activePage={activePage}
                                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                                        onSelect={this.onPaginate}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sectionKey' implicitly has an 'any' typ... Remove this comment to see the full error message
    }

    renderResultLists(lists, tab) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!lists || lists.length < 1) {
            return null;
        }

        return lists.order
            .filter(sectionKey => {
                if (!sections[sectionKey]) return false;
                if (sectionKey !== STATIONS) return false;

                const { listKey } = sections[sectionKey];

                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'entity' implicitly has an 'any' type.
                // Exclude "Everything" section
                if (!listKey) return false;

                // Remove tags witout results
                if (sectionKey !== STATIONS && !lists[sections[sectionKey].listKey].found) {
                    return false;
                }

                // Only include this section, or all sections if "Everything"
                const { type } = lists[listKey];
                return tab === type;
            })
            .map(sectionKey => {
                const { icon, listKey } = sections[sectionKey];
                const { entities, type } = lists[listKey];

                const pages = this.getListPages(lists, listKey);
                const plus = pages > 100 ? '+ ' : ' ';
                const pageLabel = pages === 1 ? ' page' : `${plus}pages`;
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                const listItems = entities.map(entity => this.renderListItem(type, entity));

                return (
                    <div key={listKey} className="results-section">
                        <p className="results-section-title p2">
                            <i className={`search-section-icon fa fa-${icon}`} />
                            {type}
                            <span className="page-count">
                                {limitPages(pages)}
                                {pageLabel}
                            </span>
                        </p>
                        {listItems}
                    </div>
                );
            });
    }

    render() {
        const { activePage, lists, tab, loading } = this.state;
        const value = this.getSearchValue();

        return loading ? (
            <LoadingIndicator />
        ) : (
            this.renderSearchResultsPage(value, activePage, tab, lists)
        );
    }
}

ResultsPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tabId: PropTypes.string,
            value: PropTypes.string,
        }),
    }).isRequired,
    requestDateIntegrityAction: PropTypes.func.isRequired,
    updateDateIntegrityAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    requestDateIntegrityAction: requestDateIntegrity,
    updateDateIntegrityAction: updateDateIntegrity,
};

export default connect(null, mapDispatchToProps)(ResultsPage);
