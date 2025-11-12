/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, KeyRound, X } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // ✅ Mock User Data
  const validUsers = {
    faculty: {
      email: "faculty@caluniv.ac.in",
      password: "123456",
      route: "/faculty/dashboard",
    },
    student: {
      email: "student@caluniv.ac.in",
      password: "123456",
      route: "/student/dashboard",
    },
    hod: {
      email: "hod@caluniv.ac.in",
      password: "123456",
      route: "/hod",
    },
    admin: {
      email: "admin@caluniv.ac.in",
      password: "123456",
      route: "/admin",
    },
  };

  // ✅ Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("⚠️ Please fill in both fields!");
      return;
    }

    const userEntry = Object.entries(validUsers).find(
      ([, info]) => info.email === email && info.password === password
    );

    if (userEntry) {
      const [role, info] = userEntry;
      localStorage.setItem("user", JSON.stringify({ email, role }));
      toast.success(`✅ Welcome back, ${role.toUpperCase()}!`);
      setTimeout(() => navigate(info.route), 1200);
    } else {
      toast.error("❌ Invalid email or password!");
    }
  };

  // ✅ Handle Password Reset
  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.warning("⚠️ Please enter your registered email!");
      return;
    }
    toast.success(`📧 Reset link sent to ${resetEmail}`);
    setIsResetOpen(false);
    setResetEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 relative">
      <Toaster position="top-center" richColors />

      {/* Login Card */}
      <div className="bg-base-100 border border-base-300 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">
            University of Calcutta
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="flex items-center gap-3 border border-base-300 rounded-xl px-4 py-3 bg-base-100 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
            <Mail className="w-5 h-5 text-gray-600" />
            <input
              type="email"
              placeholder="you@caluniv.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-base placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center gap-3 border border-base-300 rounded-xl px-4 py-3 bg-base-100 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
            <Lock className="w-5 h-5 text-gray-600" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent outline-none text-base placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-blue-600 transition"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => setIsResetOpen(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-primary text-white font-semibold rounded-xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400 text-sm mt-4 mb-0">or</div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline w-full mt-3 border-base-300"
        >
          Back to Home
        </button>
      </div>

      {/* 🔹 Reset Password Modal */}
      {isResetOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsResetOpen(false)}
          ></div>

          <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 btn btn-ghost btn-sm btn-circle"
                onClick={() => setIsResetOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                <KeyRound className="w-5 h-5 text-gray-600" />
                Reset Password
              </h3>

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="flex items-center gap-3 border border-base-300 rounded-xl px-4 py-3 bg-base-100 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <input
                    type="email"
                    placeholder="Registered email address"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full bg-transparent outline-none text-base placeholder-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-primary text-white rounded-xl shadow-md hover:scale-[1.02] transition-all"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
