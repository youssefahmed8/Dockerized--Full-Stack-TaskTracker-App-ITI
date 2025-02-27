import Lottie from "lottie-react";
import taskCreation from "../../../public/taskCreation.json";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function TaskCreation() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <section className="md:grid md:grid-cols-2 mb-20 container mx-auto px-4">
      <Lottie animationData={taskCreation} />
      <div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          viewport={{ once: true }}
          className={`${
            darkMode ? "text-dark-text" : "text-light-text"
          } md:text-7xl text-3xl mb-10 font-semibold`}
        >
          Task Creation and Assignment
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
          viewport={{ once: true }}
          className={`${
            darkMode ? "text-dark-text" : "text-light-text"
          } md:text-3xl text-xl font-medium`}
        >
          Easily create and assign tasks with a few clicks. Assign tasks to
          yourself or teammates and add detailed descriptions to clarify
          objectives.
        </motion.p>
      </div>
    </section>
  );
}

export default TaskCreation;
