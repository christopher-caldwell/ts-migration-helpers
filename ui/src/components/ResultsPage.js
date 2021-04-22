import React from 'react';
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

import escapeRegexCharacters from 'utils/escapeRegexCharacters';
import Image from 'components/Utilities/Image';
import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import request from 'utils/request';
import {
    requestDateIntegrity,
    updateDateIntegrity,
} from 'stores/dateIntegrity/dateIntegrityActions';

const STATIONS = 'Stations';

const sections = {
    Stations: {
        listKey: 'station',
        name: 'Stations',
        icon: 'podcast',
        path: 'radio',
    },
};

const getList = (value, options) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue === '') {
        return Promise.resolve([]);
    }

    const uriValue = encodeURIComponent(escapedValue);
    return request(`/search/${uriValue}`, options || {}).then(results => results);
};

const getSubname = entity => {
    const {
        type,
        sub_name: subName,
        station_format_name: stationFormatName,
        station_market_name: stationMarketName,
    } = entity;
    if (type === 'song') return subName;
    if (type === 'station') return `${stationFormatName} - ${stationMarketName}`;
    return null;
};

const limitPages = (pages, limit = 100) => (pages < limit ? pages : limit);

class ResultsPage extends React.Component {
    constructor(props) {
        super(props);
        const {
            requestDateIntegrityAction,
            match: {
                params: { tabId, value },
            },
        } = props;
        // initialize the date integrity on the first load
        requestDateIntegrityAction();

        this.state = {
            tab: tabId.charAt(0).toUpperCase() + tabId.substr(1).toLowerCase(),
            value,
            lists: null,
            activePage: null,
            loading: true,
        };

        this.onTabSelect = this.onTabSelect.bind(this);
        this.onPaginate = this.onPaginate.bind(this);
    }

    componentDidMount() {
        this.reInit();
    }

    reInit() {
        const { updateDateIntegrityAction, match } = this.props;
        updateDateIntegrityAction({ persist: true });

        getList(match.params.value).then(lists => {
            this.setState({
                // TODO: should not use setState in lifecycle method
                lists,
                activePage: lists.page,
                loading: false,
            });
        });
    }

    componentDidUpdate(prev) {
        if (prev.location.key !== this.props.location.key) {
            this.reInit();
            let newValue = this.props.location.pathname.split('/');
            newValue = newValue[newValue.length - 1];
            this.setState({ value: newValue }); // eslint-disable-line
            // TODO: refactor this component, do not call setState from componentDidUpdate
        }
    }

    onTabSelect(tabName) {
        const { activePage, lists } = this.state;
        const section = sections[tabName];

        this.setState({ tab: tabName });

        if (section.listKey !== null) {
            const maxPage = limitPages(this.getListPages(lists, section.listKey));

            if (activePage > maxPage) {
                this.onPaginate(maxPage);
            }
        }
    }

    onPaginate(newPage) {
        const options = {
            page: newPage,
            size: this.state.lists.size,
        };
        this.setState({ activePage: newPage });
        getList(this.props.match.params.value, {
            params: { options: JSON.stringify(options) },
        }).then(lists => this.setState({ lists, activePage: lists.page }));
    }

    getNumberOfPages(lists, tab) {
        if (!lists || !lists.numPages) {
            return 0;
        }
        if (tab === 'Everything') {
            return limitPages(lists.numPages);
        }

        return limitPages(this.getListPages(lists, sections[tab].listKey));
    }

    getListPages(lists, key) {
        return Math.ceil(lists[key].found / lists.size);
    }

    getSearchValue() {
        let { value: searchValue } = this.state;
        searchValue = searchValue.replace(/%\^/g, '').replace(/%\*/g, '');
        if (searchValue.trim().length < 2) {
            searchValue = searchValue.split('%').join('%25');
            return decodeURIComponent(searchValue);
        }
        searchValue = searchValue.split('%%').join('%25%').replace(/%$/g, '%25');
        return decodeURIComponent(searchValue);
    }

    renderListItem(type, entity) {
        const subname = getSubname(entity);
        const entityType = entity.type;
        return (
            <Link
                key={entity.id}
                className="list-item"
                to={`/board/${sections[type].path}/${entity.id}`}
            >
                <button type="button" className="search-item-button btn btn-primary">
                    View
                </button>
                <div className="search-item-container">
                    <Image
                        src={entity.image_url}
                        className={`search-item-image ${entityType}`}
                        alt="avatar"
                    />
                    <div className="search-item-name-container">
                        <div className={`search-item-name ${entityType}`}>{entity.name}</div>
                        {subname && <div className="search-sub-item-name">{subname}</div>}
                    </div>
                </div>
            </Link>
        );
    }

    renderSearchResultsPage(value, activePage, tab, lists = {}) {
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
                            <div className="search-results-list">
                                {this.renderResultLists(lists, tab)}
                            </div>
                            {this.getNumberOfPages(lists, tab) > 1 && (
                                <div className="pagination-container">
                                    <Pagination
                                        prev
                                        next
                                        first
                                        last
                                        ellipsis
                                        boundaryLinks
                                        items={this.getNumberOfPages(lists, tab)}
                                        maxButtons={5}
                                        activePage={activePage}
                                        onSelect={this.onPaginate}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    renderResultLists(lists, tab) {
        if (!lists || lists.length < 1) {
            return null;
        }

        return lists.order
            .filter(sectionKey => {
                if (!sections[sectionKey]) return false;
                if (sectionKey !== STATIONS) return false;

                const { listKey } = sections[sectionKey];

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
