import AllRepo from "@/components/AllRepo";
import PinRepo from "@/components/PinRepo";
import CircularStack from "@/icons/CircularStack";
import { DocumentIcon } from "@/icons/documents";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/context/userContext";
import { toast } from "react-toastify";

export default function UserPage({ repos = [] }) {
  const { user, setUser } = useUser();
  const [active, setActive] = useState(true);
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
      setUser({
        ...user,photoUrl:imageDetails.image,firstName:userDetails.firstName,lastName:userDetails.lastName
      });
      toast.success("Profile Edited!")
    } catch (error) {
      e.preventDefault()
      toast.error("Error Occured")
    }
    
    
  };
  function uploadImage() {
    let file = document.getElementById("fileInput").files[0];
    setImageDetails({ image: URL.createObjectURL(file), imageFile: file });
  }
  function onPinClick() {
    setActive(true);
  }
  function onAllClick() {
    setActive(false);
  }

  return (
    <div className="min-h-screen bg-base-200  flex">
      <div className="w-[30%] bg-white">
        <div className="flex justify-center mt-[2rem]">
          <Link href="/new">
            <button className="btn btn-sm md:btn-wide">
              Create New Repository
            </button>
          </Link>
        </div>

        <div className="avatar flex justify-center mt-[2rem]">
          <div className="w-[20rem] rounded-full overflow-hidden shadow-xl border border-base-300 ">
            <img className="overflow-hidden opacity-90 " src={user.photoUrl} />
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="flex justify-center text-4xl font-serif">
            {user.firstName} {user.lastName}
          </div>
          <div className="flex justify-center text-xl font-sans">
            {user.userName}
          </div>
        </div>

        {/* Modal */}
        <div className="flex justify-center mt-[2rem]">
          <label
            htmlFor="my-modal"
            className="btn btn-outline btn-sm md:btn-wide"
          >
            Edit Profile
          </label>
        </div>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Your Profile</h3>
            <div>
              {/* Form Page */}
              <div>
                <form
                  className="bg-white sm:max-w-full max-w-md rounded overflow-hidden shadow-lg"
                >
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                            stroke="none"
                          ></rect>
                          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                          <circle cx="12" cy="13" r="3" />
                        </svg>
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
                        className="btn btn-sm md:btn-wide"
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
        </div>
      </div>
      <div className="w-[70%]">
        <div className="">
          {active ? (
            <PinRepo repos={repos.slice(0, 4)} />
          ) : (
            <AllRepo repos={repos} />
          )}
        </div>
        <div className="btm-nav w-[70%] left-auto">
          <button className={`${active ? "active" : ""}`} onClick={onPinClick}>
            <DocumentIcon />
            <span className="btm-nav-label">Popular Repositories</span>
          </button>
          <button className={`${active ? "" : "active"}`} onClick={onAllClick}>
            <CircularStack />
            <span className="btm-nav-label">All Repositories</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    // const res = await axios.get("some url");

    return {
      props: {
        user: {
          userName: "ArunJoseph3007",
          lastName: "Joseph",
          firstName: "Arun",
          email: "arunjoseph3007@gmail.com",
          photoUrl: "https://placeimg.com/200/200/people",
        },
        repos: [
          {
            name: "Git Repo 1",
            description: "A very nice repo awesome for everything",
            isPublic: true,
          },
          {
            name: "Git Repo 2",
            description: "A very nice repo awesome for everything",
            isPublic: false,
          },
          {
            name: "Non Git Repo 1",
            description: "A very nice repo awesome for everything",
            isPublic: true,
          },
          {
            name: "Git Repo 10",
            description: "A very nice repo awesome for everything",
            isPublic: false,
          },
          {
            name: "Git Repo 333",
            description: "A very nice repo awesome for everything",
            isPublic: false,
          },
          {
            name: "Git Repo 1111",
            description: "A very nice repo awesome for everything",
            isPublic: true,
          },
          {
            name: "Git Repo awesome",
            description: "A very nice repo awesome for everything",
            isPublic: true,
          },
        ],
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
