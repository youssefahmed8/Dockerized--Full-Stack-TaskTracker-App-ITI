import { useDispatch, useSelector } from "react-redux";
import SearchTasks from "./SearchTasks";
import {
  sortingTasks,
  togglePriority,
  toggleStatus,
  updateFilteredTasks,
} from "../../app/Slices/darkMode/searchTasksSlice";
import SortingComponent from "./SortingComponent";

/* eslint-disable react/prop-types */
const FiltrationComponent = ({ isDrawerOpen, toggleDrawer }) => {
  const { filtrationPriorities, filtrationStatus } = useSelector(
    (state) => state.searchTacks
  );
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const sortingKeyword = useSelector(
    (state) => state.searchTacks.sortingKeyword
  );
  const dispatch = useDispatch();
  // handlers
  const onChangePriorities = (value) => {
    dispatch(togglePriority(value));
    dispatch(updateFilteredTasks());
    dispatch(sortingTasks(sortingKeyword));
  };
  const onChangeStatus = (value) => {
    dispatch(toggleStatus(value));
    dispatch(updateFilteredTasks());
    dispatch(sortingTasks(sortingKeyword));
  };
  return (
    <div
      className={`drawer drawer-end ${isDrawerOpen ? "open" : ""}  z-[1000]`}
    >
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content"></div>
      <div className="drawer-side">
        <label
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></label>
        <ul
          className={`menu bg-base-200 text-base-content min-h-full w-80 p-4 ${
            darkMode ? " " : "bg-slate-200"
          }`}
        >
          <div className="p-2 ">
            <SearchTasks />

            <div className="my-4">
              <span
                className={` ${
                  darkMode ? "text-dark-primary" : "text-light-primary "
                } font-semibold`}
              >
                {" "}
                Priority
              </span>
              <div className="divider"></div>
              <div className="form-control ">
                <label className="label cursor-pointer w-full">
                  <span
                    className={`label-text  font-black text-lg ${
                      !darkMode ? `text-gray-400` : ""
                    }`}
                  >
                    Low
                  </span>
                  <input
                    type="checkbox"
                    checked={filtrationPriorities.includes("low")}
                    onChange={() => onChangePriorities("low")}
                    className="checkbox checkbox-accent"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span
                    className={`label-text  font-black text-lg ${
                      !darkMode ? `text-gray-400` : ""
                    }`}
                  >
                    Medium
                  </span>
                  <input
                    type="checkbox"
                    checked={filtrationPriorities.includes("medium")}
                    onChange={() => onChangePriorities("medium")}
                    className="checkbox checkbox-accent"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span
                    className={`label-text  font-black text-lg ${
                      !darkMode ? `text-gray-400` : ""
                    }`}
                  >
                    High
                  </span>
                  <input
                    type="checkbox"
                    checked={filtrationPriorities.includes("high")}
                    onChange={() => onChangePriorities("high")}
                    className="checkbox checkbox-accent"
                  />
                </label>
              </div>
            </div>
            <div className="my-4">
              <span
                className={` ${
                  darkMode ? "text-dark-primary" : "text-light-primary "
                } font-semibold`}
              >
                {" "}
                Status
              </span>
              <div className="divider"></div>
              <div className="form-control ">
                <label className="label cursor-pointer w-full">
                  <span
                    className={`label-text  font-black text-lg ${
                      !darkMode ? `text-gray-400` : ""
                    }`}
                  >
                    Completed
                  </span>
                  <input
                    type="checkbox"
                    checked={filtrationStatus.includes("completed")}
                    onChange={() => onChangeStatus("completed")}
                    className="checkbox checkbox-accent"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span
                    className={`label-text  font-black text-lg ${
                      !darkMode ? `text-gray-400` : ""
                    }`}
                  >
                    In Progress
                  </span>
                  <input
                    type="checkbox"
                    checked={filtrationStatus.includes("inprogress")}
                    onChange={() => onChangeStatus("inprogress")}
                    className="checkbox checkbox-accent"
                  />
                </label>
              </div>
            </div>
            <SortingComponent />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default FiltrationComponent;
