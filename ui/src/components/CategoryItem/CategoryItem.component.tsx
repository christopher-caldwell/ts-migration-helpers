import React from 'react';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
import { OverlayTrigger } from 'react-bootstrap';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/packet-ab-white.png' or... Remove this comment to see the full error message
import AsideModal from 'components/AsideModal';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/packet-ab-blue.png' or ... Remove this comment to see the full error message
import AsideModalPanels from 'components/AsideModal/Panels';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/clock-regular-white.png... Remove this comment to see the full error message
import { FEATURES } from 'utils/constants';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/clock-regular-blue.png'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/packet-ab-white.png' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/pie-chart.png' or its c... Remove this comment to see the full error message
import CustomTooltip from 'components/CustomTooltip';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/packet-ab-blue.png' or ... Remove this comment to see the full error message
import FeatureToggle from 'components/FeatureToggle';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isModalSong' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/clock-regular-white.png... Remove this comment to see the full error message
import { SIDERAIL_ACTION } from 'stores/actionTypes';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/clock-regular-blue.png'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/packet-ab-white.png' or... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/pie-chart.png' or its c... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; songs: never[... Remove this comment to see the full error message
import packetIcon from 'images/packet-ab-white.png';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/packet-ab-blue.png' or ... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
import bluePacketIcon from 'images/packet-ab-blue.png';
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isModalSong' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'readon... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/clock-regular-white.png... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
import clockIcon from 'images/clock-regular-white.png';
// @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/clock-regular-blue.png'... Remove this comment to see the full error message
import blueClockIcon from 'images/clock-regular-blue.png';
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/pie-chart-blue.png' or ... Remove this comment to see the full error message
import blueDaypartIcon from 'images/pie-chart-blue.png';
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; songs: never[... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'images/pie-chart.png' or its c... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
import DaypartIcon from 'images/pie-chart.png';
// @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
import CustomCheckbox from '../CategoryCheckboxElement';

// @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; left: number;... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'songVersions' does not exist on type 'Re... Remove this comment to see the full error message
class CategoryItem extends React.Component {
    state = {
        dpHover: false,
        rstHover: false,
        pHover: false,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
        restrictionOpen: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
        packetOpen: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
        daypartOpen: false,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightAction' does not exist on type ... Remove this comment to see the full error message
        dragging: false,
    };

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dehighlightAction' does not exist on typ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hover' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isModalSong' implicitly has an 'any' ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    buildCustomTooltip = isModalSong => {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'dragging' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'gs_category' does not exist on type 'rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // don't show tooltip if a modal is opened from icon
        const {
            song: { sNm, aNm, version_name, gs_category },
            limit,
            overLimit,
            catChange,
        } = this.props;
        // TODO: revisit the need for wrapping songs for a single song
        const songs = [
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                sNm,
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
                aNm,
                version_name,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
                gs_category,
            },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'overLimit' does not exist on type 'Reado... Remove this comment to see the full error message
        ];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChange' does not exist on type 'Reado... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; songs: never[... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'outOfSync' does not exist on type 'Reado... Remove this comment to see the full error message
        if (isModalSong) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
            return <CustomTooltip type="" title="" songs={[]} enabled={false} />;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'bottomBarOpen' does not exist on type 'R... Remove this comment to see the full error message
        if (catChange) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryOptions' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // TODO this is half baked. will need to revisit when multiple day parts
            const {
                song,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checkSong' implicitly has an 'any' type... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; left: number;... Remove this comment to see the full error message
                songVersions: {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'media_id' does not exist on type 'readon... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                    data: { current, staged },
                },
            } = this.props;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
            const getSong = data =>
                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                flatten(Object.values(data)).find(({ media_id: id }) => id === song.media_id);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'highlightAction' does not exist on type ... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            const previousCategory =
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hover' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'gs_category' does not exist on type 'rea... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'type' implicitly has an 'any' type.
                (getSong(current) &&
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    ((getSong(current).category && getSong(current).category.name) ||
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'modalToOpen' implicitly has an 'any' ty... Remove this comment to see the full error message
                        getSong(current).gs_category)) ||
                'NONE';
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'openAsideModal' does not exist on type '... Remove this comment to see the full error message
            const updatedCategory = (getSong(staged) || song).category
                ? // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
                  (getSong(staged) || song).category.name
                : 'NONE';
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // ^ use staged song if user has hit save/review; if not, use local song.

            return (
                <CustomTooltip
                    type="info"
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; message: stri... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'catChange' does not exist on type 'Reado... Remove this comment to see the full error message
                    title="THIS SONG HAS BEEN EDITED"
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkedSongs' does not exist on type 'Re... Remove this comment to see the full error message
                    message={`This song was updated from ${previousCategory} to ${updatedCategory}`}
                    // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outOfSync' does not exist on type 'Reado... Remove this comment to see the full error message
                    left={5}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
                    songs={songs}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeAsideModal' does not exist on type ... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ type: string; title: string; left: number;... Remove this comment to see the full error message
                    enabled={!this.state.dragging}
                />
            );
        }

        if (overLimit) {
            return (
                <CustomTooltip
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                    type="warning"
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checkSong' implicitly has an 'any' type... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryHighlight' does not exist on typ... Remove this comment to see the full error message
                    title="WARNING"
                    message={`This song exceeds the maximum of ${limit} for this category.`}
                    left={5}
                    songs={songs}
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'song' implicitly has an 'any' type.
                    enabled={!this.state.dragging}
                />
            );
        }

        return (
            <CustomTooltip
                type="info"
                title="SONG DETAILS"
                left={5}
                songs={songs}
                enabled={!this.state.dragging}
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hover' implicitly has an 'any' type.
            />
        );
    };

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    compareCategoryVersionSelection = song => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const { songId, mediaId: highlightId } = this.props.categoryHighlight.data;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'modalToOpen' implicitly has an 'any' ty... Remove this comment to see the full error message
        const { sId, media_id: songMediaId } = song;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openAsideModal' does not exist on type '... Remove this comment to see the full error message
        return songMediaId ? songId === sId && highlightId === songMediaId : songId === sId;
    };

    onRowClick = song => {
        const { highlightAction, dehighlightAction } = this.props;

        const highlight = this.compareCategoryVersionSelection(song);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'song' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        return highlight ? dehighlightAction() : highlightAction(song, SIDERAIL_ACTION);
    };

    toggleHover = hover => this.setState({ [hover]: !this.state[hover] });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlanner' does not exist on type 'R... Remove this comment to see the full error message
    toggleAsideModal = type => this.setState({ [type]: !this.state[type] });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onCheckVersion' does not exist on type '... Remove this comment to see the full error message
    toggleDragging = dragging => this.setState({ dragging });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
    openModal = modalToOpen => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'bottomBarOpen' does not exist on type 'R... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryOptions' does not exist on type ... Remove this comment to see the full error message
            openAsideModal,
            song: { media_id: mediaId },
        } = this.props;
        openAsideModal(mediaId);
        this.setState({
            restrictionOpen: false,
            daypartOpen: false,
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: any; mus... Remove this comment to see the full error message
            packetOpen: false,
        });
        this.setState({ [modalToOpen]: true });
    };

    render() {
        const {
            song,
            song: {
                sNm,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'checkSong' implicitly has an 'any' type... Remove this comment to see the full error message
                aNm,
                taaNum,
                packet_id: packetId,
                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                restriction_id: restrictionId,
                media_id: mediaId,
                alternate,
            },
            togglePlanner,
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: any; mus... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            overLimit,
            catChange,
            list,
            multiSelect,
            checkedSongs,
            onCheckVersion,
            draggable,
            saveDragSongs,
            outOfSync,
            boardId,
            closeAsideModal,
            asideModalSongId,
            bottomBarOpen,
            categoryOptions,
            stationCategoriesPermissions,
        } = this.props;
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        const { rstHover, restrictionOpen, pHover, dpHover, daypartOpen, packetOpen } = this.state;

        const isModalSong = asideModalSongId === mediaId;
        // ^ this will be used to highlight the song when modal opens in MT
        // checkedSongs not used in list view
        const songChecked =
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: () => an... Remove this comment to see the full error message
            checkedSongs && checkedSongs.some(checkSong => checkSong.media_id === mediaId);
        const highlight = this.compareCategoryVersionSelection(song);
        const titleClasses = classNames('version-title', {
            'version-title-list': list,
        });
        const showCheckbox = multiSelect && !outOfSync; // out of sync gets no checkbox
        const enableDrag = draggable && !outOfSync; // out of sync can never be dragged
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const permitted =
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            stationCategoriesPermissions[song.gs_category || (song.category || { name: '' }).name];
        return (
            <div className="version-item-checkbox-container">
                {showCheckbox ? (
                    <CustomCheckbox song={song} onCheck={onCheckVersion} checked={songChecked} />
                ) : null}
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                <OverlayTrigger overlay={this.buildCustomTooltip(isModalSong)} delay={0}>
                    {!permitted ? (
                        <div
                            className={classNames('version-item', {
                                'version-item-highlight': isModalSong || highlight,
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                'version-limit-border': overLimit,
                                'version-cat-change-border': catChange,
                                'grab-cursor': enableDrag,
                                'no-drag-icon': !draggable,
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                'version-item-multi': showCheckbox,
                            })}
                            draggable={enableDrag}
                            onDragStart={() => {
                                this.toggleDragging(true);
                                if (multiSelect && checkedSongs.length) saveDragSongs(checkedSongs);
                                else saveDragSongs([song]);
                                togglePlanner(true);
                            }}
                            onDragEnd={() => {
                                this.toggleDragging(false);
                                togglePlanner(false);
                            }}
                        >
                            {enableDrag ? <i className="icon fa fa-bars drag-icon" /> : null}
                            <div className="version-titles">
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {sNm}
                                </p>
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {aNm}
                                </p>
                            </div>
                            <FeatureToggle featureName={FEATURES.HOUR_RESTRICTION}>
                                <button
                                    type="button"
                                    className="sidebar-icon-btn"
                                    onMouseEnter={() => this.toggleHover('rstHover')}
                                    onMouseLeave={() => this.toggleHover('rstHover')}
                                    onClick={() => this.openModal('restrictionOpen')}
                                >
                                    <img
                                        alt="Hour Restriction Icon"
                                        className={classNames(
                                            'sidebar-icons',
                                            { magnify: rstHover },
                                            { 'icon-no-opacity': restrictionId || rstHover }
                                        )}
                                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                        src={rstHover ? blueClockIcon : clockIcon}
                                    />
                                </button>
                            </FeatureToggle>
                            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: any; mus... Remove this comment to see the full error message */}
                            <FeatureToggle featureName={FEATURES.PACKET_SONG}>
                                <button
                                    type="button"
                                    className="sidebar-icon-btn"
                                    onMouseEnter={() => this.toggleHover('pHover')}
                                    onMouseLeave={() => this.toggleHover('pHover')}
                                    onClick={() => this.openModal('packetOpen')}
                                // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                >
                                    <img
                                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                        alt="Packet Icon"
                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: any; mus... Remove this comment to see the full error message
                                        className={classNames(
                                            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: any; mus... Remove this comment to see the full error message
                                            'sidebar-icons',
                                            'packet',
                                            { magnify: pHover },
                                            { 'icon-no-opacity': packetId || pHover }
                                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                        )}
                                        src={pHover ? bluePacketIcon : packetIcon}
                                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: () => an... Remove this comment to see the full error message
                                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: any; mus... Remove this comment to see the full error message
                                    />
                                </button>
                            </FeatureToggle>
                            <FeatureToggle featureName={FEATURES.DAYPARTS}>
                                <button
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                    className="sidebar-icon-btn"
                                    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    onMouseEnter={() => this.toggleHover('dpHover')}
                                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ featureName: string; handleClose: () => an... Remove this comment to see the full error message
                                    onMouseLeave={() => this.toggleHover('dpHover')}
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                    onClick={() => this.openModal('daypartOpen')}
                                >
                                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                                    <img
                                        alt="Alternate Daypart Icon"
                                        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                                        className={classNames(
                                            'sidebar-icons',
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                            { magnify: dpHover },
                                            { 'icon-no-opacity': !isEmpty(alternate) || dpHover }
                                        )}
                                        src={dpHover ? blueDaypartIcon : DaypartIcon}
                                    />
                                </button>
                            </FeatureToggle>
                            {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                            {list && <span className="version-item-taa">{taaNum || '-'}</span>}
                        </div>
                    ) : (
                        <div
                            className={classNames('version-item', {
                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                                'version-item-highlight': isModalSong || highlight,
                                'version-limit-border': overLimit,
                                'version-cat-change-border': catChange,
                                'grab-cursor': enableDrag,
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                                'no-drag-icon': !draggable,
                                'version-item-multi': showCheckbox,
                            })}
                            draggable={enableDrag}
                            onDragStart={() => {
                                this.toggleDragging(true);
                                if (multiSelect && checkedSongs.length) saveDragSongs(checkedSongs);
                                else saveDragSongs([song]);
                                togglePlanner(true);
                            }}
                            onDragEnd={() => {
                                this.toggleDragging(false);
                                togglePlanner(false);
                            }}
                        >
                            {enableDrag ? <i className="icon fa fa-bars drag-icon" /> : null}
                            <div className="version-titles">
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {sNm}
                                </p>
                                <p // eslint-disable-line
                                    className={titleClasses}
                                    onClick={() => this.onRowClick(song)}
                                >
                                    {aNm}
                                </p>
                            </div>
                        </div>
                    )}
                </OverlayTrigger>
                {isModalSong && restrictionOpen && (
                    <AsideModal
                        title="Hour Restriction"
                        asideModalOpened
                        handleClose={closeAsideModal}
                        musicTracker
                    >
                        <AsideModalPanels
                            featureName={FEATURES.HOUR_RESTRICTION}
                            handleClose={closeAsideModal}
                            musicTrackerSong={song}
                            boardId={boardId}
                            bottomBarOpen={bottomBarOpen}
                        />
                    </AsideModal>
                )}
                {isModalSong && packetOpen && (
                    <AsideModal
                        title="Packet Song"
                        asideModalOpened
                        handleClose={closeAsideModal}
                        musicTracker
                    >
                        <AsideModalPanels
                            featureName={FEATURES.PACKET_SONG}
                            handleClose={closeAsideModal}
                            musicTrackerSong={song}
                            boardId={boardId}
                            bottomBarOpen={bottomBarOpen}
                            stationCategoriesPermissions={stationCategoriesPermissions}
                        />
                    </AsideModal>
                )}
                {isModalSong && daypartOpen && (
                    <AsideModal
                        title="Alternate Daypart"
                        asideModalOpened
                        handleClose={() => closeAsideModal()}
                        musicTracker
                    >
                        <AsideModalPanels
                            featureName={FEATURES.ASSIGN_DAYPART}
                            handleClose={() => closeAsideModal()}
                            musicTrackerSong={song}
                            boardId={boardId}
                            bottomBarOpen={bottomBarOpen}
                            categoryOptions={categoryOptions}
                        />
                    </AsideModal>
                )}
            </div>
        );
    }
}

