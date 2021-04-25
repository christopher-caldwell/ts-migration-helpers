// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'groups' implicitly has an 'any' t... Remove this comment to see the full error message
import React from 'react';

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'open' implicitly has an 'any' typ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'groups' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'plannerGroup' implicitly has an 'any' t... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'stationCategoriesPermissions' imp... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CategoryPlannerTile from './CategoryPlannerTile';

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'plannerGroup' implicitly has an 'any' t... Remove this comment to see the full error message
const CategoryPlanner = ({
    groups,
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
    endDrag,
    open,
    togglePlanner,
    closePlanner,
    dragCatGroup,
    stationCategoriesPermissions,
}) => {
    const {
        current, recurrent, gold, other,
    } = groups;
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
    const display = plannerGroup => plannerGroup.map(group => {
        if (group.label === 'Out of sync' || group.label === 'None') return null;
        return (
            <CategoryPlannerTile
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'plannerGroup' implicitly has an 'any' t... Remove this comment to see the full error message
                key={group.label}
                group={group}
                endDrag={endDrag}
                togglePlanner={togglePlanner}
                dragCatGroup={dragCatGroup}
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                stationCategoriesPermissions={stationCategoriesPermissions}
            />
        );
    });

    const {
        anyCurr, anyRCurr, anyGold, anyOther,
    } = {
        anyCurr: current.length !== 0,
        anyRCurr: recurrent.length !== 0,
        anyGold: gold.length !== 0,
        anyOther: other.length !== 0,
    };

    return (
        <div
            className={classNames('version-planner', {
                'version-planner-toggle': open,
            })}
        >
            <div className="version-planner-close-container">
                <button type="button" className="version-close-btn" onClick={() => closePlanner()}>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    <i className="fa fa-times x-button" />
                </button>
            </div>
            <div className="planner-columns">
                {anyCurr ? (
                    <div>
                        <h3 className="planner-header">Current</h3>
                        <div className="planner-column">{display(current)}</div>
                    </div>
                ) : null}
                {anyRCurr ? (
                    <div>
                        <h3 className="planner-header">Recurrent</h3>
                        <div className="planner-column">{display(recurrent)}</div>
                    </div>
                ) : null}
                {anyGold ? (
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    <div>
                        <h3 className="planner-header">Gold</h3>
                        <div className="planner-column">{display(gold)}</div>
                    </div>
                ) : null}
                {anyOther ? (
                    <div>
                        <h3 className="planner-header">Other Categories</h3>
                        <div className="planner-column">{display(other)}</div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

CategoryPlanner.propTypes = {
    closePlanner: PropTypes.func.isRequired,
    endDrag: PropTypes.func.isRequired,
    groups: PropTypes.shape().isRequired,
    open: PropTypes.bool.isRequired,
    togglePlanner: PropTypes.func.isRequired,
    dragCatGroup: PropTypes.string,
};

CategoryPlanner.defaultProps = { dragCatGroup: null };

export default CategoryPlanner;
