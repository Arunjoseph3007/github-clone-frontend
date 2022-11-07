import Link from "next/link";
import React from "react";
import SearchRepoElement from "./SearchRepoElement";

function SearchRepo({ repos, heading }) {
  return (
    <>
      <div className="flex justify-center m-5">
        <h3 className="font-serif text-2xl underline">{heading}</h3>
      </div>
      {repos.length === 0 && (
        <div className="w-full flex flex-col items-center gap-2 mt-2">
          <h1 className="text-2xl font-semibold">
            Sorry! No Such Result Found.
          </h1>
          <div>Try Creating New Repo</div>
          <Link href="/new">
            <a className="btn">Create new repo here</a>
          </Link>
        </div>
      )}
      <div>
        {repos.map((repo) => (
          <SearchRepoElement
            key={repo.name}
            repoTitle={repo.name}
            username={repo.username}
            repoDescription={repo.description}
            createdAt={repo.createdAt}
          />
        ))}
      </div>
    </>
  );
}

export default SearchRepo;
