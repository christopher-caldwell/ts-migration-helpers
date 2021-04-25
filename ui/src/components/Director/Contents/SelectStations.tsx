import React, { Component } from 'react';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import { DropdownButton } from 'react-bootstrap';
import cloneDeep from 'lodash/cloneDeep';
import SearchField from 'components/SearchField';
import SortButton from 'components/Controls/SortButton';
import StationCard from 'components/StationCard';
import SongHeader from 'components/SongHeader';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expandedFilter' implicitly has an 'any'... Remove this comment to see the full error message
import TextButton from 'components/Buttons/TextButton';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableFilter' does not exist o... Remove this comment to see the full error message
import ExpandableFilter from '../Components/ExpandableFilter';

const FORMAT_FILTER_TITLE = 'Format';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expandedFilter' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stations' implicitly has an 'any' type.
const MARKET_FILTER_TITLE = 'Market';
class SelectStations extends Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stations' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableFilter' does not exist o... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'handleChecked' implicitly has an 'any' ... Remove this comment to see the full error message
    state = {
        activeExpandableFilter: null,
        filterOpen: false,
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'station' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stations' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentStation' implicitly has an 'any'... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'expandedFilter' implicitly has an 'any'... Remove this comment to see the full error message
    handleExpand = expandedFilter =>
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stations' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeExpandableFilter' does not exist o... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checkedStations' implicitly has an 'any... Remove this comment to see the full error message
        this.setState(({ activeExpandableFilter }) => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isOpened' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'station' implicitly has an 'any' type.
            const newFilter = activeExpandableFilter === expandedFilter ? null : expandedFilter;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentStation' implicitly has an 'any'... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
            return { activeExpandableFilter: newFilter };
        });

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentFormat' implicitly has an 'any' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stations' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
    labelButtonSelection = (stations, checkedStations) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
        if (stations.length !== checkedStations.length) {
            return 'Select All';
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
        return 'Unselect All';
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stations' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
    buildStationCards = (stations, checkedStations, handleChecked) => {
        const checkedStationsIds = checkedStations.length
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'station' implicitly has an 'any' type.
            ? // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
              // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isOpened' implicitly has an 'any' type.
              checkedStations.map(station => station.id)
            : [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentMarket' implicitly has an 'any' ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentStation' implicitly has an 'any'... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
        return stations.map(currentStation => (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type 'Rea... Remove this comment to see the full error message
            <StationCard
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type 'Rea... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
                key={currentStation.id}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
                className="director__station-card"
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
                station={{
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentFormat' implicitly has an 'any' ... Remove this comment to see the full error message
                    id: currentStation.id,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectAll' implicitly has an 'any' type... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
                    call_letters: currentStation.summary.call_letters,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
                    image_url: currentStation.summary.image_url,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
                    location: currentStation.summary.location,
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
                    owner: currentStation.summary.owner,
                }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isOpened' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'format' implicitly has an 'any' type.
                onCheck={station => handleChecked(station)}
                checked={checkedStationsIds.includes(currentStation.id)}
            />
        ));
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
    onToggleFilters = isOpened => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stations' does not exist on type 'Readon... Remove this comment to see the full error message
        this.setState({ filterOpen: isOpened });
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChecked' does not exist on type 'R... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
    handleResetFilter = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedSong' does not exist on type 'Re... Remove this comment to see the full error message
        this.setState({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
            activeExpandableFilter: null,
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.handleStationFilter({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentFormat' implicitly has an 'any' ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (sear... Remove this comment to see the full error message
            filteredFormats: [],
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'selectAll' implicitly has an 'any' type... Remove this comment to see the full error message
            filteredMarkets: [],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
            orderedStations: this.props.orderedStations,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
            searchString: this.props.searchString,
        });
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchString' implicitly has an 'any' t... Remove this comment to see the full error message
    handleSelectFormat = (currentFormat, selectAll) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formatsList' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
        let newFilteredFormats = [];
        if (selectAll) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            if (this.props.filteredFormats.length !== this.props.formatsList.length) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                newFilteredFormats = cloneDeep(this.props.formatsList);
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            newFilteredFormats = this.props.filteredFormats;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            const formatIndex = this.props.filteredFormats.findIndex(
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
                format => format.value === currentFormat.value
            );
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
            if (formatIndex >= 0) {
                newFilteredFormats.splice(formatIndex, 1);
            } else {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
                newFilteredFormats.push(currentFormat);
            }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
        }
        this.props.handleStationFilter({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stations' does not exist on type 'Readon... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type 'Rea... Remove this comment to see the full error message
            filteredFormats: newFilteredFormats,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'currentMarket' implicitly has an 'any' ... Remove this comment to see the full error message
            filteredMarkets: this.props.filteredMarkets,
            orderedStations: this.props.orderedStations,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            searchString: this.props.searchString,
        });
    };

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    handleSelectMarket = (currentMarket, selectAll) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'marketsList' does not exist on type 'Rea... Remove this comment to see the full error message
        let newFilteredMarkets = [];
        if (selectAll) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
            if (this.props.filteredMarkets.length !== this.props.marketsList.length) {
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (sear... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
                newFilteredMarkets = cloneDeep(this.props.marketsList);
            }
        } else {
            newFilteredMarkets = this.props.filteredMarkets;
            const marketIndex = this.props.filteredMarkets.findIndex(
                market => market.value === currentMarket.value
            );
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
            if (marketIndex >= 0) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
                newFilteredMarkets.splice(marketIndex, 1);
            } else {
                newFilteredMarkets.push(currentMarket);
            }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
        }
        this.props.handleStationFilter({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
            filteredFormats: this.props.filteredFormats,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'searchString' implicitly has an 'any' t... Remove this comment to see the full error message
            filteredMarkets: newFilteredMarkets,
            orderedStations: this.props.orderedStations,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            searchString: this.props.searchString,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
        });
    };

    handleSearchChange = searchString => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
        this.props.handleStationFilter({
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sortKey' implicitly has an 'any' type.
            filteredFormats: this.props.filteredFormats,
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
            filteredMarkets: this.props.filteredMarkets,
            orderedStations: this.props.orderedStations,
            searchString,
        });
    };

    onSortChange = sortKey => {
        const { orderedStations } = this.props;
        let newOrderedStations = {
            ...orderedStations,
            ascending: !orderedStations.ascending,
        };

        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleStationFilter' does not exist on t... Remove this comment to see the full error message
        if (!orderedStations.field || orderedStations.field !== sortKey) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredFormats' does not exist on type ... Remove this comment to see the full error message
            newOrderedStations = {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'filteredMarkets' does not exist on type ... Remove this comment to see the full error message
                field: sortKey,
                ascending: true,
            };
        }

        this.props.handleStationFilter({
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchString' does not exist on type 'Re... Remove this comment to see the full error message
            filteredFormats: this.props.filteredFormats,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'orderedStations' does not exist on type ... Remove this comment to see the full error message
            filteredMarkets: this.props.filteredMarkets,
            orderedStations: newOrderedStations,
            searchString: this.props.searchString,
        });
    };

    renderSortButtons() {
        const { orderedStations } = this.props;
        const sortButtons = [
            {
                name: 'Call Letters',
                id: 'call_letters',
            },
            {
                name: 'Market Rank',
                id: 'nielsen_rank',
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            },
            {
                name: 'Station Name',
                id: 'name',
            },
        ];

        return sortButtons.map(button => (
            <SortButton
                key={button.id}
                sortKey={button.id}
                buttonText={button.name}
                onClick={this.onSortChange}
                sort={orderedStations}
            />
        ));
    }

    render() {
        const {
            stations,
            className,
            handleChecked,
            toggleSelection,
            checkedStations,
            formatsList,
            marketsList,
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            filteredFormats,
            filteredMarkets,
            selectedSong: { title, artist },
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            searchString,
        } = this.props;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        const { filterOpen, activeExpandableFilter } = this.state;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        const formatFilterOpen = activeExpandableFilter === FORMAT_FILTER_TITLE;
        const marketFilterOpen = activeExpandableFilter === MARKET_FILTER_TITLE;

        return (
            <div className={className}>
                <div className="director__song-header-details">
                    <SongHeader songName={title} artistName={artist} />
                </div>
                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (sear... Remove this comment to see the full error message */}
                <div className="director__stations-search-bar">
                    <h6 className="director__stations-search-title">STATIONS</h6>
                    <div className="director__sort-filter sort-filters-container">
                        <div className="sort-label">Sort by:</div>
                        <div className="sort-buttons-container">{this.renderSortButtons()}</div>
                    </div>
                    <div className="director-page-search">
                        <SearchField
                            placeholder="Search Stations"
                            onSearchChange={this.handleSearchChange}
                            handleReset={() => this.handleSearchChange('')}
                            value={searchString}
                        />
                    </div>
                    <div className="music-tracker-filter director__stations-filter">
                        <DropdownButton
                            className={classNames('filter-item', 'btn-dropdown', {
                                'btn-active': filteredFormats.length || filteredMarkets.length,
                            })}
                            onToggle={this.onToggleFilters}
                            noCaret
                            pullRight
                            title={
                                <div>
                                    <i
                                        className={classNames(
                                            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                            'music-tracker-filter__group-icon',
                                            'icon',
                                            'fa',
                                            'fa-filter'
                                        )}
                                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                    />
                                    <i
                                        className={`icon fa fa-angle-${filterOpen ? 'up' : 'down'}`}
                                    />
                                </div>
                            }
                            bsSize="small"
                            id="dropdown-button"
                        >
                            <div className="director__dropdown-filter">
                                <div className="dropdown-filter__header">
                                    <h5 className="dropdown-filter__title">Apply Filters</h5>
                                    <button
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                        className="dropdown-filter__reset-button"
                                        onClick={this.handleResetFilter}
                                    >
                                        Reset
                                    </button>
                                </div>
                                <p className="dropdown-filter__sub-title">FILTER BY:</p>
                                <ExpandableFilter
                                    expanded={formatFilterOpen}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    title={FORMAT_FILTER_TITLE}
                                    list={formatFilterOpen ? formatsList : []}
                                    selectedItems={filteredFormats}
                                    toggleFilter={this.handleExpand}
                                    handleFilterSelect={this.handleSelectFormat}
                                />
                                <ExpandableFilter
                                    expanded={marketFilterOpen}
                                    title={MARKET_FILTER_TITLE}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    list={marketFilterOpen ? marketsList : []}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    selectedItems={filteredMarkets}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    toggleFilter={this.handleExpand}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    handleFilterSelect={this.handleSelectMarket}
                                />
                            </div>
                        </DropdownButton>
                    </div>
                </div>
                <div className="director__header-actions">
                    <TextButton
                        onClick={() => toggleSelection()}
                        text={this.labelButtonSelection(stations, checkedStations)}
                    />
                </div>
                <div className="director__stations-list">
                    {this.buildStationCards(stations, checkedStations, handleChecked)}
                </div>
            </div>
        );
    }
}

SelectStations.propTypes = {
    formatsList: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    handleChecked: PropTypes.func.isRequired,
    handleStationFilter: PropTypes.func.isRequired,
    marketsList: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,
    selectedSong: PropTypes.shape().isRequired,
    stations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            summary: PropTypes.shape({
                call_letters: PropTypes.string.isRequired,
                image_url: PropTypes.string.isRequired,
                location: PropTypes.string.isRequired,
                owner: PropTypes.string.isRequired,
                market_id: PropTypes.number.isRequired,
                format_id: PropTypes.number.isRequired,
            }),
        })
    ).isRequired,
    toggleSelection: PropTypes.func.isRequired,
    checkedStations: PropTypes.arrayOf(PropTypes.shape()),
    className: PropTypes.string,
    filteredFormats: PropTypes.arrayOf(PropTypes.shape()),
    filteredMarkets: PropTypes.arrayOf(PropTypes.shape()),
    orderedStations: PropTypes.shape(),
    searchString: PropTypes.string,
};

SelectStations.defaultProps = {
    checkedStations: [],
    className: '',
    filteredFormats: [],
    filteredMarkets: [],
    orderedStations: {
        field: 'nielsen_rank',
        ascending: true,
    },
    searchString: '',
};

export default SelectStations;
