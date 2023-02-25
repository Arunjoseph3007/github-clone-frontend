import Link from "next/link";
import RepoCards from "./RepoCards";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContext";
import PinnedRepoModal from "./PinnedRepoModal";

function PinRepo({ repos }) {
  const { query } = useRouter();
  const { user: myUser } = useUser();
  return (
    <>
      <div className="flex justify-between m-5">
        {myUser?.userName === query.userName && (
          <>
            <div className="">
              <label
                htmlFor="my-modal"
                className="text-transparent no-underline hover:underline"
              >
                Customize your pins
              </label>
            </div>
          </>
        )}

        <h3 className="font-serif text-2xl underline">Popular Repositories</h3>

        {/* //@ Edit profile btn */}
        {myUser?.userName === query.userName && (
          <>
            <div className="flex items-baseline">
              <label
                htmlFor="my-modal2"
                className="no-underline hover:cursor-pointer hover:underline"
              >
                Customize your pins
              </label>
            </div>
            <input type="checkbox" id="my-modal2" className="modal-toggle" />
            <div className="modal">
              <PinnedRepoModal />
            </div>
          </>
        )}
      </div>
      {repos.length === 0 && (
        <div className="w-full flex flex-col items-center gap-2 mt-2">
          <h1 className="text-2xl font-semibold">
            You haven&apos;t created any repos yet.
          </h1>
          <Link href="/new">
            <a className="btn">Create new repo here</a>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        {repos ? (
          repos.map((repo) => {
            return (
              <div key={repo.name} className=" flex justify-center">
                <RepoCards
                  repoTitle={repo.name}
                  repoDescription={repo.description}
                  isPublic={repo.ispublic}
                  createdAt={repo.createdAt}
                />
              </div>
            );
          })
        ) : (
          <div className=" flex justify-center"></div>
        )}
      </div>
    </>
  );
}

export default PinRepo;
