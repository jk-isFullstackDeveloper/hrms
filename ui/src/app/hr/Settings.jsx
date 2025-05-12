import React, { useState } from "react";
import {
  Settings,
  Users,
  Clock,
  KeyRound,
  CalendarCheck,
  Building2,
} from "lucide-react";

const hrSections = [
  { id: "company", name: "Company Info", icon: <Building2 size={18} /> },
  {
    id: "leave-policy",
    name: "Leave Policy",
    icon: <CalendarCheck size={18} />,
  },
  { id: "shift", name: "Shifts & Schedules", icon: <Clock size={18} /> },
  { id: "roles", name: "Roles & Permissions", icon: <KeyRound size={18} /> },
  {
    id: "departments",
    name: "Departments & Designations",
    icon: <Users size={18} />,
  },
  { id: "general", name: "General Settings", icon: <Settings size={18} /> },
];

const HRSettings = () => {
  const [activeSection, setActiveSection] = useState("company");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="bg-white rounded-xl shadow-lg p-4 col-span-1">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Settings</h2>
        <ul className="space-y-2">
          {hrSections.map((section) => (
            <li
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                activeSection === section.id
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {section.icon}
              {section.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-lg p-6 col-span-3">
        <h3 className="text-xl font-semibold mb-6 capitalize text-gray-800">
          {hrSections.find((s) => s.id === activeSection)?.name}
        </h3>
        {activeSection === "company" && (
          <div>
            {/* Company Info Form */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full border p-2 rounded-lg mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              rows={3}
              placeholder="Company address"
              className="w-full border p-2 rounded-lg"
            />
          </div>
        )}

        {activeSection === "leave-policy" && (
          <div>
            {/* Leave Policy Settings */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Leave Days
            </label>
            <input
              type="number"
              className="w-full border p-2 rounded-lg mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carry Forward Policy
            </label>
            <select className="w-full border p-2 rounded-lg">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        )}

        {activeSection === "shift" && (
          <div>
            {/* Shift Management */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift Name
            </label>
            <input type="text" className="w-full border p-2 rounded-lg mb-4" />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timing
            </label>
            <input
              type="text"
              placeholder="9:00 AM - 6:00 PM"
              className="w-full border p-2 rounded-lg"
            />
          </div>
        )}

        {activeSection === "roles" && (
          <div>
            {/* Role Management */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name
            </label>
            <input type="text" className="w-full border p-2 rounded-lg mb-4" />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label>
                <input type="checkbox" className="mr-2" /> View Dashboard
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Manage Users
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> View Payroll
              </label>
              <label>
                <input type="checkbox" className="mr-2" /> Manage Leaves
              </label>
            </div>
          </div>
        )}

        {activeSection === "departments" && (
          <div>
            {/* Departments */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input type="text" className="w-full border p-2 rounded-lg mb-4" />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Designation
            </label>
            <input type="text" className="w-full border p-2 rounded-lg" />
          </div>
        )}

        {activeSection === "general" && (
          <div>
            {/* General Settings */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select className="w-full border p-2 rounded-lg mb-4">
              <option>Asia/Kolkata</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Format
            </label>
            <select className="w-full border p-2 rounded-lg">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRSettings;
