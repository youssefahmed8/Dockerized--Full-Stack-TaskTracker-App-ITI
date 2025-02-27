/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const CreateProject = ({ onProjectCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    try {
      // Create a new project
      const response = await axios.post(`http://localhost:5000/api/Projects/create`, {
        title,
        description,
        userId,
      });

      if (response.status === 201) {
        setSuccess("");
        setError("");
        setTitle("")
        setDescription("");
        onProjectCreated();
        navigate("/projectManagement");
        document.getElementById("my_modal_2").close();
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 409) {
          setError(
            "Conflict: The title is already in use. Please choose a different title."
          );
        } else {
          setError("Failed to create project. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }

      setSuccess("");
    }
  };

  return (
    <>
      <button
        className={`btn rounded-lg mb-4 ${
          darkMode
            ? "bg-dark-primary text-light-primary hover:bg-dark-pHover border-dark-primary hover:border-dark-pHover"
            : "bg-light-primary text-light-bg hover:bg-light-pHover border-light-primary hover:border-light-pHover"
        }`}
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Create Project
      </button>

      <dialog id="my_modal_2" className="modal">
        <div
          className={`modal-box ${
            darkMode
              ? "bg-dark-bg text-dark-primary"
              : "bg-light-bg text-light-primary"
          }`}
        >
          <h3 className="font-bold text-lg">Create Project</h3>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="py-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`input w-full ${
                  darkMode
                    ? "bg-dark-bg text-dark-pHover border-dark-primary"
                    : "bg-light-bg text-light-pHover border-light-primary"
                }`}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`input w-full ${
                  darkMode
                    ? "bg-dark-bg text-dark-pHover border-dark-primary"
                    : "bg-light-bg text-light-pHover border-light-primary"
                }`}
                required
              />
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className={`btn ${
                  darkMode
                    ? "bg-dark-primary text-dark-bg hover:bg-dark-bg hover:border-dark-primary hover:text-dark-primary"
                    : "bg-light-primary text-light-bg hover:bg-light-bg border-light-primary hover:border-light-primary hover:text-light-primary"
                }`}
              >
                Create Project
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("my_modal_2").close()}
                className={`btn ${
                  darkMode
                    ? "bg-dark-bg text-dark-primary hover:bg-dark-primary border-dark-primary hover:border-dark-primary hover:text-dark-bg"
                    : "bg-light-bg text-light-primary hover:bg-light-primary border-light-primary hover:border-light-primary hover:text-light-bg"
                }`}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateProject;
