import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import AppLayout from "../layout/Layout";
import Error from "../Ui/Error";
import Tasks from "../tasks/Tasks";
import Profile from "../profile/ProfilePage";
import ProjectManagement from "../projectManagment/ProjectManagment";
import ProjectDetails from "../projectManagment/ProjectDetails";
import Missions from "../missions/Missions";
import AuthRoute from "./protectedRoutes/AuthRoute";
import ProtectedLogin from "./protectedRoutes/ProtectedLogin";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <ProtectedLogin element={<Login />} /> },
      { path: "/register", element: <ProtectedLogin element={<Register />} /> },
      { path: "/tasks", element: <AuthRoute element={<Tasks />} /> },
      { path: "/profile", element: <AuthRoute element={<Profile />} /> },
      {
        path: "/projectManagement",
        element: <AuthRoute element={<ProjectManagement />} />,
      },
      {
        path: "/projects/:id",
        element: <AuthRoute element={<ProjectDetails />} />,
      },
      { path: "/myMissions", element: <AuthRoute element={<Missions />} /> },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
