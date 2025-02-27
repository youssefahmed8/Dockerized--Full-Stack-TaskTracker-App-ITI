import { useSelector } from "react-redux";
import { useGetCompletedTasksQuery } from "./tasksApi";
import { useEffect, useState } from "react";

const ProgressComponent = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const { data, isLoading } = useGetCompletedTasksQuery();
  const [progressPercent, setProgressPercent] = useState();
  useEffect(() => {
    if (!isLoading) {
      setProgressPercent(
        `${!isLoading ? (data.completedTasks / data.totalTasks) * 100 : 0}%`
      );
    }
  }, [isLoading, data]);

  return (
    <div className="max-w-sm sm:px-2">
      <h2 className="mb-3">
        <span className="text-2xl font-bold">My Tasks</span>
        <span className="mx-3 text-gray-500 text-lg">
          {data?.completedTasks}/{data?.totalTasks} Completed
        </span>
      </h2>
      <div className="w-sm  bg-gray-500 rounded-md">
        <div
          className={`h-8  rounded-md  ${
            darkMode
              ? "bg-dark-primary text-dark-text"
              : "bg-light-primary text-light-text"
          }`}
          style={{ width: progressPercent }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressComponent;
