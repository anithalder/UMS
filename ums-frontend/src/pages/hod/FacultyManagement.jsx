import React, { useState } from "react";
import {
  UserCheck,
  ClipboardList,
  CalendarCheck,
  BarChart3,
  Clock,
  UserPlus,
  CheckCircle2,
  XCircle,
  BookOpen,
  Shield,
  Brain,
} from "lucide-react";

export default function FacultyManagement() {
  // 🧑‍🏫 Mock Faculty Data
  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Machine Learning",
      approved: false,
      attendanceRate: 92,
      performanceScore: 4.6,
      feedback: "Excellent teaching clarity and student interaction.",
      onLeave: false,
    },
    {
      id: 2,
      name: "Prof. Amit Sharma",
      subject: "Database Systems",
      approved: true,
      attendanceRate: 87,
      performanceScore: 4.1,
      feedback: "Strong practical focus, can improve theoretical explanations.",
      onLeave: true,
    },
    {
      id: 3,
      name: "Dr. Meena Patel",
      subject: "Web Technologies",
      approved: true,
      attendanceRate: 95,
      performanceScore: 4.8,
      feedback: "Highly engaging lectures and consistent class schedules.",
      onLeave: false,
    },
  ]);

  const [substitutes, setSubstitutes] = useState([
    {
      id: 1,
      absentFaculty: "Prof. Amit Sharma",
      substitute: "Dr. Sarah Johnson",
      date: "2025-11-13",
    },
  ]);

  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: "Advanced AI Pedagogy",
      recommendedBy: "HOD",
      faculty: "Dr. Meena Patel",
    },
  ]);

  // ✅ Approve Faculty Profile
  const handleApprove = (id) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, approved: true } : f))
    );
  };

  // ❌ Reject Faculty Profile
  const handleReject = (id) => {
    setFaculty((prev) =>
      prev.map((f) => (f.id === id ? { ...f, approved: false } : f))
    );
  };

  // ➕ Add Substitute Arrangement
  const handleAddSubstitute = () => {
    const newSub = {
      id: substitutes.length + 1,
      absentFaculty: "Prof. New Faculty",
      substitute: "Dr. Substitute",
      date: "2025-11-15",
    };
    setSubstitutes([...substitutes, newSub]);
  };

  // ➕ Recommend Training
  const handleAddTraining = () => {
    const newTraining = {
      id: trainings.length + 1,
      title: "Faculty Development on Cloud Computing",
      recommendedBy: "HOD",
      faculty: "Prof. Amit Sharma",
    };
    setTrainings([...trainings, newTraining]);
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <UserCheck className="w-6 h-6" />
            Faculty Management
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Approve, monitor, and evaluate faculty members — ensure academic
            quality and smooth departmental operations.
          </p>
        </div>

        {/* Faculty Approval & Monitoring */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5" />
            Faculty Approval & Teaching Monitoring
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Approval Status</th>
                  <th>Attendance Rate</th>
                  <th>Performance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="hover:bg-base-200/60 transition">
                    <td className="font-medium">{f.name}</td>
                    <td>{f.subject}</td>
                    <td>
                      {f.approved ? (
                        <span className="badge badge-success badge-outline">
                          Approved
                        </span>
                      ) : (
                        <span className="badge badge-warning badge-outline">
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          f.attendanceRate >= 90
                            ? "badge-success"
                            : f.attendanceRate >= 80
                            ? "badge-warning"
                            : "badge-error"
                        } badge-outline`}
                      >
                        {f.attendanceRate}%
                      </span>
                    </td>
                    <td>⭐ {f.performanceScore.toFixed(1)} / 5</td>
                    <td>
                      <div className="flex gap-2">
                        {!f.approved && (
                          <button
                            onClick={() => handleApprove(f.id)}
                            className="btn btn-xs btn-success"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                        )}
                        {f.approved && (
                          <button
                            onClick={() => handleReject(f.id)}
                            className="btn btn-xs btn-error"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Teaching & Feedback Review */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" />
            Faculty Feedback & Evaluation
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {faculty.map((f) => (
              <div
                key={f.id}
                className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold text-primary">{f.name}</h4>
                <p className="text-sm text-gray-500 mb-1">{f.subject}</p>
                <p className="text-sm text-gray-600 italic mb-2">
                  “{f.feedback}”
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Performance: ⭐ {f.performanceScore}/5
                  </span>
                  <span
                    className={`badge ${
                      f.performanceScore >= 4.5
                        ? "badge-success"
                        : f.performanceScore >= 4
                        ? "badge-warning"
                        : "badge-error"
                    } badge-outline`}
                  >
                    {f.performanceScore >= 4.5
                      ? "Excellent"
                      : f.performanceScore >= 4
                      ? "Good"
                      : "Needs Improvement"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Substitute Arrangements */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Substitute Arrangements
            </h3>
            <button
              onClick={handleAddSubstitute}
              className="btn btn-sm btn-primary flex items-center gap-2"
            >
              <UserPlus size={14} /> Add Substitute
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Absent Faculty</th>
                  <th>Substitute</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {substitutes.map((s) => (
                  <tr key={s.id} className="hover:bg-base-200/50">
                    <td>{s.absentFaculty}</td>
                    <td>{s.substitute}</td>
                    <td>{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Training Recommendations */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Training & Development Programs
            </h3>
            <button
              onClick={handleAddTraining}
              className="btn btn-sm btn-primary flex items-center gap-2"
            >
              <Shield size={14} /> Recommend Training
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Program Title</th>
                  <th>Faculty</th>
                  <th>Recommended By</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((t) => (
                  <tr key={t.id} className="hover:bg-base-200/50">
                    <td>{t.title}</td>
                    <td>{t.faculty}</td>
                    <td>{t.recommendedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
