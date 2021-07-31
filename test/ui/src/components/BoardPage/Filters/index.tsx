// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const Filters = props => {
    const {
        applied,
        onFilterSave,
        available,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardtype' implicitly has an 'any' type... Remove this comment to see the full error message
        layout: {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            board: { type: boardType, id: boardId },
            activeId,
        },
    } = props;

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
    const callOnFilterSave = filters => {
        Object.keys(filters).forEach(key => {
            applied[key] = filters[key];
        });
        onFilterSave(applied);
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardtype' implicitly has an 'any' type... Remove this comment to see the full error message
    const getFiltersComponent = (boardtype, tabId) => {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const groups = filterMap[boardtype];
        if (groups[tabId] !== undefined) {
            return groups[tabId];
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    layout: PropTypes.shape().isRequired,
    onFilterSave: PropTypes.func.isRequired,
    available: PropTypes.objectOf(PropTypes.any),
};

Filters.defaultProps = {
    available: {},
};

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
const mapStateToProps = state => ({ layout: state.boardDetails.layout });

export default connect(mapStateToProps)(Filters);
