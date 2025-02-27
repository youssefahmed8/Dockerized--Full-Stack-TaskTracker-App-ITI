const TaskSkeleton = () => {
  return (
    <div className="card bg-gray-700 max-w-sm shadow-xl animate-pulse">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="skeleton h-4 w-24 bg-gray-500 rounded"></div>
          <div className="skeleton h-8 w-16 bg-gray-500 rounded-full"></div>
        </div>

        <div className="skeleton h-3 w-full my-4 bg-gray-500 rounded"></div>

        <div className="flex my-2 items-center justify-between">
          <div className="skeleton h-4 w-32 bg-gray-500 rounded"></div>
          <div className="skeleton h-6 w-24 bg-gray-500 rounded-full"></div>
        </div>

        <div className="card-actions flex gap-2">
          <div className="skeleton h-8 w-10 bg-gray-500 rounded-md"></div>
          <div className="skeleton h-8 w-10 bg-gray-500 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
