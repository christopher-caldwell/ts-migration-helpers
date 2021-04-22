import { connect } from 'react-redux';

import SearchArtistsSongs from './SearchArtistsSongs.component.js';

// Grabbing the song object from the songMedata store
const mapStateToProps = ({ songMetadata: { songs, musicTrackerList } }) => ({ songs, musicTrackerList });

export default connect(mapStateToProps)(SearchArtistsSongs);
