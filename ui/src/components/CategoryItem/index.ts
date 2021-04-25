import { connect } from 'react-redux';

import {
    highlightCategoryVersion,
    dehighlightCategoryVersion,
} from 'stores/categoryHighlight/categoryHighlightActions';

import CategoryItem from './CategoryItem.component';

const mapStateToProps = (state: any) => ({
    songVersions: state.songVersions,
    categoryHighlight: state.categoryHighlight
});

const mapDispatchToProps = {
    highlightAction: highlightCategoryVersion,
    dehighlightAction: dehighlightCategoryVersion,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
