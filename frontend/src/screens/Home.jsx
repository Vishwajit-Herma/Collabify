import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    axios
      .post("/projects/create", { name: projectName })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => setProject(res.data.projects))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="p-6 max-w-screen mx-auto ">
        {/* Profile Link */}
      
      {/* Project Section */}
      <div className="projects flex flex-wrap justify-center  gap-4">
      <Link
          to={`/profile/${user._id}`}
          className="p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition flex items-center gap-2"
        >
          View Profile →
        </Link>
        {/* New Project Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition flex items-center gap-2"
        >
          New Project <i className="ri-add-line"></i>
        </button>

        {/* Project List */}
        {project.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/project`, { state: { project } })}
            className="project flex flex-col gap-2 cursor-pointer p-4 border border-gray-300 rounded-lg min-w-56 hover:shadow-lg transition hover:bg-gray-100"
          >
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <i className="ri-user-line"></i>
              <span>Collaborators: {project.users.length}</span>
            </div>
          </div>
        ))}
      </div>

      

      {/* Modal for Creating Project */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
