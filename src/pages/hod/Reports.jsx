import React, { useMemo, useState } from "react";
import {
  Download,
  Send,
  BarChart3,
  FileText,
  Activity,
  Users,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";

export default function Reports() {
  // Mock Department Data (Scoped to HOD)
  const department = {
    id: "cse",
    name: "Computer Science",
    programs: ["B.Tech CSE", "M.Tech CSE", "M.Sc. Computer Science"],
    students: [
      {
        id: 1,
        program: "B.Tech CSE",
        semester: "1",
        status: "pass",
        attendance: 92,
        internal: 38,
        external: 62,
      },
      {
        id: 2,
        program: "B.Tech CSE",
        semester: "1",
        status: "pass",
        attendance: 85,
        internal: 34,
        external: 55,
      },
      {
        id: 3,
        program: "B.Tech CSE",
        semester: "2",
        status: "fail",
        attendance: 62,
        internal: 28,
        external: 29,
      },
      {
        id: 4,
        program: "B.Tech CSE",
        semester: "2",
        status: "pass",
        attendance: 79,
        internal: 35,
        external: 48,
      },
      {
        id: 5,
        program: "M.Tech CSE",
        semester: "1",
        status: "pass",
        attendance: 88,
        internal: 40,
        external: 65,
      },
      {
        id: 6,
        program: "M.Sc. Computer Science",
        semester: "1",
        status: "pass",
        attendance: 95,
        internal: 45,
        external: 70,
      },
      {
        id: 7,
        program: "B.Tech CSE",
        semester: "4",
        status: "fail",
        attendance: 55,
        internal: 22,
        external: 30,
      },
    ],
  };

  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");

  const filtered = useMemo(() => {
    return department.students.filter(
      (s) =>
        (program ? s.program === program : true) &&
        (semester ? s.semester === semester : true)
    );
  }, [program, semester]);

  const strengthPerSemester = useMemo(() => {
    const map = {};
    department.students.forEach((s) => {
      map[s.semester] = (map[s.semester] || 0) + 1;
    });
    return Object.entries(map).map(([semester, count]) => ({
      semester,
      count,
    }));
  }, []);

  const passFailStats = useMemo(() => {
    const byProgram = {};
    department.students.forEach((s) => {
      if (!byProgram[s.program]) byProgram[s.program] = { pass: 0, fail: 0 };
      s.status === "pass"
        ? byProgram[s.program].pass++
        : byProgram[s.program].fail++;
    });
    return byProgram;
  }, []);

  const attendanceSummary = useMemo(() => {
    const map = {};
    department.students.forEach((s) => {
      if (!map[s.program]) map[s.program] = { sum: 0, count: 0 };
      map[s.program].sum += s.attendance;
      map[s.program].count++;
    });
    return Object.entries(map).map(([program, v]) => ({
      program,
      avg: Math.round(v.sum / v.count),
    }));
  }, []);

  const resultAnalysis = useMemo(() => {
    const map = {};
    department.students.forEach((s) => {
      if (!map[s.program])
        map[s.program] = { internal: 0, external: 0, count: 0 };
      map[s.program].internal += s.internal;
      map[s.program].external += s.external;
      map[s.program].count++;
    });
    return Object.entries(map).map(([program, v]) => ({
      program,
      internal: Math.round(v.internal / v.count),
      external: Math.round(v.external / v.count),
    }));
  }, []);

  // Export to CSV
  const exportToCSV = (filename, data) => {
    if (!data?.length) return toast.error("No data available!");
    const keys = Object.keys(data[0]);
    const csv = [
      keys.join(","),
      ...data.map((r) => keys.map((k) => r[k]).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    toast.success(`Exported ${filename}`);
  };

  // Submit compiled report
  const submitReport = () => {
    toast.promise(new Promise((res) => setTimeout(() => res(), 1000)), {
      loading: "Submitting compiled report...",
      success: "Report submitted to Admin / Management ✅",
      error: "Submission failed. Try again.",
    });
  };

  const Bar = ({ value, max = 100 }) => (
    <div className="w-full bg-base-300 rounded-full h-3">
      <div
        className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" /> Reports & Analytics
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Generate, export, and review departmental performance data.
            </p>
          </div>
          <button
            onClick={submitReport}
            className="btn btn-primary text-white flex items-center gap-2"
          >
            <Send className="w-4 h-4" /> Submit to Admin
          </button>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-base-content">
            Filter Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="select select-bordered"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="">All Programs</option>
              {department.programs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">All Semesters</option>
              {[...new Set(department.students.map((s) => s.semester))].map(
                (sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1️⃣ Student Strength per Semester */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Student Strength
              </h4>
              <button
                className="btn btn-sm btn-outline"
                onClick={() =>
                  exportToCSV("student_strength.csv", strengthPerSemester)
                }
              >
                <Download className="w-4 h-4 mr-1" /> Export
              </button>
            </div>
            {strengthPerSemester.map((s) => (
              <div key={s.semester} className="flex items-center gap-3 mb-2">
                <div className="w-24 text-sm">Sem {s.semester}</div>
                <div className="flex-1">
                  <Bar value={s.count} max={10} />
                </div>
                <div className="w-12 text-right font-medium">{s.count}</div>
              </div>
            ))}
          </div>

          {/* 2️⃣ Pass/Fail Statistics */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" /> Pass/Fail Stats
              </h4>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => {
                  const data = Object.entries(passFailStats).map(
                    ([prog, v]) => ({
                      Program: prog,
                      Pass: v.pass,
                      Fail: v.fail,
                    })
                  );
                  exportToCSV("pass_fail_stats.csv", data);
                }}
              >
                <Download className="w-4 h-4 mr-1" /> Export
              </button>
            </div>
            {Object.entries(passFailStats).map(([prog, v]) => (
              <div key={prog} className="mb-3">
                <p className="text-sm font-medium">{prog}</p>
                <Bar value={v.pass} max={v.pass + v.fail} />
                <p className="text-xs text-gray-500 mt-1">
                  Pass: {v.pass} | Fail: {v.fail}
                </p>
              </div>
            ))}
          </div>

          {/* 3️⃣ Attendance Summary */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-600" /> Attendance
              </h4>
              <button
                className="btn btn-sm btn-outline"
                onClick={() =>
                  exportToCSV("attendance_summary.csv", attendanceSummary)
                }
              >
                <Download className="w-4 h-4 mr-1" /> Export
              </button>
            </div>
            {attendanceSummary.map((a) => (
              <div key={a.program} className="flex items-center gap-3 mb-2">
                <div className="w-48 text-sm">{a.program}</div>
                <div className="flex-1">
                  <Bar value={a.avg} max={100} />
                </div>
                <div className="w-12 text-right">{a.avg}%</div>
              </div>
            ))}
          </div>

          {/* 4️⃣ Internal/External Result Analysis */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Result Analysis
              </h4>
              <button
                className="btn btn-sm btn-outline"
                onClick={() =>
                  exportToCSV("result_analysis.csv", resultAnalysis)
                }
              >
                <Download className="w-4 h-4 mr-1" /> Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table text-sm border border-base-300">
                <thead className="bg-base-200">
                  <tr>
                    <th>Program</th>
                    <th>Internal</th>
                    <th>External</th>
                    <th>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {resultAnalysis.map((r) => (
                    <tr key={r.program}>
                      <td>{r.program}</td>
                      <td>{r.internal}</td>
                      <td>{r.external}</td>
                      <td>{Math.round((r.internal + r.external) / 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Filtered Students Table */}
        <div className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm">
          <h4 className="font-semibold mb-3">Filtered Student Data</h4>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">No students match filters.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table text-sm border border-base-300">
                <thead className="bg-base-200">
                  <tr>
                    <th>#</th>
                    <th>Program</th>
                    <th>Semester</th>
                    <th>Status</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.id}>
                      <td>{i + 1}</td>
                      <td>{s.program}</td>
                      <td>{s.semester}</td>
                      <td>{s.status}</td>
                      <td>{s.attendance}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
