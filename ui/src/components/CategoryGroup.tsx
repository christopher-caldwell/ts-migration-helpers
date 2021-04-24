import React from 'react';

import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CategoryItem from './CategoryItem';

class CategoryGroup extends React.Component {
    state = { hovering: false };

    saveDragSongs = songs => {
        const {
            saveDragSongs,
            group: { label },
        } = this.props;
        return saveDragSongs(songs, label);
    };

    render() {
        const {
            index,
            group,
            group: { limit, label, description, songs, value },
            togglePlanner,
            endDrag,
            list,
            multiSelect,
            checkedSongs,
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
                    <h5
                        className={classNames({
                            'version-group-yellow': limit && limit < songs.length && !isReadOnly,
                        })}
                    >
                        {limit && !isReadOnly ? `${songs.length}/${limit}` : songs.length}
                    </h5>
                </div>
                <div
                    className={classNames('version-items', 'custom-scrollbars--thin', {
                        'list-group-height': list,
                        'group-tile-hovering': hovering,
                    })}
                    onDragOver={event => {
                        event.preventDefault();
                        if (dragCatGroup === label) return;
                        if (label === 'None' || outOfSync) return;
                        if (isReadOnly) return;
                        if (!hovering) this.setState({ hovering: true });
                    }}
                    onDragLeave={event => {
                        event.preventDefault();
                        if (hovering) this.setState({ hovering: false });
                    }}
                    onDrop={event => {
                        event.preventDefault();
                        this.setState({ hovering: false });
                        togglePlanner(false);
                        if (dragCatGroup === label) return;
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
                                            hovering={hovering}
                                            multiSelect={multiSelect}
                                            checkedSongs={checkedSongs}
                                            onCheckVersion={onCheckVersion}
                                            draggable={draggable}
                                            saveDragSongs={this.saveDragSongs}
                                            outOfSync={outOfSync}
                                            boardId={boardId}
                                            openAsideModal={openAsideModal}
                                            closeAsideModal={closeAsideModal}
                                            asideModalSongId={asideModalSongId}
                                            bottomBarOpen={bottomBarOpen}
                                            categoryOptions={categoryOptions}
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
