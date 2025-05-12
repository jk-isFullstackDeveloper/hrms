import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  variant = "basic", // Default variant
  hasMore = false,
  onLoadMore,
  desc = "", // Optional description
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePages = () => {
    if (variant === "numbered") {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (variant === "ellipsis") {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
      if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages];
      }
      if (currentPage >= totalPages - 2) {
        return [1, "...", totalPages - 2, totalPages - 1, totalPages];
      }
      return [1, "...", currentPage, "...", totalPages];
    }
    return [];
  };

  return (
    <div className="flex flex-col items-end mt-4 gap-2">
      {/* Optional Description */}
      {desc && <p className="text-gray-600 text-sm">{desc}</p>}

      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        {variant !== "loadMore" && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 border rounded ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Basic Variant (Shows only "Page X of Y") */}
        {variant === "basic" && (
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
        )}

        {/* Numbered Variant */}
        {variant === "numbered" &&
          generatePages().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 border rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

        {/* Ellipsis Variant */}
        {variant === "ellipsis" &&
          generatePages().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 border rounded ${
                  currentPage === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

        {/* Right Arrow */}
        {variant !== "loadMore" && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        )}

        {/* Load More Variant */}
        {variant === "loadMore" && hasMore && (
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
