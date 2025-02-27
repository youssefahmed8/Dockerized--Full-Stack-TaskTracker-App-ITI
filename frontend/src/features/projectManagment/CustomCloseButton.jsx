/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md"; 

const CustomCloseButton = ({ closeToast, darkMode }) => (
  <MdClose
    onClick={closeToast}
    className={`cursor-pointer ${
      darkMode ? "text-dark-primary" : "text-light-primary"
    }`}
    size={20}
    aria-label="Close"
  />
);

export default CustomCloseButton;
