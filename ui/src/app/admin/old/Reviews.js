import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Trash2, Eye, ArrowUp, ArrowDown } from "lucide-react";
import Pagination from "../../components/Paginations";

const reviewsData = [
  {
    id: 1,
    patientName: "John Doe",
    patientImage: "https://randomuser.me/api/portraits/men/1.jpg",
    doctorName: "Dr. Sarah Smith",
    doctorImage: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    description: "Excellent doctor! Very professional and kind.",
    date: "2024-03-20",
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    patientImage: "https://randomuser.me/api/portraits/women/3.jpg",
    doctorName: "Dr. Michael Brown",
    doctorImage: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 4,
    description: "Good experience, but the waiting time was a bit long.",
    date: "2024-02-15",
  },
  {
    id: 3,
    patientName: "Michael Carter",
    patientImage: "https://randomuser.me/api/portraits/men/5.jpg",
    doctorName: "Dr. Olivia Wilson",
    doctorImage: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 3,
    description: "Decent service but could be improved.",
    date: "2024-01-10",
  },
];

export default function ReviewsTable() {
  const [reviews, setReviews] = useState(reviewsData);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const entriesPerPage = 5;

  const totalPages = Math.ceil(reviews.length / entriesPerPage);
  const startIndex = (page - 1) * entriesPerPage;
  const paginatedReviews = reviews.slice(startIndex, startIndex + entriesPerPage);

  // Sorting Function
  const toggleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedData = [...reviews].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      if (field === "date") {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }

      return newSortOrder === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });

    setReviews(sortedData);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient Reviews</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              {[
                { label: "Patient  ", field: "patientName" },
                { label: "Doctor  ", field: "doctorName" },
                { label: "Ratings", field: null },
                { label: "Description", field: "description" },
                // { label: "Date", field: "date" },
                // { label: "Actions", field: null },
              ].map(({ label, field }) => (
                <th
                  key={label}
                  className="p-3 border-b border-gray-300 cursor-pointer"
                  onClick={() => field && toggleSort(field)}
                >
                  {label}{" "}
                  {sortField === field ? (
                    sortOrder === "asc" ? <ArrowUp className="inline-block w-4 h-4" /> : <ArrowDown className="inline-block w-4 h-4" />
                  ) : (
                    ""
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((review) => (
              <tr key={review.id} className="border-b border-gray-200">
                <td className="p-3 flex items-center gap-3">
                  <img src={review.patientImage} alt={review.patientName} className="w-10 h-10 rounded-full border object-cover" />
                  {review.patientName}
                </td>
                <td className="p-3 flex items-center gap-3">
                  <img src={review.patientImage} alt={review.doctorName} className="w-10 h-10 rounded-full border object-cover" />
                  {review.doctorName}
                </td>


                {/* <td className="p-3 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                  ))}
                </td> */}
                {/* <td className="p-3">{review.description}</td> */}
                {/* <td className="p-3">{review.date}</td> */}
                {/* <td className="p-3 flex gap-2">
                  <button className="p-2 text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-800"
                    onClick={() => setReviews(reviews.filter((r) => r.id !== review.id))}
                  >
                    <Trash2 size={18} />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={setPage}
        variant="basic"
      />
    </div>
  );
}
