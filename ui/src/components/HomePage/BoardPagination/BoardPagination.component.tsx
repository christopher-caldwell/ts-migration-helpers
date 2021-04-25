// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'numPages' implicitly has an 'any'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
import React from 'react';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'numPages' implicitly has an 'any'... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'handlePaginate' implicitly has an... Remove this comment to see the full error message
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
