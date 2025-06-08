import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AssignedTaskModal = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/tasks/${userId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("🔴 Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const markAsCompleted = async (taskId) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${userId}/complete`, { taskId });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("🔴 Error marking task as completed:", error);
    }
  };

  const formatTimeRemaining = (deadline) => {
    if (!deadline) return "⏳ No deadline set";
    const deadlineDate = new Date(deadline);
    const currentTime = new Date();
    const timeDifference = deadlineDate - currentTime;
    if (timeDifference <= 0) return "⏳ Deadline Over";
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Assigned Tasks</h2>

        <div className="max-h-80 overflow-y-auto p-2 space-y-3">
          {loading ? (
            <p className="text-gray-600 text-center">Loading tasks...</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="border border-gray-300 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
                <p className="text-gray-600 text-sm">{task.description}</p>
                <p className={`mt-2 font-medium ${task.completed ? "text-blue-500" : new Date(task.deadline) - new Date() > 0 ? "text-green-600" : "text-red-500"}`}>
                  {task.completed ? "✅ Completed" : formatTimeRemaining(task.deadline)}
                </p>
                {!task.completed && (
                  <button onClick={() => markAsCompleted(task._id)} className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition">
                    Mark as Completed
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No tasks assigned.</p>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button type="button" className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-400 transition" onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignedTaskModal;
