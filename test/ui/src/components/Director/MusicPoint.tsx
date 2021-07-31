// ------------------------- needed when director is developed again
// import React, { Component } from 'react';
// import orderBy from 'lodash/orderBy';
// import PropTypes from 'prop-types';
// import connect from 'react-redux/lib/connect/connect';
// import { SecureRoute } from '@okta/okta-react';
// import { fetchDirectorStations } from 'stores/stationInfo/stationInfoActions';
// import { fetchFormats, fetchMarkets } from 'stores/lookupTables/lookupTablesActions';
// import { getMusicpointSongs } from 'stores/songs/songsActions';
// import BackButton from 'components/Buttons/BackButton';
// import StepBar from 'components/StepBar';
// import history from '../../history';
// import SongOverview from './Contents/SongOverview';
// import SelectStations from './Contents/SelectStations';
// import ReconcileSongs from './Contents/ReconcileSongs';

// class MusicPoint extends Component {
//     constructor(props) {
//         super(props);

//         if (history.location.pathname !== '/director/music-point') {
//             this.goTo('/director/music-point');
//         }

//         this.state = {
//             checkedStations: [],
//             filteredFormats: [],
//             filteredMarkets: [],
//             searchString: '',
//             orderedStations: {
//                 field: 'nielsen_rank',
//                 ascending: true,
//             },
//             selectedSong: null,
//         };
//     }

//     componentDidMount() {
//         this.props.getMusicpointSongsAction();
//         this.props.fetchDirectorStations(this.props.userId, {
//             formats: [],
//             markets: [],
//         });
//         this.props.fetchFormats({
//             params: {
//                 options: JSON.stringify({
//                     fields: ['format_name', 'format_id'],
//                     order: 'format_name',
//                 }),
//             },
//         });
//         this.props.fetchMarkets({
//             params: {
//                 options: JSON.stringify({
//                     fields: ['market_name', 'market_id'],
//                     order: 'market_name',
//                 }),
//             },
//         });
//     }

//     handleChecked = station => {
//         const { checkedStations } = this.state;
//         if (station.checked) {
//             return this.setState({
//                 checkedStations: [...checkedStations, { ...station, summary: { ...station.summary } }],
//             });
//         }
//         return this.setState({
//             checkedStations: checkedStations.filter(item => item.id !== station.id),
//         });
//     };

//     onCancel = () => {
//         this.setState({
//             checkedStations: [],
//             filteredFormats: [],
//             filteredMarkets: [],
//             searchString: '',
//             orderedStations: {
//                 field: 'nielsen_rank',
//                 ascending: true,
//             },
//             selectedSong: null,
//         });
//         this.goTo('/director/music-point');
//     };

//     onClear = () => {
//         this.setState({
//             checkedStations: [],
//         });
//     };

//     toggleSelection = () => {
//         const { stations } = this.props;
//         const { checkedStations } = this.state;
//         if (stations.length !== checkedStations.length) {
//             const selectAllStations = stations.map(station => ({
//                 id: station.id,
//             }));

//             this.setState({
//                 checkedStations: selectAllStations,
//             });
//         } else {
//             this.onClear();
//         }
//     };

//     handleStationFilter = newFilters => {
//         this.setState({
//             filteredFormats: newFilters.filteredFormats,
//             filteredMarkets: newFilters.filteredMarkets,
//             orderedStations: newFilters.orderedStations,
//             searchString: newFilters.searchString,
//         });
//     };

//     findInFormats = currentStation => {
//         let result = true;
//         if (this.state.filteredFormats.length) {
//             result = this.state.filteredFormats.some(
//                 currentFormat => currentFormat.value === currentStation.summary.format_id
//             );
//         }
//         return result;
//     };

//     findInMarkets = currentStation => {
//         let result = true;
//         if (this.state.filteredMarkets.length) {
//             result = this.state.filteredMarkets.some(
//                 currentMarket => currentMarket.value === currentStation.summary.market_id
//             );
//         }
//         return result;
//     };

//     filterStations = stations => {
//         // stations that were filtered must be removed from the array
//         let filteredStations = stations;
//         const { filteredFormats, filteredMarkets, searchString } = this.state;
//         if (filteredFormats.length || filteredMarkets.length || searchString !== '') {
//             filteredStations = stations.filter(
//                 currentStation =>
//                     this.findInFormats(currentStation) &&
//                     this.findInMarkets(currentStation) &&
//                     this.validateSearch(currentStation, searchString)
//             );
//         }

//         return this.sortStations(filteredStations);
//     };

//     validateSearch = (station, searchString) =>
//         station.summary.call_letters.toLowerCase().includes(searchString.toLowerCase()) ||
//         station.summary.name.toLowerCase().includes(searchString.toLowerCase());

