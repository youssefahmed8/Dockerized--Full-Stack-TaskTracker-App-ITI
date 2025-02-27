import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import { motion } from "framer-motion"; // Import framer-motion
import Loader from "../Ui/Loader";
import tasks from "../../../public/hero section.json";
import "./Home.css";
import AnimatedCompInHome from "../Ui/AnimatedCompInHome";
import Cookies from "js-cookie";
import axios from "axios";

function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    const userId = Cookies.get("userId");

    const validateUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Users/${userId}`);

        if (response.status === 200 && response.data.user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoggedIn(false);
      }
    };

    if (userId) {
      validateUser(userId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleButtonClick = () => {
      setIsLoading(false);
      isLoggedIn ? navigate("/tasks") : navigate("/login");
  };

  // Framer motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 0.3 } },
  };
  return (
    <section
      className={`container mx-auto flex px-4 h-screen  ${
        darkMode ? "text-dark-text" : "text-light-text"
      }`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Adjusted placement of AnimatedCompInHome */}
          <motion.div
            className="z-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            <AnimatedCompInHome />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 justify-center items-center z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="mb-8 md:mb-0 md:mr-8">
              <motion.h1
                className={`text-4xl md:text-6xl font-bold mb-5 ${
                  darkMode ? "text-dark-text" : "text-light-text"
                }`}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 1 } }}
              >
                Organize, Prioritize, and Conquer Your Tasks Effortlessly
              </motion.h1>

              <motion.p
                className={`text-xl font-medium mb-6 ${
                  darkMode ? "text-dark-text" : "text-light-text"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              >
                Stay on top of your to-do list with our intuitive task
                management system. Boost your productivity, meet deadlines, and
                achieve your goals—all in one place.
              </motion.p>

              <motion.button
                onClick={handleButtonClick}
                className={`bg-li py-2 px-6 hover:shadow-md rounded transition ${
                  darkMode
                    ? "text-light-text bg-dark-primary"
                    : "text-dark-text bg-light-primary"
                }`}
                variants={buttonVariants}
                whileHover="hover"
              >
                Get Started
              </motion.button>
            </div>
            <Lottie animationData={tasks} className="md:block hidden" />
          </motion.div>
        </>
      )}
    </section>
  );
}

export default Hero;