CategoryItem.propTypes = {
    boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    catChange: PropTypes.bool.isRequired,
    categoryHighlight: PropTypes.shape().isRequired,
    closeAsideModal: PropTypes.func.isRequired,
    dehighlightAction: PropTypes.func.isRequired,
    draggable: PropTypes.bool.isRequired,
    highlightAction: PropTypes.func.isRequired,
    multiSelect: PropTypes.bool.isRequired,
    openAsideModal: PropTypes.func.isRequired,
    saveDragSongs: PropTypes.func.isRequired,
    song: PropTypes.shape().isRequired,
    songVersions: PropTypes.shape().isRequired,
    togglePlanner: PropTypes.func.isRequired,
    asideModalSongId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottomBarOpen: PropTypes.bool,
    checkedSongs: PropTypes.arrayOf(PropTypes.shape()),
    ellipsisOpen: PropTypes.bool,
    limit: PropTypes.number,
    list: PropTypes.bool,
    outOfSync: PropTypes.bool,
    overLimit: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    toggleEllipsis: PropTypes.func,
    onCheckVersion: PropTypes.func,
};

CategoryItem.defaultProps = {
    asideModalSongId: undefined,
    checkedSongs: null,
    ellipsisOpen: false,
    list: false,
    toggleEllipsis: null,
    limit: 0,
    outOfSync: false,
    overLimit: 0 || false,
    onCheckVersion: null,
    bottomBarOpen: false,
};

export default CategoryItem;
