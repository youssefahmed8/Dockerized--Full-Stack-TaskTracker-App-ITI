/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MemberManagement from "./MemberManagement";
import DisplayMissions from "./DisplayMissions";
import axios from "axios";
import Cookies from "js-cookie";
import Tabs from "./Tabs";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomCloseButton from "./CustomCloseButton";

const DetailsSection = ({ project, reloadMission, setReloadMission }) => {
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState(project.members);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState("manager");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const { id } = useParams();
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/Projects/${id}/members/${userId}`,
        );

        setMembers(response.data.members);
        const user = members.find((member) => member.user._id === userId);
        if (user.role === "owner" || user.role === "manager") {
          setAuth(true);
        }
      } catch (error) {
        console.error("DetailsSection-> Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [id, reload]);

  const handleAddMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const handleDeleteMember = async (member) => {
    const { user } = member;
    const userEmail = user.email;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/Projects/remove-member`,
        {
          data: { projectId: id, userEmail, userId },
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        setMembers((prevMembers) =>
          prevMembers.filter((m) => m.user._id !== member.user._id)
        );
        toast.success("Member deleted successfully!", {
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
      console.error("Error deleting member:", error);
      toast.error("You don't have permission to delete this member.", {
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
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/Projects/assign-role`,
        {
          projectId: id,
          userEmail: addEmail,
          role: addRole,
          userId,
        },
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        const newMember = { addEmail, addRole, user: response.data.user };
        handleAddMember(newMember);
        setIsModalOpen(false);
        setAddEmail("");
        setAddRole("manager");
        setError(null);
        setReload(!reload);
        toast.success("Member added successfully!", {
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
      console.error("Error adding member:", error);
      setError("Failed to add member. Please check the email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (updatedMember) => {
    const { userEmail, newRole } = updatedMember;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/Projects/update-role`,
        {
          projectId: id,
          userEmail,
          newRole: newRole.newRole,
          userId: Cookies.get("userId"),
        },
      );

      if (response.status === 200) {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.user.email === userEmail
              ? { ...member, role: newRole.newRole }
              : member
          )
        );
        setIsEditModalOpen(false);
        setReload(!reload);
        toast.success("Role updated successfully!", {
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
      console.error("Error updating member:", error);
    }
  };

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  

  return (
    <motion.div
      className={`p-4 shadow rounded-3xl w-full container overflow-y-auto border-2 h-screen ${
        darkMode ? "border-dark-primary" : "border-light-primary"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
      />

      <motion.h1
        className={`text-2xl font-bold ${
          darkMode ? "text-dark-primary" : "text-light-primary"
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {project.title}
      </motion.h1>
      <motion.p
        className={`text-lg ml-2 ${
          darkMode ? "text-dark-pHover" : "text-light-pHover"
        }`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {project.description}
      </motion.p>
      <motion.p
        className={`text-lg ml-4 ${
          darkMode ? "text-dark-pHover" : "text-light-pHover"
        }`}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {formattedDate}
      </motion.p>

      {activeTab === "members" && (
        <motion.div
          key="members"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MemberManagement
            members={members}
            setMembers={setMembers}
            handleDeleteMember={handleDeleteMember}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            email={addEmail}
            setEmail={setAddEmail}
            role={addRole}
            setRole={setAddRole}
            loading={loading}
            handleSubmit={handleSubmit}
            error={error}
            darkMode={darkMode}
            id={id}
            userId={userId}
            handleUpdateRole={handleUpdateRole}
            setIsEditModalOpen={setIsEditModalOpen}
            isEditModalOpen={isEditModalOpen}
            auth={auth}
          />
        </motion.div>
      )}

      {activeTab === "missions" && (
        <motion.div
          key="missions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DisplayMissions
            missions={project.missions}
            reloadMission={reloadMission}
            setReloadMission={setReloadMission}
            auth={auth}
          />
        </motion.div>
      )}
      <ToastContainer />
    </motion.div>
  );
};

export default DetailsSection;
