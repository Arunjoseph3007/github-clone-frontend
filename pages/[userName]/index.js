import AllRepo from "@/components/AllRepo";
import PinRepo from "@/components/PinRepo";
import CircularStack from "@/icons/CircularStack";
import { DocumentIcon } from "@/icons/documents";
import Link from "next/link";
import { useState } from "react";

export default function UserPage({ user, repos = [] }) {
  const [active, setActive] = useState(true);

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
