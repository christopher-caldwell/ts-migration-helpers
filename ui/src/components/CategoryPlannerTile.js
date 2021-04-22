import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

class CategoryPlannerTile extends React.Component {
    state = { hovering: false };

    render() {
        const {
            group: { id, limit, label, description, length },
            endDrag,
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
                onDragLeave={event => {
                    event.preventDefault();
                    if (stationCategoriesPermissions[label]) return;
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
                            })}
                        >
                            {label}
                        </p>
                        <p
                            className={classNames({
                                'version-planner-tile-frac': overLimit,
                            })}
                        >
                            {limit ? `${length}/${limit}` : length}
                        </p>
                    </div>
                    <p>{description}</p>
                    <div className="planner-tile-hover-contents">
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
