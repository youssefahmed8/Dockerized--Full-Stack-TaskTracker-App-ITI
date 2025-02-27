/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { UserRoundCog, CircleX } from "lucide-react";
import { useSelector } from "react-redux";
import EditMemberModal from "./EditMemberModal";
import { motion } from "framer-motion"; // Importing motion from framer-motion

const DisplayMembers = ({
  initialMembers,
  onDeleteMember,
  handleUpdateRole,
  setIsEditModalOpen,
  isEditModalOpen,
  auth,
}) => {
  const [members, setMembers] = useState(initialMembers); // Use state for members
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the edit modal
  const [loading, setLoading] = useState(true);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null); // State for the selected member
  const modalRef = useRef(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (memberToDelete) {
      onDeleteMember(memberToDelete);
      setIsModalOpen(false);
      setMemberToDelete(null);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (initialMembers && initialMembers.length > 0) {
      setLoading(false);
      setMembers(initialMembers);
    } else {
      setLoading(true);
    }
  }, [initialMembers]);

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <ul className="w-full">
        {loading ? (
          <li className="p-4 text-center">Loading members...</li>
        ) : members.length === 0 ? (
          <li className="p-4 text-center">No members to display.</li>
        ) : (
          members.map((member) => (
            <motion.li
              key={member._id}
              className={`p-4 my-3 flex flex-row justify-between border-2 rounded-xl transition-transform transform hover:scale-[1.008] ${
                darkMode
                  ? "text-dark-primary border-dark-primary"
                  : "text-light-primary border-light-primary"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <strong>{member.role}</strong>
              </div>
              <div>{member.user?.email || "Email not available"}</div>
              {auth && (
                <div className="flex flex-row">
                  <UserRoundCog
                    className="cursor-pointer"
                    onClick={() => handleEditClick(member)}
                  />
                  <CircleX
                    className="text-red-500 cursor-pointer ml-3"
                    onClick={() => handleDeleteClick(member)}
                  />
                </div>
              )}
            </motion.li>
          ))
        )}
      </ul>

      {isModalOpen && (
        <dialog id="delete_member_modal" className="modal" open ref={modalRef}>
          <div
            className={`modal-box ${
              darkMode
                ? "bg-dark-bg text-dark-primary"
                : "bg-light-bg text-light-primary"
            }`}
          >
            <h3 className="font-bold text-lg">
              Are you sure you want to delete this member?
            </h3>
            <p className="py-4">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className={`btn mr-4 ${
                  darkMode
                    ? "bg-dark-bg text-dark-primary border-dark-primary hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary"
                    : "bg-light-bg text-light-primary border-light-primary hover:bg-light-primary hover:text-light-bg hover:border-light-primary"
                }`}
              >
                Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`btn ${loading ? "loading" : ""} ${
                  darkMode
                    ? "bg-dark-primary text-dark-bg border-dark-primary hover:bg-dark-bg hover:text-dark-primary hover:border-dark-primary"
                    : "bg-light-primary text-light-bg border-light-primary hover:bg-light-bg hover:text-light-primary hover:border-light-primary"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Member Modal */}
      <EditMemberModal
        isOpen={isEditModalOpen}
        member={selectedMember}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateRole={(newRole) =>
          handleUpdateRole({ userEmail: selectedMember.user.email, newRole })
        }
      />
    </>
  );
};

export default DisplayMembers;
