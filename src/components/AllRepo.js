import Link from "next/link";
import React from "react";
import RepoAllElement from "./RepoAllElement";

function AllRepo({ repos }) {
  return (
    <>
      <div className="flex justify-center m-5">
        <h3 className="font-serif text-2xl underline">All Repositories</h3>
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
      <div className="overflow-y-scroll max-h-[80vh]">
        {repos.map((repo) => (
          <RepoAllElement
            key={repo.name}
            repoTitle={repo.name}
            repoDescription={repo.description}
            isPublic={repo.isPublic}
            createdAt={repo.createdAt}
          />
        ))}
      </div>
    </>
  );
}

export default AllRepo;
