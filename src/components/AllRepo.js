import React from "react";
import RepoAllElement from "./RepoAllElement";

function AllRepo({ repos }) {
  return (
    <>
      <div className="flex justify-center m-5">
        <h3 className="font-serif text-2xl underline">All Repositories</h3>
      </div>
      <div className="overflow-y-scroll max-h-[80vh]">
        {repos.map((repo) => (
          <RepoAllElement
            key={repo.name}
            repoTitle={repo.name}
            repoDescription={repo.description}
            isPublic={repo.isPublic}
            createdAt={"12/02/2022"}
          />
        ))}
      </div>
    </>
  );
}

export default AllRepo;
