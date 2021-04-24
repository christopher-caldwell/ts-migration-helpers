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
    shouldComponentUpdate(nextProps) {
        const { featureName: featureNameNext, packet: packetNext } = nextProps;
        const { featureName, packet } = this.props;

        return featureName !== featureNameNext || packet !== packetNext;
    }

    render() {
        const {
            featureName,
            handleClose,
            versions,
            packet,
            restriction,
            musicTrackerSong, // used to show different modal when inside MT
            boardId,
            bottomBarOpen,
            daypart,
            dayparts,
            selectedHours,
            categoryOptions,
            categoriesList,
            permissions,
        } = this.props;
        return (
            <div className="modal-content-container">
                {featureName === FEATURES.HOUR_RESTRICTION && musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <RestrictionSingleSong
                            handleClose={handleClose}
                            selectedSong={musicTrackerSong}
                            boardId={boardId}
                            bottomBarOpen={musicTrackerSong && bottomBarOpen}
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.HOUR_RESTRICTION && !musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <RestrictionSongsList
                            handleClose={handleClose}
                            versions={versions}
                            restriction={restriction}
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.PACKET_SONG && musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <PacketSingleSong
                            handleClose={handleClose}
                            selectedSong={musicTrackerSong}
                            bottomBarOpen={musicTrackerSong && bottomBarOpen}
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.PACKET_SONG && !musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <PacketSongsList
                            handleClose={handleClose}
                            versions={versions}
                            packet={packet}
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.ASSIGN_DAYPART && musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <DaypartSingleSong
                            handleClose={handleClose}
                            selectedSong={musicTrackerSong}
                            bottomBarOpen={musicTrackerSong && bottomBarOpen}
                            categoryOptions={categoryOptions}
                            boardId={boardId}
                            stationCategoriesPermissions={permissions}
                        />
                    </FeatureToggle>
                )}
                {featureName === FEATURES.ALTERNATE_CATEGORY && !musicTrackerSong && (
                    <FeatureToggle featureName={featureName}>
                        <DaypartSongsList
                            handleClose={handleClose}
                            versions={versions}
                            daypart={daypart}
                            categoriesList={categoriesList}
                            stationCategoriesPermissions={permissions}
                        />
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
