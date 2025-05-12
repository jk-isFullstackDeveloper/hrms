import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import './index.css';
import Login from "./app/auth/Login/Index";
import Signup from "./app/auth/Signup";
import ForgotPassword from "./app/auth/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

// Layouts
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import AdminDashboard from "./app/admin/AdminDashboard";
import Employees from "./app/admin/Employees";
import Departments from "./app/admin/Departments";
import LeaveManagement from "./app/admin/LeaveManagement";
import Attendance from "./app/admin/Attendance";
import Payroll from "./app/admin/Payroll";
import Recruitment from "./app/admin/Recruitment";
import Reports from "./app/admin/Reports";
import AdminSettings from "./app/admin/Settings";

// HR Pages
import HRDashboard from "./app/hr/HRDashboard";
import HREmployees from "./app/hr/Employees";
import HRLeaves from "./app/hr/Leave";
import HRAttendance from "./app/hr/AttendanceLogs";
import HRPayroll from "./app/hr/Payroll";
import HRRecruitment from "./app/hr/Recruitment";
import HRDocuments from "./app/hr/Documents";
import HRSettings from "./app/hr/Settings";

// Manager Pages
import ManagerDashboard from "./app/manager/Dashboard";
import ManagerTeam from "./app/manager/MyTeam";
import ManagerLeaves from "./app/manager/LeaveRequests";
import ManagerAttendance from "./app/manager/Attendance";
import PerformanceReviews from "./app/manager/Performance";
import ManagerReports from "./app/manager/Reports";

// Employee Pages
import EmployeeDashboard from "./app/employee/Dashboard";
import Profile from "./app/employee/Profile";
import MyLeaves from "./app/employee/MyLeaves";
import MyAttendance from "./app/employee/MyAttendance";
import Payslips from "./app/employee/Payslips";
import MyDocuments from "./app/employee/Documents";
import EmployeeSettings from "./app/employee/Settings";

//Chat
import Chat from "./app/chat/ChatApp";


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="leaves" element={<LeaveManagement />} />
          <Route path="chat" element={<Chat />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* HR Routes */}
        <Route path="/hr" element={<ProtectedRoute allowedRoles={["hr"]} ><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="employees" element={<HREmployees />} />
          <Route path="leaves" element={<HRLeaves />} />
          <Route path="chat" element={<Chat />} />
          <Route path="attendance" element={<HRAttendance />} />
          <Route path="payroll" element={<HRPayroll />} />
          <Route path="recruitment" element={<HRRecruitment />} />
          <Route path="documents" element={<HRDocuments />} />
          <Route path="settings" element={<HRSettings />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={<ProtectedRoute allowedRoles={["manager"]} ><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="team" element={<ManagerTeam />} />
          <Route path="chat" element={<Chat />} />
          <Route path="leaves" element={<ManagerLeaves />} />
          <Route path="attendance" element={<ManagerAttendance />} />
          <Route path="performance" element={<PerformanceReviews />} />
          <Route path="reports" element={<ManagerReports />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={<ProtectedRoute allowedRoles={["employee"]} ><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="leaves" element={<MyLeaves />} />
          <Route path="chat" element={<Chat />} />
          <Route path="attendance" element={<MyAttendance />} />
          <Route path="payroll" element={<Payslips />} />
          <Route path="documents" element={<MyDocuments />} />
          <Route path="settings" element={<EmployeeSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
