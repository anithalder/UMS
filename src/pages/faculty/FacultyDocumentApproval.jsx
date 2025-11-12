import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Eye,
  Filter,
  BadgeCheck,
} from "lucide-react";

export default function FacultyDocumentApproval() {
  // 🧾 Mock Data — Student Requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: "John Smith",
      rollNo: "CS21/001",
      documentType: "Bonafide Certificate",
      reason: "For internship verification",
      date: "2025-11-10",
      status: "Pending",
      facultyRemarks: "",
    },
    {
      id: 2,
      studentName: "Priya Sharma",
      rollNo: "CS21/002",
      documentType: "Transcript Request",
      reason: "Applying for higher studies",
      date: "2025-11-09",
      status: "Approved",
      facultyRemarks: "Verified - Ready for dispatch",
    },
    {
      id: 3,
      studentName: "Amit Verma",
      rollNo: "CS21/003",
      documentType: "Demand Letter",
      reason: "Bank loan requirement",
      date: "2025-11-08",
      status: "Rejected",
      facultyRemarks: "Incomplete details in request form",
    },
  ]);

  const [filter, setFilter] = useState("All");

  // 🧮 Filtered Data
  const filteredRequests =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  // 🧠 Update Status
  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  // 🧠 Update Remarks
  const updateRemarks = (id, remarks) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, facultyRemarks: remarks } : r))
    );
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="w-6 h-6" /> Certificate & Document Approval
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Review, approve, or reject student certificate and transcript
          requests.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center gap-2 text-base-content">
            <Filter className="w-5 h-5 text-blue-600" /> Filter by Status
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {["All", "Pending", "Approved", "Rejected"].map((option) => (
            <button
              key={option}
              className={`btn btn-sm ${
                filter === option
                  ? "btn-primary text-white"
                  : "btn-outline border-base-300"
              }`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Document Requests Table */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-blue-600" /> Student Requests
        </h3>

        <div className="overflow-x-auto">
          <table className="table w-full text-sm border border-base-300">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Document Type</th>
                <th>Reason</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-500">
                    No document requests found.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r, index) => (
                  <tr key={r.id} className="hover:bg-base-100 transition">
                    <td>{index + 1}</td>
                    <td>{r.studentName}</td>
                    <td>{r.rollNo}</td>
                    <td>{r.documentType}</td>
                    <td>{r.reason}</td>
                    <td>{r.date}</td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          r.status === "Approved"
                            ? "badge-success"
                            : r.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    {/* Remarks */}
                    <td>
                      <input
                        type="text"
                        className="input input-bordered w-40"
                        placeholder="Add remarks"
                        value={r.facultyRemarks}
                        onChange={(e) => updateRemarks(r.id, e.target.value)}
                        disabled={r.status !== "Pending"}
                      />
                    </td>

                    {/* Actions */}
                    <td>
                      {r.status === "Pending" ? (
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-success text-white"
                            onClick={() => updateStatus(r.id, "Approved")}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            className="btn btn-xs btn-error text-white"
                            onClick={() => updateStatus(r.id, "Rejected")}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock className="w-4 h-4" /> Processed
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-500 text-sm">Pending Requests</p>
          <p className="text-3xl font-bold text-yellow-600">
            {requests.filter((r) => r.status === "Pending").length}
          </p>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-500 text-sm">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {requests.filter((r) => r.status === "Approved").length}
          </p>
        </div>
        <div className="bg-base-200 border border-base-300 rounded-xl p-4 text-center shadow-sm">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-3xl font-bold text-red-600">
            {requests.filter((r) => r.status === "Rejected").length}
          </p>
        </div>
      </div>
    </div>
  );
}
