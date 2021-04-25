import { connect } from 'react-redux';

import { getCalloutData, getCalloutTrends } from 'stores/cmm/cmmActions';
import Callout from './Callout.component';

const mapStateToProps = ({
    newPreferences: {
        tablePreferences: {
            columns: { callout },
        },
    },

    cmmCallout,
    cmmCalloutTrends
}: any) => ({
    columnKeys: callout,
    loading: cmmCallout.loading || cmmCalloutTrends.loading,
    cmmCalloutData: cmmCallout,
});

const mapDispatchToProps = {
    getCalloutDataAction: getCalloutData,
    getCalloutTrendsAction: getCalloutTrends,
};

export default connect(mapStateToProps, mapDispatchToProps)(Callout);
