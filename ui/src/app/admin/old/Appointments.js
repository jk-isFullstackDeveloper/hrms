import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import Pagination from "../../components/Paginations";

const appointments = [
  { id: 1, doctor: "Dr. Amelia Carter", specialty: "Cardiologist", doctorImage: "https://randomuser.me/api/portraits/women/44.jpg", patient: "John Doe", patientImage: "https://randomuser.me/api/portraits/men/30.jpg", appointmentTime: "2024-03-25 10:00 AM", status: "Completed", amount: 200 },
  { id: 2, doctor: "Dr. Robert Miller", specialty: "Neurologist", doctorImage: "https://randomuser.me/api/portraits/men/32.jpg", patient: "Jane Smith", patientImage: "https://randomuser.me/api/portraits/women/35.jpg", appointmentTime: "2024-03-26 02:30 PM", status: "Pending", amount: 150 },
  { id: 3, doctor: "Dr. Emily Watson", specialty: "Orthopedic", doctorImage: "https://randomuser.me/api/portraits/women/45.jpg", patient: "Michael Brown", patientImage: "https://randomuser.me/api/portraits/men/31.jpg", appointmentTime: "2024-03-27 01:15 PM", status: "Completed", amount: 180 },
];

export default function Appointments() {
  const [entries, setEntries] = useState(5);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const totalPages = Math.ceil(appointments.length / entries);
  const paginatedAppointments = appointments.slice((page - 1) * entries, page * entries);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedAppointments = [...paginatedAppointments].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField];
    let valueB = b[sortField];

    // Convert appointment time to date object for sorting
    if (sortField === "appointmentTime") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    // Numeric sorting
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }

    // Default sorting for strings
    return sortOrder === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Appointments List</h2>

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
                { label: "Doctor", field: "doctor" },
                { label: "Specialty", field: "specialty" },
                { label: "Patient", field: "patient" },
                { label: "Appointment Time", field: "appointmentTime" },
                { label: "Status", field: "status" },
                { label: "Amount", field: "amount" },
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
            {sortedAppointments.map((appt) => (
              <tr key={appt.id} className="border-b">
                <td className="p-3 flex items-center gap-3">
                  <img src={appt.doctorImage} alt={appt.doctor} className="w-10 h-10 rounded-full" />
                  {appt.doctor}
                </td>
                <td className="p-3">{appt.specialty}</td>
                <td className="p-3 flex items-center gap-3">
                  <img src={appt.patientImage} alt={appt.patient} className="w-10 h-10 rounded-full" />
                  {appt.patient}
                </td>
                <td className="p-3">{appt.appointmentTime}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 text-white rounded-full text-xs ${appt.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                    {appt.status}
                  </span>
                </td>
                <td className="p-3">${appt.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (Right Aligned) */}
      <Pagination
        totalPages={10}
        currentPage={page}
        onPageChange={setPage}
        variant="basic"
      />

    </div>
  );
}
