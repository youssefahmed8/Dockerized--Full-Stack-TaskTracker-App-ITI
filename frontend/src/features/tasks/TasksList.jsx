/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useGetTasksQuery } from "./tasksApi";
import AlertModal from "./DeleteTask";
import UpdateTask from "./UpdateTask";
import CreateTask from "./CreateTask";
import TaskCard from "./TaskCard";
import TaskSkeleton from "./TaskSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  sortingTasks,
  updateFilteredTasks,
} from "../../app/Slices/darkMode/searchTasksSlice";
import NoTaskFound from "./NoTaskFound";

const TasksList = () => {
  const isOnline = useSelector((state) => state.network.isOnline);
  const [taskIdToDelete, setTaskIdToDelete] = useState();
  const [taskToEdit, setTaskToEdit] = useState();
  const { isLoading, data } = useGetTasksQuery();
  const { filteredTasks } = useSelector((state) => state.searchTacks);
  const sortingKeyword = useSelector(
    (state) => state.searchTacks.sortingKeyword
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      dispatch(setTasks(data?.tasks));
      dispatch(updateFilteredTasks());
      dispatch(sortingTasks(sortingKeyword));
    }
  }, [isLoading, data]);
  return (
    <div>
      <div className=" mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-2 md:gap-4  rounded-md">
        {isLoading || !isOnline
          ? Array.from({ length: 6 }, (_, index) => (
              <TaskSkeleton key={index} />
            ))
          : filteredTasks?.map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                setTaskIdToDelete={setTaskIdToDelete}
                title={task.title}
                completed={task.completed}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                setTaskToEdit={setTaskToEdit}
              />
            ))}
      </div>
      {filteredTasks.length === 0 && !isLoading && <NoTaskFound />}
      <AlertModal id={taskIdToDelete} />
      <UpdateTask taskEdit={taskToEdit} />
      <CreateTask />
    </div>
  );
};

export default TasksList;
