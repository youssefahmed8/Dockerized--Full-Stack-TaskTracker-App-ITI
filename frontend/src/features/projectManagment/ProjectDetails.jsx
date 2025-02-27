import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatSection from "./ChatSection"; 
import DetailsSection from "./DetailsSection";
import './project.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [reloadMission, setReloadMission] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to the project chat!",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Feel free to ask any questions or provide updates.",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Thank you! I have a few questions about the project details.",
      sender: "You",
      time: new Date().toLocaleTimeString(),
      align: "end",
    },
    {
      text: "Welcome to the project chat!",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Feel free to ask any questions or provide updates.",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Thank you! I have a few questions about the project details.",
      sender: "You",
      time: new Date().toLocaleTimeString(),
      align: "end",
    },
    {
      text: "Welcome to the project chat!",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Feel free to ask any questions or provide updates.",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Thank you! I have a few questions about the project details.",
      sender: "You",
      time: new Date().toLocaleTimeString(),
      align: "end",
    },
    {
      text: "Welcome to the project chat!",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Feel free to ask any questions or provide updates.",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Thank you! I have a few questions about the project details.",
      sender: "You",
      time: new Date().toLocaleTimeString(),
      align: "end",
    },
    {
      text: "Welcome to the project chat!",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Feel free to ask any questions or provide updates.",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Thank you! I have a few questions about the project details.",
      sender: "You",
      time: new Date().toLocaleTimeString(),
      align: "end",
    },
    {
      text: "Welcome to the project chat!",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Feel free to ask any questions or provide updates.",
      sender: "Admin",
      time: new Date().toLocaleTimeString(),
      align: "start",
    },
    {
      text: "Thank you! I have a few questions about the project details.",
      sender: "You",
      time: new Date().toLocaleTimeString(),
      align: "end",
    },
  ]);
  const [activeTab, setActiveTab] = useState("details");
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Projects/${id}`);
        setProject(response.data.project);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id, reloadMission]);

  if (!project) {
    return (
      <div className="flex justify-center mt-80">
        <span className={`loading loading-ball loading-lg ${
          darkMode ? "text-dark-primary" : "text-light-primary"
        }`}></span>
      </div>
    );
  }

  return (
    <div className="p-4 flex items-center flex-col">
      {/* Tab navigation */}
      <div
        role="tablist"
        className={`tabs tabs-boxed mb-4 w-fit text-center ${
          darkMode ? "bg-dark-primary" : "bg-light-primary"
        }`}
      >
        <button
          role="tab"
          className={`tab ${
            activeTab === "details"
              ? `${
                  darkMode
                    ? "bg-dark-primary text-dark-bg"
                    : "bg-light-primary text-light-bg"
                }`
              : `${
                  darkMode
                    ? "bg-dark-bg text-dark-primary"
                    : "bg-light-bg text-light-primary"
                }`
          }`}
          onClick={() => setActiveTab("chat")}
        >
          Chat
        </button>
        <button
          role="tab"
          className={`tab ${
            activeTab === "details"
              ? `${
                  darkMode
                    ? "bg-dark-bg text-dark-primary"
                    : "bg-light-bg text-light-primary"
                }`
              : `${
                  darkMode
                    ? "bg-dark-primary text-dark-bg"
                    : "bg-light-primary text-light-bg"
                }`
          } `}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>

      {/* Conditionally render the content based on the active tab */}
      {activeTab === "chat" && (
        <ChatSection
          messages={messages}
          setMessages={setMessages}
        />
      )}

      {activeTab === "details" && (
        <DetailsSection project={project} reloadMission={reloadMission} setReloadMission={setReloadMission} />
      )}
    </div>
  );
};

export default ProjectDetails;



{/* <button
role="tab"
className={`tab ${
  activeTab === "missions"
    ? `${
        darkMode
          ? "bg-dark-primary text-dark-bg"
          : "bg-light-primary text-light-bg"
      }`
    : `${
        darkMode
          ? "bg-dark-bg text-dark-primary"
          : "bg-light-bg text-light-primary"
      }`
}`}
onClick={() => setActiveTab("members")}
>
Members
</button>
<button
role="tab"
className={`tab ${
  activeTab === "missions"
    ? `${
        darkMode
          ? "bg-dark-bg text-dark-primary"
          : "bg-light-bg text-light-primary"
      }`
    : `${
        darkMode
          ? "bg-dark-primary text-dark-bg"
          : "bg-light-primary text-light-bg"
      }`
} `}
onClick={() => setActiveTab("missions")}
>
Messions
</button> */}
