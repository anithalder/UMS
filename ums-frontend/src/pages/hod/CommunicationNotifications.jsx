import React, { useState } from "react";
import {
  Megaphone,
  Bell,
  CalendarDays,
  Users,
  ClipboardList,
  Send,
  AlertCircle,
  MessageSquare,
  Plus,
} from "lucide-react";

export default function CommunicationNotifications() {
  // 📢 Department Announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Department Meeting",
      audience: "Faculty",
      message:
        "All faculty members are requested to attend the departmental meeting on 15th Nov at 10:00 AM in Seminar Hall.",
      date: "2025-11-10",
    },
    {
      id: 2,
      title: "Project Submission Deadline",
      audience: "Students",
      message:
        "Final-year students must submit their project reports by 25th Nov via the portal.",
      date: "2025-11-09",
    },
  ]);

  // 🔔 System Notifications
  const [systemNotifications] = useState([
    {
      id: 1,
      title: "Exam Schedule Update",
      source: "Controller of Exams",
      message: "Revised exam schedule for MCA and M.Tech has been uploaded.",
      date: "2025-11-11",
    },
    {
      id: 2,
      title: "Maintenance Notice",
      source: "Admin",
      message: "Server maintenance scheduled for 14th Nov, 8–10 PM.",
      date: "2025-11-08",
    },
  ]);

  // 🗓️ Noticeboard Events
  const [notices, setNotices] = useState([
    {
      id: 1,
      event: "Tech Symposium 2025",
      details: "Inter-college tech fest hosted by IT Department on Dec 5th.",
      date: "2025-11-05",
    },
  ]);

  // 📝 Form State for New Announcement
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    audience: "All",
    message: "",
  });

  // ➕ Add New Announcement
  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.message)
      return alert("Please fill all fields!");
    setAnnouncements([
      ...announcements,
      {
        id: announcements.length + 1,
        ...newAnnouncement,
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
    setNewAnnouncement({ title: "", audience: "All", message: "" });
  };

  // ➕ Add New Notice
  const handleAddNotice = () => {
    const newNotice = {
      id: notices.length + 1,
      event: "New Department Event",
      details: "Details to be updated soon.",
      date: new Date().toISOString().slice(0, 10),
    };
    setNotices([...notices, newNotice]);
  };

  return (
    <div className="p-6 min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-royalblue to-blue-700 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Megaphone className="w-6 h-6" />
            Communication & Notifications
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Send department-wide messages, receive system notifications, and
            maintain your departmental noticeboard.
          </p>
        </div>

        {/* 📢 Department Announcements */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Announcements
            </h3>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              placeholder="Announcement Title"
              className="input input-bordered w-full"
              value={newAnnouncement.title}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  title: e.target.value,
                })
              }
            />
            <select
              className="select select-bordered w-full"
              value={newAnnouncement.audience}
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  audience: e.target.value,
                })
              }
            >
              <option value="All">All</option>
              <option value="Faculty">Faculty</option>
              <option value="Students">Students</option>
            </select>
            <button
              onClick={handleAddAnnouncement}
              className="btn btn-primary flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Send
            </button>
          </div>

          <textarea
            className="textarea textarea-bordered w-full mb-4"
            rows="3"
            placeholder="Type your announcement message..."
            value={newAnnouncement.message}
            onChange={(e) =>
              setNewAnnouncement({
                ...newAnnouncement,
                message: e.target.value,
              })
            }
          ></textarea>

          {/* Announcements Table */}
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Title</th>
                  <th>Audience</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a) => (
                  <tr key={a.id} className="hover:bg-base-200/60 transition">
                    <td className="font-medium">{a.title}</td>
                    <td>
                      <span className="badge badge-outline badge-info">
                        {a.audience}
                      </span>
                    </td>
                    <td>{a.message}</td>
                    <td>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 🔔 System Notifications */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            System Notifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {systemNotifications.map((n) => (
              <div
                key={n.id}
                className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between">
                  <h4 className="font-semibold text-primary">{n.title}</h4>
                  <span className="text-xs text-gray-500">{n.date}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Source: <strong>{n.source}</strong>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 🗓️ Department Noticeboard */}
        <section className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Departmental Noticeboard
            </h3>
            <button
              onClick={handleAddNotice}
              className="btn btn-sm btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Notice
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm border border-base-300">
              <thead className="bg-base-200 text-gray-700">
                <tr>
                  <th>Event</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((n) => (
                  <tr key={n.id} className="hover:bg-base-200/50">
                    <td className="font-medium">{n.event}</td>
                    <td>{n.details}</td>
                    <td>{n.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
