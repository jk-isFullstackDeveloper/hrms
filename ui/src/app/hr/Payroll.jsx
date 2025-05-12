import { useState } from "react";

const dummyPayrolls = [
  {
    id: 1,
    employeeName: "Rohit Sharma",
    employeeCode: "EMP001",
    department: "Finance",
    month: "March 2025",
    status: "Paid",
    bankAccount: "XXXXXX1234",
    netPay: 58000,
    grossSalary: 70000,
    basic: 30000,
    hra: 15000,
    allowance: 10000,
    deduction: 5000,
    tax: 2000,
    paidOn: "2025-04-05",
  },
  {
    id: 2,
    employeeName: "Smita Desai",
    employeeCode: "EMP002",
    department: "HR",
    month: "March 2025",
    status: "Pending",
    bankAccount: "XXXXXX5678",
    netPay: 49000,
    grossSalary: 60000,
    basic: 28000,
    hra: 12000,
    allowance: 8000,
    deduction: 3000,
    tax: 1000,
    paidOn: "-",
  },
  {
    id: 3,
    employeeName: "Amit Verma",
    employeeCode: "EMP003",
    department: "Engineering",
    month: "March 2025",
    status: "Paid",
    bankAccount: "XXXXXX4321",
    netPay: 72000,
    grossSalary: 85000,
    basic: 40000,
    hra: 18000,
    allowance: 12000,
    deduction: 7000,
    tax: 3000,
    paidOn: "2025-04-03",
  },
];

export default function PayrollPage() {
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Payroll Overview</h1>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2">Employee</th>
              <th className="text-left px-4 py-2">Department</th>
              <th className="text-left px-4 py-2">Month</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayrolls.map((payroll) => (
              <tr
                key={payroll.id}
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => setSelectedPayroll(payroll)}
              >
                <td className="flex items-center gap-2 px-4 py-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${payroll.employeeName}`}
                    alt={payroll.employeeName}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-xs">{payroll.employeeName}</p>
                </td>
                <td className="px-4 py-3 text-xs">{payroll.department}</td>
                <td className="px-4 py-3 text-xs">{payroll.month}</td>
                <td className="px-4 py-3 text-xs">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      payroll.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {payroll.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs">₹{payroll.netPay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sidebar drawer */}
      {selectedPayroll && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setSelectedPayroll(null)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
              selectedPayroll ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
              <h3 className="text-lg font-semibold">Payroll Details</h3>
              <button
                onClick={() => setSelectedPayroll(null)}
                className="text-white text-2xl leading-none hover:text-red-200"
              >
                &times;
              </button>
            </div>

            <div className="p-5 overflow-y-auto text-sm text-gray-700 space-y-4 h-[calc(100%-8rem)]">
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/100?u=${selectedPayroll?.employeeName}`}
                  alt={selectedPayroll?.employeeName}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-green-200"
                />
                <div>
                  <h4 className="text-base font-bold">
                    {selectedPayroll?.employeeName}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {selectedPayroll?.employeeCode}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <strong>Department:</strong> {selectedPayroll?.department}
                </div>
                <div>
                  <strong>Month:</strong> {selectedPayroll?.month}
                </div>
                <div>
                  <strong>Status:</strong> {selectedPayroll?.status}
                </div>
                <div>
                  <strong>Bank A/C:</strong> {selectedPayroll?.bankAccount}
                </div>
                <div>
                  <strong>Net Pay:</strong> ₹{selectedPayroll?.netPay}
                </div>
                <div>
                  <strong>Gross Salary:</strong> ₹{selectedPayroll?.grossSalary}
                </div>
                <div>
                  <strong>Basic:</strong> ₹{selectedPayroll?.basic}
                </div>
                <div>
                  <strong>HRA:</strong> ₹{selectedPayroll?.hra}
                </div>
                <div>
                  <strong>Allowance:</strong> ₹{selectedPayroll?.allowance}
                </div>
                <div>
                  <strong>Deduction:</strong> ₹{selectedPayroll?.deduction}
                </div>
                <div>
                  <strong>Tax:</strong> ₹{selectedPayroll?.tax}
                </div>
                <div>
                  <strong>Paid On:</strong> {selectedPayroll?.paidOn}
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-t bg-indigo-50 text-xs text-gray-600 flex justify-between items-center">
              <span>Updated on: {new Date().toLocaleDateString()}</span>
              <button
                onClick={() => alert("Download Payslip")}
                className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-600 transition"
              >
                Download Payslip
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
