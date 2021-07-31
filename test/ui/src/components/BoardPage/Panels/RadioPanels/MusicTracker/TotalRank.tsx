// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
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
