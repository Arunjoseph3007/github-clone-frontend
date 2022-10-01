import { BranchIcon } from "@/icons/branch";
import { CodeIcon } from "@/icons/code";
import { CommandLineIcon } from "@/icons/commandLins";
import { CopyIcon } from "@/icons/copy";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RepoHeader() {
  const { query, asPath } = useRouter();
  const [branches, setBranches] = useState([]);
  const basePath = `/${query.userName}/${query.repoName}/`;

  useEffect(() => {
    axios.post("/api/hello", query).then((res) => setBranches(res.data));
  }, []);

  return (
    <div className="flex items-center justify-between px-4">
      {/* //@ Branches */}
      <div className="flex gap-2 items-center">
        {/* //@ Dropdown */}
        <div className="dropdown">
          <label tabIndex="0" className="btn gap-2 m-1">
            <BranchIcon />
            <span>Branch</span>
          </label>
          <div
            tabIndex="0"
            className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-[20rem]"
          >
            <h1 className="font-semibold p-2">Switch Branches</h1>
            <hr />
            <ul>
              {branches.map((branch) => (
                <Link href={`${basePath}tree/${branch.name}`} key={branch.name}>
                  <li>
                    <a>{branch.name}</a>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <Link href={`${basePath}branches`}>
          <a className="flex gap-2 items-center">
            <BranchIcon />
            {branches.length}
            <span className="text-secondary">branches</span>
          </a>
        </Link>
      </div>

      {/* //@ Copy link */}
      <div>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-success gap-2 m-1">
            <CodeIcon />
            <span>Code</span>
          </label>
          <div
            tabIndex="0"
            className="dropdown-content menu p-2 shadow-xl border bg-base-100 rounded-box w-auto"
          >
            <div className="flex gap-2 items-center my-2">
              <CommandLineIcon />
              <h1 className="font-semibold p-2">Clone this repo</h1>
            </div>

            <hr />
            <h1 className="font-bold text-xl my-3">HTTP</h1>
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  value={`http://gitbase.com${basePath.slice(0, -1)}.git`}
                  readOnly
                  className="input input-bordered max-w-md"
                />
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `http://gitbase.com${basePath.slice(0, -1)}.git`
                    )
                  }
                  className="btn btn-square"
                >
                  <CopyIcon />
                </button>
              </div>
            </div>

            <form
              action={`/api/${query.userName}/${query.repoName}/zip`}
              method="get"
            >
              <button type="submit" className="btn w-full mt-2">
                Download zip
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const findUnique = (elm, index, arr) =>
  arr.findIndex((a) => a.objectId === elm.objectId) === index;
