import React from "react";
import { useNavigate } from "react-router-dom";
import {
  School,
  People,
  Dashboard,
  Book,
  EventNote,
  BarChart,
  Layers,
  AccountBalance,
  Settings,
} from "@mui/icons-material";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
      {/* 🔹 Navbar */}
      <header className="bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            University of Calcutta
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* 🔹 Hero Section */}
      <section className="text-center py-20 px-6 bg-base-200">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Welcome to the University ERP Portal
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          A single unified system for managing academics, attendance, finance,
          and administration — for every department of the University.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="btn btn-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 rounded-xl shadow-md hover:scale-[1.03] transition-all"
        >
          Get Started
        </button>
      </section>

      {/* 🔹 Features Section */}
      <section className="py-16 bg-base-100 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-primary text-center mb-12">
            Core Features
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Academic Management",
                icon: <Layers className="w-8 h-8 text-blue-600" />,
                desc: "Handle subjects, assignments, and academic progress seamlessly.",
              },
              {
                title: "Attendance Tracking",
                icon: <EventNote className="w-8 h-8 text-blue-600" />,
                desc: "Monitor real-time attendance and generate course-level reports.",
              },
              {
                title: "Examination Module",
                icon: <Book className="w-8 h-8 text-blue-600" />,
                desc: "Create and manage exams, evaluations, and final grade submissions.",
              },
              {
                title: "Finance & Payments",
                icon: <AccountBalance className="w-8 h-8 text-blue-600" />,
                desc: "Manage fee payments, payrolls, and departmental funds easily.",
              },
              {
                title: "Analytics Dashboard",
                icon: <BarChart className="w-8 h-8 text-blue-600" />,
                desc: "View departmental and student performance with visual analytics.",
              },
              {
                title: "Role-Based Access",
                icon: <People className="w-8 h-8 text-blue-600" />,
                desc: "Separate secure dashboards for Students, Faculty, HOD, and Admins.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-base-200 border border-base-300 rounded-xl p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-base-content">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 Role Section */}
      <section className="py-16 bg-base-200 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-primary text-center mb-12">
            Portal Roles
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              { role: "Student", icon: <School fontSize="large" /> },
              { role: "Faculty", icon: <People fontSize="large" /> },
              { role: "HOD", icon: <Dashboard fontSize="large" /> },
              { role: "Admin", icon: <Settings fontSize="large" /> },
              { role: "Management", icon: <BarChart fontSize="large" /> },
            ].map((r, i) => (
              <div
                key={i}
                className="bg-base-100 border border-base-300 rounded-xl py-8 px-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex justify-center mb-3 text-primary">
                  {r.icon}
                </div>
                <h4 className="text-lg font-semibold text-base-content">
                  {r.role}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 About Section */}
      <section className="py-16 bg-base-100 border-t border-base-300">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-primary mb-6">
            About the System
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            This ERP system is built to digitalize the academic and
            administrative processes of the University of Calcutta. It connects
            students, faculty, HODs, and administrators on a single intelligent
            platform that enhances transparency, efficiency, and collaboration.
          </p>
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-base-100 border-t border-base-300 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} University of Calcutta | ERP Management
        System
      </footer>
    </div>
  );
}