//     sortStations = stations => {
//         const {
//             orderedStations: { field, ascending },
//         } = this.state;
//         const sortOrder = ascending ? 'asc' : 'desc';

//         return orderBy(stations, item => item.summary[field], [sortOrder]);
//     };

//     onSelectedSong = song => {
//         this.setState({
//             selectedSong: song,
//         });
//     };

//     goTo = path => {
//         history.push(path);
//     };

//     buildHeader = (activeStep, path) => (
//         <div className="director__header">
//             <div className="director__step-bar">
//                 <BackButton className="back-button-director" path={path} />
//                 <StepBar
//                    steps={[{ title: 'Select Stations' }, { title: 'Reconcile Songs' }]}
//                    activeStep={activeStep}
//                 />
//             </div>
//         </div>
//     );

//     render() {
//         const {
//             checkedStations,
//             filteredFormats,
//             filteredMarkets,
//             orderedStations,
//             searchString,
//             selectedSong,
//         } = this.state;
//         const { stations, formatsList, marketsList, songs } = this.props;

//         const savedSelectedSong = songs.find(song => song.number === selectedSong);

//         return (
//             <section className="director">
//                 <SecureRoute
//                     exact
//                     path="/director/music-point"
//                     render={() => <SongOverview selectSong={this.onSelectedSong} />}
//                 />
//                 <SecureRoute
//                     exact
//                     path="/director/music-point/station"
//                     render={() => (
//                         <div className="director__steps">
//                             {this.buildHeader(0, '/director/music-point')}
//                             <SelectStations
//                                 handleChecked={this.handleChecked}
//                                 stations={this.filterStations(stations)}
//                                 checkedStations={checkedStations}
//                                 toggleSelection={this.toggleSelection}
//                                 formatsList={formatsList}
//                                 marketsList={marketsList}
//                                 handleStationFilter={this.handleStationFilter}
//                                 filteredFormats={filteredFormats}
//                                 filteredMarkets={filteredMarkets}
//                                 orderedStations={orderedStations}
//                                 selectedSong={savedSelectedSong}
//                                 searchString={searchString}
//                             />
//                             {/* <BottomBarActions
//                                 opened
//                                 cancelText="Cancel"
//                                 executeText="Next"
//                                 onCancel={() => this.onCancel()}
//                                 onExecute={() => this.goTo('/director/music-point/reconcile')}
//                                 disabled={checkedStations.length === 0}
//                                 content={
//                                     <DirectorBottomBarActions
//                                         count={checkedStations.length}
//                                         onClear={() => this.onClear()}
//                                     />
//                                 }
//                             /> */}
//                         </div>
//                     )}
//                 />
//                 <SecureRoute
//                     exact
//                     path="/director/music-point/reconcile"
//                     render={() => (
//                         <div className="director__steps">
//                             {this.buildHeader(1, '/director/music-point/station')}
//                             <ReconcileSongs />
//                         </div>
//                     )}
//                 />
//             </section>
//         );
//     }
// }

// MusicPoint.propTypes = {
//     fetchDirectorStations: PropTypes.func.isRequired,
//     fetchFormats: PropTypes.func.isRequired,
//     fetchMarkets: PropTypes.func.isRequired,
//     formatsList: PropTypes.arrayOf(
//         PropTypes.shape({
//             label: PropTypes.string.isRequired,
//             value: PropTypes.number.isRequired,
//         })
//     ).isRequired,
//     getMusicpointSongsAction: PropTypes.func.isRequired,
//     marketsList: PropTypes.arrayOf(
//         PropTypes.shape({
//             label: PropTypes.string,
//             value: PropTypes.number,
//         })
//     ).isRequired,
//     songs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
//     stations: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             summary: PropTypes.shape({
//                 name: PropTypes.string.isRequired,
//                 call_letters: PropTypes.string.isRequired,
//                 image_url: PropTypes.string.isRequired,
//                 location: PropTypes.string.isRequired,
//                 owner: PropTypes.string.isRequired,
//                 market_id: PropTypes.number.isRequired,
//                 format_id: PropTypes.number.isRequired,
//             }),
//         })
//     ).isRequired,
//     userId: PropTypes.string.isRequired,
// };

// const mapStateToProps = ({ stationInfo, lookupTables, songs, user }) => ({
//     songs: songs.data,
//     stations: stationInfo.data.boards || [],
//     formatsList: lookupTables.formats,
//     marketsList: lookupTables.markets,
//     userId: user.id,
// });

// const mapDispatchToProps = {
//     fetchDirectorStations,
//     fetchFormats,
//     fetchMarkets,
//     getMusicpointSongsAction: getMusicpointSongs,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MusicPoint);
