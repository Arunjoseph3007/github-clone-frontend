import { BranchIcon } from "@/icons/branch";
import { RemoveUserIcon } from "@/icons/removeUser";
import { SearchIcon } from "@/icons/search";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

const DEFAULT_PULL_REQUESTS_DATA = [
  {
    id: 1,
    name: "Mene Changes kiye",
    userName: "bhavikshah2002",
    createdAt: "Tue Aug 2 18:13:25 2022 +0530",
    status: "open",
  },
  {
    id: 2,
    name: "Mene Changes kiye",
    userName: "bhavikshah2002",
    createdAt: "Tue Aug 2 18:13:25 2022 +0530",
    status: "closed",
  },
  {
    id: 3,
    name: "Mene Changes kiye",
    userName: "bhavikshah2002",
    status: "closed",
  },
  {
    id: 4,
    name: "Mene Changes kiye",
    userName: "bhavikshah2002",
    createdAt: "Thur Aug 4 18:13:25 2022 +0530",
    status: "closed",
  },
  {
    id: 5,
    name: "Mene Changes kiye",
    userName: "bhavikshah2002",
    createdAt: "Thur Aug 4 18:13:25 2022 +0530",
    status: "open",
  },
];

export default function PullRequestsPage() {
  const [pullRequests, setPullRequests] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    setPullRequests(DEFAULT_PULL_REQUESTS_DATA);
  }, []);

  return (
    <div>
      <div className="p-3 w-full max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl">Pull Requests</h1>
          <label className="btn btn-success gap-2 modal-button">
            <BranchIcon />
            <span>New pull requests</span>
          </label>
        </div>
        <hr />

        {/* //@ List of pull requests */}
        <div>
          <div className="input-group mt-4 w-[95%] mx-auto">
            <button className="btn btn-square">
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Search for Pull requests"
              className="input input-bordered w-full"
            />
          </div>
          {pullRequests.map((pullRequest, i) => (
            <div
              className="flex items-center gap-8 w-full justify-between my-2 py-2 border-b"
              key={i}
            >
              <input className="checkbox checkbox-xs" type="checkbox" />

              <div className="flex-1">
                <div className="flex items-center ">
                  <Link
                    href={`/${query.userName}/${query.repoName}/pull/${pullRequest.id}`}
                  >
                    <a className="font-semibold link link-hover">
                      {pullRequest.name}
                    </a>
                  </Link>
                  <div className="divider lg:divider-horizontal" />
                  <h3 className="text-sm text-gray-600">
                    {pullRequest.status}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <h3>
                    opened {format(pullRequest.createdAt)} by{" "}
                    {pullRequest.userName}
                  </h3>
                </div>
              </div>
              <button className="btn btn-error flex gap-2">
                <RemoveUserIcon />
                <span>remove</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

PullRequestsPage.getLayout = MainRepoLayout;
