import Link from "next/link";
import React, { useState } from "react";
import SearchRepoElement from "./SearchRepoElement";

function SearchRepo({ repos, heading,pageDetails }) {
  const [pagination, setPagination] = useState(pageDetails);
  function forwardClick(params) {
    setPagination({ ...pagination, curPage: pagination.curPage + 1 });
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }
  function backwardClick(params) {
    setPagination({ ...pagination, curPage: pagination.curPage - 1 });
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }

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
        {repos
          .slice(
            pagination.curPage * pagination.repoLimit,
            pagination.curPage * pagination.repoLimit + pagination.repoLimit
          )
          .map((repo) => (
            <SearchRepoElement
              key={repo.username+'/'+repo.name}
              repoTitle={repo.name}
              username={repo.username}
              repoDescription={repo.description}
              createdAt={repo.createdAt}
            />
          ))}
      </div>
      <div className="flex  flex-row self-center justify-center ">
        <div className="btn-group ">
          <button className={`btn ${(pagination.curPage==0)?"btn-disabled bg-[#181a2a] text-white":""}`} onClick={backwardClick}>
            «
          </button>
          <button className="btn md:btn-wide"> {pagination.curPage + 1}/{pagination.noPages+1}</button>
          <button className={`btn ${(pagination.curPage==pagination.noPages)?"btn-disabled bg-[#181a2a] text-white":""}`} onClick={forwardClick}>
            »
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchRepo;
