/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  Briefcase,
  Activity,
  BarChart3,
  Edit,
  Trash2,
  Plus,
  Calendar,
  Clock,
} from "lucide-react";

export default function HODDashboard() {
  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      designation: "Assistant Professor",
      subjects: ["Machine Learning", "AI Lab"],
      workload: 12,
    },
    {
      id: 2,
      name: "Prof. Anit Halder",
      designation: "Head of Department",
      subjects: ["Research Methods"],
      workload: 6,
    },
  ]);

  const [courses, setCourses] = useState([
    { code: "CS601", name: "Machine Learning", type: "Core", credits: 4 },
    { code: "CS602", name: "Data Science", type: "Elective", credits: 3 },
  ]);

  const [stats] = useState({
    totalStudents: 320,
    totalFaculty: 12,
    avgAttendance: 88,
    passPercentage: 91,
  });

  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    type: "Core",
    credits: "",
  });

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name)
      return alert("Please fill all fields!");
    setCourses([...courses, newCourse]);
    setNewCourse({ code: "", name: "", type: "Core", credits: "" });
  };

  const handleDeleteCourse = (code) => {
    setCourses(courses.filter((c) => c.code !== code));
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Departmental Management
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Oversee your department’s faculty, students, courses, and
            performance metrics.
          </p>
        </div>

        {/* Department Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              title: "Total Students",
              value: stats.totalStudents,
              icon: <Users className="w-5 h-5 text-blue-600" />,
            },
            {
              title: "Total Faculty",
              value: stats.totalFaculty,
              icon: <BookOpen className="w-5 h-5 text-green-600" />,
            },
            {
              title: "Avg. Attendance",
              value: `${stats.avgAttendance}%`,
              icon: <Calendar className="w-5 h-5 text-purple-600" />,
            },
            {
              title: "Pass Percentage",
              value: `${stats.passPercentage}%`,
              icon: <Activity className="w-5 h-5 text-red-600" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-base-100 border border-base-300 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold text-base-content">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 rounded-full bg-base-200">{stat.icon}</div>
            </div>
          ))}
        </div>

        {/* Faculty Management */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            Faculty Management
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Subjects</th>
                  <th>Workload (hrs/week)</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="hover:bg-base-200/50">
                    <td className="font-medium">{f.name}</td>
                    <td>{f.designation}</td>
                    <td>{f.subjects.join(", ")}</td>
                    <td>
                      <span className="badge badge-outline badge-info">
                        {f.workload}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Course Management */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary">
              <BookOpen className="w-5 h-5" />
              Course & Elective Management
            </h3>
            <button
              onClick={handleAddCourse}
              className="btn btn-sm btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Course
            </button>
          </div>

          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              placeholder="Course Code"
              className="input input-bordered w-full"
              value={newCourse.code}
              onChange={(e) =>
                setNewCourse({ ...newCourse, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Course Name"
              className="input input-bordered w-full"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />
            <select
              className="select select-bordered w-full"
              value={newCourse.type}
              onChange={(e) =>
                setNewCourse({ ...newCourse, type: e.target.value })
              }
            >
              <option value="Core">Core</option>
              <option value="Elective">Elective</option>
            </select>
            <input
              type="number"
              placeholder="Credits"
              className="input input-bordered w-full"
              value={newCourse.credits}
              onChange={(e) =>
                setNewCourse({ ...newCourse, credits: e.target.value })
              }
            />
          </div>

          {/* Courses Table */}
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Credits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i} className="hover:bg-base-200/50 transition">
                    <td>{c.code}</td>
                    <td>{c.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          c.type === "Elective" ? "badge-warning" : "badge-info"
                        } badge-outline`}
                      >
                        {c.type}
                      </span>
                    </td>
                    <td>{c.credits}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-error text-white"
                        onClick={() => handleDeleteCourse(c.code)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Faculty Workload Summary */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-primary">
            <Clock className="w-5 h-5" />
            Faculty Workload Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {faculty.map((f, i) => (
              <div
                key={i}
                className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm text-center hover:shadow-md transition"
              >
                <h4 className="font-semibold text-base-content">{f.name}</h4>
                <p className="text-sm text-gray-500">{f.designation}</p>
                <div className="mt-2">
                  <p className="text-sm text-blue-600">
                    Subjects: {f.subjects.length}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Workload: {f.workload} hrs/week
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
