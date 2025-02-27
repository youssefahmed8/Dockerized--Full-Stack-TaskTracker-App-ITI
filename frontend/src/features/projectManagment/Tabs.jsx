/* eslint-disable react/prop-types */
const Tabs = ({ activeTab, setActiveTab, darkMode }) => {
  return (
    <div
      role="tablist"
      className={`tabs tabs-boxed mb-4 w-full text-center ${
        darkMode ? "bg-dark-primary" : "bg-light-primary"
      }`}
    >
      <button
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
        Missions
      </button>
    </div>
  );
};

export default Tabs;
