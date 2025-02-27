import ProgressComponent from "./ProgressTasks";
import { useSelector } from "react-redux";
import TasksList from "./TasksList";
import FiltrationBox from "./FiltrationBox";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdFilterListAlt } from "react-icons/md";
import { useState } from "react";
import FiltrationComponent from "./FiltrationComponent";
import { Toaster } from "react-hot-toast";

function Tasks() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  return (
    <div className="container   ">
      <div className=" flex flex-col xl:flex-row xl:items-end justify-between mt-3 px-2 ">
        <ProgressComponent />

        <label
          htmlFor="modal-create"
          className={`bg-dark-primary  cursor-pointer py-2 px-4 hidden xl:block rounded-lg font-medium text-black w-fit  mt-4 md:m-0 ml-4 hover:bg-teal-600 ${
            darkMode ? "bg-dark-primary " : "bg-light-primary text-white"
          }`}
        >
          Create New task
        </label>
        <div className="flex justify-between items-center xl:hidden p-2">
          <button
            onClick={toggleDrawer}
            className={`py-2 px-2 rounded-lg  font-medium  mt-4 text-lg  hover:bg-teal-600 ${
              darkMode
                ? "bg-dark-primary text-black"
                : "bg-light-primary text-white"
            }`}
          >
            <MdFilterListAlt />
          </button>
          <label
            htmlFor="modal-create"
            className={`bg-dark-primary  cursor-pointer py-2 px-4  rounded-lg font-medium text-lg text-black w-fit  mt-4  hover:bg-teal-600 ${
              darkMode ? "bg-dark-primary " : "bg-light-primary text-white"
            }`}
          >
            <IoIosAddCircleOutline />
          </label>
        </div>
      </div>
      <div className="xl:grid xl:grid-cols-8 xl:gap-10">
        <div className="xl:col-span-6">
          <TasksList />
        </div>
        <div className="hidden xl:block xl:col-span-2 ">
          <FiltrationBox />
        </div>
      </div>
      <FiltrationComponent
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
       <Toaster />
    </div>
  );
}

export default Tasks;
