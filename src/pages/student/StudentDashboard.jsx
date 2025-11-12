import React from "react";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Wallet,
  TrendingUp,
  Clock,
  Award,
  Library,
  FileText,
  AlertCircle,
  CheckCircle2,
  Video,
  Bell,
} from "lucide-react";

export default function StudentDashboard() {
  const studentData = {
    name: "John Smith",
    rollNumber: "CS/21/001",
    semester: "8th Semester",
    department: "Computer Science",
    cgpa: 8.7,
    attendance: 87,
    creditsCompleted: 142,
    totalCredits: 160,
  };

  const upcomingClasses = [
    {
      subject: "Machine Learning",
      time: "10:00 AM",
      room: "Room 301",
      faculty: "Dr. Sarah Johnson",
    },
    {
      subject: "Cloud Computing",
      time: "02:00 PM",
      room: "Lab 204",
      faculty: "Prof. Michael Chen",
    },
    {
      subject: "Cyber Security",
      time: "04:00 PM",
      room: "Room 405",
      faculty: "Dr. Emily Davis",
    },
  ];

  const recentGrades = [
    { subject: "Data Science", marks: 92, grade: "A+", credits: 4 },
    { subject: "Software Engineering", marks: 88, grade: "A", credits: 4 },
    { subject: "Database Systems", marks: 85, grade: "A", credits: 3 },
    { subject: "Web Technologies", marks: 90, grade: "A+", credits: 3 },
  ];

  const pendingFees = [
    {
      type: "Semester Fee",
      amount: 15000,
      dueDate: "2025-12-15",
      status: "pending",
    },
    { type: "Exam Fee", amount: 2500, dueDate: "2025-12-01", status: "paid" },
  ];

  const libraryBooks = [
    {
      title: "Artificial Intelligence: A Modern Approach",
      dueDate: "2025-11-20",
    },
    { title: "Design Patterns", dueDate: "2025-11-25" },
  ];

  return (
    <div className="space-y-6">
      {/* 🎓 Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-primary text-white rounded-xl shadow-md p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {studentData.name}!
            </h1>
            <p className="text-blue-100 mb-4">
              {studentData.rollNumber} • {studentData.department} •{" "}
              {studentData.semester}
            </p>
            <div className="flex gap-4">
              {[
                { label: "Current CGPA", value: studentData.cgpa },
                { label: "Attendance", value: `${studentData.attendance}%` },
                {
                  label: "Credits",
                  value: `${studentData.creditsCompleted}/${studentData.totalCredits}`,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 text-center shadow-sm"
                >
                  <p className="text-xs text-blue-100">{item.label}</p>
                  <p className="text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-100">Academic Year</p>
            <p className="text-xl font-semibold">2024–2025</p>
          </div>
        </div>
      </div>

      {/* 📊 Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: "CGPA",
            icon: <Award className="text-primary" />,
            value: studentData.cgpa,
            sub: (
              <>
                <TrendingUp className="inline w-3 h-3 text-green-600 mr-1" />{" "}
                +0.3 from last semester
              </>
            ),
          },
          {
            title: "Attendance",
            icon: <Clock className="text-green-600" />,
            value: `${studentData.attendance}%`,
            progress: true,
          },
          {
            title: "Credits Earned",
            icon: <GraduationCap className="text-purple-600" />,
            value: studentData.creditsCompleted,
            sub: `${
              studentData.totalCredits - studentData.creditsCompleted
            } remaining`,
          },
          {
            title: "Pending Fees",
            icon: <Wallet className="text-orange-600" />,
            value: "₹15,000",
            sub: "Due by Dec 15, 2025",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-base-100 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-base-content">
                {card.title}
              </h3>
              {card.icon}
            </div>
            <div className="text-2xl font-semibold text-base-content">
              {card.value}
            </div>
            {card.progress && (
              <div className="w-full bg-base-300 h-2 mt-2 rounded-full">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${studentData.attendance}%` }}
                ></div>
              </div>
            )}
            {card.sub && (
              <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* 🧩 Schedule + Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="text-primary w-5 h-5" />
            <h3 className="font-semibold text-base-content">
              Today's Schedule
            </h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Friday, November 8, 2025</p>
          {upcomingClasses.map((cls, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-lg mb-2"
            >
              <div>
                <p className="font-medium text-sm">{cls.subject}</p>
                <p className="text-xs text-gray-500">{cls.faculty}</p>
                <p className="text-xs text-gray-500">
                  {cls.time} • {cls.room}
                </p>
              </div>
            </div>
          ))}
          <button className="btn btn-outline btn-sm w-full mt-3">
            <Calendar className="w-4 h-4 mr-2" /> View Full Timetable
          </button>
        </div>

        {/* Grades */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Award className="text-primary w-5 h-5" />
            <h3 className="font-semibold text-base-content">Recent Grades</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">
            Current Semester Performance
          </p>
          {recentGrades.map((g, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-lg mb-2"
            >
              <div>
                <p className="text-sm">{g.subject}</p>
                <p className="text-xs text-gray-500">{g.credits} Credits</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{g.marks}/100</p>
                <span className="badge badge-success text-xs">{g.grade}</span>
              </div>
            </div>
          ))}
          <button className="btn btn-outline btn-sm w-full mt-3">
            <FileText className="w-4 h-4 mr-2" /> View All Results
          </button>
        </div>
      </div>

      {/* 💰 Fees & 📚 Library */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fees */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="text-primary w-5 h-5" />
            <h3 className="font-semibold text-base-content">
              Fee Payment Status
            </h3>
          </div>
          {pendingFees.map((fee, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-lg mb-2"
            >
              <div>
                <p className="text-sm">{fee.type}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(fee.dueDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`badge ${
                  fee.status === "paid" ? "badge-success" : "badge-warning"
                } text-xs`}
              >
                {fee.status === "paid" ? "Paid" : "Pending"}
              </span>
            </div>
          ))}
          <button className="btn btn-primary btn-sm w-full mt-3">
            <Wallet className="w-4 h-4 mr-2" /> Pay Now
          </button>
        </div>

        {/* Library */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Library className="text-primary w-5 h-5" />
            <h3 className="font-semibold text-base-content">Library Books</h3>
          </div>
          {libraryBooks.map((book, i) => (
            <div
              key={i}
              className="flex justify-between bg-base-200 p-3 rounded-lg mb-2"
            >
              <div>
                <p className="text-sm">{book.title}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(book.dueDate).toLocaleDateString()}
                </p>
              </div>
              <span className="badge badge-outline text-xs">Issued</span>
            </div>
          ))}
          <button className="btn btn-outline btn-sm w-full mt-3">
            <BookOpen className="w-4 h-4 mr-2" /> Browse Library
          </button>
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-base-content mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Video className="w-5 h-5" />, text: "Online Classes" },
            {
              icon: <FileText className="w-5 h-5" />,
              text: "Request Certificate",
            },
            {
              icon: <BookOpen className="w-5 h-5" />,
              text: "Course Materials",
            },
            { icon: <Bell className="w-5 h-5" />, text: "Exam Schedule" },
          ].map((action, i) => (
            <button
              key={i}
              className="btn btn-outline btn-sm flex flex-col items-center gap-2 py-4"
            >
              {action.icon}
              <span className="text-sm">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🔔 Announcements */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-primary w-5 h-5" />
          <h3 className="font-semibold text-base-content">
            Recent Announcements
          </h3>
        </div>

        <div className="space-y-3">
          {/* Announcement 1 */}
          <div className="flex items-start gap-3 p-4 bg-base-200 border-l-4 border-blue-500 rounded-lg shadow-sm hover:shadow-md transition">
            <AlertCircle className="text-blue-600 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-base-content">
                Mid-semester examination schedule released
              </p>
              <p className="text-xs text-gray-500 mt-1">Posted 2 hours ago</p>
            </div>
          </div>

          {/* Announcement 2 */}
          <div className="flex items-start gap-3 p-4 bg-base-200 border-l-4 border-green-500 rounded-lg shadow-sm hover:shadow-md transition">
            <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-base-content">
                New course materials uploaded for Cloud Computing
              </p>
              <p className="text-xs text-gray-500 mt-1">Posted 1 day ago</p>
            </div>
          </div>

          {/* Announcement 3 */}
          <div className="flex items-start gap-3 p-4 bg-base-200 border-l-4 border-purple-500 rounded-lg shadow-sm hover:shadow-md transition">
            <Bell className="text-purple-600 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-base-content">
                Workshop on AI & ML — Register by Nov 15
              </p>
              <p className="text-xs text-gray-500 mt-1">Posted 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
