import * as yup from "yup";

export const taskSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters long"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long"),

  priority: yup
    .string()
    .oneOf(
      ["low", "medium", "high"],
      "Priority must be either low, medium, or high"
    )
    .required("Priority is required"),

  dueDate: yup
    .date()
    .required("Due date is required")
    .typeError("Please enter a valid date")
    .min(new Date(), "Due date cannot be in the past"),
});
