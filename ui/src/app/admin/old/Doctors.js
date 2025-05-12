import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import Pagination from "../../components/Paginations";

const doctors = [
  {
    id: 1,
    name: "Dr. Amelia Carter",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    memberSince: "2020-06-15",
    earned: 5000,
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Robert Miller",
    specialty: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    memberSince: "2019-09-21",
    earned: 7000,
    status: "Inactive",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "Orthopedic",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    memberSince: "2021-03-10",
    earned: 6200,
    status: "Active",
  },
  {
    id: 4,
    name: "Dr. John Smith",
    specialty: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    memberSince: "2018-07-12",
    earned: 8200,
    status: "Suspended",
  },
  {
    id: 5,
    name: "Dr. Sarah Johnson",
    specialty: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    memberSince: "2022-01-05",
    earned: 4800,
    status: "Active",
  },
];

export default function DoctorList() {
  const [entries, setEntries] = useState(5);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const totalPages = Math.ceil(doctors.length / entries);
  const paginatedDoctors = doctors.slice((page - 1) * entries, page * entries);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedDoctors = [...paginatedDoctors].sort((a, b) => {
    if (!sortField) return 0;
    let valueA = a[sortField];
    let valueB = b[sortField];

    if (sortField === "memberSince") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }

    return sortOrder === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Doctor List</h2>

      {/* Show Entries Dropdown */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-gray-600">Show entries:</label>
        <select
          value={entries}
          onChange={(e) => setEntries(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 focus:ring focus:ring-blue-300"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              {[
                { label: "Doctor Name", field: "name" },
                { label: "Specialty", field: "specialty" },
                { label: "Member Since", field: "memberSince" },
                { label: "Earned ($)", field: "earned" },
                { label: "Account Status", field: "status" },
              ].map(({ label, field }) => (
                <th key={field} className="p-3 text-left cursor-pointer" onClick={() => toggleSort(field)}>
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
            {sortedDoctors.map((doc) => (
              <tr key={doc.id} className="border-b">
                <td className="p-3 flex items-center gap-3">
                  <img src={doc.image} alt={doc.image} className="w-10 h-10 rounded-full" />
                  {doc.name}
                </td>
                <td className="p-3">{doc.specialty}</td>
                <td className="p-3">{doc.memberSince}</td>
                <td className="p-3">${doc.earned}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-white rounded-full text-xs ${
                      doc.status === "Active"
                        ? "bg-green-500"
                        : doc.status === "Inactive"
                        ? "bg-gray-500"
                        : "bg-red-500"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (Right Aligned) */}
      <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} variant="numbered" />
    </div>
  );
}
