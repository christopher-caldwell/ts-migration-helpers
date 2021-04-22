import { connect } from 'react-redux';
import { updateStationCategories } from 'stores/categories/categoriesActions';
import CategoryGoalsComponent from './CategoryGoals.component';
import CategoryGoalsModal from './CategoryGoalsModal';

const mapStateToProps = ({
    boardDetails,
    categoriesMetadata,
    stationCategories,
    updateStationCategoriesAction,
    musicTrackerOverlay,
}) => ({
    boardDetails,
    categoriesMetadata,
    stationCategories,
    updateStationCategoriesAction,
    musicTrackerOverlay,
});

const mapDispatchToProps = {
    updateStationCategoriesAction: updateStationCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryGoalsModal);
export const CategoryGoals = connect(mapStateToProps, mapDispatchToProps)(CategoryGoalsComponent);
