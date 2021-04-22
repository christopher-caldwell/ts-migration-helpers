import React from 'react';

import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table-2';
import shortid from 'shortid';

class CheckboxCell extends React.PureComponent {
    constructor() {
        super();
        this.id = shortid.generate();
    }

    onClick = event => event.stopPropagation();

    onChange = () => {
        const { data, rowIndex, onSongSelect } = this.props;
        onSongSelect(data[rowIndex].sId, !data[rowIndex].checked);
    };

    render() {
        const { data, rowIndex, disabled, selectedSongs, height, width } = this.props;
        const checked = selectedSongs.some(songId => songId === data[rowIndex].sId);
        const cellProps = { disabled, height, width };

        return (
            <Cell {...cellProps} onClick={this.onClick} className="music-tracker-cell-checkbox">
                <label htmlFor={this.id}>
                    <input
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
