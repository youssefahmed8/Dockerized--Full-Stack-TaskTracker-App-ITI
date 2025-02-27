/* eslint-disable react/prop-types */

const AddMemberModal = ({
  isOpen,
  onClose,
  email,
  setEmail,
  role,
  setRole,
  loading,
  onSubmit,
  error,
  darkMode,
}) => {
  return (
    isOpen && (
      <dialog id="add_member_modal" className="modal" open>
        <div
          className={`modal-box ${
            darkMode
              ? "bg-dark-bg text-dark-primary"
              : "bg-light-bg text-light-primary"
          }`}
        >
          <h3 className="font-bold text-lg">Add a new member</h3>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-sm">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input input-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                  required
                />
              </label>
            </div>
            <div>
              <label className="block text-sm">
                Role:
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`select select-bordered w-full ${
                    darkMode
                      ? "bg-dark-bg text-dark-primary border-dark-primary"
                      : "bg-light-bg text-light-primary border-light-primary"
                  }`}
                >
                  <option value="manager">Manager</option>
                  <option value="contributor">Contributor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </label>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className={`btn ${loading ? "loading" : ""} ${
                  darkMode
                    ? "bg-dark-primary text-dark-bg border-dark-primary hover:bg-dark-bg hover:text-dark-primary hover:border-dark-primary"
                    : "bg-light-primary text-light-bg border-light-primary hover:bg-light-bg hover:text-light-primary hover:border-light-primary"
                }`}
                onClick={onSubmit}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Member"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className={`btn ${
                  darkMode
                    ? "bg-dark-bg text-dark-primary border-dark-primary hover:bg-dark-primary hover:text-dark-bg hover:border-dark-primary"
                    : "bg-light-bg text-light-primary border-light-primary hover:bg-light-primary hover:text-light-bg hover:border-light-primary"
                }`}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    )
  );
};

export default AddMemberModal;
