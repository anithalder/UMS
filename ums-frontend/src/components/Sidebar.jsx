/* eslint-disable no-unused-vars */
import React, { use, useState } from "react";
import {
  Dashboard,
  Person,
  Book,
  Payment,
  Receipt,
  EventNote,
  Calculate,
  Groups,
  Assessment,
  VideoLibrary,
  LibraryBooks,
  Feedback,
  Description,
  CalendarMonth,
  School,
  BarChart,
  Settings,
  People,
  AccountBalance,
  Folder,
  Assignment,
  Menu,
} from "@mui/icons-material";

import { FileText, Video, Layers, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  // Role-based menu configuration using MUI icons

  const menuItems = {
    // 👨‍🎓 STUDENT MODULE
    student: [
      { label: "Dashboard", icon: <Dashboard />, to: "/student/dashboard" },
      { label: "Profile", icon: <Person />, to: "/student/profile" },
      { label: "My Courses", icon: <Book />, to: "/student/courses" },
      { label: "Assignments", icon: <FileText />, to: "/student/assignments" },
      { label: "Results", icon: <Receipt />, to: "/student/results" },
      { label: "Payments", icon: <Payment />, to: "/student/payments" },
      {
        label: "Recorded Lectures",
        icon: <VideoLibrary />,
        to: "/student/lectures",
      },
      {
        label: "Library Access",
        icon: <LibraryBooks />,
        to: "/student/library",
      },
      {
        label: "Feedback & Evaluation",
        icon: <Feedback />,
        to: "/student/feedback",
      },
    ],

    // 👩‍🏫 FACULTY MODULE
    faculty: [
      { label: "Dashboard", icon: <Dashboard />, to: "/faculty/dashboard" },
      // { label: "Profile", icon: <Person />, to: "/faculty/profile" },
      {
        label: "Academic Management",
        icon: <Layers />,
        to: "/faculty/academic",
      },
      {
        label: "Attendance Management",
        icon: <EventNote />,
        to: "/faculty/attendance",
      },
      {
        label: "Timetable",
        icon: <CalendarMonth />,
        to: "/faculty/timetable",
      },
      {
        label: "Examinations",
        icon: <Calculate />,
        to: "/faculty/exams",
      },
      {
        label: "Document Approvals",
        icon: <Description />,
        to: "/faculty/documents",
      },
      {
        label: "Library & Resources",
        icon: <LibraryBooks />,
        to: "/faculty/library",
      },
      {
        label: "Feedback & Evaluation",
        icon: <Feedback />,
        to: "/faculty/feedback",
      },
      {
        label: "Student Overview",
        icon: <Groups />,
        to: "/faculty/students",
      },
      { label: "Reports", icon: <Assessment />, to: "/faculty/reports" },
    ],

    // 🎓 HOD MODULE
    hod: [
      { label: "Dashboard", icon: <Dashboard />, to: "/hod/dashboard" },
      { label: "Profile", icon: <Person />, to: "/hod/profile" },
      {
        label: "Departmental Management",
        icon: <School />,
        to: "/hod/department",
      },
      {
        label: "Faculty Management",
        icon: <UserCheck />,
        to: "/hod/faculty",
      },
      {
        label: "Course Monitoring",
        icon: <Book />,
        to: "/hod/courses",
      },
      {
        label: "Performance Analytics",
        icon: <BarChart />,
        to: "/hod/performance",
      },
      {
        label: "Attendance Overview",
        icon: <EventNote />,
        to: "/hod/attendance",
      },
      {
        label: "Department Reports",
        icon: <Assessment />,
        to: "/hod/reports",
      },
    ],

    // 🧑‍💼 ADMIN MODULE
    admin: [
      { label: "Dashboard", icon: <Dashboard />, to: "/admin/dashboard" },
      { label: "User Management", icon: <People />, to: "/admin/users" },
      {
        label: "Department Config",
        icon: <School />,
        to: "/admin/departments",
      },
      {
        label: "Finance & Payments",
        icon: <Payment />,
        to: "/admin/payments",
      },
      {
        label: "System Settings",
        icon: <Settings />,
        to: "/admin/config",
      },
      {
        label: "Reports & Logs",
        icon: <Assessment />,
        to: "/admin/reports",
      },
    ],

    // 🏛️ MANAGEMENT MODULE
    management: [
      { label: "Dashboard", icon: <Dashboard />, to: "/management/dashboard" },
      {
        label: "Finance Management",
        icon: <AccountBalance />,
        to: "/management/finance",
      },
      {
        label: "Exam Records",
        icon: <Assignment />,
        to: "/management/exams",
      },
      {
        label: "Department Records",
        icon: <Folder />,
        to: "/management/records",
      },
      {
        label: "Analytics & Reports",
        icon: <BarChart />,
        to: "/management/reports",
      },
      {
        label: "Staff Overview",
        icon: <People />,
        to: "/management/staff",
      },
    ],
  };

  const [role, setRole] = useState("hod");
  const activeMenu = menuItems[role] || [];
  const navigate = useNavigate();

  return (
    <div>
      <div className="drawer drawer-open sticky top-0 h-screen ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar */}
          <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-100 flex flex-col items-start transition-all duration-300 sticky bottom-0 min-h-screen">
            <ul className="menu w-full grow">
              {activeMenu.map((item, index) => (
                <li key={index}>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 w-full px-4 py-2 hover:bg-royalblue hover:text-white rounded-lg"
                    data-tip={item.label}
                    onClick={() => navigate(item.to)}
                  >
                    <span className="inline-block size-5">{item.icon}</span>
                    <span className="is-drawer-close:hidden">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Toggle Button */}
            <div
              className="m-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Toggle"
            >
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180"
              >
                <Menu className="inline-block size-5 my-1.5" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
