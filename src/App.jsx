import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";

// Student
import StudentDashboard from "./pages/student/StudentDashboard";

// Faculty
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import ProfileSettings from "./components/ProfileSettings";
import FacultyAcademicManagement from "./pages/faculty/FacultyAcademicManagement";
import AttendanceManagement from "./pages/faculty/AttendanceManagement";
import FacultyTimetable from "./pages/faculty/FacultyTimetable";
import ExaminationManagement from "./pages/faculty/ExaminationManagement";
import FacultyDocumentApproval from "./pages/faculty/FacultyDocumentApproval";
import LibraryAndResources from "./pages/faculty/LibraryAndResources";
import FeedbackEvaluation from "./pages/faculty/FeedbackEvaluation";

// HOD
import HODDashboard from "./pages/hod/HODDashboard";

// Admin
import Admin from "./pages/admin/Admin";

export default function App() {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<Layout />}>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Student Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["STUDENT"]} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>

        {/* Faculty Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["FACULTY"]} />}>
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/profile" element={<ProfileSettings />} />
          <Route
            path="/faculty/academic"
            element={<FacultyAcademicManagement />}
          />
          <Route
            path="/faculty/attendance"
            element={<AttendanceManagement />}
          />
          <Route path="/faculty/timetable" element={<FacultyTimetable />} />
          <Route
            path="/faculty/examination"
            element={<ExaminationManagement />}
          />
          <Route
            path="/faculty/documents"
            element={<FacultyDocumentApproval />}
          />
          <Route path="/faculty/library" element={<LibraryAndResources />} />
          <Route path="/faculty/feedback" element={<FeedbackEvaluation />} />
        </Route>

        {/* HOD Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["HOD"]} />}>
          <Route path="/hod/dashboard" element={<HODDashboard />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>

      {/* Login Route – no Layout */}
      <Route path="/login" element={<Login />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
