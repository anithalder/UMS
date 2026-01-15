import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { checkAuth } from "./redux/slices/auth.slice";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // Check session on mount
  }, [dispatch]);

  return (
    <Routes>
      {/* All pages share Layout */}
      <Route path="/" element={<HomePage />} />
      <Route element={<Layout />}>
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
        <Route path="/admin" element={<Admin />} />
      </Route>

      {/* Login stays outside (no navbar/footer) */}
      <Route path="/login" element={<Login />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
