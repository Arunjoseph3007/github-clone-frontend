import React from "react";
import RepoAllElement from "./RepoAllElement";

function AllRepo() {
  return (
    <>
      <div className="flex justify-center m-5 ">
        <h3 className="font-serif text-2xl">All Repositories</h3>
      </div>
      <div className="overflow-y-scroll max-h-[80vh]">
        <RepoAllElement/>
        <RepoAllElement/>
        <RepoAllElement/>
        <RepoAllElement/>
        <RepoAllElement/>
      </div>
    </>
  );
}

export default AllRepo;
