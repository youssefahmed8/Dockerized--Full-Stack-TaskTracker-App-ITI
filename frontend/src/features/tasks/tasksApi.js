import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  tagTypes: ["tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api`,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `/Tasks/${Cookies.get("userId")}/tasks`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.tasks.map(({ _id }) => ({ type: "tasks", _id })),
              { type: "tasks", id: "LIST" },
            ]
          : [{ type: "tasks", id: "LIST" }],
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: "/Tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "tasks", id: "LIST" },
        { type: "tasks", id: "COMPLETED" },
      ],
      async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", _id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateTask: builder.mutation({
      query: ({ id, body }) => ({
        url: `/Tasks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [
        { type: "tasks", id: "LIST" },
        { type: "tasks", id: "COMPLETED" },
      ],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/Tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "tasks", id: "LIST" },
        { type: "tasks", id: "COMPLETED" },
      ],
    }),
    getCompletedTasks: builder.query({
      query: () => ({
        url: `/Tasks/taskCompleted/${Cookies.get("userId")}`,
      }),
      providesTags: [{ type: "tasks", id: "COMPLETED" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetCompletedTasksQuery,
} = tasksApi;
