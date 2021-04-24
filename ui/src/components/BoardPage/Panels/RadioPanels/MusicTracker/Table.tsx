import React from 'react';

import PropTypes from 'prop-types';
import { isEqual, isUndefined } from 'lodash';
import classNames from 'classnames';
import Dimensions from 'react-dimensions';
import { Table as FixedTable, Column, ColumnGroup, Cell } from 'fixed-data-table-2';
import shortid from 'shortid';

import HeaderButton from 'components/BoardPage/Panels/RadioPanels/MusicTracker/HeaderButton';
import { getSortedData, getDefaultSortData } from 'utils/SortFunctions';
import objectGet from 'utils/objectGet';
import TextCell from 'components/BoardPage/Panels/RadioPanels/MusicTracker/TextCell';

// TODO: change this back to existing makeColumnMap after playlist overview matches musictracker
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
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.marketPercent': {
                header: `${callLetter} % Share`,
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.market': {
                header: 'Market Spins',
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
            'mediabase.spins.6am7pm': {
                header: '6AM - 7PM Spins',
                cell: <TextCell data={data} />,
                width: 55,
                flexGrow: 1,
            },
        },
    },
});

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sort: props.defaultSort,
        };

        this.id = shortid.generate();
        this.onSortChange = this.onSortChange.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(this.props, nextProps) || !isEqual(this.state.sort, nextState.sort);
    }

    onSortChange(columnKey, column) {
        const { sort } = this.state;

        if (sort.key === null || sort.key !== columnKey) {
            this.setState({
                sort: {
                    key: columnKey,
                    sortValueExtractor: column.sortValueExtractor,
                    ascending: true,
                },
            });
        } else {
            this.setState({
                sort: {
                    ...sort,
                    ascending: !sort.ascending,
                },
            });
        }
    }

    getContainerHeight() {
        const { containerHeight, defaultHeight } = this.props;
        return containerHeight > defaultHeight ? containerHeight : defaultHeight;
    }

    getMinWidthRemaining = (group, { columns, minWidth }) => {
        if (minWidth === undefined) return 0;

        const usedWidth = group.columns.reduce((sum, key) => {
            const width = columns[key] ? columns[key].width : 0;
            return sum + width;
        }, 0);

        return minWidth - usedWidth;
    };

    renderColumnGroups({ songs, ...station }, columnOrder) {
        const { sort } = this.state;
        const self = this;
        let data = songs;
        data = data.map(item => getDefaultSortData(sort, item));
        self.data = data.sort((a, b) => getSortedData(sort, a, b));
        const columnMap = makeColumnMap({
            ...station,
            data,
            callLetter: this.props.callLetter,
            ...this.props,
        });

        return columnOrder.map(group => {
            const groupSpec = columnMap[group.key];
            const minWidthRemaining = this.getMinWidthRemaining(group, groupSpec);
            const cellWidths = group.columns.reduce(
                (sum, key) => sum + groupSpec.columns[key].width,
                0
            );
            const { noGroup } = group;

            const columns = group.columns.map((columnKey, index) => {
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
                );
                const widthRatio = groupSpec.minWidth > 0 ? column.width / cellWidths : 0;
                const extraWidth = minWidthRemaining > 0 ? widthRatio * minWidthRemaining : 0;

                return (
                    <Column
                        key={columnKey}
                        cell={cell}
                        columnKey={column.key || columnKey}
                        fixed={group.fixed}
                        header={header}
                        width={column.width + extraWidth}
                        flexGrow={column.flexGrow}
                    />
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
                    {this.renderColumnGroups(rows, order)}
                </FixedTable>
            </div>
        );
    }
}

Table.propTypes = {
    callLetter: PropTypes.string.isRequired,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    order: PropTypes.arrayOf(
        PropTypes.shape({
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
