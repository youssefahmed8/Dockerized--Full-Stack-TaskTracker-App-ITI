import { useEffect, useState } from "react";
import Loader from "../Ui/Loader";
import { useDeleteTaskMutation } from "./tasksApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
const AlertModal = ({ id }) => {
  const [deleteTask, { isLoading, isSuccess }] = useDeleteTaskMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  // Handlers
  const onDeleteTask = () => {
    deleteTask(id);
  };
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      toast.success("Task Deleted successfully", {
        style: {
          backgroundColor: "black",
          color: "#fff",
        },
      });
    }
  }, [isSuccess]);

  return (
    <div className="">
      <input
        type="checkbox"
        id="alert"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={(e) => setIsModalOpen(e.target.checked)}
      />
      <div className="modal fixed inset-0 flex justify-center items-start bg-slate-200 z-[1000]">
        <div
          className={`modal-box mt-10 relative ${
            !darkMode ? "bg-slate-200" : ""
          }`}
        >
          <label
            htmlFor="alert"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3
            className={`text-lg font-bold ${!darkMode ? "text-red-500" : ""}`}
          >
            Delete Task
          </h3>
          <p className={`py-4 ${!darkMode ? "text-gray-700" : ""}`}>
            Are you sure you want to delete this task?
          </p>
          <div className="flex space-x-3">
            <label
              className={`btn mt-4 bg-red-500 hover:bg-red-700 ${
                !darkMode ? "text-white" : ""
              }`}
              onClick={onDeleteTask}
            >
              {isLoading ? <Loader /> : "Delete"}
            </label>
            <label
              htmlFor="alert"
              className={`btn mt-4 bg-gray-500 hover:bg-gray-700 ${
                !darkMode ? "text-white" : ""
              }`}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
