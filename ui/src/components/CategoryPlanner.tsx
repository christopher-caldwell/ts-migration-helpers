import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import CategoryPlannerTile from './CategoryPlannerTile';

const CategoryPlanner = ({
    groups,
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
    const display = plannerGroup => plannerGroup.map(group => {
        if (group.label === 'Out of sync' || group.label === 'None') return null;
        return (
            <CategoryPlannerTile
                key={group.label}
                group={group}
                endDrag={endDrag}
                togglePlanner={togglePlanner}
                dragCatGroup={dragCatGroup}
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
