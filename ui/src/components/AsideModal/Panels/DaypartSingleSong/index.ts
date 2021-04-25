import { connect } from 'react-redux';

import { updateSongsAlternateCategory } from 'stores/dayparts/daypartsActions';
import DaypartSingleSong from './component';

const mapStateToProps = ({
    dayparts: { data }
}: any) => ({
    dayparts: data.map(({
        id,
        name,
        synchronized
    }: any) => ({
        id,
        name,
        synchronized,
    })),
});

const mapDispatchToProps = {
    updateSongsAlternateCategoryAction: updateSongsAlternateCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(DaypartSingleSong);
