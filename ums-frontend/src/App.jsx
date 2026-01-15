import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/auth.slice";

// Consolidated imports from barrel files
import { Layout, ProfileSettings } from "./components";
import {
  HomePage,
  Login,
  Admin,
  StudentDashboard,
  FacultyDashboard,
  FacultyAcademicManagement,
  AttendanceManagement,
  FacultyTimetable,
  ExaminationManagement,
  FacultyDocumentApproval,
  LibraryAndResources,
  FeedbackEvaluation,
  HODDashboard,
  AcademicManagement,
  HODExaminationManagement,
  DocumentApproval,
  FacultyManagement,
  AttendancePerformnceReports,
  CommunicationNotifications,
  FeedbackQualityMonitoring,
  Reports,
} from "./pages";

export default function App() {
  const dispatch = useDispatch();

  // ✅ Initialize Auth State on App Load
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Login Route (Standalone - no Layout) */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes sharing common Layout (Navbar, Sidebar, etc.) */}
      <Route element={<Layout />}>
        {/* Student Section */}
        <Route path="/student">
          <Route path="dashboard" element={<StudentDashboard />} />
        </Route>

        {/* Faculty Section */}
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

        {/* HOD Section */}
        <Route path="/hod">
          <Route path="dashboard" element={<HODDashboard />} />
          <Route path="academic" element={<AcademicManagement />} />
          <Route
            path="attendance-reports"
            element={<AttendancePerformnceReports />}
          />
          <Route path="examination" element={<HODExaminationManagement />} />
          <Route path="document" element={<DocumentApproval />} />
          <Route path="faculty-management" element={<FacultyManagement />} />
          <Route path="feedback" element={<FeedbackQualityMonitoring />} />
          <Route path="reports" element={<Reports />} />
          <Route
            path="communication-notification"
            element={<CommunicationNotifications />}
          />
        </Route>

        {/* Admin Section */}
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Fallback: Redirect unknown routes to Home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
