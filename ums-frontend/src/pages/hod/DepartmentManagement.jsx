/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Users,
  UserCheck,
  BookOpen,
  ClipboardList,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Clock,
  Layers,
} from "lucide-react";

export default function DepartmentManagement() {
  // 🧑‍🏫 Faculty Data
  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Machine Learning",
      classes: 4,
      workload: 10,
    },
    {
      id: 2,
      name: "Prof. Rajesh Mehta",
      subject: "Operating Systems",
      classes: 3,
      workload: 8,
    },
    {
      id: 3,
      name: "Dr. Meena Patel",
      subject: "Database Systems",
      classes: 5,
      workload: 12,
    },
  ]);

  // 🎓 Student Data
  const [students] = useState([
    { id: 1, name: "Amit Sharma", batch: "2021-2025", course: "B.Tech IT" },
    { id: 2, name: "Priya Das", batch: "2022-2026", course: "B.Tech IT" },
    { id: 3, name: "Ravi Singh", batch: "2023-2025", course: "MCA" },
    { id: 4, name: "Simran Kaur", batch: "2021-2023", course: "M.Tech IT" },
  ]);

  // 📚 Courses / Subjects
  const [courses, setCourses] = useState([
    { id: 1, code: "CS601", title: "Artificial Intelligence", elective: false },
    { id: 2, code: "CS602", title: "Data Science", elective: true },
    { id: 3, code: "CS603", title: "Web Technologies", elective: false },
  ]);

  // 📊 Department Stats
  const departmentStats = {
    totalStudents: students.length,
    totalFaculty: faculty.length,
    attendanceRate: 88,
    passPercentage: 91,
  };

  // ➕ Add Course
  const handleAddCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      code: "NEW" + (courses.length + 1),
      title: "New Course " + (courses.length + 1),
      elective: false,
    };
    setCourses([...courses, newCourse]);
  };

  // ✏️ Edit Course
  const handleEditCourse = (id) => {
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, title: c.title + " (Updated)" } : c
      )
    );
  };

  // 🗑️ Remove Course
  const handleRemoveCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <Layers className="w-6 h-6" />
            Departmental Management
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
            Manage department faculty, students, courses, and performance
            metrics efficiently.
          </p>
        </div>

        {/* Faculty Management */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <UserCheck className="w-5 h-5" />
            Manage Faculty Members
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Classes/Week</th>
                  <th>Workload (Hours)</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="hover:bg-base-200/60 transition">
                    <td className="font-medium">{f.name}</td>
                    <td>{f.subject}</td>
                    <td>{f.classes}</td>
                    <td>
                      <span className="badge badge-outline badge-info">
                        {f.workload} hrs
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Student Management */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" />
            Students in Department
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Course</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-base-200/60">
                    <td>{s.id}</td>
                    <td className="font-medium">{s.name}</td>
                    <td>{s.batch}</td>
                    <td>{s.course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Course Management */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Manage Courses & Electives
            </h3>
            <button
              onClick={handleAddCourse}
              className="btn btn-sm btn-primary flex items-center gap-1"
            >
              <Plus size={16} /> Add Course
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-base-200/60 transition">
                    <td>{c.code}</td>
                    <td>{c.title}</td>
                    <td>
                      {c.elective ? (
                        <span className="badge badge-warning badge-outline">
                          Elective
                        </span>
                      ) : (
                        <span className="badge badge-info badge-outline">
                          Core
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCourse(c.id)}
                          className="btn btn-xs btn-success"
                          title="Edit Course"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleRemoveCourse(c.id)}
                          className="btn btn-xs btn-error"
                          title="Remove Course"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Faculty Workload Monitoring */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" />
            Faculty Workload Monitoring
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {faculty.map((f) => (
              <div
                key={f.id}
                className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm text-center hover:shadow-md transition"
              >
                <h4 className="font-semibold text-primary">{f.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{f.subject}</p>
                <p className="text-sm text-gray-600">
                  Classes/Week: <strong>{f.classes}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Workload:{" "}
                  <span className="text-info font-semibold">
                    {f.workload} hrs
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Department Statistics */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" />
            Department Statistics
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Students</p>
              <h2 className="text-3xl font-bold text-primary">
                {departmentStats.totalStudents}
              </h2>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Faculty</p>
              <h2 className="text-3xl font-bold text-primary">
                {departmentStats.totalFaculty}
              </h2>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Attendance Rate</p>
              <h2 className="text-3xl font-bold text-blue-600">
                {departmentStats.attendanceRate}%
              </h2>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Pass Percentage</p>
              <h2 className="text-3xl font-bold text-green-600">
                {departmentStats.passPercentage}%
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
