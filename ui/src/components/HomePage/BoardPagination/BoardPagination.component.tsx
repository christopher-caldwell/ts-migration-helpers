import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const BoardPagination = ({
    numPages, page, size, handlePaginate,
}) => numPages > 1 && (
    <div className="pagination-container">
        {page > 1 && (
            <div className="pagination-container">
                <ul className="pagination">
                    <li>
                        <Button role="button" onClick={() => handlePaginate(page - 1)} className="pagination-skip">
                            {`Back ${size}`}
                        </Button>
                    </li>
                </ul>
            </div>
        )}
        {page < numPages && (
            <div className="pagination-container">
                <ul className="pagination">
                    <li>
                        <Button role="button" onClick={() => handlePaginate(page + 1)} className="pagination-skip">
                            {`Skip ${size}`}
                        </Button>
                    </li>
                </ul>
            </div>
        )}
    </div>
);

BoardPagination.propTypes = {
    handlePaginate: PropTypes.func.isRequired,
    numPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
};

export default BoardPagination;
