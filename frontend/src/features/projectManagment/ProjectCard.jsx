/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Settings, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const ProjectCard = ({
  project,
  openDeleteModal,
}) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate(`/projects/${project._id}`);
  };

  return (
    <div
      className={`border-2 ${
        darkMode
          ? "bg-dark-bg border-dark-primary"
          : "bg-light-bg border-light-primary"
      } shadow-md rounded-lg p-4 mb-4`}
    >
      <div onClick={handleNavigate} className="cursor-pointer">
        <h2
          className={`${
            darkMode ? "text-dark-primary" : "text-light-primary"
          } text-lg font-semibold`}
        >
          {project.title}
        </h2>
        <p
          className={`${
            darkMode
              ? "text-dark-primary opacity-60"
              : "text-light-primary opacity-85"
          } mb-2`}
        >
          {project.description}
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-sm text-gray-500">
          Members: {project.members.length} | Missions: {project.missions.length}
        </p>
        <div className="flex flex-row">
          <Settings
            className={`cursor-pointer ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            } mr-2`}
            onClick={handleNavigate} 
          />
          <Trash2
            className={`text-red-500 cursor-pointer`}
            onClick={() => openDeleteModal(project._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
