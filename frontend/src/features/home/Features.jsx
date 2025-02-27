import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "./Features.module.css";
import featuresImg from "../../../public/features.svg";

function Features() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const h2Class = `text-3xl font-bold capitalize mb-4`;
  const pClass = `text-xl font-medium`;
  return (
    <section className="container m-auto px-4">
      <h1
        className={`${
          darkMode ? "text-dark-text" : "text-light-text"
        } text-4xl mb-20`}
      >
        Organize, Prioritize, and Conquer Your Tasks Effortlessly
      </h1>
      <div className="grid md:grid-cols-2 items-center">
        <div className="hidden md:block">
          <img src={featuresImg} alt="img" />
        </div>

        <div className="features-wrap grid md:grid-cols-2 gap-5">
          <motion.div
            className={`${
              darkMode
                ? "text-light-text bg-dark-primary"
                : "text-dark-text bg-light-primary"
            } p-6 rounded-xl`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className={h2Class}>Priority Levels</h2>
            <p className={pClass}>
              Set priority levels (low, medium, high) to highlight urgent tasks.
              Quickly identify which tasks need immediate attention and which
              can wait.
            </p>
          </motion.div>

          <motion.div
            className={`${
              darkMode
                ? "text-dark-text bg-dark-secondary"
                : "text-light-text bg-light-secondary"
            } p-6 rounded-xl`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className={h2Class}>Due Dates</h2>
            <p className={pClass}>
              Stay on top of deadlines by assigning due dates to tasks. Get
              reminders for upcoming deadlines and ensure timely completion of
              tasks.
            </p>
          </motion.div>

          <motion.div
            className={`${
              darkMode
                ? "text-dark-text bg-dark-accent"
                : "text-light-text bg-light-accent"
            } p-6 rounded-xl`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className={h2Class}>Status Filters</h2>
            <p className={pClass}>
              Easily filter tasks based on their status (Completed, In-Progress,
              Pending). This allows users to focus on tasks that require
              attention and track overall progress.
            </p>
          </motion.div>

          <motion.div
            className={`${
              darkMode
                ? "text-light-text bg-dark-primary"
                : "text-dark-text bg-light-primary"
            } p-6 rounded-xl`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className={h2Class}>Search Functionality</h2>
            <p className={pClass}>
              Find specific tasks quickly with the search feature. Search by
              task name, description, or category to locate important tasks
              instantly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
