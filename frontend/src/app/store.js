import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "../features/tasks/tasksApi";
import darkModeReducer from "./Slices/darkMode/darkModeSlice.js";
import searchTasksReducer from "./Slices/darkMode/searchTasksSlice.js";
import networkReducer from "./Slices/darkMode/networkSlice.js";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    darkMode: darkModeReducer,
    searchTacks: searchTasksReducer,
    network: networkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(tasksApi.middleware),
});
