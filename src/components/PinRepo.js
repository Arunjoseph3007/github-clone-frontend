import Link from "next/link";
import RepoCards from "./RepoCards";

function PinRepo({ repos }) {
  return (
    <>
      <div className="flex justify-center m-5">
        <h3 className="font-serif text-2xl underline">Popular Repositories</h3>
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
