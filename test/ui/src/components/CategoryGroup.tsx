import React from 'react';

import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'index' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
import classNames from 'classnames';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'saveDragSongs' does not exist on type 'R... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
import CategoryItem from './CategoryItem';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'draggable' does not exist on type 'Reado... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'openAsideModal' does not exist on type '... Remove this comment to see the full error message
class CategoryGroup extends React.Component {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryOptions' does not exist on type ... Remove this comment to see the full error message
    state = { hovering: false };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'stationCategoriesPermissions' does not e... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'index' does not exist on type 'Readonly<... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songs' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
    saveDragSongs = songs => {
        const {
            saveDragSongs,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
            group: { label },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDrag' does not exist on type 'Readonl... Remove this comment to see the full error message
        } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'list' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        return saveDragSongs(songs, label);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onCheckVersion' does not exist on type '... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'index' does not exist on type 'Readonly<... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalSongId' does not exist on type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'group' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const {
            index,
            group,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
            group: { limit, label, description, songs, value },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'draggable' does not exist on type 'Reado... Remove this comment to see the full error message
            togglePlanner,
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChanges' does not exist on type 'Read... Remove this comment to see the full error message
            endDrag,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
            list,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'asideModalSongId' does not exist on type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; song: any; togglePlanner: any; l... Remove this comment to see the full error message
            multiSelect,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeAsideModal' does not exist on type ... Remove this comment to see the full error message
            checkedSongs,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryOptions' does not exist on type ... Remove this comment to see the full error message
            onCheckVersion,
            draggable,
            dragCatGroup,
            catChanges,
            bottomBarOpen,
            boardId,
            asideModalSongId,
            openAsideModal,
            closeAsideModal,
            categoryOptions,
            stationCategoriesPermissions,
        } = this.props;
        const { hovering } = this.state;

        const outOfSync = label === 'Out of sync';

        const isReadOnly = stationCategoriesPermissions[label];

        return (
            <div key={index + songs.length} id={label} className={classNames('version-group', { 'list-group': list })}>
                <div key="Category-Group-0" id="Category-Group-0" />
                <div className="version-group-header" key={`Category-Group-${label}`} id={`Category-Group-${label}`}>
                    <h5>{description ? `${label} - ${description}` : label}</h5>
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type. */}
                    <h5
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songIndex' implicitly has an 'any' type... Remove this comment to see the full error message
                        className={classNames({
                            'version-group-yellow': limit && limit < songs.length && !isReadOnly,
                        })}
                    >
                        {limit && !isReadOnly ? `${songs.length}/${limit}` : songs.length}
                    </h5>
                </div>
                <div
                    className={classNames('version-items', 'custom-scrollbars--thin', {
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; song: any; togglePlanner: any; l... Remove this comment to see the full error message
                        'list-group-height': list,
                        'group-tile-hovering': hovering,
                    })}
                    onDragOver={event => {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                        event.preventDefault();
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        if (dragCatGroup === label) return;
                        if (label === 'None' || outOfSync) return;
                        if (isReadOnly) return;
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        if (!hovering) this.setState({ hovering: true });
                    }}
                    onDragLeave={event => {
                        event.preventDefault();
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                        if (hovering) this.setState({ hovering: false });
                    }}
                    onDrop={event => {
                        event.preventDefault();
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                        this.setState({ hovering: false });
                        togglePlanner(false);
                        if (dragCatGroup === label) return;
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: any; song: any; togglePlanner: any; l... Remove this comment to see the full error message
                        if (label === 'None' || outOfSync) return;
                        if (isReadOnly) return;
                        endDrag({ groupId: value, label });
                    }}
                >
                    {songs.length
                        ? songs.map((song, songIndex) => {
                            const vId = (song && song.media_id) || 0;
                            return (
                                <div key={`Category-Item-${song.sId}-${vId}`} id={`Category-Item-${song.sId}-${vId}`}>
                                    <LazyLoad height={53} unmountIfInvisible>
                                        <CategoryItem
                                            key={song.label}
                                            song={song}
                                            togglePlanner={togglePlanner}
                                            list={list}
                                            limit={limit}
                                            overLimit={limit && limit < songIndex + 1}
                                            catChange={catChanges.includes(song)}
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                            hovering={hovering}
                                            multiSelect={multiSelect}
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            checkedSongs={checkedSongs}
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                            onCheckVersion={onCheckVersion}
                                            draggable={draggable}
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            saveDragSongs={this.saveDragSongs}
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                            outOfSync={outOfSync}
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            boardId={boardId}
                                            openAsideModal={openAsideModal}
                                            closeAsideModal={closeAsideModal}
                                            asideModalSongId={asideModalSongId}
                                            bottomBarOpen={bottomBarOpen}
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            categoryOptions={categoryOptions}
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                            stationCategoriesPermissions={stationCategoriesPermissions}
                                        />
                                    </LazyLoad>
                                </div>
                            );
                        })
                        : null}
                    {!list && !songs.length && !hovering ? ( // handles placeholder logic for sidebar
                        <div className="version-placeholder" />
                    ) : null}
                    {list && !songs.length && !hovering ? ( // handles placeholder logic for listview
                        <div className="version-placeholder" />
                    ) : null}
                    <div className="group-hover-contents no-pointer-events">
                        <span className="addsongs-hover-icon no-pointer-events">+</span>
                        <p className="no-pointer-events">{group.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

CategoryGroup.propTypes = {
    boardId: PropTypes.string.isRequired,
    catChanges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    closeAsideModal: PropTypes.func.isRequired,
    draggable: PropTypes.bool.isRequired,
    endDrag: PropTypes.func.isRequired,
    group: PropTypes.shape().isRequired,
    index: PropTypes.number.isRequired,
    openAsideModal: PropTypes.func.isRequired,
    saveDragSongs: PropTypes.func.isRequired,
    togglePlanner: PropTypes.func.isRequired,
    asideModalSongId: PropTypes.string,
    bottomBarOpen: PropTypes.bool,
    checkedSongs: PropTypes.arrayOf(PropTypes.shape()),
    dragCatGroup: PropTypes.string,
    list: PropTypes.bool,
    multiSelect: PropTypes.bool,
    onCheckVersion: PropTypes.func,
};

CategoryGroup.defaultProps = {
    asideModalSongId: null,
    checkedSongs: null,
    dragCatGroup: null,
    list: false,
    multiSelect: false,
    onCheckVersion: null,
    bottomBarOpen: false,
};

export default CategoryGroup;
