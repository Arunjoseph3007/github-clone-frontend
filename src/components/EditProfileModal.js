import React from "react";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { toast } from "react-toastify";
import Camera from "@/icons/camera";
import axios from "@/libs/axios";

function EditProfileModal() {
  const { user, setUser } = useUser();
  const [userDetails, setUserDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [imageDetails, setImageDetails] = useState({
    image: user.photoUrl,
    imageFile: null,
  });
  //$ Change handler
  const handleChange = (e) =>
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  //$ Submit handler
  const handleSubmit = async (e) => {
    try {
      console.log(imageDetails.imageFile);
      var formdata = new FormData();
      formdata.append("first_name", userDetails.firstName);
      formdata.append("last_name", userDetails.lastName);
      if (imageDetails.imageFile) {
        formdata.append("profile_pic", imageDetails.imageFile, "img.jpg");
      }
      const res = await axios.patch(
        `/accounts/MyUser/${localStorage.getItem("id")}/`,
        formdata
      );
      console.log(res.data);
      setUser({
        ...user,
        photoUrl: imageDetails.image,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      });
      toast.success("Profile Edited!");
    } catch (error) {
      e.preventDefault();
      console.log(error);
      toast.error("Error Occured");
    }
  };
  function uploadImage() {
    let file = document.getElementById("fileInput").files[0];
    setImageDetails({ image: URL.createObjectURL(file), imageFile: file });
  }
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Your Profile</h3>
      <div>
        {/* Form Page */}
        <div>
          <form className="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg">
            <div className="form-control">
              <div className="text-center p-6  border-b">
                <img
                  className="h-24 w-24 rounded-full mx-auto"
                  src={imageDetails.image}
                  alt={user.username}
                />

                <label
                  htmlFor="fileInput"
                  type="button"
                  className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium mt-1"
                >
                  <Camera />
                  Browse Photo
                </label>
                <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
                  Click to update profile picture
                </div>
                <input
                  name="photo"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={uploadImage}
                />
              </div>
              <div className="flex flex-row justify-evenly">
                <div>
                  <label
                    htmlFor="firstname"
                    className="font-bold mb-1 text-gray-700 block"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="first-name"
                    name="firstName"
                    onChange={handleChange}
                    className="input input-bordered"
                    style={{ width: "9.5rem" }}
                    value={userDetails.firstName}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="font-bold mb-1 text-gray-700 block"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="last-name"
                    className="input input-bordered"
                    style={{ width: "9.5rem" }}
                    name="lastName"
                    onChange={handleChange}
                    value={userDetails.lastName}
                  />
                </div>
              </div>
              <div className="modal-action flex justify-center">
                <label
                  htmlFor="my-modal"
                  className="btn btn-sm md:btn-wide mb-2"
                  onClick={handleSubmit}
                >
                  Edit details
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
