import React from 'react'

export default function Pagination({pageNumber, handlePageChange, totalPages}) {
  return (
    <>
       <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    {/* Previous Button */}
    <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(pageNumber - 1)}>
        Previous
      </button>
    </li>

    {/* First Page (Always Visible) */}
    <li className={`page-item ${pageNumber === 1 ? 'active' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
    </li>

    {/* Left Ellipsis */}
    {pageNumber > 6 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Dynamic Page Numbers (Excluding First and Last Page) */}
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((num) => num !== 1 && num !== totalPages && num >= pageNumber - 3 && num <= pageNumber + 3)
      .map((num) => (
        <li key={num} className={`page-item ${pageNumber === num ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(num)}>{num}</button>
        </li>
      ))}

    {/* Right Ellipsis */}
    {pageNumber < totalPages - 3 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Last Page (Always Visible) */}
    {totalPages > 1 && (
      <li className={`page-item ${pageNumber === totalPages ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
      </li>
    )}

    {/* Next Button */}
    <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>
        Next
      </button>
    </li>
  </ul>
</nav>
    </>
  )
}
