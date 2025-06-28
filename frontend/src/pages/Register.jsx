import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { BACKEND_URL } from "../utils.js";
import { FiMail, FiLock, FiUser, FiPhone, FiBookOpen, FiCamera } from "react-icons/fi";

function Register() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("jwt", data.token);
      toast.success("User registered successfully");
      setProfile(data.user);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigateTo("/");
    } catch (error) {
      console.log("Error response:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
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
        <h1 className="text-2xl font-bold mb-2 text-center text-blue-700">Register</h1>
        <p className="text-gray-500 text-sm mb-6 text-center">Join Blogify and start sharing your stories with the world!</p>
        <form onSubmit={handleRegister}>
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
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            />
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
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            />
          </div>
          <div className="mb-4 relative">
            <FiBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
              required
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>
          <div className="flex items-center mb-4 gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-300 flex items-center justify-center bg-gray-100">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <FiCamera className="text-3xl text-gray-400" />
              )}
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-lg bg-gray-50"
              required
            />
          </div>
          <div className="text-center mb-4">
            Already registered?{' '}
            <Link to={"/login"} className="text-blue-600 font-semibold hover:underline">
              Login Now
            </Link>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 duration-300 rounded-lg text-white font-bold text-lg shadow-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
