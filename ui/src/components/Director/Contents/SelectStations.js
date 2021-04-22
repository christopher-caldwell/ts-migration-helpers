import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownButton } from 'react-bootstrap';
import cloneDeep from 'lodash/cloneDeep';
import SearchField from 'components/SearchField';
import SortButton from 'components/Controls/SortButton';
import StationCard from 'components/StationCard';
import SongHeader from 'components/SongHeader';
import TextButton from 'components/Buttons/TextButton';
import ExpandableFilter from '../Components/ExpandableFilter';

const FORMAT_FILTER_TITLE = 'Format';
const MARKET_FILTER_TITLE = 'Market';
class SelectStations extends Component {
    state = {
        activeExpandableFilter: null,
        filterOpen: false,
    };

    handleExpand = expandedFilter =>
        this.setState(({ activeExpandableFilter }) => {
            const newFilter = activeExpandableFilter === expandedFilter ? null : expandedFilter;
            return { activeExpandableFilter: newFilter };
        });

    labelButtonSelection = (stations, checkedStations) => {
        if (stations.length !== checkedStations.length) {
            return 'Select All';
        }

        return 'Unselect All';
    };

    buildStationCards = (stations, checkedStations, handleChecked) => {
        const checkedStationsIds = checkedStations.length
            ? checkedStations.map(station => station.id)
            : [];
        return stations.map(currentStation => (
            <StationCard
                key={currentStation.id}
                className="director__station-card"
                station={{
                    id: currentStation.id,
                    call_letters: currentStation.summary.call_letters,
                    image_url: currentStation.summary.image_url,
                    location: currentStation.summary.location,
                    owner: currentStation.summary.owner,
                }}
                onCheck={station => handleChecked(station)}
                checked={checkedStationsIds.includes(currentStation.id)}
            />
        ));
    };

    onToggleFilters = isOpened => {
        this.setState({ filterOpen: isOpened });
    };

    handleResetFilter = () => {
        this.setState({
            activeExpandableFilter: null,
        });
        this.props.handleStationFilter({
            filteredFormats: [],
            filteredMarkets: [],
            orderedStations: this.props.orderedStations,
            searchString: this.props.searchString,
        });
    };

    handleSelectFormat = (currentFormat, selectAll) => {
        let newFilteredFormats = [];
        if (selectAll) {
            if (this.props.filteredFormats.length !== this.props.formatsList.length) {
                newFilteredFormats = cloneDeep(this.props.formatsList);
            }
        } else {
            newFilteredFormats = this.props.filteredFormats;
            const formatIndex = this.props.filteredFormats.findIndex(
                format => format.value === currentFormat.value
            );
            if (formatIndex >= 0) {
                newFilteredFormats.splice(formatIndex, 1);
            } else {
                newFilteredFormats.push(currentFormat);
            }
        }
        this.props.handleStationFilter({
            filteredFormats: newFilteredFormats,
            filteredMarkets: this.props.filteredMarkets,
            orderedStations: this.props.orderedStations,
            searchString: this.props.searchString,
        });
    };

    handleSelectMarket = (currentMarket, selectAll) => {
        let newFilteredMarkets = [];
        if (selectAll) {
            if (this.props.filteredMarkets.length !== this.props.marketsList.length) {
                newFilteredMarkets = cloneDeep(this.props.marketsList);
            }
        } else {
            newFilteredMarkets = this.props.filteredMarkets;
            const marketIndex = this.props.filteredMarkets.findIndex(
                market => market.value === currentMarket.value
            );
            if (marketIndex >= 0) {
                newFilteredMarkets.splice(marketIndex, 1);
            } else {
                newFilteredMarkets.push(currentMarket);
            }
        }
        this.props.handleStationFilter({
            filteredFormats: this.props.filteredFormats,
            filteredMarkets: newFilteredMarkets,
            orderedStations: this.props.orderedStations,
            searchString: this.props.searchString,
        });
    };

    handleSearchChange = searchString => {
        this.props.handleStationFilter({
            filteredFormats: this.props.filteredFormats,
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

        if (!orderedStations.field || orderedStations.field !== sortKey) {
            newOrderedStations = {
                field: sortKey,
                ascending: true,
            };
        }

        this.props.handleStationFilter({
            filteredFormats: this.props.filteredFormats,
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
            filteredFormats,
            filteredMarkets,
            selectedSong: { title, artist },
            searchString,
        } = this.props;
        const { filterOpen, activeExpandableFilter } = this.state;
        const formatFilterOpen = activeExpandableFilter === FORMAT_FILTER_TITLE;
        const marketFilterOpen = activeExpandableFilter === MARKET_FILTER_TITLE;

        return (
            <div className={className}>
                <div className="director__song-header-details">
                    <SongHeader songName={title} artistName={artist} />
                </div>
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
                                            'music-tracker-filter__group-icon',
                                            'icon',
                                            'fa',
                                            'fa-filter'
                                        )}
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
                                        className="dropdown-filter__reset-button"
                                        onClick={this.handleResetFilter}
                                    >
                                        Reset
                                    </button>
                                </div>
                                <p className="dropdown-filter__sub-title">FILTER BY:</p>
                                <ExpandableFilter
                                    expanded={formatFilterOpen}
                                    title={FORMAT_FILTER_TITLE}
                                    list={formatFilterOpen ? formatsList : []}
                                    selectedItems={filteredFormats}
                                    toggleFilter={this.handleExpand}
                                    handleFilterSelect={this.handleSelectFormat}
                                />
                                <ExpandableFilter
                                    expanded={marketFilterOpen}
                                    title={MARKET_FILTER_TITLE}
                                    list={marketFilterOpen ? marketsList : []}
                                    selectedItems={filteredMarkets}
                                    toggleFilter={this.handleExpand}
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
