import React, { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const userInfo = {
      access_key: "aaa6994d-cb7e-4b46-8245-aa821728676a",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };
    
    try {
      const response = await axios.post("https://api.web3forms.com/submit", userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });
      
      if (response.data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          username: "",
          email: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error.response) {
        // Server responded with error
        toast.error(`Error: ${error.response.data?.message || 'Server error occurred'}`);
      } else if (error.request) {
        // Network error
        toast.error("Network error. Please check your connection and try again.");
      } else {
        // Other error
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-2 text-gray-600">
              Have a question or want to get in touch? Send us a message!
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Name"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.username && (
                    <span className="text-sm text-red-500 font-semibold">
                      {errors.username}
                    </span>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500 font-semibold">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <span className="text-sm text-red-500 font-semibold">
                      {errors.message}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-2 rounded-lg duration-300 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-black hover:bg-yellow-600'
                    } text-white`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-red-500" />
                  <span>+91 9876543210</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="text-pink-500" />
                  <span>bittukumar8083a@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span>Delhi, NCR, India</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This contact form uses Web3Forms service. 
                  You'll need to get a free access key from{' '}
                  <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline">
                    web3forms.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
