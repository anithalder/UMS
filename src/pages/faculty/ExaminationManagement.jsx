import React, { useState, useMemo } from "react";
import {
  FileText,
  Upload,
  CalendarDays,
  ClipboardList,
  BookOpen,
  BarChart2,
  CheckCircle,
  FileDown,
  Trash2,
  Plus,
  Send,
  Lock,
  Eye,
} from "lucide-react";

export default function ExaminationManagement() {
  /* ------------------ Exam Materials ------------------ */
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    type: "Exam Paper",
    title: "",
    topic: "",
    file: "",
  });

  const addMaterial = () => {
    if (!newMaterial.title || !newMaterial.file)
      return alert("Please enter title and file name.");
    setMaterials([{ id: Date.now(), ...newMaterial }, ...materials]);
    setNewMaterial({ type: "Exam Paper", title: "", topic: "", file: "" });
  };
  const deleteMaterial = (id) =>
    setMaterials((prev) => prev.filter((m) => m.id !== id));

  /* ------------------ Exam Schedule ------------------ */
  const [schedule, setSchedule] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    course: "",
    paperCode: "",
    date: "",
    start: "",
    end: "",
    room: "",
  });

  const addSchedule = () => {
    if (!newSchedule.course || !newSchedule.paperCode)
      return alert("Please fill all required fields.");
    setSchedule([{ id: Date.now(), ...newSchedule }, ...schedule]);
    setNewSchedule({
      course: "",
      paperCode: "",
      date: "",
      start: "",
      end: "",
      room: "",
    });
  };
  const deleteSchedule = (id) =>
    setSchedule((prev) => prev.filter((s) => s.id !== id));

  /* ------------------ Evaluation ------------------ */
  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      student: "John Smith",
      paper: "CS601",
      marks: 85,
      remarks: "Excellent performance",
      status: "Evaluated",
      fileUrl: "#",
    },
  ]);

  const handleEvaluate = (id, field, value) => {
    setEvaluations((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, [field]: value, status: "Evaluated" } : e
      )
    );
  };

  const submitEvaluation = (id) => {
    setEvaluations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Submitted" } : e))
    );
  };

  const submitAllToHOD = () => {
    setEvaluations((prev) => prev.map((e) => ({ ...e, status: "Submitted" })));
    alert("✅ Evaluations submitted to HOD successfully.");
  };

  /* ------------------ Marks & Analytics ------------------ */
  const [marks, setMarks] = useState([
    { id: 1, name: "John Smith", roll: "CS21/001", marks: 85 },
    { id: 2, name: "Priya Sharma", roll: "CS21/002", marks: 78 },
    { id: 3, name: "Amit Verma", roll: "CS21/003", marks: 92 },
  ]);

  const updateMarks = (id, value) => {
    setMarks((prev) =>
      prev.map((m) => (m.id === id ? { ...m, marks: Number(value) || 0 } : m))
    );
  };

  const reportStats = useMemo(() => {
    const scores = marks.map((m) => m.marks);
    const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const passPct = (
      (scores.filter((x) => x >= 40).length / scores.length) *
      100
    ).toFixed(0);
    return { avg, max, min, passPct };
  }, [marks]);

  const exportCSV = () => {
    const csv = [
      "Name,Roll,Marks",
      ...marks.map((m) => `${m.name},${m.roll},${m.marks}`),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marks_report.csv";
    a.click();
  };

  return (
    <div className="p-8 bg-base-100 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FileText className="w-6 h-6" /> Examination Management
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Manage exams, evaluations, marks, and performance analytics.
        </p>
      </div>

      {/* SECTION 1: Upload Exam Materials */}
      <section className="card bg-base-200 border border-base-300 p-5">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <Upload className="w-5 h-5 text-blue-600" /> Upload Exam Papers /
          Assignments / Quizzes
        </h3>

        <div className="grid md:grid-cols-4 gap-3 mb-3">
          <select
            className="select select-bordered"
            value={newMaterial.type}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, type: e.target.value })
            }
          >
            <option>Exam Paper</option>
            <option>Assignment</option>
            <option>Quiz</option>
          </select>
          <input
            className="input input-bordered"
            placeholder="Title"
            value={newMaterial.title}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, title: e.target.value })
            }
          />
          <input
            className="input input-bordered"
            placeholder="Topic"
            value={newMaterial.topic}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, topic: e.target.value })
            }
          />
          <input
            className="input input-bordered"
            placeholder="File name"
            value={newMaterial.file}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, file: e.target.value })
            }
          />
        </div>
        <button onClick={addMaterial} className="btn btn-primary mb-3">
          <Plus className="w-4 h-4 mr-1" /> Upload
        </button>

        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Topic</th>
                <th>File</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr key={m.id}>
                  <td>{m.type}</td>
                  <td>{m.title}</td>
                  <td>{m.topic}</td>
                  <td className="text-blue-600">{m.file}</td>
                  <td>
                    <button
                      onClick={() => deleteMaterial(m.id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 2: Schedule */}
      <section className="card bg-base-200 border border-base-300 p-5">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <CalendarDays className="w-5 h-5 text-blue-600" /> Set Exam Schedule
        </h3>
        <div className="grid md:grid-cols-6 gap-3 mb-3">
          <input
            className="input input-bordered"
            placeholder="Course"
            value={newSchedule.course}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, course: e.target.value })
            }
          />
          <input
            className="input input-bordered"
            placeholder="Paper Code"
            value={newSchedule.paperCode}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, paperCode: e.target.value })
            }
          />
          <input
            type="date"
            className="input input-bordered"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
          />
          <input
            type="time"
            className="input input-bordered"
            value={newSchedule.start}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, start: e.target.value })
            }
          />
          <input
            type="time"
            className="input input-bordered"
            value={newSchedule.end}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, end: e.target.value })
            }
          />
          <input
            className="input input-bordered"
            placeholder="Room No."
            value={newSchedule.room}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, room: e.target.value })
            }
          />
        </div>
        <button onClick={addSchedule} className="btn btn-primary mb-3">
          <Plus className="w-4 h-4 mr-1" /> Add Schedule
        </button>

        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm">
            <thead>
              <tr>
                <th>Course</th>
                <th>Paper Code</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s) => (
                <tr key={s.id}>
                  <td>{s.course}</td>
                  <td>{s.paperCode}</td>
                  <td>{s.date}</td>
                  <td>
                    {s.start} - {s.end}
                  </td>
                  <td>{s.room}</td>
                  <td>
                    <button
                      onClick={() => deleteSchedule(s.id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: Evaluation */}
      <section className="card bg-base-200 border border-base-300 p-5">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <ClipboardList className="w-5 h-5 text-blue-600" /> Evaluate Exam
          Scripts / Assignments
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Paper</th>
                <th>File</th>
                <th>Marks</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((e, i) => (
                <tr key={e.id}>
                  <td>{i + 1}</td>
                  <td>{e.student}</td>
                  <td>{e.paper}</td>
                  <td>
                    <a
                      href={e.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" /> View
                    </a>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered w-20"
                      value={e.marks ?? ""}
                      onChange={(ev) =>
                        handleEvaluate(e.id, "marks", Number(ev.target.value))
                      }
                      disabled={e.status === "Submitted"}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input input-bordered w-40"
                      placeholder="Remarks"
                      value={e.remarks ?? ""}
                      onChange={(ev) =>
                        handleEvaluate(e.id, "remarks", ev.target.value)
                      }
                      disabled={e.status === "Submitted"}
                    />
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        e.status === "Evaluated"
                          ? "badge-success"
                          : e.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {e.status}
                    </span>
                  </td>
                  <td>
                    {e.status === "Evaluated" && (
                      <button
                        onClick={() => submitEvaluation(e.id)}
                        className="btn btn-xs btn-outline"
                      >
                        <Send className="w-4 h-4 mr-1" /> Submit
                      </button>
                    )}
                    {e.status === "Submitted" && (
                      <div className="text-gray-400 flex items-center text-xs">
                        <Lock className="w-4 h-4 mr-1" /> Locked
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={submitAllToHOD}
            className="btn bg-gradient-to-r from-green-600 to-emerald-600 text-white"
          >
            <CheckCircle className="w-4 h-4 mr-2" /> Submit All to HOD
          </button>
        </div>
      </section>

      {/* SECTION 4: Marks + Analytics */}
      <section className="card bg-base-200 border border-base-300 p-5">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-600" /> Internal Marks, Reports
          & Analytics
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Roll No.</th>
                <th>Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m, i) => (
                <tr key={m.id}>
                  <td>{i + 1}</td>
                  <td>{m.name}</td>
                  <td>{m.roll}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered w-20"
                      value={m.marks}
                      onChange={(e) => updateMarks(m.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        m.marks >= 40 ? "badge-success" : "badge-error"
                      }`}
                    >
                      {m.marks >= 40 ? "Pass" : "Fail"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-3 mt-4">
          <div className="stat bg-base-100 shadow rounded-md border border-base-300 p-3">
            <div className="stat-title text-xs">Average</div>
            <div className="stat-value text-2xl text-blue-700">
              {reportStats.avg}
            </div>
          </div>
          <div className="stat bg-base-100 shadow rounded-md border border-base-300 p-3">
            <div className="stat-title text-xs">Highest</div>
            <div className="stat-value text-2xl text-blue-700">
              {reportStats.max}
            </div>
          </div>
          <div className="stat bg-base-100 shadow rounded-md border border-base-300 p-3">
            <div className="stat-title text-xs">Lowest</div>
            <div className="stat-value text-2xl text-blue-700">
              {reportStats.min}
            </div>
          </div>
          <div className="stat bg-base-100 shadow rounded-md border border-base-300 p-3">
            <div className="stat-title text-xs">Pass %</div>
            <div className="stat-value text-2xl text-blue-700">
              {reportStats.passPct}%
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button onClick={exportCSV} className="btn btn-outline">
            <FileDown className="w-4 h-4 mr-2" /> Export Report
          </button>
          <button
            onClick={submitAllToHOD}
            className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Send className="w-4 h-4 mr-2" /> Submit Final Grades to HOD/Admin
          </button>
        </div>
      </section>
    </div>
  );
}
