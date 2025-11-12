import React from "react";
import {
  Users,
  Calendar,
  BookOpen,
  Clock,
  Award,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Video,
  TrendingUp,
  Bell,
} from "lucide-react";

export default function FacultyDashboard() {
  const facultyData = {
    name: "Dr. Sarah Johnson",
    employeeId: "FAC/CS/042",
    department: "Computer Science",
    designation: "Assistant Professor",
    coursesTeaching: 4,
    totalStudents: 245,
    classesThisWeek: 12,
    pendingEvaluations: 8,
  };

  const todayClasses = [
    {
      course: "Machine Learning",
      batch: "CS 8th Sem",
      time: "10:00 AM",
      room: "Room 301",
      students: 65,
    },
    {
      course: "Data Science",
      batch: "CS 6th Sem",
      time: "02:00 PM",
      room: "Lab 204",
      students: 58,
    },
    {
      course: "AI Lab",
      batch: "CS 8th Sem",
      time: "04:00 PM",
      room: "Lab 305",
      students: 32,
    },
  ];

  const coursesOverview = [
    {
      name: "Machine Learning",
      students: 65,
      attendance: 88,
      syllabus: 75,
      assignments: 3,
    },
    {
      name: "Data Science",
      students: 58,
      attendance: 92,
      syllabus: 82,
      assignments: 4,
    },
    {
      name: "Artificial Intelligence",
      students: 72,
      attendance: 85,
      syllabus: 68,
      assignments: 2,
    },
    {
      name: "AI Lab",
      students: 32,
      attendance: 95,
      syllabus: 70,
      assignments: 5,
    },
  ];

  const pendingTasks = [
    { task: "Grade ML Assignment 3", count: 65, deadline: "2025-11-12" },
    { task: "Upload Data Science Notes", count: 1, deadline: "2025-11-10" },
    { task: "Approve Leave Requests", count: 3, deadline: "2025-11-09" },
    { task: "Submit Internal Marks", count: 2, deadline: "2025-11-15" },
  ];

  const studentPerformance = [
    { metric: "Average Attendance", value: 90, trend: "+3%" },
    { metric: "Average CGPA", value: 8.2, trend: "+0.4" },
    { metric: "Assignment Submission", value: 87, trend: "-2%" },
    { metric: "Class Participation", value: 75, trend: "+5%" },
  ];

  return (
    <div className="space-y-6">
      {/* 🌈 Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {facultyData.name}!
        </h1>
        <p className="text-purple-100 mb-4">
          {facultyData.employeeId} • {facultyData.designation} •{" "}
          {facultyData.department}
        </p>
        <div className="flex gap-4">
          {[
            { label: "Courses", value: facultyData.coursesTeaching },
            { label: "Students", value: facultyData.totalStudents },
            { label: "Classes/Week", value: facultyData.classesThisWeek },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 text-center"
            >
              <p className="text-xs text-purple-100">{item.label}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: "Courses Teaching",
            icon: <BookOpen className="text-purple-600" />,
            value: facultyData.coursesTeaching,
            sub: "Active this semester",
          },
          {
            title: "Total Students",
            icon: <Users className="text-blue-600" />,
            value: facultyData.totalStudents,
            sub: "Across all courses",
          },
          {
            title: "Classes This Week",
            icon: <Calendar className="text-green-600" />,
            value: facultyData.classesThisWeek,
            sub: "3 more to complete",
          },
          {
            title: "Pending Tasks",
            icon: <AlertCircle className="text-orange-600" />,
            value: facultyData.pendingEvaluations,
            sub: "Require attention",
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
            <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* 🧩 Schedule + Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="text-primary w-5 h-5" />
            <h3 className="font-semibold text-base-content">Today's Classes</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Friday, November 8, 2025</p>
          {todayClasses.map((cls, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-lg mb-2"
            >
              <div>
                <p className="text-sm font-medium">{cls.course}</p>
                <p className="text-xs text-gray-500">
                  {cls.batch} • {cls.room}
                </p>
              </div>
              <span className="badge badge-outline text-xs">
                {cls.students} students
              </span>
            </div>
          ))}
          <button className="btn btn-outline btn-sm w-full mt-3">
            <Calendar className="w-4 h-4 mr-2" /> View Full Schedule
          </button>
        </div>

        {/* Pending Tasks */}
        <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="text-primary w-5 h-5" />
            <h3 className="font-semibold text-base-content">Pending Tasks</h3>
          </div>
          {pendingTasks.map((task, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-base-200 p-3 rounded-lg mb-2"
            >
              <div>
                <p className="text-sm">{task.task}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>
              <span className="badge badge-warning text-xs">
                {task.count} {task.count === 1 ? "item" : "items"}
              </span>
            </div>
          ))}
          <button className="btn btn-primary btn-sm w-full mt-3">
            <CheckCircle2 className="w-4 h-4 mr-2" /> View All Tasks
          </button>
        </div>
      </div>

      {/* 📚 Courses Overview */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="text-primary w-5 h-5" />
          <h3 className="font-semibold text-base-content">Courses Overview</h3>
        </div>
        {coursesOverview.map((course, i) => (
          <div
            key={i}
            className="border border-base-300 rounded-lg p-4 mb-3 hover:shadow-sm transition"
          >
            <div className="flex justify-between mb-3">
              <h4 className="font-medium text-sm">{course.name}</h4>
              <span className="badge badge-outline text-xs">
                {course.students} students
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Attendance</p>
                <div className="w-full bg-base-300 h-2 rounded-full mb-1">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${course.attendance}%` }}
                  ></div>
                </div>
                <p className="text-xs">{course.attendance}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Syllabus</p>
                <div className="w-full bg-base-300 h-2 rounded-full mb-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${course.syllabus}%` }}
                  ></div>
                </div>
                <p className="text-xs">{course.syllabus}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Assignments</p>
                <p className="text-sm">{course.assignments} completed</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📈 Student Performance */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Award className="text-primary w-5 h-5" />
          <h3 className="font-semibold text-base-content">
            Student Performance Metrics
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {studentPerformance.map((metric, i) => (
            <div
              key={i}
              className="p-4 bg-base-200 rounded-lg hover:shadow-sm transition"
            >
              <p className="text-xs text-gray-500 mb-2">{metric.metric}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold">
                  {metric.value}
                  {metric.value < 10 ? "" : "%"}
                </span>
                <span
                  className={`text-xs flex items-center ${
                    metric.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
        <h3 className="font-semibold text-base-content mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Upload className="w-5 h-5" />, text: "Upload Material" },
            {
              icon: <CheckCircle2 className="w-5 h-5" />,
              text: "Mark Attendance",
            },
            {
              icon: <FileText className="w-5 h-5" />,
              text: "Grade Assignments",
            },
            { icon: <Video className="w-5 h-5" />, text: "Start Live Class" },
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

      {/* 🔔 Department Announcements */}
      <div className="bg-base-100 border border-base-300 rounded-xl shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="text-primary w-5 h-5" />
          <h3 className="font-semibold text-base-content">
            Department Announcements
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-base-200 border-l-4 border-blue-500 rounded-lg">
            <AlertCircle className="text-blue-600 w-5 h-5" />
            <div>
              <p className="text-sm">
                Faculty meeting scheduled for November 12, 2025
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posted by HOD - 3 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-base-200 border-l-4 border-purple-500 rounded-lg">
            <Bell className="text-purple-600 w-5 h-5" />
            <div>
              <p className="text-sm">
                Submit internal assessment marks by November 15
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posted by Admin - 1 day ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
