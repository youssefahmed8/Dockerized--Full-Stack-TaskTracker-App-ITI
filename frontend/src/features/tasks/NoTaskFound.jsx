import { useSelector } from "react-redux";

const NoTaskFound = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div
      className={` h-96 flex flex-col items-center justify-center rounded-md  ${
        darkMode ? "bg-gray-700" : "bg-slate-200 border-light-primary"
      } text-center w-full shadow-2xl`}
    >
      <h2
        className={`text-2xl font-semibold  ${
          darkMode ? "text-dark-primary" : "text-light-primary"
        }`}
      >
        No Tasks found
      </h2>
      <p className="text-gray-400 mt-2">Start by creating a new task!</p>
      <label
        htmlFor="modal-create"
        className={`bg-dark-primary  cursor-pointer py-2 px-4  rounded-lg font-medium text-black w-fit  mt-6  hover:bg-teal-600 ${
          darkMode ? "bg-dark-primary " : "bg-light-primary text-white"
        }`}
      >
        Create New task
      </label>
    </div>
  );
};

export default NoTaskFound;
