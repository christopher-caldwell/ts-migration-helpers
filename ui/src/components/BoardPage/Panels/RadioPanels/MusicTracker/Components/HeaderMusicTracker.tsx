import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropdownButton } from 'react-bootstrap';

import {
    resetMusicTrackerFilter,
    setMusicTrackerFilter,
} from 'stores/musicTracker/musicTrackerActions';
import { openModal } from 'stores/preferences/preferencesActions';
import { getRecommendableCategories, hideRecommendableCategories }
    from 'stores/recommendableCategories/recommendableCategoriesActions';
import MusicTrackerFilterHeader from 'components/BoardPage/Filters/MusicTrackerFilterHeader';
import FeatureToggle from 'components/FeatureToggle';
import { FEATURES } from 'utils/constants';
import SearchField from 'components/SearchField';
import CRGFilter from './Filters/CRG';
import CategoryFilter from './Filters/Category';

class HeaderMusicTracker extends React.Component {
    constructor(props) {
        super(props);
        this.INITIAL_FILTER_STATE = {
            dropDownDimensions: {
                minHeight: 257,
                maxHeight: 307,
                height: 305,
                width: 280,
                opened: false,
            },
            activeCategoryPanel: '',
            filtersOpened: false,
        };
        this.state = this.INITIAL_FILTER_STATE;
        this.prevMusicTrackerData = null;
    }

    componentDidMount() {
        const {
            preferences,
            getRecommendableCategoriesAction,
            hideRecommendableCategoriesAction,
            boardId,
            filters,
        } = this.props;
        window.addEventListener('resize', this.handleExpandCategoryFilter);
        // Checking the user preferences to see if they have permission to view
        let obj = preferences.musictracker.find(o => o.key === 'category');
        obj = obj.items.find(o => o.label === 'Recommended');
        const showStatusRecommendableCategories = !(obj.hidden || false);

        if (showStatusRecommendableCategories) {
            getRecommendableCategoriesAction(boardId, filters.applied.dateRange.startDate);
        } else {
            hideRecommendableCategoriesAction();
        }
    }

    onSearchChange = criteria => {
        if (this.MusicTrackerSearchTimeout) {
            clearTimeout(this.MusicTrackerSearchTimeout);
        }

        this.MusicTrackerSearchTimeout = setTimeout(() => {
            this.props.setMusicTrackerFilterAction({ search: criteria });
        }, 500);
    };

    onToggleFilters = isOpened => {
        this.setState({ filtersOpened: isOpened });
        this.handleExpandCategoryFilter();
    };

    handleExpandCategoryFilter = key => {
        const {
            recommendableCategories: { showRecommended },
        } = this.props;
        const { dropDownDimensions } = this.state;
        const activeKey = typeof key === 'object' ? '' : key;
        const sizeDropdown = { ...dropDownDimensions };
        const tableHeight = document.getElementsByClassName('table-container')[0].offsetHeight;

        if (showRecommended) {
            sizeDropdown.height = activeKey ? tableHeight - 14 : dropDownDimensions.maxHeight;
        } else {
            sizeDropdown.height = activeKey ? tableHeight - 14 : dropDownDimensions.minHeight;
        }

        sizeDropdown.opened = activeKey;

        this.setState({
            dropDownDimensions: sizeDropdown,
            activeCategoryPanel: activeKey || '',
        });
    };

    handleCategoryFilterSelect = (categoryGroup, category) => {
        const {
            musicTrackerData: {
                categoryDetails: { rawStationCategories },
            },
            categoriesMetadata,
            recommendableCategories: { showRecommended, recommendableCategories },
            setMusicTrackerFilterAction,
            musicTracker: { filter },
        } = this.props;
        const currentFilter = { ...filter };
        let updatedCategoryList = currentFilter.category[categoryGroup];

        if (category) {
            // selecting a single category checkbox
            if (updatedCategoryList.some(c => c.label === category.label)) {
                updatedCategoryList = updatedCategoryList.filter(c => c.label !== category.label);
            } else {
                updatedCategoryList = [...updatedCategoryList, category];
            }
            return setMusicTrackerFilterAction({
                category: {
                    ...currentFilter.category,
                    [categoryGroup]: updatedCategoryList,
                },
            });
        } // below is select all logic

        if (showRecommended && categoryGroup === 'recommendable') {
            if (updatedCategoryList.length) {
                return setMusicTrackerFilterAction({
                    category: {
                        ...currentFilter.category,
                        [categoryGroup]: [],
                    },
                });
            }
            const recCategories = Object.keys(recommendableCategories).reduce((total, current) => {
                const category = categoriesMetadata[current] || false;
                if (category) return [...total, category];
                return total;
            }, []);
            return setMusicTrackerFilterAction({
                category: { ...currentFilter.category, [categoryGroup]: recCategories },
            });
        }
        setMusicTrackerFilterAction({
            category: {
                ...currentFilter.category,
                [categoryGroup]: updatedCategoryList.length ? [] : rawStationCategories,
            },
        });
    };

    handleCRGFilterSelect = crgItem => {
        const {
            musicTracker: {
                filter: { crg },
            },
            setMusicTrackerFilterAction,
        } = this.props;
        const updatedCRG = crg;
        const elementIndex = updatedCRG.findIndex(x => x === crgItem);
        const isItemIncludedInFilter = elementIndex !== -1;

        if (isItemIncludedInFilter) {
            updatedCRG.splice(elementIndex, 1);
        } else {
            updatedCRG.push(crgItem);
        }
        setMusicTrackerFilterAction({ crg: updatedCRG });
    };

