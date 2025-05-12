import React, { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import Upgrade from "../components/Upgrade";
import { useAuth } from "../context/AuthContext";
import { FaBeer } from "react-icons/fa";
import IconRenderer from "../components/IconRenderer";

import { User, LogOut, CalendarDays, MessageSquareText, UserCheck } from "lucide-react";


const AdminLayout = ({ menu }) => {
  const location = useLocation();
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const path = location?.pathname?.split("/")[2]

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-violet-700 text-white p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"} fixed h-full`}
      >
        <div className="flex justify-between items-center mb-4">
          {!isCollapsed && <h4 className="text-lg font-bold capitalize">{user?.role}</h4>}
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FaBeer />
          </button>
        </div>
        <nav>
          {menu.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={`${to}`}
              className={`${path === to?.split("/")[2] ? "bg-violet-500" : ""} flex items-center gap-2 p-2 rounded-md text-sm font-semibold text-white hover:bg-violet-500 hover:text-white transition`}
            >
              <IconRenderer icon={icon} />
              {!isCollapsed && <span className="text-xs">{label}</span>}
            </Link>
          ))}
        </nav>
        <Upgrade isCollapsed={isCollapsed} />
      </aside>
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
        {/* Navbar */}
        <nav className="bg-violet-700 text-white flex items-center justify-between p-4 fixed w-full top-0  h-16 shadow-md">
          <button className="md:hidden text-white" onClick={() => setIsCollapsed(!isCollapsed)}>
            ☰
          </button>
          <span className="ml-3 font-semibold capitalize">{user?.role} Dashboard</span>

          {/* Right Icons (Notifications & Profile) */}
          <div className={`flex items-center gap-6 relative transition-all duration-300 ${isCollapsed ? "mr-20" : "mr-64"}`}>
            {/* Notification Bell */}
            <div ref={notifRef} className="relative">
              <button
                className="relative w-10 h-10 text-white p-4 hover:bg-white hover:text-blue-600 rounded-full transition flex items-center justify-center"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
              >
                🔔
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {isNotifOpen && (
                <div className="absolute border border-2 border-gray-200 right-0 top-full mt-2 min-w-[250px] bg-white text-black shadow-lg rounded-lg z-50">
                  <h4 className="text-center font-bold p-3 border-b">Notifications</h4>
                  <ul className="p-2 space-y-1">
                    <li className="flex items-center gap-2 p-2 font-semibold text-xs hover:bg-gray-100 cursor-pointer">
                      <CalendarDays className="w-4 h-4 text-blue-500" />
                      New Notification
                    </li>
                    <li className="flex items-center gap-2 p-2 font-semibold text-xs hover:bg-gray-100 cursor-pointer">
                      <MessageSquareText className="w-4 h-4 text-green-500" />
                      New Message
                    </li>
                    <li className="flex items-center gap-2 p-2 font-semibold text-xs hover:bg-gray-100 cursor-pointer">
                      <UserCheck className="w-4 h-4 text-purple-500" />
                      Profile Updated
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                className="flex items-center  bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-gray-200 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${user?.role}`}
                  alt="Profile Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute border border-2 border-gray-200 right-0 top-full mt-2 min-w-[200px] bg-white text-black shadow-lg rounded-lg z-50">
                  <div className="p-4 flex items-center">
                    <img
                      src={`https://i.pravatar.cc/100?img=${user?.role}`}
                      alt="Profile Avatar"
                      className="rounded-full w-10 h-10 mr-2"
                    />
                    <div>
                      <p className=" font-semibold text-xs capitalize">{user?.role}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <hr />
                  <Link to="/admin/profile" className="flex items-center  block px-4 py-2 font-semibold text-xs hover:bg-gray-100">
                    <User className="w-4 h-4 mr-2" />Profile
                  </Link>
                  <button onClick={() => logout()} className="flex items-center w-full text-left font-semibold text-xs px-4 py-2 text-red-600 hover:bg-gray-100">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
