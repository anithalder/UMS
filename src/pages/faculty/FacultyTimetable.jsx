import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  BookOpen,
  MapPin,
  User,
  Filter,
  RefreshCw,
  ArrowRightLeft,
  MessageSquare,
  CheckCircle,
  X,
} from "lucide-react";

export default function FacultyTimetable() {
  const [timetableData] = useState([
    {
      id: 1,
      program: "B.Tech",
      semester: "6th Semester",
      course: "Machine Learning",
      paperCode: "CS601",
      day: "Monday",
      time: "10:00 AM – 11:00 AM",
      room: "Room 301",
      faculty: "Dr. Sarah Johnson",
    },
    {
      id: 2,
      program: "B.Tech",
      semester: "6th Semester",
      course: "Data Science",
      paperCode: "CS602",
      day: "Tuesday",
      time: "11:00 AM – 12:00 PM",
      room: "Lab 204",
      faculty: "Dr. Sarah Johnson",
    },
    {
      id: 3,
      program: "B.Tech",
      semester: "8th Semester",
      course: "AI Lab",
      paperCode: "CS801L",
      day: "Friday",
      time: "02:00 PM – 04:00 PM",
      room: "Lab 210",
      faculty: "Dr. Sarah Johnson",
    },
    {
      id: 4,
      program: "MCA",
      semester: "4th Semester",
      course: "Advanced Java",
      paperCode: "MCA404",
      day: "Thursday",
      time: "09:00 AM – 10:00 AM",
      room: "Room 405",
      faculty: "Prof. Emily Davis",
    },
    {
      id: 5,
      program: "BCA",
      semester: "2nd Semester",
      course: "Programming in C",
      paperCode: "BCA202",
      day: "Wednesday",
      time: "10:00 AM – 11:00 AM",
      room: "Room 105",
      faculty: "Dr. Michael Roy",
    },
  ]);

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

  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const filteredData = timetableData.filter(
    (cls) =>
      (selectedProgram ? cls.program === selectedProgram : true) &&
      (selectedSemester ? cls.semester === selectedSemester : true)
  );

  const resetFilters = () => {
    setSelectedProgram("");
    setSelectedSemester("");
  };

  const syncTimetable = () => {
    alert("✅ Synced with University's Master Timetable.");
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({
    newDay: "",
    newTime: "",
    reason: "",
  });

  const openPopup = (cls) => {
    setSelectedClass(cls);
    setRescheduleData({ newDay: "", newTime: "", reason: "" });
    setShowPopup(true);
  };

  const submitReschedule = () => {
    if (
      !rescheduleData.newDay ||
      !rescheduleData.newTime ||
      !rescheduleData.reason
    ) {
      alert("⚠️ Please fill all fields before submitting request.");
      return;
    }

    alert(
      `📩 Reschedule Request Submitted:\nCourse: ${selectedClass.course}\nNew Day: ${rescheduleData.newDay}\nNew Time: ${rescheduleData.newTime}\nReason: ${rescheduleData.reason}`
    );

    setShowPopup(false);
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <CalendarDays className="w-6 h-6" />
          Faculty Timetable
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          View, manage weekly schedules, and request class rescheduling if
          needed.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
          <Filter className="w-5 h-5 text-blue-600" />
          Select Academic Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="select select-bordered w-full"
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setSelectedSemester("");
            }}
          >
            <option value="">Select Program</option>
            {programOptions.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
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
              semesterOptions[selectedProgram].map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
          </select>

          <button
            onClick={resetFilters}
            className="btn btn-outline border-base-300 hover:bg-base-300 w-full"
          >
            Reset Filters
          </button>

          <button
            onClick={syncTimetable}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Sync with Master Timetable
          </button>
        </div>
      </div>

      {/* Timetable Table */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
          <Clock className="w-5 h-5 text-blue-600" /> Weekly Class Schedule
        </h3>

        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CalendarDays className="w-10 h-10 mx-auto mb-3 text-gray-400" />
            <p>No timetable available for the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-base-300">
            <table className="table w-full text-sm border-collapse text-center">
              <thead className="bg-base-300 text-base-content">
                <tr>
                  <th>Program</th>
                  <th>Semester</th>
                  <th>Paper Code</th>
                  <th className="text-left pl-4">Course</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th className="text-left pl-4">Room</th>
                  <th className="text-left pl-4">Faculty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((cls) => (
                  <tr
                    key={cls.id}
                    className="hover:bg-base-100 border-t border-base-300"
                  >
                    <td>{cls.program}</td>
                    <td>{cls.semester}</td>
                    <td className="text-blue-600 font-semibold">
                      {cls.paperCode}
                    </td>
                    <td className="text-left pl-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        {cls.course}
                      </div>
                    </td>
                    <td>{cls.day}</td>
                    <td>{cls.time}</td>
                    <td className="text-left pl-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {cls.room}
                      </div>
                    </td>
                    <td className="text-left pl-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-500" />
                        {cls.faculty}
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-outline border-base-300 hover:bg-blue-100 text-blue-700 flex items-center gap-1 mx-auto"
                        onClick={() => openPopup(cls)}
                      >
                        <ArrowRightLeft className="w-4 h-4" /> Reschedule
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowPopup(false)}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 rounded-xl shadow-xl border border-base-300 w-full max-w-lg p-6 relative">
              <button
                className="absolute top-3 right-3 btn btn-ghost btn-sm btn-circle"
                onClick={() => setShowPopup(false)}
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-base-content">
                <MessageSquare className="w-5 h-5 text-blue-600" /> Request
                Reschedule for:{" "}
                <span className="text-blue-600">{selectedClass.course}</span>
              </h3>

              <div className="space-y-4">
                <select
                  className="select select-bordered w-full"
                  value={rescheduleData.newDay}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      newDay: e.target.value,
                    })
                  }
                >
                  <option value="">Select New Day</option>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (d) => (
                      <option key={d}>{d}</option>
                    )
                  )}
                </select>

                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter new time (e.g., 11:00 AM – 12:00 PM)"
                  value={rescheduleData.newTime}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      newTime: e.target.value,
                    })
                  }
                />

                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Reason for reschedule"
                  value={rescheduleData.reason}
                  onChange={(e) =>
                    setRescheduleData({
                      ...rescheduleData,
                      reason: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="btn btn-outline border-base-300"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success text-white flex items-center gap-1"
                  onClick={submitReschedule}
                >
                  <CheckCircle className="w-4 h-4" /> Submit Request
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
