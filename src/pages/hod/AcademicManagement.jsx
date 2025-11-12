/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  CalendarDays,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  PlusCircle,
  Layers,
  CalendarCheck2,
} from "lucide-react";

export default function AcademicMonitoring() {
  const [facultyData, setFacultyData] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Artificial Intelligence",
      syllabusCoverage: 85,
      completionStatus: "In Progress",
      classStatus: "On Schedule",
      curriculumUpdate: "Pending",
      materials: [
        { type: "Lecture", file: "AI_Lecture_6.pdf" },
        { type: "Assignment", file: "AI_Assignment_2.pdf" },
        { type: "Syllabus", file: "AI_Syllabus_Updated.pdf" },
      ],
    },
    {
      id: 2,
      name: "Prof. Rajesh Mehta",
      subject: "Data Structures",
      syllabusCoverage: 68,
      completionStatus: "In Progress",
      classStatus: "Behind Schedule",
      curriculumUpdate: "Approved",
      materials: [
        { type: "Lecture", file: "DS_Week5.pdf" },
        { type: "Assignment", file: "DS_Assignment_1.pdf" },
      ],
    },
    {
      id: 3,
      name: "Dr. Meena Patel",
      subject: "Operating Systems",
      syllabusCoverage: 95,
      completionStatus: "Completed",
      classStatus: "On Schedule",
      curriculumUpdate: "Rejected",
      materials: [
        { type: "Lecture", file: "OS_Week8.pdf" },
        { type: "Syllabus", file: "OS_Final_Syllabus.pdf" },
      ],
    },
  ]);

  const [classConduct, setClassConduct] = useState([
    {
      id: 1,
      faculty: "Dr. Sarah Johnson",
      subject: "Artificial Intelligence",
      day: "Monday",
      time: "10:00 AM - 11:00 AM",
      status: "Done",
    },
    {
      id: 2,
      faculty: "Prof. Rajesh Mehta",
      subject: "Data Structures",
      day: "Monday",
      time: "11:00 AM - 12:00 PM",
      status: "Missed",
    },
    {
      id: 3,
      faculty: "Dr. Meena Patel",
      subject: "Operating Systems",
      day: "Tuesday",
      time: "09:00 AM - 10:00 AM",
      status: "Upcoming",
    },
  ]);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      topic: "Mid-Semester Academic Review",
      date: "2025-11-15",
      time: "10:00 AM",
      attendees: "All Faculty Members",
    },
  ]);

  const [newMeeting, setNewMeeting] = useState({
    topic: "",
    date: "",
    time: "",
    attendees: "",
  });

  const handleApproval = (id, status) => {
    setFacultyData((prev) =>
      prev.map((f) => (f.id === id ? { ...f, curriculumUpdate: status } : f))
    );
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    if (!newMeeting.topic || !newMeeting.date || !newMeeting.time) {
      alert("Please fill in all fields.");
      return;
    }
    setMeetings((prev) => [...prev, { id: prev.length + 1, ...newMeeting }]);
    setNewMeeting({ topic: "", date: "", time: "", attendees: "" });
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Academic Monitoring (HOD)
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
            Oversee syllabus completion, review uploaded materials, ensure
            classes follow timetable, verify curriculum updates, and manage
            academic meetings.
          </p>
        </div>

        {/* Faculty Progress */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-5">
            <Layers className="w-5 h-5" />
            Faculty Academic Progress
          </h3>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Syllabus Coverage</th>
                  <th>Completion</th>
                  <th>Materials</th>
                  <th>Class Status</th>
                  <th>Curriculum Update</th>
                </tr>
              </thead>
              <tbody>
                {facultyData.map((f) => (
                  <tr key={f.id} className="hover:bg-base-200/50 transition">
                    <td className="font-medium">{f.name}</td>
                    <td>{f.subject}</td>

                    {/* Progress bar */}
                    <td className="w-48">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-base-300 h-2 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              f.syllabusCoverage >= 85
                                ? "bg-green-500"
                                : f.syllabusCoverage >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${f.syllabusCoverage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{f.syllabusCoverage}%</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          f.completionStatus === "Completed"
                            ? "badge-success"
                            : "badge-warning"
                        } badge-outline`}
                      >
                        {f.completionStatus}
                      </span>
                    </td>

                    <td className="min-w-[180px]">
                      <div className="flex flex-col gap-1">
                        {f.materials.map((m, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-blue-600"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{m.file}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          f.classStatus === "On Schedule"
                            ? "badge-success"
                            : "badge-error"
                        } badge-outline`}
                      >
                        {f.classStatus}
                      </span>
                    </td>

                    <td className="min-w-[150px]">
                      <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleApproval(f.id, "Approved")}
                            className="btn btn-xs btn-success"
                          >
                            <CheckCircle2 size={14} />
                          </button>
                          <button
                            onClick={() => handleApproval(f.id, "Rejected")}
                            className="btn btn-xs btn-error"
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                        <span
                          className={`text-xs font-semibold ${
                            f.curriculumUpdate === "Approved"
                              ? "text-green-600"
                              : f.curriculumUpdate === "Rejected"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {f.curriculumUpdate}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Class Conduct Status */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-5">
            <CalendarCheck2 className="w-5 h-5" />
            Class Conduct Status (Timetable Verification)
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {classConduct.map((cls) => (
                  <tr key={cls.id} className="hover:bg-base-200/50 transition">
                    <td>{cls.faculty}</td>
                    <td>{cls.subject}</td>
                    <td>{cls.day}</td>
                    <td>{cls.time}</td>
                    <td>
                      <span
                        className={`badge ${
                          cls.status === "Done"
                            ? "badge-success"
                            : cls.status === "Missed"
                            ? "badge-error"
                            : "badge-info"
                        } badge-outline`}
                      >
                        {cls.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Meetings Section */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Add Meeting */}
          <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5" />
              Schedule Academic Review / Meeting
            </h3>
            <form onSubmit={handleAddMeeting} className="space-y-3">
              <input
                type="text"
                placeholder="Meeting Topic"
                className="input input-bordered w-full"
                value={newMeeting.topic}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, topic: e.target.value })
                }
              />
              <input
                type="date"
                className="input input-bordered w-full"
                value={newMeeting.date}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, date: e.target.value })
                }
              />
              <input
                type="time"
                className="input input-bordered w-full"
                value={newMeeting.time}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, time: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Attendees"
                className="input input-bordered w-full"
                value={newMeeting.attendees}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, attendees: e.target.value })
                }
              />
              <button
                type="submit"
                className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full"
              >
                Schedule Meeting
              </button>
            </form>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
              <CalendarDays className="w-5 h-5" />
              Upcoming Department Meetings
            </h3>
            {meetings.length === 0 ? (
              <p className="text-center text-gray-500 py-6">
                No meetings scheduled yet.
              </p>
            ) : (
              <div className="space-y-3">
                {meetings.map((m) => (
                  <div
                    key={m.id}
                    className="bg-base-200 border border-base-300 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold">{m.topic}</h4>
                      <p className="text-sm text-gray-500">
                        {m.date} — {m.time}
                      </p>
                      <p className="text-xs text-gray-500">
                        Attendees: {m.attendees}
                      </p>
                    </div>
                    <Clock className="text-primary w-5 h-5" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
