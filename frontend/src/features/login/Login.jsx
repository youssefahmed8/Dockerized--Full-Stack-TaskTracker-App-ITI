/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Ui/Loader";
import loginSvg from "../../../public/login.json";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import DarkModeToggle from "../Ui/DarkModeToggle";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
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
  const loginUser = async (data) => {
    setLoading(true);

    const { email, password } = data;

    if (!email || !password) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/Users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();

      Cookies.set("userId", data.user._id, { expires: 1 });

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <section
      className={`bg-base-100 grid grid-cols-1 md:grid-cols-2 items-center w-full p-6 md:p-12 min-h-screen ${
        darkMode ? "bg-dark-bg" : "bg-light-bg"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center h-full px-6 py-8 
          ${darkMode ? " text-dark-text" : " text-light-text"}
        `}
      >
        <div className="absolute top-3 right-3">
          <DarkModeToggle />
        </div>
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
                darkMode ? "text-dark-text" : " text-light-text "
              }`}
            >
              Sign in to your account
            </h1>
            {error && (
              <motion.p
                className="text-red-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}
            <form className="space-y-4" onSubmit={handleSubmit(loginUser)}>
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
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

              <button
                type="submit"
                className={`py-3 rounded-lg w-full ${
                  darkMode
                    ? "bg-dark-primary hover:bg-dark-pHover text-light-text"
                    : "bg-light-primary hover:bg-light-pHover text-dark-text"
                }`}
                disabled={loading}
              >
                {loading ? <Loader /> : "Sign In"}
              </button>
              <p className="text-sm font-light">
                Don't have an account?{" "}
                <a
                  href=""
                  className={`cursor-pointer ${
                    darkMode ? "text-dark-primary" : "text-light-primary"
                  }`}
                  onClick={handleRegisterClick}
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Lottie
          animationData={loginSvg}
          className="hidden md:block w-1/3 min-w-[500px] h-auto"
        />
      </motion.div>
    </section>
  );
}

export default Login;
