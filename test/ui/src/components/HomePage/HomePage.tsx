import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
import BoardPagination from './BoardPagination';

// Opposite of dominant color #e0b77c
const headerColor = '#273f57';
const boardTypes = { RadioBoard };
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
const headerTypes = { RadioBoard: RadioHeader };
const mapTypeToRoute = { RadioBoard: 'stations' };

class HomePage extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        // initialize the date integrity on the first load
        const { requestDateIntegrityAction } = props;
        requestDateIntegrityAction();

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type 'R... Remove this comment to see the full error message
        const savedHomeFilters = props.radioBoardFilters.savedHomeFilters || {};
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setTablePreferencesAction' does not exis... Remove this comment to see the full error message
        const { filters } = savedHomeFilters;

        this.state = {
            sortMetric: 'name',
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
            filters,
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'objectPath' implicitly has an 'any' typ... Remove this comment to see the full error message
        this.onConfigSave = this.onConfigSave.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'Readonly... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStationsAction' does not exist on typ... Remove this comment to see the full error message
        this.compareBoards = this.compareBoards.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setTablePreferencesAction' does not exis... Remove this comment to see the full error message
        this.handlePaginate = this.handlePaginate.bind(this);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        this.onFilterSave = this.onFilterSave.bind(this);
    }

    componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateRadioBoardFiltersAction' does not ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'objectPath' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'b' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateIntegrity' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStationsAction' does not exist on typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardConfig' implicitly has an 'any' ty... Remove this comment to see the full error message
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'Readonly... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStationsAction' does not exist on typ... Remove this comment to see the full error message
            dateIntegrity: { persist },
            getStationsAction,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            setTablePreferencesAction,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'page' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateDateIntegrityAction' does not exis... Remove this comment to see the full error message
        } = this.props;
        if (persist) {
            const { updateDateIntegrityAction } = this.props;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
            updateDateIntegrityAction({ persist: false });
        }

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'objectPath' implicitly has an 'any' typ... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateRadioBoardFiltersAction' does not ... Remove this comment to see the full error message
        setTablePreferencesAction();
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'boardConfig' implicitly has an 'any' ty... Remove this comment to see the full error message
        getStationsAction();
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newPage' implicitly has an 'any' type.
    onConfigSave(objectPath, boardConfig) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
        this.props.update(objectPath, boardConfig);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'radioBoardFilters' does not exist on typ... Remove this comment to see the full error message
    onFilterSave(filters, isSortFilter) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { radioBoardFilters, getStationsAction } = this.props;
        // @ts-expect-error ts-migrate(2786) FIXME: 'BoardPagination' cannot be used as a JSX componen... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const savedHomeFilters = radioBoardFilters.savedHomeFilters || {};
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const { size, page } = this.props;
        const options = {
            size,
            page: isSortFilter ? page : 1,
        };

        this.setState({ filters });

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const getStationOptions = {
            params: {
                options: JSON.stringify(options),
                filters: JSON.stringify(filters),
            },
        };
        getStationsAction(getStationOptions);

        savedHomeFilters.options = options;
        savedHomeFilters.filters = filters;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        this.props.updateRadioBoardFiltersAction({ savedHomeFilters });
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
    compareBoards(a, b) {
        const metric = this.state.sortMetric;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'newPage' implicitly has an 'any' type.
        return a.summary[metric].localeCompare(b.summary[metric]);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStationsAction' does not exist on typ... Remove this comment to see the full error message
    handlePaginate(newPage) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type 'Readonly<{... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'filters' does not exist on type 'Readonl... Remove this comment to see the full error message

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'retrieving' does not exist on type 'Read... Remove this comment to see the full error message
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'numPages' does not exist on type 'Readon... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2786) FIXME: 'BoardPagination' cannot be used as a JSX componen... Remove this comment to see the full error message
        const { data, retrieving, match, numPages, page, size, setCurrentStationAction } = this.props;
        const tabId = match.params.tabId || 'stations'; // default to radio view
        const boardGroups =
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
            data &&
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            [data].map((section, boardGroupIndex) => {
                const route = mapTypeToRoute[section.type];
                if (route !== tabId) {
                    return null;
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                }
                const Header = headerTypes[section.type];
                let sortedSection = {};

                if (section.type === 'RadioBoard') {
                    sortedSection = section.boards;
                } else {
                    sortedSection = section.boards.sort(this.compareBoards);
                }

                // @ts-expect-error ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
                const boards = sortedSection.map((board, boardIndex) => {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
                        {/* @ts-expect-error ts-migrate(2786) FIXME: 'BoardPagination' cannot be used as a JSX componen... Remove this comment to see the full error message */}
                        <If test={retrieving}>
                            <LoadingIndicator className="loading-box" text="" />
                        </If>
                        <div className="row">{boards}</div>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
                    </div>
                );
            });
        return (
            <section className="home-page">
                {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0. */}
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
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
