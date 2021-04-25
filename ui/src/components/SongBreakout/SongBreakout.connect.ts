import { connect } from 'react-redux';
import { getSongDetails } from 'stores/breakout/breakoutActions';
import { getBreakoutPrefs, saveBreakoutPrefs } from 'stores/breakoutPreferences/breakoutPreferencesActions';
import SongBreakout from './SongBreakout.component';

const mapStateToProps = (
    {
        songs: { data: songs },

        breakout: {
            loading: dataLoading,
            data: { callout = {}, omt = {}, spins = {}, avatar },
        },

        breakoutPreferences: { byStation },

        boardDetails: {
            layout: {
                board: { id: stationId },
            },
        },

        cmmOmt: { data: omtData }
    }: any,
    {
        breakoutSongInfo: { selectedSongId, songIdList }
    }: any
) => ({
    songOrder: songIdList,
    selectedSongId,
    songs,
    dataLoading,
    callout,
    omt,
    spins,
    avatar,
    calloutPrefs: byStation[stationId] ? byStation[stationId].callout : [],
    omtPrefs: byStation[stationId] ? byStation[stationId].omt : [],
    omtData,
});

export default connect(mapStateToProps, { getSongDetails, getBreakoutPrefs, saveBreakoutPrefs })(SongBreakout);
