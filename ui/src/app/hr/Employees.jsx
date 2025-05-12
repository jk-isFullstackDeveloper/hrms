import { useEffect, useState } from "react";
import { getAllEmployees, createEmployee } from "../../api/employee";
import EmployeeSidebarForm from "./EmployeeSidebarForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getAllEmployees();
      setEmployees(data);
    })();
  }, []);

  const createEmp = async (payload) => {
    const data = await createEmployee(payload);
    console.log(data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-6 bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-gray-200">
          <h2 className="text-1xl font-bold text-gray-800"></h2>
          <button
            onClick={() => setShowForm(true)}
            type="submit"
            className="px-4 py-2 text-xs bg-rose-600 text-white rounded hover:bg-violet-700"
          >
            Create Employee
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Code</th>
                <th className="p-4">Department</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Joining</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees?.map((emp) => (
                <tr
                  onClick={() => setSelectedEmp(emp)}
                  key={emp._id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={
                        // emp.profile ||
                        `https://i.pravatar.cc/100?u=${emp.fullName}`
                      }
                      alt={emp.fullName}
                      className="w-10 h-10 rounded-full object-cover ring-4 ring-indigo-200 shadow-sm"
                    />
                    <div>
                      <div className="font-semibold text-xs text-gray-900">
                        {emp.fullName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {emp.contact?.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-mono   text-gray-600">
                    {emp.employeeCode}
                  </td>
                  <td className="p-4 text-xs">{emp.department}</td>
                  <td className="p-4 text-xs">{emp.designation}</td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(emp.joiningDate).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs  rounded-full ${
                        emp.status === "active"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "resigned"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EmployeeSidebarForm
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={(data) => createEmp(data)}
      />
      {/* Right Panel */}
      {/* Overlay */}

      {selectedEmp && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-100 transition-opacity duration-300"
          onClick={() => setSelectedEmp(null)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          selectedEmp ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-indigo-600 text-white">
          <h3 className="text-lg font-semibold">Employee Details</h3>
          <button
            onClick={() => setSelectedEmp(null)}
            className="text-white text-2xl leading-none hover:text-red-200"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto text-sm text-gray-700 space-y-4 h-[calc(100%-8rem)]">
          <div className="flex items-center gap-4">
            <img
              src={
                // selectedEmp?.profile ||
                `https://i.pravatar.cc/100?u=${selectedEmp?.fullName}`
              }
              alt={selectedEmp?.fullName}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-200"
            />
            <div>
              <h4 className="text-base font-bold">{selectedEmp?.fullName}</h4>
              <p className="text-xs text-gray-500">
                {selectedEmp?.contact?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <strong>Code:</strong> {selectedEmp?.employeeCode}
            </div>
            <div>
              <strong>Dept:</strong> {selectedEmp?.department}
            </div>
            <div>
              <strong>Designation:</strong> {selectedEmp?.designation}
            </div>
            <div>
              <strong>Joining:</strong>{" "}
              {new Date(selectedEmp?.joiningDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Status:</strong> {selectedEmp?.status}
            </div>
            <div>
              <strong>Phone:</strong> {selectedEmp?.contact?.phone}
            </div>
            <div>
              <strong>Address:</strong> {selectedEmp?.contact?.address}
            </div>
            <div>
              <strong>DOB:</strong> {selectedEmp?.personalInfo?.dob}
            </div>
            <div>
              <strong>Passport No:</strong>{" "}
              {selectedEmp?.personalInfo?.passportNo}
            </div>
            <div>
              <strong>PAN:</strong> {selectedEmp?.bankInfo?.panNo}
            </div>
            <div>
              <strong>Account:</strong> {selectedEmp?.bankInfo?.acNo}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t bg-indigo-50 text-xs text-gray-600 flex justify-between items-center">
          <span>Updated on: {new Date().toLocaleDateString()}</span>
          <button
            onClick={() => alert("Edit Feature")}
            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