    handleResetFilter = () => {
        this.setState({ ...this.INITIAL_FILTER_STATE });
        this.props.resetMusicTrackerFilterAction();
    };

    handleResetSearch = () => {
        this.props.setMusicTrackerFilterAction({ search: '' });
    };

    render() {
        const {
            hidden,
            musicTracker: {
                filter: { search, crg, category },
            },
            musicTrackerData: {
                categoryDetails: { rawStationCategories },
            },
            recommendableCategories: { recommendableCategories, showRecommended },
            categoriesMetadata,
            preferences,
            trendsEnabled,
            onToggleTrends,
            openModalAction,
        } = this.props;
        const { dropDownDimensions, filtersOpened, activeCategoryPanel } = this.state;

        const dropDownActive =
            search.length || crg.length < 3 || Object.values(category).some(arr => arr.length);

        return (
            !hidden && (
                <div className="music-tracker-header">
                    <div className="music-tracker-filters">
                        <MusicTrackerFilterHeader
                            onFilterSave={this.props.onFilterSave}
                            disabled={this.props.loading}
                        />
                    </div>
                    <div className="music-tracker-actions">
                        <FeatureToggle featureName={FEATURES.MUSIC_TRACKER_SEARCH}>
                            <div className="music-tracker-search">
                                <SearchField
                                    placeholder="Artist or Song"
                                    onSearchChange={this.onSearchChange}
                                    handleReset={this.handleResetSearch}
                                    value={search}
                                />
                            </div>
                        </FeatureToggle>
                        <div className="music-tracker-filter">
                            <DropdownButton
                                className={`filter-item btn-dropdown
                                ${classNames({ 'btn-active': dropDownActive })}`}
                                onToggle={this.onToggleFilters}
                                noCaret
                                pullRight
                                title={
                                    <div>
                                        <i className="music-tracker-filter__group-icon icon fa fa-filter" />
                                        <i
                                            className={`icon fa fa-angle-${
                                                filtersOpened ? 'up' : 'down'
                                            }`}
                                        />
                                    </div>
                                }
                                bsSize="small"
                                id="dropdown-button"
                            >
                                <div
                                    className="dropdown-filter"
                                    style={{
                                        height: `${dropDownDimensions.height}px`,
                                        width: `${dropDownDimensions.width}px`,
                                    }}
                                >
                                    <div className="dropdown-filter__header">
                                        <h5 className="dropdown-filter__title">Apply Filters</h5>
                                        <a // eslint-disable-line
                                            className="dropdown-filter__reset"
                                            onClick={this.handleResetFilter}
                                            role="button"
                                        >
                                            Reset
                                        </a>
                                    </div>
                                    <CRGFilter
                                        handleSelect={this.handleCRGFilterSelect}
                                        selectedItems={crg}
                                    />
                                    <CategoryFilter
                                        categoriesMetadata={categoriesMetadata}
                                        stationCategories={rawStationCategories.filter(
                                            cat => cat.active
                                        )}
                                        selectedCategories={category}
                                        recommendableCategories={recommendableCategories}
                                        showRecommended={showRecommended}
                                        preferences={preferences}
                                        onSelect={this.handleExpandCategoryFilter}
                                        handleCategoryFilterSelect={this.handleCategoryFilterSelect}
                                        activeCategoryPanel={activeCategoryPanel}
                                    />
                                </div>
                            </DropdownButton>
                            <button
                                type="button"
                                className={classNames(
                                    'filter-item',
                                    'music-tracker-filter__button',
                                    { 'btn-active': trendsEnabled }
                                )}
                                onClick={onToggleTrends}
                            >
                                <i className="fa fa-chart-line" />
                            </button>
                            <button
                                type="button"
                                className=" filter-item music-tracker-filter__button"
                                onClick={() => openModalAction()}
                            >
                                <i className="fa fa-cog" />
                            </button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

HeaderMusicTracker.propTypes = {
    loading: PropTypes.bool.isRequired,
    musicTracker: PropTypes.shape().isRequired,
    musicTrackerData: PropTypes.shape().isRequired,
    openModalAction: PropTypes.func.isRequired,
    resetMusicTrackerFilterAction: PropTypes.func.isRequired,
    setMusicTrackerFilterAction: PropTypes.func.isRequired,
    trendsEnabled: PropTypes.bool.isRequired,
    onFilterSave: PropTypes.func.isRequired,
    onToggleTrends: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
};

HeaderMusicTracker.defaultProps = { hidden: false };

const mapStateToProps = state => ({
    musicTrackerData: state.musicTrackerData,
    musicTracker: state.musicTracker,
    recommendableCategories: state.recommendableCategories,
    preferences: state.preferences,
    categoriesMetadata: state.categoriesMetadata.data,
});

const mapDispatchToProps = {
    setMusicTrackerFilterAction: setMusicTrackerFilter,
    resetMusicTrackerFilterAction: resetMusicTrackerFilter,
    openModalAction: openModal,
    getRecommendableCategoriesAction: getRecommendableCategories,
    hideRecommendableCategoriesAction: hideRecommendableCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMusicTracker);
