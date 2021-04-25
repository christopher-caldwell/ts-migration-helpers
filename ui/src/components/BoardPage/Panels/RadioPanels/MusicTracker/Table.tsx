import React from 'react';

import PropTypes from 'prop-types';
import { isEqual, isUndefined } from 'lodash';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'clas... Remove this comment to see the full error message
import classNames from 'classnames';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import Dimensions from 'react-dimensions';
import { Table as FixedTable, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
import shortid from 'shortid';

import HeaderButton from 'components/BoardPage/Panels/RadioPanels/MusicTracker/HeaderButton';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
import { getSortedData, getDefaultSortData } from 'utils/SortFunctions';
import objectGet from 'utils/objectGet';
import TextCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TextCell';

// TODO: change this back to existing makeColumnMap after playlist overview matches musictracker
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
const makeColumnMap = ({ data, callLetter }) => ({
    playlistSongInformation: {
        name: 'Song Information',
        columns: {
            title: {
                header: 'Title',
                cell: <TextCell data={data} />,
                width: 90,
                flexGrow: 4,
            },
            artist: {
                header: 'Artist',
                cell: <TextCell data={data} />,
                width: 90,
                flexGrow: 4,
            },
            label: {
                header: 'Label',
                cell: <TextCell data={data} />,
                width: 80,
                flexGrow: 4,
            },
        },
    },
    mediabase: {
        name: 'Mediabase',
        columns: {
            'mediabase.spins.totalAudience': {
                header: 'Total Audience Spins',
                cell: <TextCell data={data} />,
                width: 70,
                flexGrow: 1,
            },
            'mediabase.spins.current': {
                header: 'TW',
                cell: <TextCell data={data} />,
                width: 50,
                flexGrow: 1,
            },
            'mediabase.spins.previous': {
                header: 'LW',
                cell: <TextCell data={data} />,
                width: 50,
                flexGrow: 1,
            },
            'mediabase.spins.historical': {
                header: 'Hist. Spins',
                cell: <TextCell data={data} />,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.marketPercent': {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Table'.
                header: `${callLetter} % Share`,
                cell: <TextCell data={data} />,
                width: 55,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
                flexGrow: 1,
            },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
            'mediabase.spins.market': {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                header: 'Market Spins',
                cell: <TextCell data={data} />,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Table'.
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.6am7pm': {
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
                header: '6AM - 7PM Spins',
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerHeight' does not exist on type ... Remove this comment to see the full error message
                cell: <TextCell data={data} />,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultHeight' does not exist on type 'R... Remove this comment to see the full error message
                width: 55,
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                flexGrow: 1,
            },
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
        },
    },
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'column' implicitly has an 'any' type.
});

// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnOrder' implicitly has an 'any' ty... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Table'.
class Table extends React.Component {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    constructor(props) {
        super(props);

        this.state = {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'callLetter' does not exist on type 'Read... Remove this comment to see the full error message
            sort: props.defaultSort,
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Table'.
        };

        this.id = shortid.generate();
        this.onSortChange = this.onSortChange.bind(this);
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerHeight' does not exist on type ... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'nextProps' implicitly has an 'any' type... Remove this comment to see the full error message
    shouldComponentUpdate(nextProps, nextState) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
        return !isEqual(this.props, nextProps) || !isEqual(this.state.sort, nextState.sort);
    }

    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnOrder' implicitly has an 'any' ty... Remove this comment to see the full error message
    onSortChange(columnKey, column) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sort' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { sort } = this.state;

        if (sort.key === null || sort.key !== columnKey) {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
            this.setState({
                sort: {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Table'.
                    key: columnKey,
                    sortValueExtractor: column.sortValueExtractor,
                    ascending: true,
                },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerWidth' does not exist on type '... Remove this comment to see the full error message
            });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultHeight' does not exist on type 'R... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'callLetter' does not exist on type 'Read... Remove this comment to see the full error message
        } else {
            this.setState({
                sort: {
                    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
                    ...sort,
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    ascending: !sort.ascending,
                },
            });
        }
    }

    getContainerHeight() {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerHeight' does not exist on type ... Remove this comment to see the full error message
        const { containerHeight, defaultHeight } = this.props;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
        return containerHeight > defaultHeight ? containerHeight : defaultHeight;
    }

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
    getMinWidthRemaining = (group, { columns, minWidth }) => {
        if (minWidth === undefined) return 0;

        const usedWidth = group.columns.reduce((sum, key) => {
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
            const width = columns[key] ? columns[key].width : 0;
            return sum + width;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        }, 0);

        return minWidth - usedWidth;
    };

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songData' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'songs' implicitly has an 'any' ty... Remove this comment to see the full error message
    renderColumnGroups({ songs, ...station }, columnOrder) {
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnOrder' implicitly has an 'any' ty... Remove this comment to see the full error message
        const { sort } = this.state;
        const self = this;
        let data = songs;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'item' implicitly has an 'any' type.
        data = data.map(item => getDefaultSortData(sort, item));
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Table'.
        self.data = data.sort((a, b) => getSortedData(sort, a, b));
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
        const columnMap = makeColumnMap({
            ...station,
            data,
            callLetter: this.props.callLetter,
            ...this.props,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerWidth' does not exist on type '... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'callLetter' does not exist on type 'Read... Remove this comment to see the full error message
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultHeight' does not exist on type 'R... Remove this comment to see the full error message
        return columnOrder.map(group => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type 'Readonl... Remove this comment to see the full error message
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'group' implicitly has an 'any' type.
            const groupSpec = columnMap[group.key];
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const minWidthRemaining = this.getMinWidthRemaining(group, groupSpec);
            const cellWidths = group.columns.reduce(
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'sum' implicitly has an 'any' type.
                (sum, key) => sum + groupSpec.columns[key].width,
                0
            );
            const { noGroup } = group;

            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'columnKey' implicitly has an 'any' type... Remove this comment to see the full error message
            const columns = group.columns.map((columnKey, index) => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
                const column = groupSpec.columns[columnKey];
                const cellClass = classNames({
                    'fixed-data-table-cell-border': index === group.columns.length - 1,
                });
                const cell = React.cloneElement(column.cell, {
                    className: cellClass,
                });
                const header = (
                    <Cell className={cellClass}>
                        <HeaderButton
                            column={column}
                            columnKey={columnKey}
                            sort={sort}
                            onClick={this.onSortChange}
                        />
                    </Cell>
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
                );
                const widthRatio = groupSpec.minWidth > 0 ? column.width / cellWidths : 0;
                // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songData' implicitly has an 'any' type.
                const extraWidth = minWidthRemaining > 0 ? widthRatio * minWidthRemaining : 0;

                return (
                    <Column
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
                        key={columnKey}
                        cell={cell}
                        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
                        columnKey={column.key || columnKey}
                        fixed={group.fixed}
                        header={header}
                        width={column.width + extraWidth}
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containerWidth' does not exist on type '... Remove this comment to see the full error message
                        flexGrow={column.flexGrow}
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'station' does not exist on type 'Readonl... Remove this comment to see the full error message
                    />
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'useContainerHeight' does not exist on ty... Remove this comment to see the full error message
                );
            });

            const header = !isUndefined(groupSpec.render) ? groupSpec.render() : groupSpec.name;

            return noGroup ? (
                columns
            ) : (
                <ColumnGroup key={group.key} fixed={group.fixed} header={header}>
                    {columns}
                </ColumnGroup>
            );
        });
    }

    render() {
        const {
            containerWidth,
            defaultHeight,
            order,
            station,
            tableProps,
            useContainerHeight,
        } = this.props;

        // quick fit to admin tables (users, teams)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        /* TODO: - It is using station.songs as data source - make it more generic */
        const rows = station.songs || station.users || station.teams || { songs: station };

        return (
            <div className="table-container">
                <FixedTable
                    touchScrollEnabled
                    groupHeaderHeight={34}
                    headerHeight={34}
                    height={useContainerHeight ? this.getContainerHeight() : defaultHeight}
                    rowsCount={rows.songs.length}
                    rowHeight={34}
                    width={containerWidth}
                    {...tableProps}
                >
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                    {this.renderColumnGroups(rows, order)}
                </FixedTable>
            </div>
        );
    }
}

