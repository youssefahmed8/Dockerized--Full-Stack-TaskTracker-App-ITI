/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../../validation";
import { useEffect } from "react";
import { useUpdateTaskMutation } from "./tasksApi";
import Loader from "../Ui/Loader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const UpdateTask = ({ taskEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskSchema),
  });
  useEffect(() => {
    if (taskEdit) {
      reset({
        title: taskEdit.title,
        description: taskEdit.description,
        priority: taskEdit.priority,
        dueDate: taskEdit.dueDate.slice(0, 10),
      });
    }
  }, [taskEdit, reset]);
  const [updateTask, { isLoading, isSuccess }] = useUpdateTaskMutation();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    if (isSuccess) {
      document.getElementById("modal-update").checked = false;
      reset();
      toast.success("Task Updated successfully", {
        style: {
          backgroundColor: "black",
          color: "#fff",
        },
      });
    }
  }, [isSuccess, reset]);
  const onSubmit = (data) => {
    const { title, description, priority } = data;
    updateTask({
      id: taskEdit.id,
      body: {
        title,
        description,
        priority,
        dueDate: new Date(data.dueDate).toISOString(),
      },
    });
  };
  return (
    <div>
      <input type="checkbox" id="modal-update" className="modal-toggle" />
      <div className="modal fixed inset-0 flex justify-center items-start z-[1000]">
        <div
          className={`modal-box mt-10 relative ${
            !darkMode ? "bg-slate-200" : ""
          }`}
        >
          <label
            htmlFor="modal-update"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3
            className={`text-lg font-bold ${!darkMode ? "text-gray-700" : ""}`}
          >
            Update Task
          </h3>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <div className="label">
                <span
                  className={`label-text ${!darkMode ? "text-gray-700" : ""}`}
                >
                  Task Title
                </span>
              </div>
              <input
                type="text"
                placeholder="Enter Task Title"
                className={`input input-bordered w-full ${
                  !darkMode
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-white"
                }`}
                {...register("title")}
              />
              {errors?.title && (
                <p className="text-red-500 text-xs ">{errors.title.message}</p>
              )}
            </div>
            <div>
              <div className="label">
                <span
                  className={`label-text ${!darkMode ? "text-gray-700" : ""}`}
                >
                  Task Priority
                </span>
              </div>
              <select
                className={`select select-bordered w-full  ${
                  !darkMode
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-white"
                }`}
                {...register("priority")}
              >
                <option value={""} disabled>
                  Task Priority
                </option>
                <option value={"low"}>Low</option>
                <option value={"medium"}> Medium</option>
                <option value={"high"}>High</option>
              </select>
              {errors?.priority && (
                <p className="text-red-500 text-xs ">
                  {errors.priority.message}
                </p>
              )}
            </div>
            <div>
              <div className="label">
                <span
                  className={`label-text ${!darkMode ? "text-gray-700" : ""}`}
                >
                  Task Due Date
                </span>
              </div>
              <input
                type="date"
                placeholder="Enter Task Date"
                className={`input input-bordered w-full ${
                  !darkMode
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-white"
                } appearance-none`}
                {...register("dueDate")}
              />
              {errors?.dueDate && (
                <p className="text-red-500 text-xs ">
                  {errors.dueDate.message}
                </p>
              )}
            </div>
            <div>
              <div className="label">
                <span
                  className={`label-text ${!darkMode ? "text-gray-700" : ""}`}
                >
                  Task Description
                </span>
              </div>
              <textarea
                placeholder="Enter Task Description"
                className={`textarea textarea-bordered w-full ${
                  !darkMode
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-white"
                }`}
                {...register("description")}
              />
              {errors?.description && (
                <p className="text-red-500 text-xs ">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-between space-x-3">
              <button
                className={`w-1/2 btn mt-4 ${
                  !darkMode
                    ? "bg-indigo-600 hover:bg-indigo-800 text-white"
                    : "bg-indigo-400 hover:bg-indigo-600 text-gray-900"
                }`}
              >
                {isLoading ? <Loader /> : "Update"}
              </button>
              <label
                htmlFor="modal-update"
                className={`w-1/2 btn mt-4 ${
                  !darkMode
                    ? "bg-gray-600 hover:bg-gray-800 text-white"
                    : "bg-gray-400 hover:bg-gray-600 text-gray-900"
                }`}
              >
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
