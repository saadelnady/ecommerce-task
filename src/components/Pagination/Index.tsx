import { PaginationProps } from "@/types/interfaces";
import React from "react";

const Pagination: React.FC<PaginationProps> = ({
  goToPage,
  currentPage,
  totalPages,
}) => {
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const showFirstPage = currentPage > 3;
    const showFirstEllipsis = currentPage > 4;
    const showLastPage = currentPage < totalPages - 2;
    const showLastEllipsis = currentPage < totalPages - 3;

    if (showFirstPage) {
      pages.push(1);
      if (showFirstEllipsis) pages.push("...");
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (showLastPage) {
      if (showLastEllipsis) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    const isValidPage = page >= 1 && page <= totalPages && page !== currentPage;
    if (isValidPage) {
      goToPage(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const visiblePages = getVisiblePages();

  const getPageButtonClasses = (page: number | string) => {
    const baseClasses = "px-3 py-1 border rounded transition";
    const isActive = currentPage === page;

    return `${baseClasses} ${
      isActive
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white hover:bg-gray-100"
    }`;
  };

  const navButtonClasses =
    "px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:hover:bg-transparent";

  return (
    <div className="flex justify-center items-center mt-6 flex-wrap gap-2 text-sm">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={isFirstPage}
        className={navButtonClasses}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      {visiblePages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 select-none text-gray-500"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => typeof page === "number" && handlePageClick(page)}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Go to page ${page}`}
            className={getPageButtonClasses(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={isLastPage}
        className={navButtonClasses}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
