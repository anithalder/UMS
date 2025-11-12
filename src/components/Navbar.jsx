import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import NotificationsPanel from "./NotificationPanel";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout Handler
  const handleLogout = () => {
    // Clear any saved authentication data
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Optional: show a soft logout confirmation
    alert("👋 You have been logged out successfully!");

    // Redirect to login
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 NAVBAR */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40 px-4">
        {/* Left: University Title */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl font-semibold text-primary tracking-wide"
          >
            University of Calcutta
          </Link>
        </div>

        {/* Right: Icons & Avatar */}
        <div className="flex-none flex items-center gap-4 pr-2">
          {/* 🔔 Notification Bell */}
          <button
            className="btn btn-ghost btn-circle hover:bg-base-200 transition"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 
                  2.032 0 0118 14.158V11a6.002 
                  6.002 0 00-4-5.659V5a2 2 0 
                  10-4 0v.341C7.67 6.165 6 8.388 
                  6 11v3.159c0 .538-.214 1.055-.595 
                  1.436L4 17h5m6 0v1a3 3 0 
                  11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>

          {/* 🧍‍♂️ Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <button
                  className="justify-between"
                  onClick={() => setIsProfileOpen(true)}
                >
                  Profile Settings
                  <span className="badge badge-primary text-white">New</span>
                </button>
              </li>

              {/* ✅ Logout Option */}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🧩 Profile Settings Modal */}
      {isProfileOpen && (
        <ProfileSettings
          userRole="hod"
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {/* 🧾 Notifications Panel */}
      {isNotificationsOpen && (
        <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />
      )}
    </>
  );
}
