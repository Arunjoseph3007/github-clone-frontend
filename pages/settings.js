import { useUser } from "@/context/userContext";
import Camera from "@/icons/camera";
import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function SettingsPage(props) {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dob: user?.dob,
    bio: user?.bio,
    photoUrl: user?.photoUrl,
    imageFile: null,
  });

  useEffect(() => setUserDetails((prev) => ({ ...prev, ...user })), [user]);

  //$ Uploads image and makes url
  const uploadImage = (e) => {
    const imageFile = e.target.files[0];
    const photoUrl = URL.createObjectURL(imageFile);

    setUserDetails((prev) => ({ ...prev, photoUrl, imageFile }));
  };

  //$ Change handler
  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //$ Not complete submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("id");
    if (!token) {
      toast.error("Login to continue");
      router.push("/login");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("first_name", userDetails.firstName);
      formdata.append("last_name", userDetails.lastName);
      formdata.append("bio", userDetails.bio);
      formdata.append("dob", userDetails.dob);
      if (userDetails.imageFile) {
        formdata.append("profile_pic", userDetails.imageFile, "img.jpg");
      }
      const { data } = await axios.patch(
        `/accounts/MyUser/${token}/`,
        formdata
      );

      setUser({
        ...user,
        ...userDetails,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        dob: data.dob,
        bio: data.bio,
        photoUrl: process.env.NEXT_PUBLIC_API + data.profile_pic,
        userId: data.user_id,
      });
      toast.success("Profile Edited!");
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  // & UI
  return (
    <div className="flex flex-col items-center py-5">
      <h3 className="font-semibold text-4xl">Settings</h3>
      <div className="w-[95vw] max-w-5xl">
        {/*//@ Form Page */}
        <div>
          <form className="bg-white  max-w-md sm:max-w-full rounded-md overflow-hidden shadow-lg shadow-blue-200 px-4 pb-10">
            <div className="form-control items-center">
              {/* //@ Image */}
              <div className="text-center p-6  border-b w-full mb-8">
                <img
                  className="h-24 w-24 rounded-full mx-auto"
                  src={userDetails.photoUrl}
                  alt="profile pic"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium my-1"
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

              {/* //@ Text Form */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  {/* //@ Firstname */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="font-bold mb-1 text-gray-700 block"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="first-name"
                      name="firstName"
                      id="firstName"
                      onChange={handleChange}
                      className="input input-bordered"
                      value={userDetails.firstName}
                    />
                  </div>
                  {/* //@ Lastname */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="font-bold mb-1 text-gray-700 block"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="last-name"
                      className="input input-bordered"
                      name="lastName"
                      id="lastName"
                      onChange={handleChange}
                      value={userDetails.lastName}
                    />
                  </div>
                </div>
                {/* //@ Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="font-bold mb-1 text-gray-700 block"
                  >
                    Bio
                  </label>
                  <textarea
                    type="text"
                    placeholder="Bio"
                    className="input input-bordered w-full"
                    name="bio"
                    id="bio"
                    row={3}
                    columns={3}
                    onChange={handleChange}
                    value={userDetails.bio}
                  />
                </div>

                {/* //@ DOB */}
                <div>
                  <label
                    htmlFor="dob"
                    className="font-bold mb-1 text-gray-700 block"
                  >
                    DOB
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    name="dob"
                    id="dob"
                    onChange={handleChange}
                    value={userDetails.dob}
                  />
                </div>
              </div>

              {/* //@ Submit */}
              <div className="modal-action flex justify-center">
                <button
                  className="btn btn-sm md:btn-wide mb-2"
                  onClick={handleSubmit}
                >
                  Edit details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

SettingsPage.getLayout = MainLayout;
