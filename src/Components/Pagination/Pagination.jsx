import React from 'react';
import { ReactComponent as ArrowLeftIcon } from '../../assets/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/arrow-right.svg';
import { useAppSelector } from '../../app/hooks';
import './pagination.css';

const Pagination = ({ currentPage, setCurrentPage }) => {
  const { total_pages } = useAppSelector((state) => state.worksState);

  return (
    <div className="works-pagination">
      <button
        className="works-pagination-btn"
        disabled={currentPage <= 1}
        onClick={() => {
          if (currentPage > 1) setCurrentPage((prevState) => prevState - 1);
        }}
      >
        <ArrowLeftIcon />
      </button>
      {(() => {
        const pagesList = Array.from(
          { length: total_pages || 1 },
          (_, i) => i + 1
        );

        if (pagesList.length < 10) {
          return pagesList.map((pageNum) => (
            <button
              key={pageNum}
              className={`works-pagination-page-num ${currentPage === pageNum ? 'active' : ''}`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ));
        }
        return (
          <>
            <button
              className={`works-pagination-page-num ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            {currentPage > 3 && '...'}
            {pagesList.slice(1, -1).map((pageNum) =>
              pageNum === currentPage ||
              pageNum === currentPage - 1 ||
              pageNum === currentPage + 1 ||
              (currentPage === 1 && pageNum < 4) ||
              (currentPage === pagesList.slice(-1)[0] &&
                pageNum > pagesList.slice(-4)[0]) ? (
                <button
                  key={pageNum}
                  className={`works-pagination-page-num ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ) : null
            )}
            {currentPage < pagesList.slice(-3)[0] && '...'}
            <button
              className={`works-pagination-page-num ${currentPage === pagesList.slice(-1)[0] ? 'active' : ''}`}
              onClick={() => setCurrentPage(pagesList.slice(-1)[0])}
            >
              {pagesList.slice(-1)[0]}
            </button>
          </>
        );
      })()}
      <button
        className="works-pagination-btn"
        disabled={currentPage >= total_pages}
        onClick={() => {
          if (currentPage < total_pages)
            setCurrentPage((prevState) => prevState + 1);
        }}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
