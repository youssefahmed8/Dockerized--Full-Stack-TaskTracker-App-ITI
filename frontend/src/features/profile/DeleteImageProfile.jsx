/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
// import Loader from "../Ui/Loader";

const DeleteImageProfile = ({ userData, setUserData, submitUpdate }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const generateSignature = (publicId) => {
    const apiSecret = "g9qU_w3Ira-EgQ8L-usqAyckEXY";
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = CryptoJS.SHA1(
      `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    ).toString();

    return { signature, timestamp };
  };
  const submitDelete = async () => {
    const url = `https://api.cloudinary.com/v1_1/dh71g32l9/image/destroy`;
    const data = new FormData();
    const { signature, timestamp } = generateSignature(userData.imageId);
    data.append("public_id", userData.imageId);
    data.append("api_key", "683779693383739");
    data.append("signature", signature);
    data.append("timestamp", timestamp);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.result === "ok") {
        setUserData((prev) => ({ ...prev, imageId: "", imageUrl: "" }));
        setIsModalOpen(false);
        setResult('ok')
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
    useEffect(() => {
      if (userData.imageUrl === "" && result === "ok") {
        submitUpdate();
      }
    }, [userData.imageUrl]);
  return (
    <div className="">
      <input
        type="checkbox"
        id="delete_image"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={(e) => setIsModalOpen(e.target.checked)}
      />
      <div className="modal fixed inset-0 flex justify-center items-start bg-slate-200 z-[1000]">
        <div
          className={`modal-box mt-10 relative ${
            !darkMode ? "bg-slate-200" : ""
          }`}
        >
          <label
            htmlFor="delete_image"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3
            className={`text-lg font-bold ${!darkMode ? "text-red-500" : ""}`}
          >
            Delete Image Profile
          </h3>
          <p className={`py-4 ${!darkMode ? "text-gray-700" : ""}`}>
            Are you sure you want to delete your Image Profile?
          </p>
          <div className="flex space-x-3">
            <label
              className={`btn mt-4 text-center bg-red-500 hover:bg-red-700 ${
                !darkMode ? "text-white" : ""
              }`}
              onClick={submitDelete}
            >
              Delete
            </label>
            <label
              htmlFor="delete_image"
              className={`btn mt-4 bg-gray-500 hover:bg-gray-700 ${
                !darkMode ? "text-white" : ""
              }`}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteImageProfile;
