import { connect } from 'react-redux';

import SongInfo from './SongInfo.component';

const mapStateToProps = ({
    songMetadata: { songs },

    newPreferences: {
        tablePreferences: {
            columns: { songInfo },
        },
    }
}: any) => ({
    songMetadata: songs,
    columnKeys: songInfo,
});

export default connect(mapStateToProps)(SongInfo);
