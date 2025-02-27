/* eslint-disable react/prop-types */
import { Navigate } from 'react-router';
import Cookies from "js-cookie";

const ProtectedLogin = ({element}) => {
    const id = Cookies.get("userId");
    if (id) {
      return <Navigate to={"/"} />;
    }
    return element;
}

export default ProtectedLogin