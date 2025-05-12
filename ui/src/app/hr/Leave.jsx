import { useEffect, useState } from "react";
import {
  createLeaveType,
  getLeaveTypeList,
  allocateLeave,
  allocateedLeaveList,
  createLeaveRequest,
  getLeaveRequest,
} from "../../api/leave";

const Leave = () => {
  const [leaveType, setLeaveType] = useState([]);
  const [leaveAllocations, setLeaveAllocations] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getLeaveTypeList();
      const allocatedList = await allocateedLeaveList();
      const leaveReequest = await getLeaveRequest();
      setLeaveRequests(leaveReequest.data);
      setLeaveAllocations(allocatedList.data);
      setLeaveType(res.data);
    })();
  }, []);

  const createLeave = async (payload) => {
    await createLeaveType(payload);
  };

  const allocateLeaveToUsers = async (payload) => {
    await allocateLeave(payload);
  };
  const createLeaveReequest = async (payload) => {
    await createLeaveRequest(payload);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className=" bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-6 bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-800">Leave Request</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="p-4">Employee</th>
                <th className="p-4">Leave Type</th>
                <th className="p-4">From</th>
                <th className="p-4">To</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Applied</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Approved By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaveRequests?.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={`https://i.pravatar.cc/100?u=${req.employee?.role}`}
                      alt={req.employee?.role}
                      className="w-10 h-10 rounded-full object-cover ring-4 ring-indigo-200 shadow-sm"
                    />
                    <div>
                      <div className="font-semibold text-xs text-gray-900">
                        {req.employee?.email || "No email"}
                      </div>
                      <div className="text-xs text-gray-500 ">
                        {req.employee?.role || "N/A"}
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-xs">
                    {req.leaveType?.name || "N/A"}
                  </td>
                  <td className="p-4 text-xs text-gray-600">
                    {new Date(req.fromDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4 text-xs text-gray-600">
                    {new Date(req.toDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4 text-xs">{req.reason || "-"}</td>
                  <td className="p-4 text-xs text-gray-500">
                    {new Date(req.appliedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : req.status === "Cancelled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-600">
                    <sman
                      className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                        req.approvedBy?.role === "manager"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : req.status === "Cancelled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {req.approvedBy?.role || "—"}
                    </sman>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap ">
        {/* Table 1 - Leave Types */}
        <div className=" w-full md:w-1/2 bg-white/80 backdrop-blur-xl shadow-sm   overflow-hidden ">
          <div className="flex items-center justify-between p-3     border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-800">Leave Types</h2>
            <button onClick={() => setShowForm(true)}>Add</button>
          </div>
          <div className="overflow-x-auto ">
            <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 rounded-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {leaveType?.map((emp) => (
                  <div
                    key={emp._id}
                    onClick={() => setSelectedEmp(emp)}
                    className="bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 transition-all duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:border-indigo-300 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {emp.name}
                      </h3>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          emp.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {emp.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </div>

                    {emp.description && (
                      <p className="text-sm text-gray-500 mb-5">
                        {emp.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="font-medium ">Default Days:</span>
                      <span className="text-base font-semibold text-gray-800">
                        {emp.defaultDays}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Table 2 - Placeholder (Second Table) */}
        <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-xl shadow-sm rounded-3xl overflow-hidden">
          <div className="px-2 flex items-center justify-between p-3     border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-800">Allocated Leave</h2>
            <button onClick={() => setShowForm(true)}>Add</button>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 rounded-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {leaveAllocations?.map((alloc) => {
                  const emp = alloc.employee || {}; // just in case
                  return (
                    <div
                      key={alloc._id}
                      className="bg-white rounded-3xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] hover:border-indigo-300 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={`https://i.pravatar.cc/100?u=${emp.role}`}
                          alt={emp.role}
                          className="w-12 h-12 rounded-full object-cover ring-4 ring-indigo-200 shadow-sm"
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            {emp.email || "email@example.com"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Role:</span>
                          <span className="font-medium text-gray-800">
                            {emp.role || "Employee"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span
                            className={`font-medium ${
                              emp.status === "active"
                                ? "text-green-600"
                                : emp.status === "inactive"
                                ? "text-red-500"
                                : "text-gray-600"
                            }`}
                          >
                            {emp.status || "Unknown"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leave Type:</span>
                          <span className="font-medium text-gray-800">
                            {alloc.leaveType.name || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Allocated:</span>
                          <span className="font-medium text-gray-800">
                            {alloc.totalAllocated}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Used:</span>
                          <span className="font-medium text-gray-800">
                            {alloc.used}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Year:</span>
                          <span className="font-medium text-gray-800">
                            {alloc.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Leave;
