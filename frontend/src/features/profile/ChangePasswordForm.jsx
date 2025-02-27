/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChangePasswordForm = ({ userData, setUserData, submitUpdate }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [errors, setErrors] = useState({ oldPassword: "", newPassword: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
  });

  // handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = passwords;
    if (oldPassword === "") {
      setErrors({ ...errors, oldPassword: "Please Enter The Old Password!" });
      return;
    }
    if (newPassword === "") {
      setErrors({ ...errors, newPassword: "Please Enter The New Password!" });
      return;
    }
    if (oldPassword !== userData.password) {
      setErrors({ ...errors, oldPassword: "Old Password Doesn't Match!" });
      return;
    }
    if (newPassword.length < 6) {
      setErrors({
        ...errors,
        newPassword: "Password must be at least 6 characters long!",
      });
      return;
    }

    setUserData({ ...userData, password: newPassword });
  };

  useEffect(() => {
    if (userData.password === passwords.newPassword) {
      submitUpdate();
      setPasswords({ oldPassword: "", newPassword: "" });
    }
  }, [userData.password]);
  return (
    <div className="mt-4 text-[#202142]">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col w-full mb-2 space-y-2">
          <div className="w-full">
            <label
              htmlFor="old_password"
              className={`block mb-2 text-sm font-medium  ${
                darkMode ? `text-gray-200` : "text-indigo-900"
              }`}
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.oldPassword ? "text" : "password"}
                name="oldPassword"
                id="old_password"
                className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-slate-200 border-[1px] text-black border-dark-primary"
                } dark:placeholder-gray-400 dark:text-white`}
                placeholder="Old Password"
                value={passwords.oldPassword}
                onChange={handleChange}
              />
              <span
                className={`absolute right-3 ${
                  darkMode ? "text-white" : "text-black"
                } top-1/2 transform -translate-y-1/2  cursor-pointer`}
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    oldPassword: !showPasswords.oldPassword,
                  })
                }
              >
                {showPasswords.oldPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
              </span>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs ">{errors.oldPassword}</p>
            )}
          </div>
        </div>

        <div className="mb-2 w-full">
          <label
            htmlFor="new_password"
            className={`block mb-2 text-sm font-medium  ${
              darkMode ? `text-gray-200` : "text-indigo-900"
            }`}
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPasswords.newPassword ? "text" : "password"}
              name="newPassword"
              id="new_password"
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-slate-200 border-[1px] text-black border-dark-primary"
              } dark:placeholder-gray-400 dark:text-white`}
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={handleChange}
            />
            <span
              className={`absolute right-3 ${
                darkMode ? "text-white" : "text-black"
              } top-1/2 transform -translate-y-1/2  cursor-pointer`}
              onClick={() =>
                setShowPasswords({
                  ...showPasswords,
                  newPassword: !showPasswords.newPassword,
                })
              }
            >
              {showPasswords.newPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
            </span>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs ">{errors.newPassword}</p>
          )}
        </div>

        <button className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
