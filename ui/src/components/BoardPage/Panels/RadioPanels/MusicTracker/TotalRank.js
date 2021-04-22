import React from 'react';
import PropTypes from 'prop-types';

const TotalRank = ({ data, color }) => (
    <div style={{ border: `2px solid ${color}` }} className="total-rank-label">
        {data || '-'}
    </div>
);

TotalRank.propTypes = {
    color: PropTypes.string,
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TotalRank.defaultProps = {
    color: '',
    data: 0,
};

export default TotalRank;
