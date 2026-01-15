import React, { useState } from "react";
import {
  MessageSquare,
  BarChart2,
  FileText,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

export default function FeedbackEvaluation() {
  const [feedbackData] = useState([
    {
      id: 1,
      course: "Machine Learning",
      averageRating: 4.5,
      totalResponses: 35,
      comments: [
        "Very interactive lectures!",
        "Needs more practical examples.",
        "Explained complex topics clearly.",
      ],
    },
    {
      id: 2,
      course: "Data Science",
      averageRating: 4.1,
      totalResponses: 40,
      comments: [
        "Good content delivery.",
        "Assignments were a bit lengthy.",
        "Overall helpful and engaging.",
      ],
    },
  ]);

  const [showSelfEvalForm, setShowSelfEvalForm] = useState(false);
  const [selfEval, setSelfEval] = useState({
    achievements: "",
    challenges: "",
    goals: "",
  });

  const handleSubmitSelfEval = () => {
    if (!selfEval.achievements || !selfEval.challenges || !selfEval.goals) {
      alert("⚠️ Please fill all fields before submitting the report.");
      return;
    }
    alert("✅ Self-evaluation report submitted to HOD successfully!");
    setSelfEval({ achievements: "", challenges: "", goals: "" });
    setShowSelfEvalForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BarChart2 className="w-6 h-6" /> Feedback & Evaluation
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Review student feedback, analyze teaching effectiveness, and submit
          annual evaluations.
        </p>
      </div>

      {/* 1️⃣ Student Feedback Section */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Student Feedback
          Summary
        </h3>

        <div className="overflow-x-auto rounded-lg border border-base-300">
          <table className="table w-full text-sm border-collapse text-center">
            <thead className="bg-base-300 text-base-content">
              <tr>
                <th>Course</th>
                <th>Average Rating</th>
                <th>Total Responses</th>
                <th>Feedback Highlights</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((fb) => (
                <tr
                  key={fb.id}
                  className="hover:bg-base-100 border-t border-base-300"
                >
                  <td className="font-medium">{fb.course}</td>
                  <td className="text-blue-600 font-semibold">
                    {fb.averageRating.toFixed(1)} ⭐
                  </td>
                  <td>{fb.totalResponses}</td>
                  <td className="text-left pl-4">
                    <ul className="list-disc ml-4 text-sm text-gray-600">
                      {fb.comments.slice(0, 2).map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                      {fb.comments.length > 2 && <li>+ More feedback...</li>}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2️⃣ Feedback Analysis Section */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <AlertCircle className="w-5 h-5 text-blue-600" /> Feedback Analysis &
          Suggestions
        </h3>

        <div className="space-y-3 text-sm text-gray-700">
          <p>
            📊 <b>Overall Faculty Rating:</b>{" "}
            <span className="text-blue-600 font-semibold">4.3 / 5</span>
          </p>
          <p>
            👍 <b>Strengths:</b> Excellent course clarity, interactive sessions,
            and helpful feedback system.
          </p>
          <p>
            🧠 <b>Improvement Areas:</b> Add more real-life examples, use more
            digital learning tools.
          </p>
          <p>
            💡 <b>Suggested Actions:</b> Conduct practical workshops, include
            short quizzes to improve engagement.
          </p>
        </div>
      </div>

      {/* 3️⃣ Self Evaluation Section */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2 text-base-content">
            <FileText className="w-5 h-5 text-blue-600" /> Annual
            Self-Evaluation Report
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Submit your yearly teaching self-assessment and improvement goals to
            HOD.
          </p>
        </div>
        <button
          className="btn btn-primary bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2"
          onClick={() => setShowSelfEvalForm(true)}
        >
          <ThumbsUp className="w-4 h-4" /> Submit Report
        </button>
      </div>

      {/* Popup Self-Evaluation Form */}
      {showSelfEvalForm && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowSelfEvalForm(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 rounded-xl shadow-xl border border-base-300 w-full max-w-lg p-6 relative">
              <button
                className="absolute top-3 right-3 btn btn-ghost btn-sm btn-circle"
                onClick={() => setShowSelfEvalForm(false)}
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
                <FileText className="w-5 h-5 text-blue-600" /> Self-Evaluation
                Report
              </h3>

              <div className="space-y-4">
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Your Achievements this year"
                  value={selfEval.achievements}
                  onChange={(e) =>
                    setSelfEval({ ...selfEval, achievements: e.target.value })
                  }
                ></textarea>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Challenges faced during teaching"
                  value={selfEval.challenges}
                  onChange={(e) =>
                    setSelfEval({ ...selfEval, challenges: e.target.value })
                  }
                ></textarea>
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Goals for upcoming year"
                  value={selfEval.goals}
                  onChange={(e) =>
                    setSelfEval({ ...selfEval, goals: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="btn btn-outline border-base-300"
                  onClick={() => setShowSelfEvalForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success text-white flex items-center gap-1"
                  onClick={handleSubmitSelfEval}
                >
                  <CheckCircle className="w-4 h-4" /> Submit Report
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
