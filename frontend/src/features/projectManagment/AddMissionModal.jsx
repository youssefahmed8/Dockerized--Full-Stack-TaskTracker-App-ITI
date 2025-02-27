/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCloseButton from "./CustomCloseButton";

const AddMissionModal = ({
  modalOpen = false, 
  setModalOpen = () => {},
  projectId,
  reloadMission = false,
  setReloadMission = () => {},
}) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userEmail: "",
  });
  const [error, setError] = useState(null);

  const creatorId = Cookies.get("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`http://localhost:5000/api/Projects/addMission`, {
        projectId,
        title: formData.title,
        description: formData.description,
        userEmail: formData.userEmail,
        creatorId,
      });

      if (response.data.success) {
        setFormData({ title: "", description: "", userEmail: "" });
        setModalOpen(false);
        setReloadMission(!reloadMission);
        toast.success("Mission deleted successfully!", {
          className: `toast-container mt-11 ${
            darkMode
              ? "bg-dark-bg text-dark-primary"
              : "bg-light-bg text-light-primary"
          }`,
          bodyClassName: "toast-body",
          progressClassName: `toast-progress ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`,
          closeButton: <CustomCloseButton darkMode={darkMode} />,
        });
      }
    } catch (error) {
      console.error("Error adding mission:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to add mission. Please try again.");
      }
    }
  };

  return (
    <>
      {modalOpen && (
        <dialog className={`modal ${modalOpen ? "open" : ""}`} open>
          <div
            className={`modal-box ${
              darkMode
                ? "bg-dark-bg text-dark-primary"
                : "bg-light-bg text-light-primary"
            }`}
          >
            <h2 className="font-bold text-xl">Add Mission</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span
                    className={`label-text ${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    }`}
                  >
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span
                    className={`label-text ${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    }`}
                  >
                    Description
                  </span>
                </label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span
                    className={`label-text ${
                      darkMode ? "text-dark-primary" : "text-light-primary"
                    }`}
                  >
                    User Email
                  </span>
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleChange}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className={`btn mr-4 ${
                    darkMode
                      ? "bg-dark-primary text-dark-bg border-dark-primary hover:bg-dark-bg hover:text-dark-primary hover:border-dark-primary"
                      : "bg-light-primary text-light-bg border-light-primary hover:bg-light-bg hover:text-light-primary hover:border-light-primary"
                  }`}
                >
                  Add Mission
                </button>
                <button
                  type="button"
                  className={`btn  ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary hover:bg-light-primary hover:text-light-bg hover:border-light-primary"
                  }`}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      <ToastContainer />
    </>
  );
};

export default AddMissionModal;
