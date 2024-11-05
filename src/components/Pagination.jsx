import React from 'react';

// Importing icon assets for pagination controls
import arrowLeftIcon from "../assets/ArrowLeftIcon.svg";
import previousIcon from "../assets/PreviousIcon.svg";
import nextIcon from "../assets/NextIcon.svg";
import arrowRightIcon from "../assets/ArrowRightIcon.svg";

const Pagination = ({
    startRow,
    endRow,
    totalItems,
    rowsPerPage,
    handleFirstPage,
    handlePreviousPage,
    handleNextPage,
    handleLastPage,
    handleRowsPerPageChange,
}) => {
    return (
        <>
            {/* Dropdown to select number of rows per page */}
            <div className="rows-per-page">
                <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-per-page-option">
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>

            {/* Display the range of rows currently being viewed */}
            <div className="row-range">
                <span className="row-range-text">
                    {startRow}-{endRow} of {totalItems}
                </span>
            </div>

            {/* Pagination controls with arrow icons */}
            <div className="pagination-controls">
                <img src={arrowLeftIcon} onClick={handleFirstPage} alt="First Page" />
                <img src={previousIcon} onClick={handlePreviousPage} alt="Previous Page" />
                <img src={nextIcon} onClick={handleNextPage} alt="Next Page" />
                <img src={arrowRightIcon} onClick={handleLastPage} alt="Last Page" />
            </div>
        </>
    );
}

export default Pagination;
