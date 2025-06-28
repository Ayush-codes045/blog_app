// ✅ Login.jsx
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils.js";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
  const { setIsAuthenticated, updateProfile } = useAuth();
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User Logged in successfully", {
        duration: 3000,
      });

      // ✅ Fetch profile again after login
      await updateProfile();

      setEmail("");
      setPassword("");
      setRole("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Please fill the required fields",
        { duration: 3000 }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 relative">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2 shadow-md">
            <FiUser className="text-3xl text-blue-500" />
          </div>
          <div className="font-extrabold text-3xl text-gray-800 flex items-center gap-1">
            Blogify<span className="text-blue-500">App</span>
          </div>
          <span className="text-xs text-gray-500 font-normal mt-1">Where Stories Come Alive</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center text-blue-700">Login</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Welcome back! Log in to explore, create, and connect on Blogify.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-4 relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">
              New User?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register Now
              </Link>
            </p>
            <Link to="#" className="text-xs text-blue-400 hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 duration-300 rounded-lg text-white font-bold text-lg shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
