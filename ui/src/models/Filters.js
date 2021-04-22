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
    loadInitial(board, inputs, callback) {
        const promises = [];

        this.applied = {};
        this.available = {};
        this.saveable = [];

        if (board.type) {
            resolvers[board.type].forEach(resolver => {
                promises.push(resolver(board));
            });
        }

        Promise.all(promises).then(values => {
            values.forEach(({ applied, available, saveable }) => {
                this.applied = { ...this.applied, ...applied };
                this.available = { ...this.available, ...available };
                if (saveable !== undefined) {
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
        const { savedDate, resetDateIntegrity, isDateOrTabChanged } = inputs;
        if (savedDate && savedDate.persist) {
            const filter = savedDate.dateRange;
            if (filter) {
                const difference = getDiffInDaysFromObj(filter);
                // right now we support only weekly data for music tracker and playlist overview
                // so reset to last week when the days are more than a week.
                if (difference !== 7) {
                    if (board.tabId === 'musictracker' && board.meta && board.meta.latestBreakoutDate) {
                        this.applied.dateRange.startDate = moment
                            .utc(board.meta.latestBreakoutDate)
                            .day(0)
                            .format('YYYY-MM-DD');
                        this.applied.dateRange.endDate = moment
                            .utc(board.meta.latestBreakoutDate)
                            .day(6)
                            .format('YYYY-MM-DD');
                    } else if (board.tabId === 'playlist-overview' || board.tabId === 'musictracker') {
                        this.applied.dateRange.startDate = START;
                        this.applied.dateRange.endDate = END;
                    } else {
                        this.applied.dateRange.startDate = filter.startDate;
                        this.applied.dateRange.endDate = filter.endDate;
                    }
                } else if (
                    isDateOrTabChanged
                    && board.tabId === 'musictracker'
                    && board.meta
                    && board.meta.latestBreakoutDate
                ) {
                    // first time when music tracker is loaded
                    // load the page with latest breakout date.
                    this.applied.dateRange.startDate = moment
                        .utc(board.meta.latestBreakoutDate)
                        .day(0)
                        .format('YYYY-MM-DD');
                    this.applied.dateRange.endDate = moment
                        .utc(board.meta.latestBreakoutDate)
                        .day(6)
                        .format('YYYY-MM-DD');
                } else {
                    // if you navigate between radio board, song or artist
                    // board use the persisted date
                    this.applied.dateRange.startDate = filter.startDate;
                    this.applied.dateRange.endDate = filter.endDate;
                }
            }
        } else {
            if (resetDateIntegrity && this.applied.dateRange) {
                this.applied.dateRange.startDate = START;
                this.applied.dateRange.endDate = END;
            }

            if (!isDateOrTabChanged && board.tabId === 'musictracker' && board.meta && board.meta.latestBreakoutDate) {
                this.applied.dateRange.startDate = moment
                    .utc(board.meta.latestBreakoutDate)
                    .day(0)
                    .format('YYYY-MM-DD');
                this.applied.dateRange.endDate = moment
                    .utc(board.meta.latestBreakoutDate)
                    .day(6)
                    .format('YYYY-MM-DD');
            }
        }

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
    }

    filterSaveable(filters) {
        const saveable = {};

        // Compile list of saveable filter changes
        Object.keys(filters).forEach(filterKey => {
            if (this.saveable.indexOf(filterKey) > -1) {
                saveable[filterKey] = filters[filterKey];
            }
        });

        return saveable;
    }

    save(applied, callback) {
        this.applied = applied;
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
        const exclude = differenceWith(
            globalFilters[boardType].all,
            globalFilters[boardType][board.tabId] || globalFilters[boardType].defaultTab,
            isEqual,
        );

        const tabFilters = {};
        Object.keys(this.applied).forEach(key => {
            if (exclude.includes(key)) {
                return;
            }

            tabFilters[key] = this.applied[key];
        });

        return tabFilters;
    }
}

export default Filters;
