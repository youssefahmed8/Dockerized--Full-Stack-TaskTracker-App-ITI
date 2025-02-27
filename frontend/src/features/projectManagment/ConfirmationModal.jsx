import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const ConfirmationModal = ({ isOpen, onConfirm, setConfirmationModalOpen }) => {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    
    if (!isOpen) return null;
    function onClose() {
      setConfirmationModalOpen(prev => !prev);
    }

    return (
      <dialog className={`modal ${isOpen ? 'open' : ''}`} open>
        <div
          className={`modal-box ${
            darkMode
              ? "bg-dark-bg text-dark-primary"
              : "bg-light-bg text-light-primary"
          }`}
        >
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this mission ?
          </h3>
          <p className="py-4">This action cannot be undone.</p>
          <div className="flex justify-end">
            <button
              onClick={onConfirm}
              className={`btn mr-4 ${
                darkMode
                  ? "bg-dark-bg text-dark-primary border-dark-primary hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary"
                  : "bg-light-bg text-light-primary border-light-primary hover:bg-light-primary hover:text-light-bg hover:border-light-primary"
              }`}
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className={`btn ${
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
    );
  };
  
  export default ConfirmationModal;
  