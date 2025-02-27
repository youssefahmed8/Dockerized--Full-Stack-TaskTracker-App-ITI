import { useDispatch, useSelector } from "react-redux";
import { sortingTasks } from "../../app/Slices/darkMode/searchTasksSlice";

const SortingComponent = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  // handler
  const onChangeSorting = (e) => {
    dispatch(sortingTasks(e.target.value));
  };
  return (
    <div className="my-2">
      <span
        className={` ${
          darkMode ? "text-dark-primary" : "text-light-primary "
        } font-semibold`}
      >
        {" "}
        Sorting
      </span>
      <div className="divider my-2"></div>
      <select
        className={`select select-bordered w-full rounded-md ${
          !darkMode ? "bg-white text-gray-900" : "bg-gray-700 text-white"
        }`}
        onChange={onChangeSorting}
      >
        <option value={""} disabled selected>
          Sorting By
        </option>
        <option value={"dueDate"}>Due Date</option>
        <option value={"lowToHigh"}>Priority : Low to High</option>
        <option value={"highToLow"}>Priority : High to Low</option>
      </select>
    </div>
  );
};

export default SortingComponent;
