import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  CalendarDays,
  Upload,
  CheckCircle,
  ClipboardList,
  Clock,
  FileDown,
  UserCheck,
  Filter,
  Send,
  Edit3,
  Eye,
  CheckCircle2,
  Hourglass,
  Lock,
  Trash2,
  BookOpen,
  Plus,
} from "lucide-react";

export default function FacultyExaminationManagement() {
  // ====== FILTERS (Program & Semester only selectable) ======
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  // Auto-filled from detected exam slot
  const [autoCourse, setAutoCourse] = useState("");
  const [autoPaperCode, setAutoPaperCode] = useState("");
  const [autoExamTime, setAutoExamTime] = useState("");
  const [autoDate, setAutoDate] = useState("");
  const [autoMessage, setAutoMessage] = useState("");

  // ====== MOCK TIMETABLE (for auto-detection simulation) ======
  const examTimetable = [
    {
      program: "B.Tech",
      semester: "6th Semester",
      course: "Machine Learning",
      paperCode: "CS601",
      time: "09:00 AM – 10:30 AM",
      start: "09:00",
      end: "10:30",
    },
    {
      program: "B.Tech",
      semester: "6th Semester",
      course: "Data Science",
      paperCode: "CS602",
      time: "11:00 AM – 12:30 PM",
      start: "11:00",
      end: "12:30",
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
      time: "10:00 AM – 11:30 AM",
      start: "10:00",
      end: "11:30",
    },
    {
      program: "BCA",
      semester: "2nd Semester",
      course: "Programming in C",
      paperCode: "BCA202",
      time: "01:00 PM – 02:30 PM",
      start: "13:00",
      end: "14:30",
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

  // ====== AUTO-DETECT CURRENT EXAM (based on time) ======
  useEffect(() => {
    if (selectedProgram && selectedSemester) {
      const now = new Date();
      const currentHHMM = now.toTimeString().slice(0, 5); // "HH:MM"
      const today = now.toISOString().split("T")[0];

      const currentExam = examTimetable.find(
        (ex) =>
          ex.program === selectedProgram &&
          ex.semester === selectedSemester &&
          currentHHMM >= ex.start &&
          currentHHMM <= ex.end
      );

      if (currentExam) {
        setAutoCourse(currentExam.course);
        setAutoPaperCode(currentExam.paperCode);
        setAutoExamTime(currentExam.time);
        setAutoDate(today);
        setAutoMessage(
          `✅ Current Exam detected: ${currentExam.course} (${currentExam.paperCode})`
        );
      } else {
        setAutoCourse("");
        setAutoPaperCode("");
        setAutoExamTime("");
        setAutoDate(today);
        setAutoMessage("⚠️ No exam scheduled at this time.");
      }
    } else {
      setAutoCourse("");
      setAutoPaperCode("");
      setAutoExamTime("");
      setAutoDate("");
      setAutoMessage("");
    }
  }, [selectedProgram, selectedSemester]);

  // ====== MATERIALS: Upload exam papers / assignments / quizzes ======
  const [materials, setMaterials] = useState([
    {
      id: 1,
      type: "Exam Paper",
      title: "Midterm: Machine Learning",
      topic: "ML Basics",
      dueDate: "",
      fileName: "ml_midterm.pdf",
    },
    {
      id: 2,
      type: "Assignment",
      title: "DS Assignment 2",
      topic: "Pandas & Numpy",
      dueDate: "2025-11-20",
      fileName: "ds_assgn2.pdf",
    },
    {
      id: 3,
      type: "Quiz",
      title: "Cloud Computing Quiz-1",
      topic: "IaaS/PaaS",
      dueDate: "2025-11-14",
      fileName: "cc_quiz1.pdf",
    },
  ]);
  const [newMat, setNewMat] = useState({
    type: "Exam Paper",
    title: "",
    topic: "",
    dueDate: "",
    fileName: "",
  });

  const handleAddMaterial = () => {
    if (!newMat.title || !newMat.fileName)
      return alert("Please add a Title and File Name.");
    setMaterials((m) => [{ id: Date.now(), ...newMat }, ...m]);
    setNewMat({
      type: "Exam Paper",
      title: "",
      topic: "",
      dueDate: "",
      fileName: "",
    });
  };
  const removeMaterial = (id) =>
    setMaterials((m) => m.filter((x) => x.id !== id));

  // ====== SCHEDULER: create simple exam slot ======
  const [scheduleForm, setScheduleForm] = useState({
    course: "",
    paperCode: "",
    date: "",
    start: "",
    end: "",
    room: "",
    mode: "Offline",
  });
  const [scheduleList, setScheduleList] = useState([
    {
      id: 10,
      course: "Machine Learning",
      paperCode: "CS601",
      date: "2025-11-16",
      start: "09:00",
      end: "10:30",
      room: "Room 301",
      mode: "Offline",
    },
    {
      id: 11,
      course: "Data Science",
      paperCode: "CS602",
      date: "2025-11-18",
      start: "11:00",
      end: "12:30",
      room: "Room 305",
      mode: "Offline",
    },
  ]);
  useEffect(() => {
    // Prefill course & paperCode from auto-detected (if available)
    setScheduleForm((prev) => ({
      ...prev,
      course: autoCourse || prev.course,
      paperCode: autoPaperCode || prev.paperCode,
    }));
  }, [autoCourse, autoPaperCode]);

  const addSchedule = () => {
    const { course, paperCode, date, start, end } = scheduleForm;
    if (!course || !paperCode || !date || !start || !end)
      return alert("Please fill course, paper, date & time.");
    setScheduleList((l) => [{ id: Date.now(), ...scheduleForm }, ...l]);
    setScheduleForm({
      course: "",
      paperCode: "",
      date: "",
      start: "",
      end: "",
      room: "",
      mode: "Offline",
    });
  };
  const removeSchedule = (id) =>
    setScheduleList((l) => l.filter((x) => x.id !== id));

  // ====== EVALUATION: mock submissions + inline actions ======
  const [evaluationData, setEvaluationData] = useState([
    {
      id: 1,
      student: "John Smith",
      roll: "CS21/001",
      paperCode: "CS601",
      marks: 85,
      status: "Evaluated",
    },
    {
      id: 2,
      student: "Priya Sharma",
      roll: "CS21/002",
      paperCode: "CS601",
      marks: null,
      status: "Pending",
    },
    {
      id: 3,
      student: "Amit Verma",
      roll: "CS21/003",
      paperCode: "CS601",
      marks: 92,
      status: "Submitted",
    },
  ]);

  const setEvalStatus = (id, status) =>
    setEvaluationData((d) =>
      d.map((s) => (s.id === id ? { ...s, status } : s))
    );
  const setEvalMarks = (id, marks) =>
    setEvaluationData((d) => d.map((s) => (s.id === id ? { ...s, marks } : s)));

  // ====== MARKS ENTRY (editable table if NOT submitted) ======
  const [marksData, setMarksData] = useState([
    { id: 1, name: "John Smith", roll: "CS21/001", marks: 85 },
    { id: 2, name: "Priya Sharma", roll: "CS21/002", marks: 78 },
    { id: 3, name: "Amit Verma", roll: "CS21/003", marks: 92 },
  ]);
  const marksLocked = useMemo(
    () => evaluationData.every((e) => e.status === "Submitted"),
    [evaluationData]
  );

  const handleMarksChange = (id, newMarks) =>
    setMarksData((prev) =>
      prev.map((s) => (s.id === id ? { ...s, marks: Number(newMarks) } : s))
    );

  // ====== INTERNAL ASSESSMENT REPORTS (simple metrics + CSV export) ======
  const reportStats = useMemo(() => {
    const list = marksData.map((m) => Number(m.marks ?? 0));
    if (!list.length) return { avg: 0, max: 0, min: 0, passPct: 0 };
    const sum = list.reduce((a, b) => a + b, 0);
    const avg = (sum / list.length).toFixed(2);
    const max = Math.max(...list);
    const min = Math.min(...list);
    const passPct = (
      (list.filter((x) => x >= 40).length / list.length) *
      100
    ).toFixed(0);
    return { avg, max, min, passPct };
  }, [marksData]);

  const exportMarksCSV = () => {
    const header = ["Name", "Roll", "Marks"];
    const rows = marksData.map((m) => [m.name, m.roll, m.marks]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `marks_${autoPaperCode || "paper"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ====== SUBMIT TO HOD (locks evaluation & marks) ======
  const submitAllToHOD = () => {
    setEvaluationData((d) => d.map((s) => ({ ...s, status: "Submitted" })));
    alert("✅ All marks submitted to HOD for final approval. Editing locked.");
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="w-6 h-6" /> Examination Management
        </h2>
        <p className="text-sm text-blue-100 mt-1">
          Upload papers, schedule exams, evaluate, enter grades, generate
          reports, and submit to HOD.
        </p>
      </div>

      {/* FILTERS & AUTO-DETECT */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2 text-base-content">
          <Filter className="w-5 h-5 text-blue-600" /> Select Program & Semester
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
            className="input input-bordered w-full"
            placeholder="Auto Course"
            value={autoCourse}
            readOnly
          />
          <input
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
          <p
            className={`mt-3 font-medium ${
              autoCourse ? "text-green-700" : "text-yellow-700"
            }`}
          >
            {autoMessage}
          </p>
        )}
        {autoExamTime && (
          <div className="mt-3 flex items-center gap-2 bg-base-100 border border-base-300 rounded-lg p-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <p>
              <span className="font-medium">Exam Time:</span> {autoExamTime}
            </p>
          </div>
        )}
      </div>

      {/* MATERIALS UPLOAD */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" /> Create & Upload Materials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            className="select select-bordered w-full"
            value={newMat.type}
            onChange={(e) => setNewMat((m) => ({ ...m, type: e.target.value }))}
          >
            <option>Exam Paper</option>
            <option>Assignment</option>
            <option>Quiz</option>
          </select>
          <input
            className="input input-bordered w-full"
            placeholder="Title"
            value={newMat.title}
            onChange={(e) =>
              setNewMat((m) => ({ ...m, title: e.target.value }))
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="Topic"
            value={newMat.topic}
            onChange={(e) =>
              setNewMat((m) => ({ ...m, topic: e.target.value }))
            }
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={newMat.dueDate}
            onChange={(e) =>
              setNewMat((m) => ({ ...m, dueDate: e.target.value }))
            }
          />
          <div className="flex gap-2">
            <input
              className="input input-bordered w-full"
              placeholder="File name (e.g., paper.pdf)"
              value={newMat.fileName}
              onChange={(e) =>
                setNewMat((m) => ({ ...m, fileName: e.target.value }))
              }
            />
            <button onClick={handleAddMaterial} className="btn btn-primary">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Materials list */}
        <div className="mt-4 overflow-x-auto">
          <table className="table w-full text-sm border border-base-300">
            <thead className="bg-base-300">
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Topic</th>
                <th>Due (if any)</th>
                <th>File</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id} className="hover:bg-base-100">
                  <td>{m.type}</td>
                  <td>{m.title}</td>
                  <td>{m.topic || "-"}</td>
                  <td>{m.dueDate || "-"}</td>
                  <td className="text-blue-600">{m.fileName}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-ghost text-error"
                      onClick={() => removeMaterial(m.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
              {materials.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No materials uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXAM SCHEDULER */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" /> Set Exam Schedule
          (with HOD/Admin)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <input
            className="input input-bordered w-full"
            placeholder="Course"
            value={scheduleForm.course}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, course: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="Paper Code"
            value={scheduleForm.paperCode}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, paperCode: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered w-full"
            value={scheduleForm.date}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, date: e.target.value })
            }
          />
          <input
            type="time"
            className="input input-bordered w-full"
            value={scheduleForm.start}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, start: e.target.value })
            }
          />
          <input
            type="time"
            className="input input-bordered w-full"
            value={scheduleForm.end}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, end: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full"
            placeholder="Room/Link"
            value={scheduleForm.room}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, room: e.target.value })
            }
          />
          <select
            className="select select-bordered w-full"
            value={scheduleForm.mode}
            onChange={(e) =>
              setScheduleForm({ ...scheduleForm, mode: e.target.value })
            }
          >
            <option>Offline</option>
            <option>Online</option>
            <option>Hybrid</option>
          </select>
        </div>

        <div className="mt-3 flex justify-end">
          <button onClick={addSchedule} className="btn btn-primary">
            <Plus className="w-4 h-4 mr-1" /> Add Slot
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="table w-full text-sm border border-base-300">
            <thead className="bg-base-300">
              <tr>
                <th>Course</th>
                <th>Paper</th>
                <th>Date</th>
                <th>Start–End</th>
                <th>Room/Link</th>
                <th>Mode</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((s) => (
                <tr key={s.id} className="hover:bg-base-100">
                  <td>{s.course}</td>
                  <td className="text-blue-600">{s.paperCode}</td>
                  <td>{s.date}</td>
                  <td>
                    {s.start}–{s.end}
                  </td>
                  <td>{s.room || "-"}</td>
                  <td>{s.mode}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-ghost text-error"
                      onClick={() => removeSchedule(s.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </td>
                </tr>
              ))}
              {scheduleList.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No scheduled exams yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EVALUATION STATUS */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" /> View & Update Evaluation
        </h3>

        {/* Small summary strip */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-base-100 border border-base-300 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Evaluated</span>
            </div>
            <p className="text-xl font-semibold mt-1">
              {evaluationData.filter((e) => e.status === "Evaluated").length}
            </p>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-yellow-600" />
              <span>Pending</span>
            </div>
            <p className="text-xl font-semibold mt-1">
              {evaluationData.filter((e) => e.status === "Pending").length}
            </p>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-lg p-3 text-sm">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Submitted</span>
            </div>
            <p className="text-xl font-semibold mt-1">
              {evaluationData.filter((e) => e.status === "Submitted").length}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-sm border border-base-300">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Roll</th>
                <th>Paper</th>
                <th>Marks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {evaluationData.map((row, i) => (
                <tr key={row.id} className="hover:bg-base-100">
                  <td>{i + 1}</td>
                  <td>{row.student}</td>
                  <td>{row.roll}</td>
                  <td className="text-blue-600">{row.paperCode}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="input input-bordered w-24"
                      value={row.marks ?? ""}
                      onChange={(e) =>
                        setEvalMarks(
                          row.id,
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                      disabled={row.status === "Submitted"}
                    />
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        row.status === "Evaluated"
                          ? "badge-success"
                          : row.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {row.status === "Pending" && (
                      <button
                        className="btn btn-xs btn-primary text-white"
                        onClick={() => setEvalStatus(row.id, "Evaluated")}
                      >
                        <Edit3 className="w-4 h-4 mr-1" /> Evaluate
                      </button>
                    )}
                    {row.status === "Evaluated" && (
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => setEvalStatus(row.id, "Submitted")}
                      >
                        <Send className="w-4 h-4 mr-1" /> Submit
                      </button>
                    )}
                    {row.status === "Submitted" && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Lock className="w-4 h-4" /> Locked
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {evaluationData.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MARKS ENTRY */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" /> Enter & Update
            Marks
          </h3>
          <button
            onClick={exportMarksCSV}
            className="btn btn-sm btn-outline border-base-300 hover:bg-base-300"
          >
            <FileDown className="w-4 h-4 mr-2" /> Export Marks (CSV)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full text-sm border border-base-300">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Roll</th>
                <th>Marks / 100</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((s, i) => (
                <tr key={s.id} className="hover:bg-base-100">
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="input input-bordered w-24"
                      value={s.marks}
                      onChange={(e) => handleMarksChange(s.id, e.target.value)}
                      disabled={marksLocked}
                    />
                  </td>
                </tr>
              ))}
              {marksData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No marks to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INTERNAL ASSESSMENT REPORT */}
      <div className="bg-base-200 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" /> Internal Assessment
          Report
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-base-100 border border-base-300 rounded-lg p-3">
            <p className="text-xs text-gray-500">Average</p>
            <p className="text-2xl font-semibold">{reportStats.avg}</p>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-lg p-3">
            <p className="text-xs text-gray-500">Highest</p>
            <p className="text-2xl font-semibold">{reportStats.max}</p>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-lg p-3">
            <p className="text-xs text-gray-500">Lowest</p>
            <p className="text-2xl font-semibold">{reportStats.min}</p>
          </div>
          <div className="bg-base-100 border border-base-300 rounded-lg p-3">
            <p className="text-xs text-gray-500">Pass %</p>
            <p className="text-2xl font-semibold">{reportStats.passPct}%</p>
          </div>
        </div>
      </div>

      {/* SUBMIT TO HOD */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-base-content">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm">
            Verify all entries. Submitting to HOD will lock edits.
          </p>
        </div>
        <button
          className="btn bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
          onClick={submitAllToHOD}
        >
          <Send className="w-4 h-4 mr-2" /> Submit All to HOD
        </button>
      </div>
    </div>
  );
}
