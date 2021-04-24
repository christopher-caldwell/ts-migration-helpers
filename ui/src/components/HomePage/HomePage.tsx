import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import LoadingIndicator from 'components/Utilities/LoadingIndicator';
import RadioBoard from 'components/HomePage/RadioBoard';
import RadioHeader from 'components/HomePage/RadioHeader';
import { getStations, setCurrentStation } from 'stores/stationInfo/stationInfoActions';
import { setTablePreferences } from 'stores/newPreferences/newPreferencesActions';
import { requestDateIntegrity, updateDateIntegrity } from 'stores/dateIntegrity/dateIntegrityActions';
import { updateBoardGroups } from 'stores/boardGroups/boardGroupsActions';
import updateRadioBoardFilters from 'stores/radioBoardFilters/radioBoardFiltersActions';
import BoardType from 'models/BoardType';
import If from 'components/Utilities/If';
import BoardPagination from './BoardPagination';

// Opposite of dominant color #e0b77c
const headerColor = '#273f57';
const boardTypes = { RadioBoard };
const headerTypes = { RadioBoard: RadioHeader };
const mapTypeToRoute = { RadioBoard: 'stations' };

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        // initialize the date integrity on the first load
        const { requestDateIntegrityAction } = props;
        requestDateIntegrityAction();

        const savedHomeFilters = props.radioBoardFilters.savedHomeFilters || {};
        const { filters } = savedHomeFilters;

        this.state = {
            sortMetric: 'name',
            filters,
        };

        this.onConfigSave = this.onConfigSave.bind(this);
        this.compareBoards = this.compareBoards.bind(this);
        this.handlePaginate = this.handlePaginate.bind(this);
        this.onFilterSave = this.onFilterSave.bind(this);
    }

    componentDidMount() {
        const {
            dateIntegrity: { persist },
            getStationsAction,
            setTablePreferencesAction,
        } = this.props;
        if (persist) {
            const { updateDateIntegrityAction } = this.props;
            updateDateIntegrityAction({ persist: false });
        }

        setTablePreferencesAction();
        getStationsAction();
    }

    onConfigSave(objectPath, boardConfig) {
        this.props.update(objectPath, boardConfig);
    }

    onFilterSave(filters, isSortFilter) {
        const { radioBoardFilters, getStationsAction } = this.props;
        const savedHomeFilters = radioBoardFilters.savedHomeFilters || {};
        const { size, page } = this.props;
        const options = {
            size,
            page: isSortFilter ? page : 1,
        };

        this.setState({ filters });

        const getStationOptions = {
            params: {
                options: JSON.stringify(options),
                filters: JSON.stringify(filters),
            },
        };
        getStationsAction(getStationOptions);

        savedHomeFilters.options = options;
        savedHomeFilters.filters = filters;

        this.props.updateRadioBoardFiltersAction({ savedHomeFilters });
    }

    compareBoards(a, b) {
        const metric = this.state.sortMetric;
        return a.summary[metric].localeCompare(b.summary[metric]);
    }

    handlePaginate(newPage) {
        const { getStationsAction, size } = this.props;
        const { filters } = this.state;
        const options = { size, page: newPage };
        const getStationOptions = {
            params: {
                options: JSON.stringify(options),
                filters: JSON.stringify(filters),
            },
        };
        getStationsAction(getStationOptions);
    }

    render() {
        const { data, retrieving, match, numPages, page, size, setCurrentStationAction } = this.props;
        const tabId = match.params.tabId || 'stations'; // default to radio view
        const boardGroups =
            data &&
            [data].map((section, boardGroupIndex) => {
                const route = mapTypeToRoute[section.type];
                if (route !== tabId) {
                    return null;
                }
                const Header = headerTypes[section.type];
                let sortedSection = {};

                if (section.type === 'RadioBoard') {
                    sortedSection = section.boards;
                } else {
                    sortedSection = section.boards.sort(this.compareBoards);
                }

                const boards = sortedSection.map((board, boardIndex) => {
                    const Board = boardTypes[board.type];
                    const objectPath = {
                        boardGroupIndex,
                        boardIndex,
                        boardId: board.id,
                        boardType: board.type,
                    };
                    const href = `/board/${BoardType.toKey(board.type)}/${board.id}`;

                    return (
                        <div key={shortid.generate()} className="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                            <Board
                                {...board}
                                objectPath={objectPath}
                                headerColor={headerColor}
                                href={href}
                                onConfigSave={this.onConfigSave}
                                setCurrentStation={setCurrentStationAction}
                            />
                        </div>
                    );
                });
                return (
                    <div className="home-boards" key={section.id}>
                        <h2 className="home-board-title">{section.name}</h2>
                        <Header onFilterSave={this.onFilterSave} filters={this.state.filters} />
                        <If test={retrieving}>
                            <LoadingIndicator className="loading-box" text="" />
                        </If>
                        <div className="row">{boards}</div>
                    </div>
                );
            });
        return (
            <section className="home-page">
                {boardGroups}
                <BoardPagination numPages={numPages} page={page} size={size} handlePaginate={this.handlePaginate} />
            </section>
        );
    }
}

HomePage.propTypes = {
    dateIntegrity: PropTypes.shape().isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    radioBoardFilters: PropTypes.shape().isRequired,
    requestDateIntegrityAction: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    updateDateIntegrityAction: PropTypes.func.isRequired,
    updateRadioBoardFiltersAction: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        boards: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                type: PropTypes.string,
                background: PropTypes.string,
                config: PropTypes.shape({
                    topMetric: PropTypes.string,
                    featuredMetric: PropTypes.string,
                }),
                metrics: PropTypes.shape({}),
            })
        ),
    }),
    numPages: PropTypes.number,
    page: PropTypes.number,
    retrieving: PropTypes.bool,
    size: PropTypes.number,
};

HomePage.defaultProps = {
    data: null,
    retrieving: false,
    numPages: null,
    page: null,
    size: null,
};

const mapStateToProps = state => {
    const stationInfo = state.stationInfo || {};
    const { data } = stationInfo;
    const paginationProps = {
        size: (data && data.size) || 0,
        page: (data && data.page) || 1,
        numPages: (data && data.numPages) || 1,
    };
    return {
        ...stationInfo,
        ...paginationProps,
        dateIntegrity: state.dateIntegrity,
        radioBoardFilters: state.radioBoardFilters,
    };
};

const mapDispatchToProps = {
    update: updateBoardGroups,
    updateRadioBoardFiltersAction: updateRadioBoardFilters,
    requestDateIntegrityAction: requestDateIntegrity,
    updateDateIntegrityAction: updateDateIntegrity,
    getStationsAction: getStations,
    setCurrentStationAction: setCurrentStation,
    setTablePreferencesAction: setTablePreferences,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
