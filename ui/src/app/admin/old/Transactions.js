import { useState } from "react";
import { Eye, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import Pagination from "../../components/Paginations";

const invoicesData = [
  { 
    id: 1, 
    invoiceNumber: "#INV1001", 
    patientId: "#P001", 
    patientName: "John Doe", 
    patientImage: "https://randomuser.me/api/portraits/men/1.jpg", 
    totalAmount: 250.00, 
    status: "Paid" 
  },
  { 
    id: 2, 
    invoiceNumber: "#INV1002", 
    patientId: "#P002", 
    patientName: "Emily Johnson", 
    patientImage: "https://randomuser.me/api/portraits/women/1.jpg", 
    totalAmount: 180.50, 
    status: "Pending" 
  },
  { 
    id: 3, 
    invoiceNumber: "#INV1003", 
    patientId: "#P003", 
    patientName: "Michael Carter", 
    patientImage: "https://randomuser.me/api/portraits/women/4.jpg", // No image case
    totalAmount: 320.75, 
    status: "Paid" 
  },
  { 
    id: 4, 
    invoiceNumber: "#INV1004", 
    patientId: "#P004", 
    patientName: "Sarah Brown", 
    patientImage: "https://randomuser.me/api/portraits/women/2.jpg", 
    totalAmount: 150.00, 
    status: "Unpaid" 
  },
];

export default function Transactions() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const entriesPerPage = 5;

  const totalPages = Math.ceil(invoices.length / entriesPerPage);
  const startIndex = (page - 1) * entriesPerPage;
  const paginatedInvoices = invoices.slice(startIndex, startIndex + entriesPerPage);

  // Sorting Function
  const toggleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedData = [...invoices].sort((a, b) => {
      let valueA = a[field];
      let valueB = b[field];

      if (typeof valueA === "string") valueA = valueA.toLowerCase();
      if (typeof valueB === "string") valueB = valueB.toLowerCase();

      return newSortOrder === "asc" ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });

    setInvoices(sortedData);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Invoices</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left">
              {[
                { label: "Invoice Number", field: "invoiceNumber" },
                { label: "Patient ID", field: "patientId" },
                { label: "Patient", field: "patientName" },
                { label: "Total Amount", field: "totalAmount" },
                { label: "Status", field: null },
                { label: "Actions", field: null },
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
            {paginatedInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200">
                <td className="p-3">{invoice.invoiceNumber}</td>
                <td className="p-3">{invoice.patientId}</td>
                
                {/* Patient Image & Name */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={invoice.patientImage || "https://via.placeholder.com/50"}
                    alt={invoice.patientName}
                    className="w-10 h-10 rounded-full border"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                  />
                  <span className="text-gray-800">{invoice.patientName}</span>
                </td>

                <td className="p-3">${invoice.totalAmount.toFixed(2)}</td>
              
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-white rounded-full text-xs ${
                      invoice.status === "Paid"
                        ? "bg-green-500"
                        : invoice.status === "Pending"
                        ? "bg-gray-500"
                        : "bg-red-500"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="p-2 text-blue-600 hover:text-blue-800">
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-800"
                    onClick={() => setInvoices(invoices.filter((inv) => inv.id !== invoice.id))}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        variant="basic"
      />
    </div>
  );
}