Table.propTypes = {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songData' implicitly has an 'any' type.
    callLetter: PropTypes.string.isRequired,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    order: PropTypes.arrayOf(
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
        PropTypes.shape({
            // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'element' implicitly has an 'any' type.
            columns: PropTypes.arrayOf(PropTypes.string).isRequired,
            key: PropTypes.string.isRequired,
            fixed: PropTypes.bool,
        })
    ).isRequired,
    station: PropTypes.arrayOf(PropTypes.any).isRequired,
    defaultHeight: PropTypes.number,
    defaultSort: PropTypes.shape({
        key: PropTypes.string,
        ascending: PropTypes.bool,
    }),
    tableProps: PropTypes.objectOf(PropTypes.any),
    useContainerHeight: PropTypes.bool,
};

Table.defaultProps = {
    defaultHeight: 700,
    defaultSort: {
        key: null,
        ascending: true,
        sortValueExtractor: (songData, key) => objectGet(songData, key),
    },
    tableProps: {},
    useContainerHeight: false,
};

export default Dimensions({
    getWidth: element => element.offsetWidth,
    getHeight: element => {
        const table = element.querySelector('.fixedDataTableLayout_main');

        // Reset table height such that it does not affect container height
        if (table !== null) {
            const previousHeight = table.style.height;
            table.style.height = 0;

            const { offsetHeight } = element;
            table.style.height = previousHeight;

            return offsetHeight;
        }

        return element.offsetHeight;
    },
})(Table);
