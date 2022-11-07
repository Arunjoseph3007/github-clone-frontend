// @ Components
import AllRepo from "@/components/AllRepo";
import PinRepo from "@/components/PinRepo";
import EditProfileModal from "@/components/EditProfileModal";
// @ Icons
import CircularStack from "@/icons/CircularStack";
import { DocumentIcon } from "@/icons/documents";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";

export default function UserPage({ repos = [], user }) {
  const [active, setActive] = useState(true);
  const { query } = useRouter();
  const { user: myUser } = useUser();

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
    const userName = ctx.params.userName;
    const repoRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/main/getuserrepos?username=${userName}`
    );

    const repos = repoRes.data.map((repo) => ({
      name: repo.repo_name,
      id: repo.repo_id,
      isPublic: repo.is_public,
      createdAt: repo.date_of_creation,
    }));

    return {
      props: {
        repos: repos,
        user: {
          userName: "ArunJoseph3007",
          lastName: "Joseph",
          firstName: "Arun",
          email: "arunjoseph3007@gmail.com",
          photoUrl: "https://placeimg.com/200/200/people",
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
