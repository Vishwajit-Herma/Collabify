import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    userId: userId, // ✅ Ensure userId is set when creating/updating
    fullName: "",
    phoneNumber: "",
    userType: "Student",
    collegeName: "",
    branch: "",
    year: "",
    companyName: "",
    designation: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔵 Fetching profile for userId:", userId);
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        console.log("🟢 Profile Data:", response.data);
        setUser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.warn("⚠️ No profile found. Enabling profile creation mode.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      console.error("⚠️ userId is undefined");
      setLoading(false);
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/users`, formData);
      setUser(formData);
    } catch (error) {
      console.error("🔴 Error saving profile:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10 border border-gray-200">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mt-3">{user ? user.fullName : "Create Your Profile"}</h2>
        <p className="text-gray-500 text-sm">{user?.userType}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <input type="hidden" name="userId" value={formData.userId} />

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="Student">Student</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        {formData.userType === "Student" ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">College Name:</label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Branch:</label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Year:</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Designation:</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition shadow-md w-full font-semibold"
        >
          {user ? "Save Changes" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
