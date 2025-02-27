/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { Navigate } from "react-router";

const AuthRoute = ({ element }) => {
  const id = Cookies.get("userId");
  if (!id) {
    return <Navigate to={"/login"} />;
  }
  return element;
};

export default AuthRoute;
