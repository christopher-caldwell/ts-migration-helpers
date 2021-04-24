import React from 'react';
import connect from 'react-redux/lib/connect/connect';

import PropTypes from 'prop-types';

const filterMap = {
    RadioBoard: {
        defaultTab: null,
    },
    AdminBoard: {
        defaultTab: null,
    },
};

const Filters = (props) => {
    const {
        applied,
        onFilterSave,
        available,
        layout: {
            board: { type: boardType, id: boardId },
            activeId,
        },
    } = props;

    const callOnFilterSave = (filters) => {
        Object.keys(filters).forEach((key) => {
            applied[key] = filters[key];
        });
        onFilterSave(applied);
    };

    const getFiltersComponent = (boardtype, tabId) => {
        const groups = filterMap[boardtype];
        if (groups[tabId] !== undefined) {
            return groups[tabId];
        }

        return groups.defaultTab;
    };

    const TabFilters = getFiltersComponent(boardType, activeId);

    const customProps = {
        applied,
        available,
        boardId,
        boardType,
        tabId: activeId,
    };

    if (TabFilters === null) {
        return false;
    }

    return (
        <div className="board-filters-container">
            <TabFilters {...customProps} onFilterSave={callOnFilterSave} />
        </div>
    );
};

Filters.propTypes = {
    applied: PropTypes.objectOf(PropTypes.any).isRequired,
    layout: PropTypes.shape().isRequired,
    onFilterSave: PropTypes.func.isRequired,
    available: PropTypes.objectOf(PropTypes.any),
};

Filters.defaultProps = {
    available: {},
};

const mapStateToProps = (state) => ({ layout: state.boardDetails.layout });

export default connect(mapStateToProps)(Filters);
