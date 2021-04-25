import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeatureToggle from 'components/FeatureToggle';
import { FEATURES } from 'utils/constants';
import AssignDaypart from './AssignDaypart';
import PacketSongsList from './PacketSongsList';
import PacketSingleSong from './PacketSingleSong';
import RestrictionSongsList from './RestrictionSongsList';
import RestrictionSingleSong from './RestrictionSingleSong';
import DaypartSingleSong from './DaypartSingleSong';
import DaypartSongsList from './DaypartSongsList';

class AsideModalPanels extends Component {
    // Upate the asideModal when it is opened and the user select another packet option.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type 'Rea... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
    shouldComponentUpdate(nextProps) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'versions' does not exist on type 'Readon... Remove this comment to see the full error message
        const { featureName: featureNameNext, packet: packetNext } = nextProps;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type 'Rea... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type 'Rea... Remove this comment to see the full error message
        const { featureName, packet } = this.props;

        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; board... Remove this comment to see the full error message
        return featureName !== featureNameNext || packet !== packetNext;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dayparts' does not exist on type 'Readon... Remove this comment to see the full error message
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedHours' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'featureName' does not exist on type 'Rea... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; restricti... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleClose' does not exist on type 'Rea... Remove this comment to see the full error message
            featureName,
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; board... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; botto... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'packet' does not exist on type 'Readonly... Remove this comment to see the full error message
            handleClose,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'musicTrackerSong' does not exist on type... Remove this comment to see the full error message
            versions,
            packet,
            restriction,
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; packet: a... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'boardId' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; restricti... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            musicTrackerSong, // used to show different modal when inside MT
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoriesList' does not exist on type '... Remove this comment to see the full error message
            boardId,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'permissions' does not exist on type 'Rea... Remove this comment to see the full error message
            bottomBarOpen,
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; botto... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            daypart,
            dayparts,
            selectedHours,
            categoryOptions,
            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; botto... Remove this comment to see the full error message
            categoriesList,
            permissions,
        } = this.props;
        return (
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; board... Remove this comment to see the full error message
            <div className="modal-content-container">
                {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message */}
                {featureName === FEATURES.HOUR_RESTRICTION && musicTrackerSong && (
                    // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                    <FeatureToggle featureName={featureName}>
                        <RestrictionSingleSong
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; packet: a... Remove this comment to see the full error message
                            handleClose={handleClose}
                            selectedSong={musicTrackerSong}
                            boardId={boardId}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; restricti... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            bottomBarOpen={musicTrackerSong && bottomBarOpen}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.HOUR_RESTRICTION && !musicTrackerSong && (
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; botto... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; botto... Remove this comment to see the full error message
                    <FeatureToggle featureName={featureName}>
                        <RestrictionSongsList
                            handleClose={handleClose}
                            versions={versions}
                            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                            restriction={restriction}
                            stationCategoriesPermissions={permissions}
                        />
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; daypart: ... Remove this comment to see the full error message */}
                    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; packet: a... Remove this comment to see the full error message */}
                    </FeatureToggle>
                )}
                {featureName === FEATURES.PACKET_SONG && musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <PacketSingleSong
                            // @ts-expect-error ts-migrate(2741) FIXME: Property 'features' is missing in type '{ children... Remove this comment to see the full error message
                            handleClose={handleClose}
                            selectedSong={musicTrackerSong}
                            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; selectedSong: any; botto... Remove this comment to see the full error message
                            bottomBarOpen={musicTrackerSong && bottomBarOpen}
                            stationCategoriesPermissions={permissions}
                        />
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message */}
                    </FeatureToggle>
                )}
                {featureName === FEATURES.PACKET_SONG && !musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ handleClose: any; versions: any; daypart: ... Remove this comment to see the full error message */}
                        {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                        <PacketSongsList
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            handleClose={handleClose}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            versions={versions}
                            packet={packet}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            stationCategoriesPermissions={permissions}
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.ASSIGN_DAYPART && musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <DaypartSingleSong
                            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
                            handleClose={handleClose}
                            selectedSong={musicTrackerSong}
                            bottomBarOpen={musicTrackerSong && bottomBarOpen}
                            categoryOptions={categoryOptions}
                            boardId={boardId}
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            stationCategoriesPermissions={permissions}
                        />
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    </FeatureToggle>
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                )}
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                {featureName === FEATURES.ALTERNATE_CATEGORY && !musicTrackerSong && (
                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                    <FeatureToggle featureName={featureName}>
                        <DaypartSongsList
                            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                            handleClose={handleClose}
                            versions={versions}
                            daypart={daypart}
                            categoriesList={categoriesList}
                            stationCategoriesPermissions={permissions}
                        />
                    {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type. */}
                    </FeatureToggle>
                )}
                {featureName === FEATURES.ASSIGN_DAYPART && !musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <AssignDaypart
                            handleClose={handleClose}
                            dayparts={dayparts}
                            selectedHours={selectedHours}
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
            </div>
        );
    }
}

AsideModalPanels.propTypes = {
    featureName: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    boardId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    bottomBarOpen: PropTypes.bool,
    categoriesList: PropTypes.arrayOf(PropTypes.object),
    daypart: PropTypes.shape(),
    dayparts: PropTypes.arrayOf(PropTypes.object),
    musicTrackerSong: PropTypes.shape(),
    packet: PropTypes.shape(),
    restriction: PropTypes.shape(),
    restrictions: PropTypes.arrayOf(PropTypes.shape()),
    selectedHours: PropTypes.arrayOf(PropTypes.number),
    versions: PropTypes.arrayOf(PropTypes.shape()),
};

AsideModalPanels.defaultProps = {
    boardId: undefined,
    musicTrackerSong: undefined,
    packet: {},
    restrictions: [],
    restriction: {},
    versions: undefined,
    bottomBarOpen: false,
    dayparts: [],
    daypart: {},
    selectedHours: [],
    categoriesList: [],
};

const mapStateToProps = state => ({
    songVersions: state.songVersions,
    restrictions: state.restrictions.data,
    stationCategoriesPermissions: state.stationCategoriesPermissions,
});

export default connect(mapStateToProps)(AsideModalPanels);
