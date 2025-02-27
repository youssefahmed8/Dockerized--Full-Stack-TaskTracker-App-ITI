/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setNetworkMode } from "../app/Slices/darkMode/networkSlice";

const InternetConnectionProvider = ({ children }) => {
  const isOnline = useSelector((state) => state.network.isOnline);
  const toastRef = useRef();
  const dispatch = useDispatch();

  function addToast() {
    toastRef.current = toast.custom(
      (t) => (
        <div
          style={{
            backgroundColor: "#FFC107",
            color: "#333",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "500",
            maxWidth: "320px",
          }}
        >
          <span role="img" aria-label="Warning" style={{ fontSize: "1.5em" }}>
            ⚠️
          </span>
          <span>Your connection is offline. Please reconnect.</span>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1em",
              color: "#333",
              cursor: "pointer",
              marginLeft: "auto",
            }}
            aria-label="Close"
          >
            ✖️
          </button>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  }
  function closeToast() {
    toast.dismiss(toastRef.current?.id);
  }
  const handleOffline = () => {
    dispatch(setNetworkMode(false));
  };
  const handleOnline = () => {
    dispatch(setNetworkMode(true));
    closeToast();
  };

  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    // Clean up removes the event listeners when the component unmounts
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);
  if (!isOnline) {
    return (
      <>
        {children} {addToast()}
      </>
    );
  }
  return children;
};

export default InternetConnectionProvider;
