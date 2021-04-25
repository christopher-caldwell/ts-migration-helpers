import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import { DropdownButton } from 'react-bootstrap';
import { resetMusicTrackerFilter, setMusicTrackerFilter, } from 'stores/musicTracker/musicTrackerActions';
import { openModal } from 'stores/preferences/preferencesActions';
import { getRecommendableCategories, hideRecommendableCategories } from 'stores/recommendableCategories/recommendableCategoriesActions';
import MusicTrackerFilterHeader from 'components/BoardPage/Filters/MusicTrackerFilterHeader';
import FeatureToggle from 'components/FeatureToggle';
import { FEATURES } from 'utils/constants';
import SearchField from 'components/SearchField';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import CRGFilter from './Filters/CRG';
import CategoryFilter from './Filters/Category';
class HeaderMusicTracker extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);
        (this as any).INITIAL_FILTER_STATE = {
            dropDownDimensions: {
                minHeight: 257,
                maxHeight: 307,
                height: 305,
                width: 280,
                opened: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRecommendableCategoriesAction' does n... Remove this comment to see the full error message
            activeCategoryPanel: '',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideRecommendableCategoriesAction' does ... Remove this comment to see the full error message
            filtersOpened: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
        this.state = (this as any).INITIAL_FILTER_STATE;
        (this as any).prevMusicTrackerData = null;
    }
    componentDidMount() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
        const { preferences, getRecommendableCategoriesAction, hideRecommendableCategoriesAction, boardId, filters, } = this.props;
        window.addEventListener('resize', this.handleExpandCategoryFilter);
        // Checking the user preferences to see if they have permission to view
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'criteria' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        let obj = preferences.musictracker.find(o => o.key === 'category');
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'o' implicitly has an 'any' type.
        obj = obj.items.find(o => o.label === 'Recommended');
        const showStatusRecommendableCategories = !(obj.hidden || false);
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isOpened' implicitly has an 'any' type.
        if (showStatusRecommendableCategories) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            getRecommendableCategoriesAction(boardId, filters.applied.dateRange.startDate);
        }
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
        else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'recommendableCategories' does not exist ... Remove this comment to see the full error message
            hideRecommendableCategoriesAction();
        }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dropDownDimensions' does not exist on ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'criteria' implicitly has an 'any' type.
    onSearchChange = criteria => {
        if ((this as any).MusicTrackerSearchTimeout) {
            clearTimeout((this as any).MusicTrackerSearchTimeout);
        }
        (this as any).MusicTrackerSearchTimeout = setTimeout(() => {
            (this.props as any).setMusicTrackerFilterAction({ search: criteria });
        }, 500);
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isOpened' implicitly has an 'any' type.
    onToggleFilters = isOpened => {
        this.setState({ filtersOpened: isOpened });
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryGroup' implicitly has an 'any' ... Remove this comment to see the full error message
        this.handleExpandCategoryFilter();
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'category' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesMetadata' does not exist on ty... Remove this comment to see the full error message
    handleExpandCategoryFilter = key => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setMusicTrackerFilterAction' does not ex... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'recommendableCategories' does not exist ... Remove this comment to see the full error message
        const { recommendableCategories: { showRecommended }, } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dropDownDimensions' does not exist on ty... Remove this comment to see the full error message
        const { dropDownDimensions } = this.state;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
        const activeKey = typeof key === 'object' ? '' : key;
        const sizeDropdown = { ...dropDownDimensions };
        const tableHeight = (document.getElementsByClassName('table-container')[0] as any).offsetHeight;
        if (showRecommended) {
            sizeDropdown.height = activeKey ? tableHeight - 14 : dropDownDimensions.maxHeight;
        }
        else {
            sizeDropdown.height = activeKey ? tableHeight - 14 : dropDownDimensions.minHeight;
        }
        sizeDropdown.opened = activeKey;
        this.setState({
            dropDownDimensions: sizeDropdown,
            activeCategoryPanel: activeKey || '',
        });
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'categoryGroup' implicitly has an 'any' ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    handleCategoryFilterSelect = (categoryGroup, category) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerData' does not exist on type... Remove this comment to see the full error message
        const { musicTrackerData: { categoryDetails: { rawStationCategories }, }, categoriesMetadata, recommendableCategories: { showRecommended, recommendableCategories }, setMusicTrackerFilterAction, musicTracker: { filter }, } = this.props;
        const currentFilter = { ...filter };
        let updatedCategoryList = currentFilter.category[categoryGroup];
        if (category) {
            // selecting a single category checkbox
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'crgItem' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'setMusicTrackerFilterAction' does not ex... Remove this comment to see the full error message
            if (updatedCategoryList.some(c => c.label === category.label)) {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'c' implicitly has an 'any' type.
                updatedCategoryList = updatedCategoryList.filter(c => c.label !== category.label);
            }
            else {
                updatedCategoryList = [...updatedCategoryList, category];
            }
            return setMusicTrackerFilterAction({
                category: {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'INITIAL_FILTER_STATE' does not exist on ... Remove this comment to see the full error message
                    ...currentFilter.category,
                    [categoryGroup]: updatedCategoryList,
                },
            });
        } // below is select all logic
        if (showRecommended && categoryGroup === 'recommendable') {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'hidden' does not exist on type 'Readonly... Remove this comment to see the full error message
            if (updatedCategoryList.length) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerData' does not exist on type... Remove this comment to see the full error message
                return setMusicTrackerFilterAction({
                    category: {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'recommendableCategories' does not exist ... Remove this comment to see the full error message
                        ...currentFilter.category,
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesMetadata' does not exist on ty... Remove this comment to see the full error message
                        [categoryGroup]: [],
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'preferences' does not exist on type 'Rea... Remove this comment to see the full error message
                    },
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onToggleTrends' does not exist on type '... Remove this comment to see the full error message
                });
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'openModalAction' does not exist on type ... Remove this comment to see the full error message
            }
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            const recCategories = Object.keys(recommendableCategories).reduce((total, current) => {
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                const category = categoriesMetadata[current] || false;
                if (category)
                    return [...total, category];
                return total;
            }, []);
            return setMusicTrackerFilterAction({
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message
                category: { ...currentFilter.category, [categoryGroup]: recCategories },
            });
        }
        setMusicTrackerFilterAction({
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            category: {
                ...currentFilter.category,
                [categoryGroup]: updatedCategoryList.length ? [] : rawStationCategories,
            },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (crit... Remove this comment to see the full error message
        });
    };
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'crgItem' implicitly has an 'any' type.
    handleCRGFilterSelect = crgItem => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTracker' does not exist on type 'Re... Remove this comment to see the full error message
        const { musicTracker: { filter: { crg }, }, setMusicTrackerFilterAction, } = this.props;
        const updatedCRG = crg;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'x' implicitly has an 'any' type.
        const elementIndex = updatedCRG.findIndex(x => x === crgItem);
        const isItemIncludedInFilter = elementIndex !== -1;
        if (isItemIncludedInFilter) {
            updatedCRG.splice(elementIndex, 1);
        }
        else {
            updatedCRG.push(crgItem);
        }
        setMusicTrackerFilterAction({ crg: updatedCRG });
    };
    handleResetFilter = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'INITIAL_FILTER_STATE' does not exist on ... Remove this comment to see the full error message
        this.setState({ ...this.INITIAL_FILTER_STATE });
        ((this as any).props as any).resetMusicTrackerFilterAction();
    };
    handleResetSearch = () => {
        (this.props as any).setMusicTrackerFilterAction({ search: '' });
    };
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hidden' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ categoriesMetadata: any; stationCategories... Remove this comment to see the full error message
        const { hidden, musicTracker: { filter: { search, crg, category }, }, musicTrackerData: { categoryDetails: { rawStationCategories }, }, recommendableCategories: { recommendableCategories, showRecommended }, categoriesMetadata, preferences, trendsEnabled, onToggleTrends, openModalAction, } = this.props;
        const { dropDownDimensions, filtersOpened, activeCategoryPanel } = (this as any).state;
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const dropDownActive = search.length || crg.length < 3 || Object.values(category).some(arr => arr.length);
        return (!hidden && (<div className="music-tracker-header">
                    <div className="music-tracker-filters">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'onFilterSave' does not exist on type 'Re... Remove this comment to see the full error message */}
                        <MusicTrackerFilterHeader onFilterSave={this.props.onFilterSave} disabled={this.props.loading}/>
                    </div>
                    <div className="music-tracker-actions">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                        <FeatureToggle featureName={FEATURES.MUSIC_TRACKER_SEARCH}>
                            <div className="music-tracker-search">
                                {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ placeholder: string; onSearchChange: (crit... Remove this comment to see the full error message */}
                                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                                <SearchField placeholder="Artist or Song" onSearchChange={this.onSearchChange} handleReset={this.handleResetSearch} value={search}/>
                            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
                            </div>
                        </FeatureToggle>
                        <div className="music-tracker-filter">
                            <DropdownButton className={`filter-item btn-dropdown
                                ${classNames({ 'btn-active': dropDownActive })}`} onToggle={this.onToggleFilters} noCaret pullRight title={<div>
                                        <i className="music-tracker-filter__group-icon icon fa fa-filter"/>
                                        <i className={`icon fa fa-angle-${filtersOpened ? 'up' : 'down'}`}/>
                                    </div>} bsSize="small" id="dropdown-button">
                                <div className="dropdown-filter" style={{
            height: `${dropDownDimensions.height}px`,
            width: `${dropDownDimensions.width}px`,
        }}>
                                    <div className="dropdown-filter__header">
                                        <h5 className="dropdown-filter__title">Apply Filters</h5>
                                        <a // eslint-disable-line
         className="dropdown-filter__reset" onClick={this.handleResetFilter} role="button">
                                            Reset
                                        </a>
                                    </div>
                                    <CRGFilter handleSelect={this.handleCRGFilterSelect} selectedItems={crg}/>
                                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ categoriesMetadata: any; stationCategories... Remove this comment to see the full error message */}
                                    <CategoryFilter categoriesMetadata={categoriesMetadata} stationCategories={rawStationCategories.filter(cat => cat.active)} selectedCategories={category} recommendableCategories={recommendableCategories} showRecommended={showRecommended} preferences={preferences} onSelect={this.handleExpandCategoryFilter} handleCategoryFilterSelect={this.handleCategoryFilterSelect} activeCategoryPanel={activeCategoryPanel}/>
                                </div>
                            </DropdownButton>
                            <button type="button" className={classNames('filter-item', 'music-tracker-filter__button', { 'btn-active': trendsEnabled })} onClick={onToggleTrends}>
                                <i className="fa fa-chart-line"/>
                            </button>
                            <button type="button" className=" filter-item music-tracker-filter__button" onClick={() => openModalAction()}>
                                <i className="fa fa-cog"/>
                            </button>
                        </div>
                    </div>
                </div>));
    }
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
HeaderMusicTracker.propTypes = {
    loading: PropTypes.bool.isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    musicTracker: PropTypes.shape().isRequired,
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    musicTrackerData: PropTypes.shape().isRequired,
    openModalAction: PropTypes.func.isRequired,
    resetMusicTrackerFilterAction: PropTypes.func.isRequired,
    setMusicTrackerFilterAction: PropTypes.func.isRequired,
    trendsEnabled: PropTypes.bool.isRequired,
    onFilterSave: PropTypes.func.isRequired,
    onToggleTrends: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
HeaderMusicTracker.defaultProps = { hidden: false };
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
