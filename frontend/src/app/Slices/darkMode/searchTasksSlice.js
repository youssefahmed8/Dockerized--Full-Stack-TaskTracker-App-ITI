import { createSlice } from "@reduxjs/toolkit";
import {
  sortTasksByDueDate,
  sortTasksByPriorityAsc,
  sortTasksByPriorityDesc,
} from "../../../features/tasks/sortingFunctions";

const initialState = {
  searchKeyword: "",
  tasks: [],
  filteredTasks: [],
  filtrationPriorities: [],
  filtrationStatus: "",
  sortingKeyword: "",
};

const searchTasksReducer = createSlice({
  name: "searchTasks",
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    searchTasks: (state, action) => {
      state.searchKeyword = action.payload;
      state.filteredTasks = state.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          task.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    updateFilteredTasks: (state) => {
      state.filteredTasks = state.tasks.filter((task) => {
        const matchesKeyword = state.searchKeyword
          ? task.title
              .toLowerCase()
              .includes(state.searchKeyword.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(state.searchKeyword.toLowerCase())
          : true;
        const matchesPriority =
          state.filtrationPriorities.length === 0 ||
          state.filtrationPriorities.includes(task.priority);
        const matchesStatus =
          state.filtrationStatus === "completed"
            ? task.completed === true
            : state.filtrationStatus === "inprogress"
            ? task.completed === false
            : true;

        return matchesKeyword && matchesPriority && matchesStatus;
      });
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    },
    setFiltrationPriorities: (state, action) => {
      state.filtrationPriorities = action.payload;
    },
    togglePriority: (state, action) => {
      const priority = action.payload;
      if (state.filtrationPriorities.includes(priority)) {
        state.filtrationPriorities = state.filtrationPriorities.filter(
          (p) => p !== priority
        );
      } else {
        state.filtrationPriorities.push(priority);
      }
    },
    toggleStatus: (state, action) => {
      const status = action.payload;
      if (state.filtrationStatus === status) {
        state.filtrationStatus = "";
      } else {
        state.filtrationStatus = status;
      }
    },
    sortingTasks: (state, action) => {
      state.sortingKeyword = action.payload;
      switch (state.sortingKeyword) {
        case "dueDate":
          state.filteredTasks = sortTasksByDueDate(state.filteredTasks);
          break;
        case "lowToHigh":
          state.filteredTasks = sortTasksByPriorityAsc(state.filteredTasks);
          break;
        case "highToLow":
          state.filteredTasks = sortTasksByPriorityDesc(state.filteredTasks);
          break;
        default:
          break;
      }
    },
  },
});

export const {
  setSearchKeyword,
  setTasks,
  updateFilteredTasks,
  searchTasks,
  setFiltrationPriorities,
  togglePriority,
  toggleStatus,
  sortingTasks,
} = searchTasksReducer.actions;

export default searchTasksReducer.reducer;
