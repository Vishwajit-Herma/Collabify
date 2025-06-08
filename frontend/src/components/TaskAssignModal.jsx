import React, { useState } from "react";
import axios from "axios";

const TaskAssignModal = ({ selectedUser, projectId, leaderId, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectId", projectId);
    formData.append("assignedBy", leaderId);
    formData.append("assignedTo", selectedUser._id);
    formData.append("deadline", deadline);
    if (file) formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/tasks/assign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Task assigned successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error assigning task");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[400px] p-6 rounded-xl shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Assign Task to <span className="text-blue-600">{selectedUser.email}</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Deadline Input */}
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Assign Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskAssignModal;
