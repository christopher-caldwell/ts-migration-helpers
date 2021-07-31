import { connect } from 'react-redux';

import { getSongMetadata } from 'stores/songMetadata/songMetadataActions';
import { getCalloutData } from 'stores/cmm/cmmActions';
import { setTablePreferences } from 'stores/newPreferences/newPreferencesActions';
import Table from './Table.component';

const mapStateToProps = ({
    songMetadata: { musicTrackerList },

    newPreferences: {
        tablePreferences: { columnGroups = [] },
    }
}: any) => ({
    musicTrackerList,
    preferenceColGroups: columnGroups,
});

const mapDispatchToProps = { getSongMetadata, getCalloutData, setTablePreferences };

export default connect(mapStateToProps, mapDispatchToProps)(Table);
