import { useEffect, useState } from "react";
import { getAllEmployees } from "../../api/employee";
import { UserPlus, Users, Briefcase, ActivitySquare } from "lucide-react";
import { useRouter } from "next/router";

import {
  createLeaveType,
  getLeaveTypeList,
  allocateLeave,
  allocateedLeaveList,
  createLeaveRequest,
  getLeaveRequest,
} from "../../api/leave";

export default function Dashboard() {
  const [leaveType, setLeaveType] = useState([]);
  const [leaveAllocations, setLeaveAllocations] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getLeaveTypeList();
      const allocatedList = await allocateedLeaveList();
      const leaveRequestList = await getLeaveRequest();
      setLeaveRequests(leaveRequestList.data);
      setLeaveAllocations(allocatedList.data);
      setLeaveType(res.data);
    })();
  }, []);

  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getAllEmployees();
      setEmployees(data || []);
    })();
  }, []);

  const totalEmployees = employees.length;
  const active = employees.filter((e) => e.status === "active").length;
  const resigned = employees.filter((e) => e.status === "resigned").length;
  const terminated = employees.filter((e) => e.status === "terminated").length;

  const departments = [...new Set(employees.map((e) => e.department))];

  const recent = [...employees]
    .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Widget
          icon={<Users size={24} />}
          label="Total Employees"
          count={totalEmployees}
          color="bg-indigo-100"
        />
        <Widget
          icon={<ActivitySquare size={24} />}
          label="Active"
          count={active}
          color="bg-green-100"
        />
        <Widget
          icon={<ActivitySquare size={24} />}
          label="Resigned"
          count={resigned}
          color="bg-yellow-100"
        />
        <Widget
          icon={<ActivitySquare size={24} />}
          label="Terminated"
          count={terminated}
          color="bg-red-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Departments */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            Departments
          </h3>
          <ul className="text-xs text-gray-600 space-y-2">
            {departments.map((dept) => (
              <li key={dept} className="flex justify-between border-b pb-1">
                <span>{dept}</span>
                <span>
                  {employees.filter((e) => e.department === dept).length}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Joinees */}
        <div className="bg-white p-5 rounded-2xl shadow col-span-2">
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            Recent Joinees
          </h3>
          <ul className="space-y-3">
            {recent.map((emp) => (
              <li
                key={emp._id}
                className="flex items-center justify-between text-sm border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?u=${emp.fullName}`}
                    className="w-8 h-8 rounded-full object-cover"
                    alt={emp.fullName}
                  />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {emp.fullName}
                    </p>
                    <p className="text-xs text-gray-500">{emp.designation}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  {new Date(emp.joiningDate).toLocaleDateString("en-IN")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mt-10 text-right">
        <button
          onClick={() => false}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-xs px-4 py-2 rounded shadow"
        >
          <UserPlus size={16} />
          Manage Employees
        </button>
      </div>

      {/* Leave Dashboard */}
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Recent Leave Requests */}

        <div className="bg-white p-5 rounded-2xl shadow col-span-2">
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            Recent Leave Requests
          </h3>
          <ul className="space-y-3">
            {leaveRequests.map((emp) => (
              <li
                key={emp._id}
                className="flex items-center justify-between text-sm border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/100?u=${emp.status}`}
                    className="w-8 h-8 rounded-full object-cover"
                    alt={emp.employee?.email}
                  />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {emp.employee?.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {emp.leaveType?.name}
                    </p>
                    {/* <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        emp.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {emp.status}
                    </span> */}
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  <div>
                    <smpn className="text-xs font-semibold w-25">From:</smpn>
                    {new Date(emp.fromDate).toLocaleDateString("en-IN")}
                  </div>
                  <div>
                    <smpn className="text-xs font-semibold w-25">To:</smpn>
                    {new Date(emp.toDate).toLocaleDateString("en-IN")}
                  </div>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 text-right">
          <button
            onClick={() => false}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded shadow"
          >
            <UserPlus size={16} />
            Manage Leave Requests
          </button>
        </div>
        {/* Leave Allocation */}
        <div className="bg-white p-5 rounded-2xl shadow mb-8">
          <h3 className="text-sm font-semibold mb-4 text-gray-700">
            Leave Allocation
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">
                    Employee
                  </th>

                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">
                    Year
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">
                    Allocated
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">
                    Used
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaveAllocations.map((alloc) => {
                  const emp = alloc.employee || {};
                  return (
                    <tr key={alloc._id} className="border-t">
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://i.pravatar.cc/100?u=${emp.status}`}
                            className="w-8 h-8 rounded-full object-cover"
                            alt={emp.employee?.email}
                          />
                          <div>
                            <p className="text-xs text-gray-500">{emp.email}</p>
                            <p className="text-xs text-gray-500">
                              {alloc.leaveType?.name || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`font-semibold ${
                            emp.status === "active"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {alloc.year}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {alloc.totalAllocated}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {alloc.used}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Widget({ icon, label, count, color }) {
  return (
    <div
      className={`p-4 rounded-2xl shadow-sm ${color} flex items-center justify-between`}
    >
      <div>
        <div className="text-gray-800 text-xs font-semibold">{label}</div>
        <div className="text-xl font-bold">{count}</div>
      </div>
      <div className="text-gray-600">{icon}</div>
    </div>
  );
}
