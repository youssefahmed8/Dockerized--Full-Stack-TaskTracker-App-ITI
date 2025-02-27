/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Ui/Loader";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import DarkModeToggle from "../Ui/DarkModeToggle";
import darkRegisterSVG from "../../../public/regiter.json";
import lightRegisterSVG from "../../../public/lightRegister.json";
import Lottie from "lottie-react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const registerUser = async (formData) => {
    const { username, email, password, confirmPassword, gender } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/Users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          gender,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      const data = await response.json();

      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSigninClick = () => {
    navigate("/login");
  };

  return (
    <section
      className={`bg-base-100 grid grid-cols-1 md:grid-cols-2 items-center w-full p-6 md:p-12 min-h-screen ${
        darkMode ? "bg-dark-bg" : "bg-light-bg"
      }`}
    >
      <div className="absolute top-3 right-3">
        <DarkModeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col items-center justify-center h-full px-6 py-8 w-full ${
          darkMode ? "text-dark-text" : "text-light-text"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`w-full bg-base-200 rounded-lg shadow-md sm:max-w-md border-2 ${
            darkMode
              ? "bg-dark-bg border-dark-primary"
              : "bg-light-bg border-light-primary"
          }`}
        >
          <div className="p-6 space-y-4">
            <h1
              className={`text-xl font-bold leading-tight tracking-tight ${
                darkMode ? " text-dark-text" : " text-light-text"
              }`}
            >
              Create your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <div className="flex justify-center items-center h-24">
                <div className="loader">
                  <Loader />
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>
                <div>
                  <label
                    htmlFor="username"
                    className={`block mb-2 text-sm font-medium ${
                      darkMode ? " text-dark-text " : " text-light-text"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className={`input input-bordered w-full border-[1px] ${
                      darkMode
                        ? "bg-dark-bg text-dark-text border-dark-primary"
                        : "bg-light-bg text-light-text border-light-primary"
                    }`}
                    placeholder="John Doe"
                    {...register("username", {
                      required: "Please Enter Your Name",
                    })}
                  />
                  {errors.username && (
                    <span className="text-red-500">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block mb-2 text-sm font-medium ${
                      darkMode ? " text-dark-text " : " text-light-text"
                    }`}
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`input input-bordered w-full border-[1px] ${
                      darkMode
                        ? "bg-dark-bg text-dark-text border-dark-primary"
                        : "bg-light-bg text-light-text border-light-primary"
                    }`}
                    placeholder="name@company.com"
                    {...register("email", {
                      required: "Please Enter Your Email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="password"
                    className={`block mb-2 text-sm font-medium ${
                      darkMode ? " text-dark-text " : " text-light-text"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={`input input-bordered w-full border-[1px] ${
                      darkMode
                        ? "bg-dark-bg text-dark-text border-dark-primary"
                        : "bg-light-bg text-light-text border-light-primary"
                    }`}
                    {...register("password", {
                      required: "Please Enter Your Password",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}{" "}
                  </span>
                  </div>
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`block mb-2 text-sm font-medium ${
                      darkMode ? " text-dark-text " : " text-light-text"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className={`input input-bordered w-full border-[1px] ${
                      darkMode
                        ? "bg-dark-bg text-dark-text border-dark-primary"
                        : "bg-light-bg text-light-text border-light-primary"
                    }`}
                    {...register("confirmPassword", {
                      required: "Please Repeat Your Password",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                {/* Gender Selection */}
                <div>
                  <label
                    className={`block mb-2 text-sm font-medium ${
                      darkMode ? " text-dark-text " : " text-light-text"
                    }`}
                  >
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="radio"
                        {...register("gender", {
                          required: "Please Select Your Gender",
                        })}
                      />
                      <span
                        className={`ml-2 ${
                          darkMode ? " text-dark-text " : " text-light-text"
                        }`}
                      >
                        Male
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="radio"
                        {...register("gender", {
                          required: "Please Select Your Gender",
                        })}
                      />
                      <span
                        className={`ml-2 ${
                          darkMode ? " text-dark-text " : " text-light-text"
                        }`}
                      >
                        Female
                      </span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500">{errors.gender.message}</p>
                  )}
                </div>

                <div className="flex flex-col text-center gap-2">
                  <button
                    type="submit"
                    className={`py-3 rounded-lg w-full ${
                      darkMode
                        ? "bg-dark-primary hover:bg-dark-pHover text-light-text"
                        : "bg-light-primary hover:bg-light-pHover text-dark-text"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </form>
            )}
            <div className="">
              <p
                className={`text-sm ${
                  darkMode ? "text-dark-text" : "text-light-text"
                }`}
              >
                Already have an account?{" "}
                <span
                  className={`cursor-pointer ${
                    darkMode ? "text-dark-primary" : "text-light-primary"
                  }`}
                  onClick={handleSigninClick}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex justify-center items-center w-full h-full"
      >
        {darkMode ? (
          <Lottie
            animationData={darkRegisterSVG}
            className="hidden md:block w-1/3 min-w-[500px] h-auto"
          />
        ) : (
          <Lottie
            animationData={lightRegisterSVG}
            className="hidden md:block w-1/3 min-w-[500px] h-auto"
          />
        )}
      </motion.div>
    </section>
  );
}

export default Register;
