import React from "react";
import RepoAllElement from "./RepoAllElement";

function AllRepo() {
  return (
    <>
      <div className="flex justify-center m-5">
        <h3 className="font-serif text-2xl underline">All Repositories</h3>
      
      </div>
      <div className="overflow-y-scroll max-h-[80vh]">
        <RepoAllElement
          RepoTitle={"GitBase"}
          RepoDescription={
            "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
          }
          RepoType={"Public"}
          Date={"12-02-2022"}
        />
        <RepoAllElement
          RepoTitle={"GitBase"}
          RepoDescription={
            "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
          }
          RepoType={"Public"}
          Date={"12-02-2022"}
        />
        <RepoAllElement
          RepoTitle={"GitBase"}
          RepoDescription={
            "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
          }
          RepoType={"Public"}
          Date={"12-02-2022"}
        />
        <RepoAllElement
          RepoTitle={"GitBase"}
          RepoDescription={
            "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
          }
          RepoType={"Public"}
          Date={"12-02-2022"}
        />
        <RepoAllElement
          RepoTitle={"GitBase"}
          RepoDescription={
            "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
          }
          RepoType={"Public"}
          Date={"12-02-2022"}
        />
        <RepoAllElement
          RepoTitle={"GitBase"}
          RepoDescription={
            "If a dog chews shoes whose shoes does he choose? Lorem ipsum dolor sit amet consectetur adipisici elit"
          }
          RepoType={"Public"}
          Date={"12-02-2022"}
        />
      </div>
    </>
  );
}

export default AllRepo;
