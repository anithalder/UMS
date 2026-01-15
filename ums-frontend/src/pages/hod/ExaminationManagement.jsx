/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FileText,
  ClipboardCheck,
  CalendarDays,
  CheckCircle2,
  XCircle,
  BarChart3,
  FileBarChart,
  User,
  Users,
  ClipboardList,
} from "lucide-react";

export default function HODExaminationManagement() {
  // 🧾 Mock Data for Faculty Paper Submissions
  const [examPapers, setExamPapers] = useState([
    {
      id: 1,
      faculty: "Dr. Sarah Johnson",
      subject: "Artificial Intelligence",
      status: "Pending",
    },
    {
      id: 2,
      faculty: "Prof. Rajesh Mehta",
      subject: "Data Structures",
      status: "Approved",
    },
    {
      id: 3,
      faculty: "Dr. Meena Patel",
      subject: "Operating Systems",
      status: "Rejected",
    },
  ]);

  // 📅 Exam Timetables
  const [timetables, setTimetables] = useState([
    {
      id: 1,
      subject: "AI",
      date: "2025-12-01",
      time: "10:00 AM - 12:00 PM",
      verified: true,
    },
    {
      id: 2,
      subject: "DSA",
      date: "2025-12-03",
      time: "02:00 PM - 04:00 PM",
      verified: false,
    },
    {
      id: 3,
      subject: "OS",
      date: "2025-12-05",
      time: "10:00 AM - 12:00 PM",
      verified: true,
    },
  ]);

  // 📊 Internal Assessment Data
  const [internalMarks] = useState([
    { id: 1, student: "Amit Sharma", subject: "AI", marks: 18, total: 20 },
    { id: 2, student: "Priya Das", subject: "DSA", marks: 15, total: 20 },
    { id: 3, student: "Ravi Singh", subject: "OS", marks: 12, total: 20 },
  ]);

  // 📄 Exam Results Summary
  const [examResults] = useState([
    { course: "B.Tech CSE", passPercentage: 92, avgMarks: 78 },
    { course: "M.Tech CSE", passPercentage: 89, avgMarks: 75 },
    { course: "M.Sc. Computer Science", passPercentage: 86, avgMarks: 73 },
  ]);

  // 📜 Transcript Approval
  const [transcripts, setTranscripts] = useState([
    { id: 1, student: "Amit Sharma", regNo: "CU202101", status: "Pending" },
    { id: 2, student: "Priya Das", regNo: "CU202102", status: "Approved" },
    { id: 3, student: "Ravi Singh", regNo: "CU202103", status: "Pending" },
  ]);

  const handlePaperApproval = (id, status) => {
    setExamPapers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const handleTranscriptApproval = (id, status) => {
    setTranscripts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Examination Management (HOD)
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
            Review and approve exam papers, verify timetables, oversee internal
            marks, analyze results, and approve transcripts — all in one place.
          </p>
        </div>

        {/* Review & Approve Exam Papers */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" /> Review & Approve Exam Papers
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {examPapers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-base-200/50">
                    <td>{paper.faculty}</td>
                    <td>{paper.subject}</td>
                    <td>
                      <span
                        className={`badge ${
                          paper.status === "Approved"
                            ? "badge-success"
                            : paper.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        } badge-outline`}
                      >
                        {paper.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handlePaperApproval(paper.id, "Approved")
                          }
                          className="btn btn-xs btn-success"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handlePaperApproval(paper.id, "Rejected")
                          }
                          className="btn btn-xs btn-error"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verify Exam Timetables */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <CalendarDays className="w-5 h-5" /> Verify Exam Timetables
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Verification</th>
                </tr>
              </thead>
              <tbody>
                {timetables.map((t) => (
                  <tr key={t.id} className="hover:bg-base-200/50">
                    <td>{t.subject}</td>
                    <td>{t.date}</td>
                    <td>{t.time}</td>
                    <td>
                      <span
                        className={`badge ${
                          t.verified ? "badge-success" : "badge-warning"
                        } badge-outline`}
                      >
                        {t.verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Internal Assessment Marks */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <ClipboardCheck className="w-5 h-5" /> Internal Assessment Marks
            Submission
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {internalMarks.map((m) => (
                  <tr key={m.id} className="hover:bg-base-200/50">
                    <td>{m.student}</td>
                    <td>{m.subject}</td>
                    <td>{m.marks}</td>
                    <td>{m.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Exam Result Summaries */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" /> Exam Result Summaries
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {examResults.map((r, index) => (
              <div
                key={index}
                className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-primary font-semibold text-lg mb-2">
                  {r.course}
                </h4>
                <p className="text-sm text-gray-600">
                  <strong>Pass Percentage:</strong> {r.passPercentage}%
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Average Marks:</strong> {r.avgMarks}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Transcript Approvals */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <FileBarChart className="w-5 h-5" /> Transcript Approvals
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Student</th>
                  <th>Reg. No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transcripts.map((t) => (
                  <tr key={t.id} className="hover:bg-base-200/50">
                    <td>{t.student}</td>
                    <td>{t.regNo}</td>
                    <td>
                      <span
                        className={`badge ${
                          t.status === "Approved"
                            ? "badge-success"
                            : "badge-warning"
                        } badge-outline`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleTranscriptApproval(t.id, "Approved")
                          }
                          className="btn btn-xs btn-success"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleTranscriptApproval(t.id, "Rejected")
                          }
                          className="btn btn-xs btn-error"
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
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
