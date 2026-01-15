import React, { useState } from "react";
import {
  BookOpen,
  Library,
  FileText,
  Search,
  Upload,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

export default function LibraryAndResources() {
  // Mock data for digital resources
  const [resources] = useState([
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      type: "E-Book",
      author: "Andrew Ng",
      status: "Available",
    },
    {
      id: 2,
      title: "Blockchain Applications in Education",
      type: "Research Paper",
      author: "Dr. Ravi Nair",
      status: "Borrowed",
    },
    {
      id: 3,
      title: "Data Science for Engineers",
      type: "E-Book",
      author: "Jake VanderPlas",
      status: "Available",
    },
    {
      id: 4,
      title: "Quantum Computing – Beginner's Guide",
      type: "Research Paper",
      author: "Prof. N. Chatterjee",
      status: "Requested",
    },
  ]);

  const [showRecommendForm, setShowRecommendForm] = useState(false);
  const [recommendation, setRecommendation] = useState({
    title: "",
    author: "",
    type: "",
    reason: "",
  });

  const handleRecommendationSubmit = () => {
    if (
      !recommendation.title ||
      !recommendation.author ||
      !recommendation.type
    ) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }
    alert(
      `✅ Recommendation Submitted:\n\nTitle: ${recommendation.title}\nAuthor: ${recommendation.author}\nType: ${recommendation.type}\nReason: ${recommendation.reason}`
    );
    setShowRecommendForm(false);
    setRecommendation({ title: "", author: "", type: "", reason: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Library className="w-6 h-6" />
          Library & Resource Access
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Access e-books, research materials, and manage library resources.
        </p>
      </div>

      {/* Search & Recommend Section */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for books or papers..."
              className="input input-bordered w-full pl-10"
            />
          </div>
          <button
            className="btn btn-primary flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            onClick={() => setShowRecommendForm(true)}
          >
            <Upload className="w-4 h-4" />
            Recommend Book / Reference
          </button>
        </div>
      </div>

      {/* Resource Table */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
          <BookOpen className="w-5 h-5 text-blue-600" /> Digital Library
          Resources
        </h3>

        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table w-full text-sm text-center border-collapse">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Author</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-base-100 border-t border-base-300"
                >
                  <td className="text-left pl-4 font-medium">{r.title}</td>
                  <td>{r.type}</td>
                  <td>{r.author}</td>
                  <td>
                    {r.status === "Available" && (
                      <span className="badge badge-success gap-1 text-white">
                        <CheckCircle className="w-4 h-4" /> Available
                      </span>
                    )}
                    {r.status === "Borrowed" && (
                      <span className="badge badge-warning gap-1 text-white">
                        <Clock className="w-4 h-4" /> Borrowed
                      </span>
                    )}
                    {r.status === "Requested" && (
                      <span className="badge badge-info gap-1 text-white">
                        <FileText className="w-4 h-4" /> Requested
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Recommendation Form */}
      {showRecommendForm && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowRecommendForm(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 rounded-xl shadow-xl border border-base-300 w-full max-w-lg p-6 relative">
              <button
                className="absolute top-3 right-3 btn btn-ghost btn-sm btn-circle"
                onClick={() => setShowRecommendForm(false)}
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
                <Upload className="w-5 h-5 text-blue-600" /> Recommend New Book
                / Reference
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Book / Paper Title"
                  value={recommendation.title}
                  onChange={(e) =>
                    setRecommendation({
                      ...recommendation,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Author / Publisher"
                  value={recommendation.author}
                  onChange={(e) =>
                    setRecommendation({
                      ...recommendation,
                      author: e.target.value,
                    })
                  }
                />
                <select
                  className="select select-bordered w-full"
                  value={recommendation.type}
                  onChange={(e) =>
                    setRecommendation({
                      ...recommendation,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="E-Book">E-Book</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Journal">Journal</option>
                  <option value="Reference Book">Reference Book</option>
                </select>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Reason for recommendation (optional)"
                  value={recommendation.reason}
                  onChange={(e) =>
                    setRecommendation({
                      ...recommendation,
                      reason: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="btn btn-outline border-base-300"
                  onClick={() => setShowRecommendForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success text-white flex items-center gap-1"
                  onClick={handleRecommendationSubmit}
                >
                  <CheckCircle className="w-4 h-4" /> Submit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
