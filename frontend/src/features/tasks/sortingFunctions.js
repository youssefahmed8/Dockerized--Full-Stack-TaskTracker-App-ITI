export const sortTasksByDueDate = (tasks) => {
  return tasks.sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
};

const priorityMap = {
  high: 3,
  medium: 2,
  low: 1,
};
export const sortTasksByPriorityDesc = (tasks) => {
  return tasks.sort(
    (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
  );
};
export const sortTasksByPriorityAsc = (tasks) => {
  return tasks.sort(
    (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
  );
};
