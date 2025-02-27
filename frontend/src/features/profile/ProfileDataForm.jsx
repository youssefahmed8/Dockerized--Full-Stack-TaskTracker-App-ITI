/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

const ProfileDataForm = ({ userData, setUserData, submitUpdate }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors({ username: "", email: "" });
  };
  const [errors, setErrors] = useState({ username: "", email: "" });

  // handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.username === "") {
      setErrors({ ...errors, username: "Please Enter The Username!" });
      return;
    }
    if (userData.email === "") {
      setErrors({ ...errors, email: "Please Enter The Email!" });
      return;
    }
    if (!emailRegex.test(userData.email)) {
      setErrors({ ...errors, email: "Please Enter a Valid Email Address!" });
      return;
    }
    setErrors({ username: "", email: "" });
    submitUpdate();
  };

  return (
    <div className="mt-4 text-[#202142]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-full mb-2 space-y-2">
          <div className="w-full">
            <label
              htmlFor="user_name"
              className={`block mb-2 text-sm font-medium  ${
                darkMode ? `text-gray-200` : "text-indigo-900"
              }`}
            >
              Your Username
            </label>
            <input
              type="text"
              name="username"
              id="user_name"
              className={`block w-full p-3 text-sm border rounded-lg outline-none ${
                darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-slate-200 border-[1px] text-black border-dark-primary"
              } dark:placeholder-gray-400 dark:text-white`}
              placeholder="Your Username"
              value={userData.username}
              onChange={onChange}
            />
            {errors.username && (
              <p className="text-red-500 text-xs ">{errors.username}</p>
            )}
          </div>
        </div>

        <div className="mb-2 w-full">
          <label
            htmlFor="email"
            className={`block mb-2 text-sm font-medium  ${
              darkMode ? `text-gray-200` : "text-indigo-900"
            }`}
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`block w-full p-3 text-sm border rounded-lg outline-none ${
              darkMode
                ? "bg-gray-700 text-white"
                : "bg-slate-200 border-[1px] text-black border-dark-primary"
            } dark:placeholder-gray-400 dark:text-white`}
            placeholder="your.email@mail.com"
            value={userData.email}
            onChange={onChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs ">{errors.email}</p>
          )}
        </div>

        <div className="mb-2 w-full">
          <label
            htmlFor="gender"
            className={`block mb-2 text-sm font-medium  ${
              darkMode ? `text-gray-200` : "text-indigo-900"
            }`}
          >
            Your Gender
          </label>

          <div className="flex gap-4 w-full">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="male"
                className={`p-2 focus:ring-indigo-500 cursor-pointer ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-slate-200 text-black"
                }`}
                required
                checked={userData.gender === "male"}
                onChange={onChange}
              />
              <span className={darkMode ? "text-white" : "text-black"}>
                Male
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="female"
                className={`p-2 focus:ring-indigo-500 cursor-pointer ${
                  darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-slate-200 text-black"
                }`}
                required
                checked={userData.gender === "female"}
                onChange={onChange}
              />
              <span className={darkMode ? "text-white" : "text-black"}>
                Female
              </span>
            </label>
          </div>
        </div>

        <button className="w-full text-white bg-indigo-700 hover:bg-indigo-800  font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileDataForm;
