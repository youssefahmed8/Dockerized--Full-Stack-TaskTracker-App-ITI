import { useDispatch, useSelector } from "react-redux";
import SearchTasks from "./SearchTasks";
import {
  sortingTasks,
  togglePriority,
  toggleStatus,
  updateFilteredTasks,
} from "../../app/Slices/darkMode/searchTasksSlice";
import SortingComponent from "./SortingComponent";

const FiltrationBox = () => {
  const { filtrationPriorities, filtrationStatus } = useSelector(
    (state) => state.searchTacks
  );
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const sortingKeyword = useSelector(
    (state) => state.searchTacks.sortingKeyword
  );
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
      className={`mt-10  ${
        darkMode ? "bg-gray-700" : "bg-slate-200 border-2 border-dark-primary"
      } rounded-lg p-2 max-w-sm`}
    >
      <div className="p-2 ">
        <SearchTasks />

        <div className="my-3">
          <span
            className={` ${
              darkMode ? "text-dark-primary" : "text-light-primary "
            } font-semibold`}
          >
            {" "}
            Priority
          </span>
          <div className="divider my-2"></div>
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
        <div className="my-2">
          <span
            className={` ${
              darkMode ? "text-dark-primary" : "text-light-primary "
            } font-semibold`}
          >
            {" "}
            Status
          </span>
          <div className="divider my-2"></div>
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
    </div>
  );
};

export default FiltrationBox;
