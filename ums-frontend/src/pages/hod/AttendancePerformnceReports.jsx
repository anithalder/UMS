import React, { useState, useMemo } from "react";
import {
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  User,
  Users,
  ClipboardList,
  FileBarChart,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AttendancePerformnceReports() {
  // 🔐 Simulated logged-in HOD department
  const [hodDepartment] = useState("IT"); // Change to "IT" or "CSE" to test

  // 🧍 Student Attendance Data
  const [students] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      course: "B.Tech CSE",
      subject: "AI",
      attendance: 92,
    },
    {
      id: 2,
      name: "Priya Das",
      course: "M.Tech IT",
      subject: "Cloud Computing",
      attendance: 76,
    },
    {
      id: 3,
      name: "Ravi Singh",
      course: "B.Tech CSE",
      subject: "DBMS",
      attendance: 58,
    },
    {
      id: 4,
      name: "Sneha Roy",
      course: "MCA",
      subject: "Software Engg.",
      attendance: 82,
    },
    {
      id: 5,
      name: "Arjun Mehta",
      course: "B.Tech IT",
      subject: "OS",
      attendance: 61,
    },
    {
      id: 6,
      name: "Simran Kaur",
      course: "M.Sc. Computer Science",
      subject: "AI Tools",
      attendance: 90,
    },
  ]);

  // 👩‍🏫 Faculty Attendance Entry Data
  const [facultyReports] = useState([
    {
      id: 1,
      faculty: "Dr. Sarah Johnson",
      subject: "AI",
      entries: 24,
      verified: true,
    },
    {
      id: 2,
      faculty: "Prof. Rajesh Mehta",
      subject: "DBMS",
      entries: 21,
      verified: false,
    },
    {
      id: 3,
      faculty: "Dr. Meena Patel",
      subject: "OS",
      entries: 23,
      verified: true,
    },
  ]);

  // 🎓 Department-based program mapping (HOD-wise filter)
  const departmentPrograms = {
    IT: ["B.Tech IT", "M.Tech IT", "MCA"],
    CSE: ["B.Tech CSE", "M.Tech CSE", "M.Sc. Computer Science"],
  };

  // 📊 Mock performance summaries for all departments
  const allPerformanceSummaries = [
    { course: "B.Tech CSE", avgCGPA: 8.42, avgMarks: 82, totalStudents: 120 },
    { course: "M.Tech CSE", avgCGPA: 8.16, avgMarks: 78, totalStudents: 65 },
    {
      course: "M.Sc. Computer Science",
      avgCGPA: 8.01,
      avgMarks: 76,
      totalStudents: 48,
    },
    { course: "B.Tech IT", avgCGPA: 8.11, avgMarks: 79, totalStudents: 98 },
    { course: "M.Tech IT", avgCGPA: 7.95, avgMarks: 75, totalStudents: 54 },
    { course: "MCA", avgCGPA: 8.05, avgMarks: 77, totalStudents: 72 },
  ];

  // 🧠 Filtered summaries for the logged-in HOD department
  const filteredSummaries = useMemo(() => {
    const allowed = departmentPrograms[hodDepartment] || [];
    return allPerformanceSummaries.filter((s) => allowed.includes(s.course));
  }, [hodDepartment]);

  // 📈 Attendance Comparison Chart (only department subjects)
  const attendanceByClass = {
    labels: students
      .filter((s) =>
        departmentPrograms[hodDepartment]?.some((course) =>
          s.course.includes(course)
        )
      )
      .map((s) => s.subject),
    datasets: [
      {
        label: "Average Attendance (%)",
        data: students
          .filter((s) =>
            departmentPrograms[hodDepartment]?.some((course) =>
              s.course.includes(course)
            )
          )
          .map((s) => s.attendance),
        backgroundColor: ["#2563eb", "#3b82f6", "#60a5fa", "#1d4ed8"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Attendance & Performance Reports ({hodDepartment} Department)
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
            View consolidated attendance and performance insights specific to
            your department programs.
          </p>
        </div>

        {/* Consolidated Attendance Report */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" />
            Consolidated Student Attendance
          </h3>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Subject</th>
                  <th>Attendance (%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students
                  .filter((s) =>
                    departmentPrograms[hodDepartment]?.includes(s.course)
                  )
                  .map((s) => (
                    <tr
                      key={s.id}
                      className={`${
                        s.attendance < 65
                          ? "bg-red-50/60"
                          : "hover:bg-base-200/60"
                      }`}
                    >
                      <td>{s.id}</td>
                      <td className="font-medium">{s.name}</td>
                      <td>{s.course}</td>
                      <td>{s.subject}</td>
                      <td>{s.attendance}%</td>
                      <td>
                        {s.attendance < 65 ? (
                          <span className="badge badge-error badge-outline flex items-center gap-1">
                            <AlertTriangle size={14} /> Low
                          </span>
                        ) : (
                          <span className="badge badge-success badge-outline">
                            Good
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Attendance Comparison */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5" />
            Attendance Comparison (Subjects)
          </h3>
          <div className="w-full max-w-3xl mx-auto">
            <Bar
              data={attendanceByClass}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </section>

        {/* Faculty Attendance Verification */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <User className="w-5 h-5" />
            Faculty Attendance Verification
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Total Entries</th>
                  <th>Verification</th>
                </tr>
              </thead>
              <tbody>
                {facultyReports.map((f) => (
                  <tr key={f.id} className="hover:bg-base-200/60 transition">
                    <td>{f.faculty}</td>
                    <td>{f.subject}</td>
                    <td>{f.entries}</td>
                    <td>
                      {f.verified ? (
                        <span className="badge badge-success badge-outline flex items-center gap-1">
                          <CheckCircle2 size={14} /> Verified
                        </span>
                      ) : (
                        <span className="badge badge-warning badge-outline flex items-center gap-1">
                          <AlertTriangle size={14} /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Performance Summaries (Department-filtered) */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <FileBarChart className="w-5 h-5" />
            Departmental Performance Summaries (CGPA & Marks)
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredSummaries.map((p, index) => (
              <div
                key={index}
                className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-primary font-semibold text-lg mb-2">
                  {p.course}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Average CGPA:</strong> {p.avgCGPA}
                  </p>
                  <p>
                    <strong>Average Marks:</strong> {p.avgMarks}%
                  </p>
                  <p>
                    <strong>Total Students:</strong> {p.totalStudents}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
