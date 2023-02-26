import React from "react";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { toast } from "react-toastify";
import Camera from "@/icons/camera";
import axios from "@/libs/axios";
import { PlusIcon } from "@/icons/plus";
import ListPinRepo from "./ListPinRepo";

function PinnedRepoModal({allRepos}) {
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
      const formdata = new FormData();
      formdata.append("first_name", userDetails.firstName);
      formdata.append("last_name", userDetails.lastName);
      if (imageDetails.imageFile) {
        formdata.append("profile_pic", imageDetails.imageFile, "img.jpg");
      }
      const res = await axios.patch(
        `/accounts/MyUser/${localStorage.getItem("id")}/`,
        formdata
      );
      setUser({
        ...user,
        photoUrl: imageDetails.image,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      });
      toast.success("Profile Edited!");
    } catch (error) {
      e.preventDefault();
      toast.error("Error Occured");
    }
  };

  // ? Handles Image to URL
  function uploadImage() {
    let file = document.getElementById("fileInput").files[0];
    if (file)
      setImageDetails({ image: URL.createObjectURL(file), imageFile: file });
  }

  // & UI
  return (
    <div className="modal-box">
      <label
        htmlFor="my-modal2"
        className="btn btn-sm rounded-full h-10 w-10 absolute top-5 right-5 rotate-45"
      >
        <PlusIcon />
      </label>
      <h3 className="font-bold text-lg mb-5">Edit Pinned Repositories</h3>
      <div className="h-[25rem] overflow-scroll">
        <div className="form-control overflow-scroll">
          { allRepos.map(repo=><ListPinRepo key={repo.id} RepoName={repo.name} stars={3} is_pinned={repo.is_pinned}/>)
            }
    
        </div>
      </div>
      <div className="flex justify-end">

      <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}

export default PinnedRepoModal;
