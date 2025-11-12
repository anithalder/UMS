import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import StudentDashboard from "./pages/student/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import ProfileSettings from "./components/ProfileSettings";
import FacultyAcademicManagement from "./pages/faculty/FacultyAcademicManagement";
import AttendanceManagement from "./pages/faculty/AttendanceManagement";
import FacultyTimetable from "./pages/faculty/FacultyTimetable";
import ExaminationManagement from "./pages/faculty/ExaminationManagement";
import FacultyDocumentApproval from "./pages/faculty/FacultyDocumentApproval";
import LibraryAndResources from "./pages/faculty/LibraryAndResources";
import FeedbackEvaluation from "./pages/faculty/FeedbackEvaluation";
import HODDashboard from "./pages/hod/HODDashboard";

export default function App() {
  return (
    <Routes>
      {/* All pages share Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/student">
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>
        <Route path="/faculty">
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="academic" element={<FacultyAcademicManagement />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="timetable" element={<FacultyTimetable />} />
          <Route path="examination" element={<ExaminationManagement />} />
          <Route path="documents" element={<FacultyDocumentApproval />} />
          <Route path="library" element={<LibraryAndResources />} />
          <Route path="feedback" element={<FeedbackEvaluation />} />
        </Route>
        <Route path="/hod">
          <Route path="dashboard" element={<HODDashboard />} />
          {/* <Route path="faculty-management" element={<FacultyManagement />} /> */}
          {/* <Route path="course-management" element={<CourseManagement />} /> */}
          {/* <Route path="reports" element={<HODReports />} /> */}
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Login stays outside (no navbar/footer) */}
      <Route path="/login" element={<Login />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
