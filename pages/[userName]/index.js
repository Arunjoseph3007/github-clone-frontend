// @ Components
import AllRepo from "@/components/AllRepo";
import PinRepo from "@/components/PinRepo";
import EditProfileModal from "@/components/EditProfileModal";
import Navbar from "@/components/Navbar";
// @ Icons
import CircularStack from "@/icons/CircularStack";
import { DocumentIcon } from "@/icons/documents";

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";

export default function UserPage({ repos = [], user }) {
  const [active, setActive] = useState(true);
  const { query } = useRouter();
  const { user: myUser } = useUser();
  const isLogedin = myUser?.userName==user.userName;
  function onPinClick() {
    setActive(true);
  }
  function onAllClick() {
    setActive(false);
  }

  return (
    <div className="md:h-screen flex flex-col">
      <div >
        <Navbar />
      </div>

      <div className="bg-base-200 flex flex-1 flex-col md:flex-row">
        {/* //? SIDE-BAR */}
        <div className="md:w-[30%] bg-white  pb-5">
          <div className="flex justify-center mt-[2rem]">
            {/* //@ Create repo btn */}
            {myUser?.userName === query.userName && (
              <Link href="/new">
                <a className="btn btn-sm md:btn-wide">Create New Repository</a>
              </Link>
            )}
          </div>

          {/* //@ User details */}
          <div className="avatar flex justify-center mt-[2rem]">
            <div className="w-[15rem] rounded-full overflow-hidden shadow-xl border border-base-300 ">
              <img
                className="overflow-hidden opacity-90 "
                src={isLogedin?myUser.photoUrl:user.photoUrl}
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex justify-center text-4xl font-serif">
              {isLogedin?myUser.firstName:user.firstName} {isLogedin?myUser.lastName:user.lastName}
            </div>
            <div className="flex justify-center text-xl font-sans">
              {user.userName}
            </div>
          </div>

          {/* //@ Edit profile btn */}
          {myUser?.userName === query.userName && (
            <>
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
                <EditProfileModal />
              </div>
            </>
          )}
        </div>

        {/* //? MAIN WINDOW  (Right) */}
        <div className="md:w-[70%] flex flex-col flex-1 mb-[7rem] px-2">
          <div className="flex-1">
            {active ? (
              <PinRepo repos={repos.filter((r)=>r.is_pinned)} allRepos={repos} />
            ) : (
              <AllRepo repos={repos} />
            )}
          </div>

          {/* //@ Bottom tabs */}
          <div className="btm-nav md:w-[70%] left-auto">
            <button
              className={`${active ? "active" : ""}`}
              onClick={onPinClick}
            >
              <DocumentIcon />
              <span className="btm-nav-label">Popular Repositories</span>
            </button>
            <button
              className={`${active ? "" : "active"}`}
              onClick={onAllClick}
            >
              <CircularStack />
              <span className="btm-nav-label">All Repositories</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const userName = ctx.params.userName;
    const repoRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/main/getuserrepos?username=${userName}`
    );

    if (!repoRes.data.UserDetails) return { notFound: true };

    const repos = repoRes.data.RepoDetails.map((repo) => ({
      name: repo.repo_name,
      id: repo.repo_id,
      isPublic: repo.is_public,
      createdAt: repo.date_of_creation,
      is_pinned: repo.is_pinned,
      is_forked: repo.is_forked,
    }));
    const user = repoRes.data.UserDetails;

    return {
      props: {
        repos: repos,
        user: {
          userName: user.username,
          lastName: user.last_name,
          firstName: user.first_name,
          email: user.email,
          photoUrl: process.env.NEXT_PUBLIC_API + user.profile_pic,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
