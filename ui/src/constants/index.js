import {
    MdOutlineDashboardCustomize,
    MdGroups,
    MdApartment,
    MdEventNote,
    MdCalendarToday,
    MdAttachMoney,
    MdWorkOutline,
    MdBarChart,
    MdSettings,
    MdFolder,
    MdPerson,
    MdPeople,
    MdLeaderboard,
    MdChat
} from "react-icons/md";

const menuConfig = {
    admin: [
        { to: "/admin/dashboard", icon: MdOutlineDashboardCustomize, label: "Dashboard" },
        { to: "/admin/employees", icon: MdGroups, label: "Employees" },
        { to: "/admin/departments", icon: MdApartment, label: "Departments" },
        { to: "/admin/leaves", icon: MdEventNote, label: "Leave Management" },
        { to: "/admin/chat", icon: MdChat, label: "Chat" },
        { to: "/admin/attendance", icon: MdCalendarToday, label: "Attendance" },
        { to: "/admin/payroll", icon: MdAttachMoney, label: "Payroll" },
        { to: "/admin/recruitment", icon: MdWorkOutline, label: "Recruitment" },
        { to: "/admin/reports", icon: MdBarChart, label: "Reports" },
        { to: "/admin/settings", icon: MdSettings, label: "Settings" },
    ],
    hr: [
        { to: "/hr/dashboard", icon: MdOutlineDashboardCustomize, label: "Dashboard" },
        { to: "/hr/employees", icon: MdGroups, label: "Employee" },
        { to: "/hr/leaves", icon: MdEventNote, label: "Leave" },
        { to: "/hr/attendance", icon: MdCalendarToday, label: "Attendance" },
        { to: "/hr/chat", icon: MdChat, label: "Chat" },
        { to: "/hr/payroll", icon: MdAttachMoney, label: "Payroll" },
        { to: "/hr/recruitment", icon: MdWorkOutline, label: "Hiring" },
        { to: "/hr/documents", icon: MdFolder, label: "Documents" },
        { to: "/hr/settings", icon: MdSettings, label: "Settings" },
    ],
    manager: [
        { to: "/manager/dashboard", icon: MdOutlineDashboardCustomize, label: "Dashboard" },
        { to: "/manager/team", icon: MdPeople, label: "Team" },
        { to: "/manager/leaves", icon: MdEventNote, label: "Leave Requests" },
        { to: "/manager/attendance", icon: MdCalendarToday, label: "Attendance" },
        { to: "/manager/chat", icon: MdChat, label: "Chat" },
        { to: "/manager/performance", icon: MdLeaderboard, label: "Performance Reviews" },
        { to: "/manager/reports", icon: MdBarChart, label: "Reports" },
    ],
    employee: [
        { to: "/employee/dashboard", icon: MdOutlineDashboardCustomize, label: "Dashboard" },
        { to: "/employee/leaves", icon: MdEventNote, label: "Leaves" },
        { to: "/employee/attendance", icon: MdCalendarToday, label: "Attendance" },
        { to: "/employee/payroll", icon: MdAttachMoney, label: "Payslips" },
        { to: "/employee/chat", icon: MdChat, label: "Chat" },
        { to: "/employee/documents", icon: MdFolder, label: "Documents" },
        { to: "/employee/profile", icon: MdPerson, label: "Profile" },
        { to: "/employee/settings", icon: MdSettings, label: "Settings" },
    ],
};

export default menuConfig;
