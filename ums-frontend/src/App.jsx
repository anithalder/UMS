import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
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
import HomePage from "./pages/HomePage";
import AcademicManagement from "./pages/hod/AcademicManagement";
import HODExaminationManagement from "./pages/hod/ExaminationManagement";
import DocumentApproval from "./pages/hod/DocumentApproval";
import FacultyManagement from "./pages/hod/FacultyManagement";
import AttendancePerformnceReports from "./pages/hod/AttendancePerformnceReports";
import CommunicationNotifications from "./pages/hod/CommunicationNotifications";
import FeedbackQualityMonitoring from "./pages/hod/FeedbackQualityMonitoring";
import Reports from "./pages/hod/Reports";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth()); // Check session on mount
  }, [dispatch]);

  return (
    <Routes>
      {/* All pages share Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/student">
          <Route path="dashboard" element={<StudentDashboard />} />
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
        <Route path="/hod">
          <Route path="dashboard" element={<HODDashboard />} />
          {/* <Route path="faculty-management" element={<FacultyManagement />} /> */}
          {/* <Route path="course-management" element={<CourseManagement />} /> */}
          {/* <Route path="reports" element={<HODReports />} /> */}
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
