import { connect } from 'react-redux';
import { getHostInformation } from 'stores/hostInformation/hostInformationActions';
import { getBox } from 'stores/box/boxActions';
import utils from 'components/BoardPage/Panels/RadioPanels/MusicTracker/utils';
import StationHeader from './StationHeader.component';

const mapStateToProps = ({
    hostInfo,
    box,
    songVersions,
    restrictions,
    dayparts,
    lookupTables,
}) => ({
    hostInfo,
    closedBox: box.closed,
    closedBoxIsClosed: box.closed.closed,
    closedBoxTemplates: box.closed.templates,
    stagedVersions: songVersions.data.staged || {},
    lengthOfStagedSongsArray: utils.flatVersions(songVersions.data.staged || {}).length,
    lengthOfstagedRestrictionsArray: restrictions.staged.length,
    lengthOfstagedDaypartsArray: dayparts.staged.length,
    lookupTables,
});

const mapDispatchToProps = { getHostInformationAction: getHostInformation, getBoxAction: getBox };

export default connect(mapStateToProps, mapDispatchToProps)(StationHeader);
