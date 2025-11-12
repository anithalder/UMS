import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Send,
  User,
  ClipboardList,
  ShieldCheck,
  FileSignature,
} from "lucide-react";

export default function DocumentApproval() {
  // 🧾 Mock Certificate Request Data
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: "Amit Sharma",
      regNo: "CU2021001",
      type: "Bonafide Certificate",
      reason: "For passport application",
      eligibility: true,
      status: "Pending",
      forwarded: false,
    },
    {
      id: 2,
      studentName: "Priya Das",
      regNo: "CU2021023",
      type: "Transcript Request",
      reason: "For higher studies in USA",
      eligibility: true,
      status: "Approved",
      forwarded: true,
    },
    {
      id: 3,
      studentName: "Ravi Singh",
      regNo: "CU2021045",
      type: "Demand Letter",
      reason: "For educational loan purpose",
      eligibility: false,
      status: "Rejected",
      forwarded: false,
    },
  ]);

  // ✅ Approve / Reject Request
  const handleStatusChange = (id, status) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, forwarded: false } : r))
    );
  };

  // 🚀 Forward to Admin
  const handleForward = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, forwarded: true } : r))
    );
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 🔹 Header */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Certificate & Document Approval
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
            Verify and approve student certificate requests, check eligibility,
            and forward approved documents to Admin for final authorization.
          </p>
        </div>

        {/* 🔹 Request Verification Table */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5" />
            Pending & Processed Requests
          </h3>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Reg. No</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Eligibility</th>
                  <th>Status</th>
                  <th>Forwarded</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((r, index) => (
                  <tr
                    key={r.id}
                    className="hover:bg-base-200/60 transition-all"
                  >
                    <td>{index + 1}</td>
                    <td className="font-medium">{r.studentName}</td>
                    <td>{r.regNo}</td>
                    <td>{r.type}</td>
                    <td>{r.reason}</td>
                    <td>
                      {r.eligibility ? (
                        <span className="badge badge-success badge-outline flex items-center gap-1">
                          <ShieldCheck size={14} /> Valid
                        </span>
                      ) : (
                        <span className="badge badge-error badge-outline">
                          Not Eligible
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          r.status === "Approved"
                            ? "badge-success"
                            : r.status === "Rejected"
                            ? "badge-error"
                            : "badge-warning"
                        } badge-outline`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.forwarded ? (
                        <span className="badge badge-info badge-outline">
                          Forwarded
                        </span>
                      ) : (
                        <span className="badge badge-secondary badge-outline">
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        {r.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(r.id, "Approved")
                              }
                              className="btn btn-xs btn-success"
                              title="Approve Request"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(r.id, "Rejected")
                              }
                              className="btn btn-xs btn-error"
                              title="Reject Request"
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                        {r.status === "Approved" && !r.forwarded && (
                          <button
                            onClick={() => handleForward(r.id)}
                            className="btn btn-xs btn-primary"
                            title="Forward to Admin"
                          >
                            <Send size={14} />
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

        {/* 🔹 Summary Cards */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <FileSignature className="w-5 h-5" />
            Request Summary
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Total Requests</p>
              <h2 className="text-3xl font-bold text-primary">
                {requests.length}
              </h2>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Approved</p>
              <h2 className="text-3xl font-bold text-success">
                {requests.filter((r) => r.status === "Approved").length}
              </h2>
            </div>
            <div className="bg-base-200 border border-base-300 rounded-xl p-5 text-center shadow-sm">
              <p className="text-sm text-gray-500 mb-1">Forwarded</p>
              <h2 className="text-3xl font-bold text-info">
                {requests.filter((r) => r.forwarded).length}
              </h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
