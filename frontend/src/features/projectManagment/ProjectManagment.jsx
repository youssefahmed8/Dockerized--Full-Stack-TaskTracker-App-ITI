import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import CreateProject from "./CreateProject";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCloseButton from "./CustomCloseButton";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const userId = Cookies.get("userId");

  const fetchUserProjects = async () => {
    try {
      if (userId) {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/projects/user/${userId}/projects`
        );
        setProjects(
          Array.isArray(response.data.projects) ? response.data.projects : []
        );
      }
    } catch (error) {
      console.error("Error fetching user projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = () => {
    fetchUserProjects();
    toast.success("Project created successfully!", {
      className: `toast-container mt-11 ${
        darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"
      }`,
      bodyClassName: "toast-body",
      progressClassName: `toast-progress ${
        darkMode ? "bg-dark-primary" : "bg-light-primary"
      }`,
      closeButton: <CustomCloseButton darkMode={darkMode} />,
    });
  };

  const handleProjectDeleted = (projectId) => {
    setProjects(projects.filter((project) => project._id !== projectId));
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  const openDeleteModal = (projectId) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${selectedProjectId}/${userId}`
      );
      handleProjectDeleted(selectedProjectId);
      toast.success("Project deleted successfully!", {
        className: `toast-container mt-11 ${
          darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"
        }`,
        bodyClassName: "toast-body",
        progressClassName: `toast-progress ${
          darkMode ? "bg-dark-primary" : "bg-light-primary"
        }`,
        closeButton: <CustomCloseButton darkMode={darkMode} />,
      });
    } catch (error) {
      console.error(
        "Error deleting the project:",
        error.response ? error.response.data : error.message
      );
      toast.error("You don't have permission to delete this project.", {
        className: `toast-container mt-11 ${
          darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"
        }`,
        bodyClassName: "toast-body",
        progressClassName: `toast-progress ${
          darkMode ? "bg-dark-primary" : "bg-light-primary"
        }`,
        closeButton: <CustomCloseButton darkMode={darkMode} />,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchUserProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <section className="container mx-auto px-4">
      <h1
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-dark-primary" : "text-light-primary"
        }`}
      >
        Project Management
      </h1>
      <CreateProject onProjectCreated={handleProjectCreated} />
      {loading ? (
        <div className="flex justify-center items-center">
          <span
            className={`loading loading-ball loading-lg ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          ></span>
        </div>
      ) : projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onProjectDeleted={handleProjectDeleted}
                isModalOpen={isModalOpen && selectedProjectId === project._id}
                openDeleteModal={openDeleteModal}
                setIsModalOpen={setIsModalOpen}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {isModalOpen && (
        <dialog id="my_modal_2" className="modal" open>
          <div
            className={`modal-box ${
              darkMode
                ? "bg-dark-bg text-dark-primary"
                : "bg-light-bg text-light-primary"
            }`}
          >
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this project?
            </h3>
            <p className="py-4">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                className={`btn mr-2 ${
                  darkMode
                    ? "bg-dark-bg text-dark-primary hover:bg-dark-primary border-dark-primary hover:border-dark-primary hover:text-dark-bg"
                    : "bg-light-bg text-light-primary hover:bg-light-primary border-light-primary hover:border-light-primary hover:text-light-bg"
                }`}
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className={`btn ${
                  darkMode
                    ? "bg-dark-primary text-dark-bg hover:bg-dark-bg hover:border-dark-primary hover:text-dark-primary"
                    : "bg-light-primary text-light-bg hover:bg-light-bg border-light-primary hover:border-light-primary hover:text-light-primary"
                }`}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
      )}
      <ToastContainer />
    </section>
  );
}

export default ProjectManagement;
