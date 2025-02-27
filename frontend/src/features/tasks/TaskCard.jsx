/* eslint-disable react/prop-types */
import { MdDelete, MdEdit } from "react-icons/md";
import { useUpdateTaskMutation } from "./tasksApi";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const TaskCard = ({
  title,
  priority,
  description,
  completed,
  dueDate,
  id,
  setTaskIdToDelete,
  setTaskToEdit,
}) => {
  const [updateTask] = useUpdateTaskMutation();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const onChangeCompleted = (e) => {
    updateTask({
      id,
      body: { completed: e.target.checked },
    });
  };
  return (
    <>
      <div
        className={`card ${
          darkMode ? "bg-gray-700" : "bg-slate-200 border-light-primary"
        } max-w-sm shadow-2xl`}
      >
        <div className="card-body">
          <div className="flex justify-between">
            <h2
              className={`card-title break-words break-all  ${
                darkMode ? "text-dark-primary" : "text-light-primary"
              }`}
            >
              {title}
            </h2>
            <span
              className={` ${
                priority === "low"
                  ? "bg-green-500"
                  : priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-400"
              }  text-black py-1 px-4 rounded-full`}
            >
              {priority}
            </span>
          </div>
          <p className="text-sm break-words break-all">{description}</p>
          <div className="flex my-2 text-xs">
            <p className="text-slate-400">
              Due-Date: {format(new Date(dueDate), "dd/MM/yyyy")}
            </p>
            <span
              className={`${
                completed ? "bg-cyan-600" : "bg-blue-700"
              } text-white py-1 px-4 rounded-full`}
            >
              {completed ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="card-actions ">
              <label
                htmlFor="modal-update"
                className="bg-teal-400 hover:bg-teal-600 text-gray-700 p-2 rounded-md cursor-pointer"
                onClick={() =>
                  setTaskToEdit({
                    id,
                    title,
                    priority,
                    description,
                    dueDate,
                  })
                }
              >
                <MdEdit />
              </label>
              <label
                htmlFor="alert"
                className=" bg-red-400 hover:bg-red-600 text-gray-700 p-2 rounded-md cursor-pointer"
                onClick={() => setTaskIdToDelete(id)}
              >
                <MdDelete />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span
                  className={`label-text mr-4 font-black ${
                    darkMode ? "" : "text-gray-600"
                  }`}
                >
                  Completed
                </span>
                <input
                  type="checkbox"
                  checked={completed}
                  className="checkbox border-gray-500"
                  onChange={onChangeCompleted}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
