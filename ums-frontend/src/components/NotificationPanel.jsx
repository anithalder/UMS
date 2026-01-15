import React, { useState, useEffect } from "react";
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
} from "lucide-react";

export default function NotificationsPanel({ onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Assignment Graded",
      message: "Your CS401 assignment has been graded. Score: 95/100",
      time: "5 minutes ago",
      unread: true,
      category: "academic",
    },
    {
      id: 2,
      type: "warning",
      title: "Fee Payment Reminder",
      message: "Semester fee payment due in 3 days. Amount: ₹2,400",
      time: "2 hours ago",
      unread: true,
      category: "finance",
    },
    {
      id: 3,
      type: "info",
      title: "Exam Schedule Published",
      message: "End semester exam schedule is now available",
      time: "5 hours ago",
      unread: true,
      category: "academic",
    },
    {
      id: 4,
      type: "success",
      title: "Document Approved",
      message: "Your Bonafide certificate request has been approved",
      time: "1 day ago",
      unread: false,
      category: "system",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCardTheme = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 hover:border-green-400";
      case "warning":
        return "bg-yellow-50 border-yellow-200 hover:border-yellow-400";
      case "info":
        return "bg-blue-50 border-blue-200 hover:border-blue-400";
      default:
        return "bg-base-200 border-base-300 hover:border-base-400";
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return n.unread;
    return n.category === filter;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Allow closing with ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Notification Panel */}
      <div className="relative w-full max-w-md h-screen bg-base-100 border-l border-base-300 shadow-2xl flex flex-col animate-slideIn rounded-l-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-primary text-white p-4 flex items-center justify-between rounded-tl-2xl">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Notifications</h2>
            {unreadCount > 0 && (
              <span className="badge bg-red-500 border-none text-white ml-1">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 p-3 border-b border-base-300 bg-base-200">
          {[
            { label: "All", value: "all" },
            { label: "Unread", value: "unread" },
            { label: "Academic", value: "academic" },
            { label: "Finance", value: "finance" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`btn btn-sm transition-all ${
                filter === tab.value
                  ? "bg-gradient-to-r from-blue-600 to-primary text-white border-none"
                  : "btn-outline border-base-300"
              }`}
            >
              {tab.label}
              {tab.value === "unread" && unreadCount > 0 && (
                <span className="ml-1 badge badge-xs bg-red-500 text-white border-none">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No notifications found</p>
            </div>
          ) : (
            filtered.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`relative group p-4 rounded-xl border transition-all shadow-sm hover:shadow-md cursor-pointer ${getCardTheme(
                  n.type
                )}`}
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(n.id);
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 pr-4">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-sm text-gray-800">
                        {n.title}
                      </p>
                      {n.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-snug">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {n.time}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-base-300 bg-base-200 flex flex-col gap-2 rounded-b-2xl">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn btn-outline btn-sm w-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-primary hover:text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" /> Mark All as Read
            </button>
          )}
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm w-full hover:bg-base-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
