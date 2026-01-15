import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  FileDown,
  UserCheck,
  Filter,
} from "lucide-react";

export default function AttendanceManagement() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [autoCourse, setAutoCourse] = useState("");
  const [autoPaperCode, setAutoPaperCode] = useState("");
  const [autoTime, setAutoTime] = useState("");
  const [autoDate, setAutoDate] = useState("");
  const [autoMessage, setAutoMessage] = useState("");

  // 🧾 Mock Timetable Data
  const timetableData = [
    {
      program: "B.Tech",
      semester: "6th Semester",
      course: "Machine Learning",
      paperCode: "CS601",
      time: "09:00 AM – 10:00 AM",
      start: "09:00",
      end: "10:00",
    },
    {
      program: "B.Tech",
      semester: "6th Semester",
      course: "Data Science",
      paperCode: "CS602",
      time: "10:00 AM – 11:00 AM",
      start: "10:00",
      end: "11:00",
    },
    {
      program: "B.Tech",
      semester: "6th Semester",
      course: "Cloud Computing",
      paperCode: "CS603",
      time: "11:00 AM – 12:00 PM",
      start: "11:00",
      end: "12:00",
    },
    {
      program: "B.Tech",
      semester: "8th Semester",
      course: "AI Lab",
      paperCode: "CS801L",
      time: "02:00 PM – 04:00 PM",
      start: "14:00",
      end: "16:00",
    },
    {
      program: "MCA",
      semester: "4th Semester",
      course: "Advanced Java",
      paperCode: "MCA404",
      time: "09:00 AM – 10:00 AM",
      start: "09:00",
      end: "10:00",
    },
    {
      program: "MCA",
      semester: "4th Semester",
      course: "Machine Learning",
      paperCode: "MCA405",
      time: "11:00 AM – 12:00 PM",
      start: "11:00",
      end: "12:00",
    },
    {
      program: "BCA",
      semester: "2nd Semester",
      course: "Programming in C",
      paperCode: "BCA202",
      time: "10:00 AM – 11:00 AM",
      start: "10:00",
      end: "11:00",
    },
    {
      program: "BCA",
      semester: "2nd Semester",
      course: "Data Structures",
      paperCode: "BCA203",
      time: "01:00 PM – 02:00 PM",
      start: "13:00",
      end: "14:00",
    },
  ];

  const programOptions = ["B.Tech", "BCA", "MCA", "M.Tech"];
  const semesterOptions = {
    "B.Tech": [
      "1st Semester",
      "2nd Semester",
      "3rd Semester",
      "4th Semester",
      "5th Semester",
      "6th Semester",
      "7th Semester",
      "8th Semester",
    ],
    BCA: [
      "1st Semester",
      "2nd Semester",
      "3rd Semester",
      "4th Semester",
      "5th Semester",
      "6th Semester",
    ],
    MCA: ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester"],
    "M.Tech": ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester"],
  };

  // 🧠 Auto-detect class based on current time
  useEffect(() => {
    if (selectedProgram && selectedSemester) {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // e.g. "10:05"
      const today = now.toISOString().split("T")[0];

      const currentClass = timetableData.find(
        (cls) =>
          cls.program === selectedProgram &&
          cls.semester === selectedSemester &&
          currentTime >= cls.start &&
          currentTime <= cls.end
      );

      if (currentClass) {
        setAutoCourse(currentClass.course);
        setAutoPaperCode(currentClass.paperCode);
        setAutoTime(currentClass.time);
        setAutoDate(today);
        setAutoMessage(`✅ Current Class Detected: ${currentClass.course}`);
      } else {
        setAutoCourse("");
        setAutoPaperCode("");
        setAutoTime("");
        setAutoDate(today);
        setAutoMessage("⚠️ No class scheduled at this time.");
      }
    } else {
      setAutoCourse("");
      setAutoPaperCode("");
      setAutoTime("");
      setAutoDate("");
      setAutoMessage("");
    }
  }, [selectedProgram, selectedSemester]);

  // 🧑‍🎓 Mock Students
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      student: "John Smith",
      roll: "CS21/001",
      status: "Present",
      time: "09:00 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      student: "Priya Sharma",
      roll: "CS21/002",
      status: "Absent",
      time: "-",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      student: "Amit Verma",
      roll: "CS21/003",
      status: "Late",
      time: "09:10 AM",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAttendanceData((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: newStatus,
              time:
                newStatus === "Absent"
                  ? "-"
                  : new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
            }
          : s
      )
    );
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <UserCheck className="w-6 h-6" /> Attendance Management
        </h2>
        <p className="text-sm text-blue-100 mt-1">
          Automatically detects your current class and prepares attendance list.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <Filter className="w-5 h-5 text-blue-600" /> Select Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            className="select select-bordered w-full"
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setSelectedSemester("");
            }}
          >
            <option value="">Select Program</option>
            {programOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            disabled={!selectedProgram}
          >
            <option value="">
              {selectedProgram ? "Select Semester" : "Select Program First"}
            </option>
            {selectedProgram &&
              semesterOptions[selectedProgram].map((s) => (
                <option key={s}>{s}</option>
              ))}
          </select>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Auto Course"
            value={autoCourse}
            readOnly
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Auto Paper Code"
            value={autoPaperCode}
            readOnly
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={autoDate}
            readOnly
          />
        </div>

        {autoMessage && (
          <div
            className={`mt-4 text-sm font-medium ${
              autoCourse ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {autoMessage}
          </div>
        )}

        {autoTime && (
          <div className="mt-3 flex items-center gap-2 bg-base-100 border border-base-300 rounded-lg p-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <p>
              <span className="font-medium">Class Time:</span> {autoTime}
            </p>
          </div>
        )}
      </div>

      {/* Attendance Table */}
      {autoCourse && (
        <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-base-content">
              <Users className="w-5 h-5 text-blue-600" /> Mark Attendance
            </h3>
            <button className="btn btn-sm btn-outline border-base-300 hover:bg-base-300">
              <FileDown className="w-4 h-4 mr-2" /> Export to PDF / Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-300 text-base-content">
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Roll No.</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((s, i) => (
                  <tr key={s.id} className="hover:bg-base-100">
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={s.image}
                          alt={s.student}
                          className="w-10 h-10 rounded-full border border-base-300"
                        />
                        <div>
                          <p className="font-medium">{s.student}</p>
                          <p className="text-xs text-gray-500">{s.roll}</p>
                        </div>
                      </div>
                    </td>
                    <td>{s.roll}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.status === "Present"
                            ? "badge-success"
                            : s.status === "Absent"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td>{s.time}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-xs btn-success text-white"
                          onClick={() => handleStatusChange(s.id, "Present")}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="btn btn-xs btn-warning text-white"
                          onClick={() => handleStatusChange(s.id, "Late")}
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                        <button
                          className="btn btn-xs btn-error text-white"
                          onClick={() => handleStatusChange(s.id, "Absent")}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
