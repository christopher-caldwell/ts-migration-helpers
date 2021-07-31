import React from 'react';

import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
import classNames from 'classnames';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'endDrag' does not exist on type 'Readonl... Remove this comment to see the full error message
class CategoryPlannerTile extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
    state = { hovering: false };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dragCatGroup' does not exist on type 'Re... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDrag' does not exist on type 'Readonl... Remove this comment to see the full error message
            group: { id, limit, label, description, length },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dragCatGroup' does not exist on type 'Re... Remove this comment to see the full error message
            endDrag,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
            togglePlanner,
            dragCatGroup,
            stationCategoriesPermissions,
        } = this.props;
        const { hovering } = this.state;
        const overLimit = limit && length > limit;

        return (
            <div
                className={classNames('droppable', 'version-planner-tile', {
                    'tile-hovering': hovering,
                })}
                onDragOver={event => {
                    event.preventDefault();
                    if (stationCategoriesPermissions[label]) return;
                    if (dragCatGroup === label) return;
                    if (!hovering) this.setState({ hovering: true });
                }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                onDragLeave={event => {
                    event.preventDefault();
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    if (stationCategoriesPermissions[label]) return;
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                    if (hovering) this.setState({ hovering: false });
                }}
                onDrop={event => {
                    event.preventDefault();
                    if (stationCategoriesPermissions[label]) return;
                    this.setState({ hovering: false });
                    togglePlanner(false);
                    if (dragCatGroup === label) return;
                    endDrag({ groupId: id, label });
                }}
            >
                <div className="planner-tile-container">
                    <div className="version-planner-tile-head">
                        <p
                            className={classNames('tile-cat-label', {
                                'tile-cat-label-limit-color': overLimit,
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                            })}
                        >
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            {label}
                        </p>
                        <p
                            className={classNames({
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                'version-planner-tile-frac': overLimit,
                            })}
                        >
                            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                            {limit ? `${length}/${limit}` : length}
                        </p>
                    </div>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    <p>{description}</p>
                    <div className="planner-tile-hover-contents">
                        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                        <span className="addsongs-hover-icon">+</span>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

CategoryPlannerTile.propTypes = {
    endDrag: PropTypes.func.isRequired,
    group: PropTypes.shape().isRequired,
    togglePlanner: PropTypes.func.isRequired,
    dragCatGroup: PropTypes.string,
};

CategoryPlannerTile.defaultProps = { dragCatGroup: null };

export default CategoryPlannerTile;
