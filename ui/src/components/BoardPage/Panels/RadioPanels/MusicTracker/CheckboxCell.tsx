import React from 'react';

import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import shortid from 'shortid';

class CheckboxCell extends React.PureComponent {
    constructor() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
        super();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type 'Readonly<... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message
        this.id = shortid.generate();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowIndex' does not exist on type 'Readon... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
    onClick = event => event.stopPropagation();

    onChange = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message
        const { data, rowIndex, onSongSelect } = this.props;
        onSongSelect(data[rowIndex].sId, !data[rowIndex].checked);
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
        const { data, rowIndex, disabled, selectedSongs, height, width } = this.props;
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'songId' implicitly has an 'any' type.
        const checked = selectedSongs.some(songId => songId === data[rowIndex].sId);
        const cellProps = { disabled, height, width };

        return (
            <Cell {...cellProps} onClick={this.onClick} className="music-tracker-cell-checkbox">
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message */}
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message */}
                <label htmlFor={this.id}>
                    <input
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'CheckboxCell... Remove this comment to see the full error message
                        checked={checked}
                        disabled={disabled}
                        id={this.id}
                        type="checkbox"
                        onChange={this.onChange}
                    />
                </label>
            </Cell>
        );
    }
}

CheckboxCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    selectedSongs: PropTypes.arrayOf(PropTypes.number).isRequired,
    onSongSelect: PropTypes.func.isRequired,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    columnKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    height: PropTypes.number,
    rowIndex: PropTypes.number,
    width: PropTypes.number,
};

CheckboxCell.defaultProps = {
    columnKey: undefined,
    disabled: false,
    height: undefined,
    rowIndex: undefined,
    width: undefined,
};

export default CheckboxCell;
