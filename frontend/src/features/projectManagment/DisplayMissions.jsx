/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import AddMissionModal from "./AddMissionModal";
import EditMissionModal from "./EditMissionModal";
import { CircleX, Bolt } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCloseButton from "./CustomCloseButton";


const DisplayMissions = ({
  missions,
  reloadMission,
  setReloadMission,
  auth,
}) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [users, setUsers] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState(null);
  const [editingMission, setEditingMission] = useState(null);
  const [newState, setNewState] = useState("");
  const { id: projectId } = useParams();
  const creatorId = Cookies.get("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = [
          ...new Set(
            missions.flatMap((mission) => [
              mission.completedBy,
              mission.createdBy,
            ])
          ),
        ];

        const userPromises = userIds.map((userId) =>
          axios
            .get(
              `http://localhost:5000/api/Users/${userId}`,
            )
            .then((res) => res.data)
            .catch((err) => {
              console.error(`Error fetching user ${userId}:`, err);
              return null;
            }),
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          if (user && user.user) {
            acc[user.user._id] = user.user;
          }
          return acc;
        }, {});

        setUsers(usersMap);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("There was an error fetching user data. Please try again later.");
      }
    };

    if (missions.length > 0) {
      fetchUsers();
    }
  }, [missions]);

  const handleDeleteMission = async (missionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/Projects/del-mission`,
        { data: { projectId, missionId, userId: creatorId } },
      );
      setConfirmationModalOpen(false);
      if (response.data.success) {
        setReloadMission(!reloadMission);
        toast.success("Mission deleted successfully!", {
          className: `toast-container mt-11 ${
            darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"
          }`,
          bodyClassName: "toast-body",
          progressClassName: `toast-progress ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`,
          closeButton: <CustomCloseButton darkMode={darkMode} />,
        });
      }
    } catch (error) {
      console.error("Error deleting mission:", error);
      alert("There was an error deleting the mission. Please try again later.");
    }
  };

  const confirmDelete = () => {
    if (missionToDelete) {
      handleDeleteMission(missionToDelete._id);
    }
  };

  const handleUpdateMissionState = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/Projects/updateMissionState`,
        {
          projectId,
          missionId: editingMission._id,
          newState,
          userId: creatorId,
        },
      );
      if (response.data.success) {
        setReloadMission(!reloadMission);
        setEditingMission(null);
        setNewState("");
        toast.success("Mission state updated successfully!", {
          className: `toast-container mt-11 ${
            darkMode ? "bg-dark-bg text-dark-primary" : "bg-light-bg text-light-primary"
          }`,
          bodyClassName: "toast-body",
          progressClassName: `toast-progress ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`,
          closeButton: <CustomCloseButton darkMode={darkMode} />,
        });
      }
    } catch (error) {
      console.error("Error updating mission state:", error);
      alert(
        "There was an error updating the mission state. Please try again later."
      );
    }
  };

  return (
    <div
      className={`p-4 ${
        darkMode ? "bg-dark-background" : "bg-light-background"
      } rounded-lg shadow-md`}
    >
      <h2
        className={`mt-4 text-2xl font-bold ${
          darkMode ? "text-dark-primary" : "text-light-primary"
        }`}
      >
        Missions:
      </h2>
      {auth && (
        <button
          className={`btn rounded-lg my-4 ${
            darkMode
              ? "bg-dark-primary text-dark-bg border-dark-primary hover:border-dark-primary hover:bg-dark-bg hover:text-dark-primary"
              : "bg-light-primary text-light-bg border-light-primary hover:border-light-bg hover:bg-light-bg hover:text-light-primary"
          }`}
          onClick={() => setModalOpen(true)}
        >
          Add Mission
        </button>
      )}
      <ul
        className={`w-full ${
          darkMode ? "text-dark-primary " : " text-light-primary "
        } `}
      >
        {missions.length === 0 ? (
          <li className="p-4 text-center">No missions to display.</li>
        ) : (
          missions.map((mission) => (
            <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
              key={mission._id}
              className={`p-4 my-3 flex flex-row justify-between border-2 rounded-xl transition-transform transform hover:scale-[1.007] ${
                darkMode
                  ? "bg-dark-card text-dark-text border-dark-primary"
                  : "bg-light-card text-light-text border-light-primary"
              } shadow-md`}
            >
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <strong className="text-xl">{mission.title}</strong>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                      mission.status
                    )}`}
                  >
                    {mission.status}
                  </span>
                </div>
                <p className="text-gray-700">{mission.description}</p>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Completed For:</span>{" "}
                  {users[mission.completedBy]?.username || "Loading..."}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Created By:</span>{" "}
                  {users[mission.createdBy]?.username || "Loading..."}
                </p>
                {mission.completedAt && (
                  <p className="text-sm">
                    <span className="font-semibold">Completed At:</span>{" "}
                    {new Date(mission.completedAt).toLocaleDateString()}
                  </p>
                )}
                <p className="text-sm flex flex-row justify-between">
                  <span className="font-semibold">
                    Created At:{" "}
                    {new Date(mission.createdAt).toLocaleDateString()}
                  </span>
                  {auth && (
                    <div className="flex flex-row space-x-4">
                      <label
                        htmlFor="edit_mission_modal"
                        onClick={() => {
                          setEditingMission(mission);
                          setNewState(mission.status);
                        }}
                      >
                        <Bolt />
                      </label>
                      <CircleX
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          setMissionToDelete(mission);
                          setConfirmationModalOpen(true);
                        }}
                      />
                    </div>
                  )}
                </p>
              </div>
            </motion.li>
          ))
        )}
      </ul>

      <EditMissionModal
        mission={editingMission}
        newState={newState}
        setNewState={setNewState}
        onSave={handleUpdateMissionState}
      />

      <AddMissionModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        projectId={projectId}
        reloadMission={reloadMission}
        setReloadMission={setReloadMission}
      />
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmationModalOpen(false)}
        setConfirmationModalOpen={setConfirmationModalOpen}
      />
      <ToastContainer />
    </div>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case "not started":
      return "bg-yellow-500 text-white";
    case "in progress":
      return "bg-blue-500 text-white";
    case "completed":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default DisplayMissions;
