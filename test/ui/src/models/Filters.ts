import { differenceWith, isEqual } from 'lodash';
import moment from 'moment';
import { getDiffInDaysFromObj } from 'utils/DateFunctions';

const START = moment
    .utc()
    .subtract(1, 'weeks')
    .day(0)
    .format('YYYY-MM-DD');
const END = moment
    .utc()
    .subtract(1, 'weeks')
    .day(6)
    .format('YYYY-MM-DD');

// this is the default start and end date of any page rendered
const dateResolver = () => new Promise(resolve => {
    resolve({
        applied: {
            dateRange: {
                startDate: START,
                endDate: END,
                period: 'weekly',
                type: 'airplay',
            },
        },
    });
});

const radioOverview = () => new Promise(resolve => {
    resolve({
        applied: {
            overview: {
                gcr: 'current,recurrent',
                daypart: '6am7pm',
            },
        },
    });
});

const resolvers = {
    RadioBoard: [dateResolver, radioOverview],
    AdminBoard: [dateResolver],
};

const globalFilters = {
    RadioBoard: {
        all: ['dateRange'],
        defaultTab: ['dateRange'],
    },
    AdminBoard: {
        all: [],
        defaultTab: [],
    },
};

class Filters {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'available' does not exist on type 'Filte... Remove this comment to see the full error message
    loadInitial(board, inputs, callback) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveable' does not exist on type 'Filter... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'promises' implicitly has type 'any[]' in... Remove this comment to see the full error message
        const promises = [];

        // @ts-expect-error ts-migrate(7005) FIXME: Variable 'promises' implicitly has an 'any[]' type... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'available' does not exist on type 'Filte... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveable' does not exist on type 'Filter... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this.applied = {};
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'resolver' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7034) FIXME: Variable 'promises' implicitly has type 'any[]' in... Remove this comment to see the full error message
        this.available = {};
        this.saveable = [];

        if (board.type) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
            resolvers[board.type].forEach(resolver => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'available' does not exist on type 'Filte... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                promises.push(resolver(board));
            });
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
        Promise.all(promises).then(values => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7005) FIXME: Variable 'promises' implicitly has an 'any[]' type... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
            values.forEach(({ applied, available, saveable }) => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                this.applied = { ...this.applied, ...applied };
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                this.available = { ...this.available, ...available };
                if (saveable !== undefined) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    this.saveable = [...this.saveable, ...saveable];
                }
            });

            if (inputs) {
                const savedDate = this.checkDateIntegrity(board, inputs);
                callback(savedDate);
            }
        });
    }

    checkDateIntegrity(board, inputs) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        const { savedDate, resetDateIntegrity, isDateOrTabChanged } = inputs;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
        if (savedDate && savedDate.persist) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
            const filter = savedDate.dateRange;
            if (filter) {
                const difference = getDiffInDaysFromObj(filter);
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                // right now we support only weekly data for music tracker and playlist overview
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                // so reset to last week when the days are more than a week.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                if (difference !== 7) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    if (board.tabId === 'musictracker' && board.meta && board.meta.latestBreakoutDate) {
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        this.applied.dateRange.startDate = moment
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                            .utc(board.meta.latestBreakoutDate)
                            .day(0)
                            .format('YYYY-MM-DD');
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
                        this.applied.dateRange.endDate = moment
                            .utc(board.meta.latestBreakoutDate)
                            .day(6)
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveable' does not exist on type 'Filter... Remove this comment to see the full error message
                            .format('YYYY-MM-DD');
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    } else if (board.tabId === 'playlist-overview' || board.tabId === 'musictracker') {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'applied' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        this.applied.dateRange.startDate = START;
                        this.applied.dateRange.endDate = END;
                    } else {
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                        this.applied.dateRange.startDate = filter.startDate;
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        this.applied.dateRange.endDate = filter.endDate;
                    }
                } else if (
                    isDateOrTabChanged
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    && board.tabId === 'musictracker'
                    && board.meta
                    && board.meta.latestBreakoutDate
                ) {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    // first time when music tracker is loaded
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    // load the page with latest breakout date.
                    this.applied.dateRange.startDate = moment
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        .utc(board.meta.latestBreakoutDate)
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        .day(0)
                        .format('YYYY-MM-DD');
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    this.applied.dateRange.endDate = moment
                        .utc(board.meta.latestBreakoutDate)
                        .day(6)
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                        .format('YYYY-MM-DD');
                } else {
                    // if you navigate between radio board, song or artist
                    // board use the persisted date
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
                    this.applied.dateRange.startDate = filter.startDate;
                    this.applied.dateRange.endDate = filter.endDate;
                }
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
            if (resetDateIntegrity && this.applied.dateRange) {
                this.applied.dateRange.startDate = START;
                this.applied.dateRange.endDate = END;
            }

            if (!isDateOrTabChanged && board.tabId === 'musictracker' && board.meta && board.meta.latestBreakoutDate) {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
                this.applied.dateRange.startDate = moment
                    .utc(board.meta.latestBreakoutDate)
                    .day(0)
                    .format('YYYY-MM-DD');
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveable' does not exist on type 'Filter... Remove this comment to see the full error message
                this.applied.dateRange.endDate = moment
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    .utc(board.meta.latestBreakoutDate)
                    .day(6)
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'applied' implicitly has an 'any' type.
                    .format('YYYY-MM-DD');
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'callback' implicitly has an 'any' type.
            }
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
        const { dateRange } = this.applied;
        const savedDateObj = {
            savedDate: {
                filter: {
                    dateRange,
                },
                persist: false,
                updating: false,
            },
        };
        return savedDateObj;
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
    }

    filterSaveable(filters) {
        const saveable = {};

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filters' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // Compile list of saveable filter changes
        Object.keys(filters).forEach(filterKey => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'applied' does not exist on type 'Filters... Remove this comment to see the full error message
            if (this.saveable.indexOf(filterKey) > -1) {
                saveable[filterKey] = filters[filterKey];
            }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        });

        return saveable;
    }

    save(applied, callback) {
        this.applied = applied;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'applied' implicitly has an 'any' type.
        callback();
    }

    /**
     * Return filter applied to this tab. Removes any global filters that do
     * not affect its tabs, but does not touch an panel-specific filters.
     *
     * @param {string} tab
     *
     * @returns {Object}
     */
    getTabFilters(board) {
        const boardType = board.type;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'board' implicitly has an 'any' type.
        const exclude = differenceWith(
            globalFilters[boardType].all,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            globalFilters[boardType][board.tabId] || globalFilters[boardType].defaultTab,
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            isEqual,
        );

        const tabFilters = {};
        Object.keys(this.applied).forEach(key => {
            if (exclude.includes(key)) {
                return;
            }

            tabFilters[key] = this.applied[key];
        });

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return tabFilters;
    }
}

export default Filters;
