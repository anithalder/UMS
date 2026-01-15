/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Bell,
  Shield,
  Save,
  Camera,
  X,
} from "lucide-react";

export default function ProfileSettings({ userRole, onClose }) {
  // 🧩 Role-based mock data
  const getProfileData = () => {
    switch (userRole) {
      case "student":
        return {
          name: "John Smith",
          email: "john.smith@caluniv.ac.in",
          phone: "+91 98765 43210",
          id: "STU2025001",
          department: "Computer Science",
          year: "Final Year",
          batch: "2021-2025",
          rollNumber: "CS/21/001",
          dob: "2003-05-15",
          bloodGroup: "O+",
          address: "123 Park Street, Kolkata - 700016",
        };
      case "faculty":
        return {
          name: "Dr. Sarah Johnson",
          email: "sarah.johnson@caluniv.ac.in",
          phone: "+91 98765 43211",
          id: "FAC2025042",
          department: "Computer Science",
          designation: "Assistant Professor",
          specialization: "Machine Learning & AI",
          joiningDate: "2015-07-01",
          address: "456 Ballygunge Place, Kolkata - 700019",
        };
      case "hod":
        return {
          name: "Prof. Anit Halder",
          email: "anit.hod@caluniv.ac.in",
          phone: "+91 98765 43212",
          id: "HOD2025003",
          department: "Computer Science",
          designation: "Head of Department",
          office: "Room 201, Academic Block A",
          joiningDate: "2012-06-15",
          address: "University Main Campus, Kolkata - 700073",
        };
      default:
        return {
          name: "Admin User",
          email: "admin@caluniv.ac.in",
          phone: "+91 98765 43213",
          id: "ADM2025001",
          department: "Administration",
          designation: "System Administrator",
          office: "Admin Office - Block A",
          address: "University Campus, Kolkata - 700073",
        };
    }
  };

  const [profileData, setProfileData] = useState(getProfileData());
  const [isEditing, setIsEditing] = useState(false);
  const [tab, setTab] = useState("profile");

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = () => alert("✅ Profile updated successfully!");
  const handlePasswordChange = () => alert("🔒 Password changed successfully!");
  const handleSaveNotifications = () => alert("🔔 Preferences saved!");

  // 🎓 Render role-specific details
  const renderRoleSpecificInfo = () => {
    switch (userRole) {
      case "student":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Department</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.department}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Year</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.year}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({ ...profileData, year: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Batch</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.batch}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({ ...profileData, batch: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Roll Number</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.rollNumber}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Blood Group</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.bloodGroup}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={profileData.dob}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <input
                className="input input-bordered w-full"
                value={profileData.address}
                disabled={!isEditing}
              />
            </div>
          </>
        );

      case "faculty":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Department</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.department}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Designation</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.designation}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Specialization</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.specialization}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Joining Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={profileData.joiningDate}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <input
                className="input input-bordered w-full"
                value={profileData.address}
                disabled={!isEditing}
              />
            </div>
          </>
        );

      case "hod":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Department</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.department}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Designation</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.designation}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Office</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.office}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Joining Date</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={profileData.joiningDate}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <input
                className="input input-bordered w-full"
                value={profileData.address}
                disabled={!isEditing}
              />
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Department</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.department}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Designation</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.designation}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Office</label>
                <input
                  className="input input-bordered w-full"
                  value={profileData.office}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500">Address</label>
              <input
                className="input input-bordered w-full"
                value={profileData.address}
                disabled={!isEditing}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start p-6 overflow-y-auto">
      <div className="bg-base-100 rounded-xl shadow-2xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-base-300 bg-base-200 rounded-t-xl">
          <div>
            <h2 className="text-lg font-semibold">Profile Settings</h2>
            <p className="text-sm text-gray-500">
              Manage your account and preferences
            </p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-base-300 bg-base-200">
          {[
            {
              id: "profile",
              icon: <User className="w-4 h-4" />,
              label: "Profile",
            },
            {
              id: "security",
              icon: <Lock className="w-4 h-4" />,
              label: "Security",
            },
            {
              id: "notifications",
              icon: <Bell className="w-4 h-4" />,
              label: "Notifications",
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                tab === t.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* PROFILE TAB */}
          {tab === "profile" && (
            <div className="space-y-6">
              {/* Avatar + Header */}
              <div className="flex justify-between items-start bg-base-200 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-3xl font-bold">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 btn btn-primary btn-xs rounded-full">
                        <Camera className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {profileData.name}
                    </h3>
                    <p className="text-sm text-gray-500">{profileData.id}</p>
                    <span className="badge badge-outline capitalize mt-1">
                      {userRole}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`btn btn-sm ${
                    isEditing ? "btn-error" : "btn-outline"
                  }`}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              {/* Common Info */}
              <div className="bg-base-200 p-5 rounded-lg space-y-4">
                <h4 className="font-medium text-base-content">
                  {userRole.toUpperCase()} Profile Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                      className="input input-bordered w-full"
                      value={profileData.email}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <input
                      className="input input-bordered w-full"
                      value={profileData.phone}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                {renderRoleSpecificInfo()}
                {isEditing && (
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4 mr-2" /> Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {tab === "security" && (
            <div className="bg-base-200 p-5 rounded-lg space-y-4">
              <h4 className="font-medium">Change Password</h4>
              <input
                type="password"
                placeholder="Current Password"
                className="input input-bordered w-full"
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="New Password"
                className="input input-bordered w-full"
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
              />
              <button
                onClick={handlePasswordChange}
                className="btn btn-primary w-full"
              >
                <Lock className="w-4 h-4 mr-2" /> Change Password
              </button>
            </div>
          )}

          {/* NOTIFICATION TAB */}
          {tab === "notifications" && (
            <div className="bg-base-200 p-5 rounded-lg space-y-4">
              <h4 className="font-medium">Notification Preferences</h4>
              {Object.entries(notifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b border-base-300 py-2"
                >
                  <div>
                    <p className="text-sm capitalize">{key} Notifications</p>
                    <p className="text-xs text-gray-500">
                      Receive updates via {key.toUpperCase()}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={value}
                    onChange={() =>
                      setNotifications({
                        ...notifications,
                        [key]: !notifications[key],
                      })
                    }
                  />
                </div>
              ))}
              <button
                onClick={handleSaveNotifications}
                className="btn btn-primary w-full mt-2"
              >
                <Save className="w-4 h-4 mr-2" /> Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
