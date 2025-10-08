import React from "react";

interface PaginationProps {
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  goToPage,
  currentPage,
  totalPages,
}) => {
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
    }

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      goToPage(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 flex-wrap gap-2 text-sm">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:hover:bg-transparent"
      >
        ← Prev
      </button>

      {visiblePages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="px-2 select-none text-gray-500"
          >
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => typeof page === "number" && handlePageClick(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`px-3 py-1 border rounded transition ${
              currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:hover:bg-transparent"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
