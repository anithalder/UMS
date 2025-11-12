import React, { useState } from "react";
import {
  BarChart3,
  ClipboardCheck,
  ThumbsUp,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileText,
  CalendarDays,
  Star,
} from "lucide-react";

export default function FeedbackQualityMonitoring() {
  // 🧑‍🎓 Mock Feedback Data
  const [feedbackData] = useState([
    {
      id: 1,
      faculty: "Dr. Sarah Johnson",
      subject: "Machine Learning",
      avgRating: 4.6,
      strengths: "Engaging lectures, clear explanations",
      improvement: "More hands-on sessions needed",
    },
    {
      id: 2,
      faculty: "Prof. Amit Sharma",
      subject: "Database Systems",
      avgRating: 4.1,
      strengths: "Good practical insights",
      improvement: "Pace of teaching can be improved",
    },
    {
      id: 3,
      faculty: "Dr. Meena Patel",
      subject: "Web Technologies",
      avgRating: 4.9,
      strengths: "Highly interactive and clear content delivery",
      improvement: "Almost perfect!",
    },
  ]);

  // 🧾 Evaluation Records
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      faculty: "Dr. Sarah Johnson",
      date: "2025-11-01",
      score: 95,
      remarks: "Excellent teaching quality and continuous improvement.",
    },
  ]);

  // ➕ Add Evaluation Record
  const handleAddEvaluation = () => {
    const newEval = {
      id: evaluations.length + 1,
      faculty: "Prof. Amit Sharma",
      date: new Date().toISOString().slice(0, 10),
      score: 88,
      remarks: "Shows improvement in class engagement and punctuality.",
    };
    setEvaluations([...evaluations, newEval]);
  };

  // 📊 Quality Report Data (for accreditation)
  const qualityReport = {
    deptName: "Information Technology",
    avgDeptRating: 4.53,
    facultyEvaluated: 12,
    reportsGenerated: 3,
    lastReview: "2025-10-30",
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6" />
            Feedback & Quality Monitoring
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Monitor faculty performance, track student feedback, and generate
            quality reports for continuous academic improvement.
          </p>
        </div>

        {/* 📊 Student Feedback Overview */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <Users className="w-5 h-5" />
            Student Feedback Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Avg. Rating</th>
                  <th>Strengths</th>
                  <th>Improvement Areas</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((f) => (
                  <tr key={f.id} className="hover:bg-base-200/60 transition">
                    <td className="font-medium">{f.faculty}</td>
                    <td>{f.subject}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{f.avgRating}</span>
                      </div>
                    </td>
                    <td>{f.strengths}</td>
                    <td>{f.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 💬 Feedback Summary & Improvement */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <ThumbsUp className="w-5 h-5" />
            Feedback Summary to Faculty
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {feedbackData.map((f) => (
              <div
                key={f.id}
                className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <h4 className="font-semibold text-primary">{f.faculty}</h4>
                <p className="text-sm text-gray-500 mb-1">{f.subject}</p>
                <p className="text-sm text-gray-600 italic">
                  “{f.improvement}”
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-400">Avg. Rating:</span>
                  <span className="badge badge-outline badge-success">
                    {f.avgRating} / 5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🧾 Faculty Evaluation Records */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Faculty Evaluation Records
            </h3>
            <button
              onClick={handleAddEvaluation}
              className="btn btn-sm btn-primary flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Add Evaluation
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Faculty</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((e) => (
                  <tr key={e.id} className="hover:bg-base-200/50 transition">
                    <td>{e.faculty}</td>
                    <td>{e.date}</td>
                    <td>
                      <span
                        className={`badge ${
                          e.score >= 90
                            ? "badge-success"
                            : e.score >= 80
                            ? "badge-warning"
                            : "badge-error"
                        } badge-outline`}
                      >
                        {e.score}%
                      </span>
                    </td>
                    <td>{e.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 🏫 Department Quality Report */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" />
            Departmental Quality Report (Accreditation)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-base-200 border border-base-300 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Department Name</p>
              <h4 className="text-lg font-semibold">
                {qualityReport.deptName}
              </h4>
            </div>
            <div className="bg-base-200 border border-base-300 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Average Department Rating</p>
              <h4 className="text-lg font-semibold text-primary">
                ⭐ {qualityReport.avgDeptRating}
              </h4>
            </div>
            <div className="bg-base-200 border border-base-300 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Faculty Evaluated</p>
              <h4 className="text-lg font-semibold">
                {qualityReport.facultyEvaluated}
              </h4>
            </div>
            <div className="bg-base-200 border border-base-300 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Reports Generated</p>
              <h4 className="text-lg font-semibold text-indigo-600">
                {qualityReport.reportsGenerated}
              </h4>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-gray-400" />
            Last Reviewed on: {qualityReport.lastReview}
          </p>
        </section>
      </div>
    </div>
  );
}
