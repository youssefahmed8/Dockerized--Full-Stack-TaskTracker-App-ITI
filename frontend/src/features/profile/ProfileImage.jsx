/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import male from "../../../public/male.svg";
import female from "../../../public/female.svg";
import { useEffect, useState } from "react";
const ProfileImage = ({ userData, setUserData, submitUpdate }) => {
  const data = new FormData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setFileImage(file);
    }
  };
  const submitUpload = async () => {
    data.append("file", fileImage);
    data.append("upload_preset", "profile_image");
    data.append("cloud_name", "dh71g32l9");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dh71g32l9/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploaded = await res.json();
    setSelectedImage(uploaded.url);
    setUserData((prev) => ({
      ...prev,
      imageUrl: uploaded.url,
      imageId: uploaded.public_id,
    }));
  };
  useEffect(() => {
    if (userData.imageUrl === selectedImage) {
      submitUpdate();
      setSelectedImage(null);
    }
  }, [userData.imageUrl, userData.imageId]);
  return (
    <div className="flex flex-col items-center md:space-x-12 space-y-5 sm:flex-row sm:space-y-0">
      <img
        className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
        src={
          selectedImage ||
          userData.imageUrl ||
          (userData.gender === "male" ? male : female)
        }
        alt="Image Profile"
      />
      <input
        type="file"
        accept="image/*"
        id="imageUpload"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className="flex flex-col space-y-5 w-full sm:w-auto">
        <button
          type="button"
          onClick={() => document.getElementById("imageUpload").click()}
          className={`w-full ${
            selectedImage ? "hidden" : "block"
          } py-3.5 px-3 text-base font-medium text-indigo-100 bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 `}
        >
          Upload picture
        </button>
        <button
          type="button"
          onClick={submitUpload}
          className={`w-full ${
            selectedImage ? "block" : "hidden"
          } py-3.5 px-3 text-base font-medium text-indigo-100 bg-[#268149] rounded-lg border border-indigo-200  `}
        >
          Save picture
        </button>
        <label
          htmlFor="delete_image"
          onClick={() => setSelectedImage(null)}
          className={`w-full py-3.5 px-3 ${
            selectedImage ? "hidden" : "block"
          } ${
            userData.imageUrl ? "" : "hidden"
          } text-base text-center font-medium text-indigo-900 cursor-pointer bg-red-200 rounded-lg border border-indigo-200 hover:bg-red-300 hover:text-[#202142]`}
        >
          Delete picture
        </label>
        <button
          type="button"
          onClick={() => setSelectedImage(null)}
          className={`w-full py-3.5 px-3 text-base ${
            selectedImage ? "block" : "hidden"
          } font-medium text-slate-300 bg-gray-500 rounded-lg border border-indigo-200 hover:bg-gray-600 `}
        >
          Cancel upload
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
