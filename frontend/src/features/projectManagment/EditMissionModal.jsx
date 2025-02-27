/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const EditMissionModal = ({ mission, newState, setNewState, onSave }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  if (!mission) return null;

  return (
    <>
      {/* Modal structure */}
      <input type="checkbox" id="edit_mission_modal" className="modal-toggle" />
      <div className={`modal ${darkMode ? "bg-dark-bg" : "bg-light-bg"}`} role="dialog">
        <div className={`modal-box ${darkMode ? "text-dark-primary bg-dark-bg" : "text-light-primary bg-light-bg"}`}>
          <h3 className="text-lg font-bold">Edit Status for {mission.title}</h3>
          <select
            className={`select select-bordered w-full my-4 ${
              darkMode
                ? "bg-dark-bg text-dark-primary border-dark-primary"
                : "bg-light-bg text-light-primary border-light-primary"
            }`}
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="modal-action flex justify-end">
            <label
              htmlFor="edit_mission_modal"
              className={`btn mr-4 ${
                darkMode
                  ? "bg-dark-primary text-dark-bg border-dark-primary hover:bg-dark-bg hover:text-dark-primary hover:border-dark-primary"
                  : "bg-light-primary text-light-bg border-light-primary hover:bg-light-bg hover:text-light-primary hover:border-light-primary"
              }`}
              onClick={onSave}
            >
              Update Status
            </label>
            <label
              htmlFor="edit_mission_modal"
              className={`btn ${
                darkMode
                  ? "bg-dark-bg text-dark-primary border-dark-primary hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary"
                  : "bg-light-bg text-light-primary border-light-primary hover:bg-light-primary hover:text-light-bg hover:border-light-primary"
              }`}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMissionModal;
