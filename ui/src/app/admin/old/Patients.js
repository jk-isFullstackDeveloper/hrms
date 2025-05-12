import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import Pagination from "../../components/Paginations";

const patients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    address: "123 Main St, NY",
    phone: "(123) 456-7890",
    lastVisit: "2024-03-20",
    paid: 200,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 38,
    address: "456 Elm St, CA",
    phone: "(987) 654-3210",
    lastVisit: "2024-02-15",
    paid: 150,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "P003",
    name: "Michael Brown",
    age: 50,
    address: "789 Oak St, TX",
    phone: "(555) 123-4567",
    lastVisit: "2024-01-10",
    paid: 300,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export default function PatientsTable() {
  const [entries, setEntries] = useState(5);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const totalPages = Math.ceil(patients.length / entries);
  const paginatedPatients = patients.slice((page - 1) * entries, page * entries);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedPatients = [...paginatedPatients].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField];
    let valueB = b[sortField];

    if (sortField === "lastVisit") {
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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patients List</h2>

      {/* Entries Dropdown */}
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
                { label: "Patient ID", field: "id" },
                { label: "Patient Name", field: "name" },
                { label: "Age", field: "age" },
                { label: "Address", field: "address" },
                { label: "Phone", field: "phone" },
                { label: "Last Visit", field: "lastVisit" },
                { label: "Paid", field: "paid" },
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
            {sortedPatients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="p-3">{patient.id}</td>
                <td className="p-3 flex items-center gap-3">
                  <img src={patient.image} alt={patient.name} className="w-10 h-10 rounded-full object-cover border" />
                  {patient.name}
                </td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3">{patient.address}</td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3">{patient.lastVisit}</td>
                <td className="p-3">${patient.paid}</td>
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
