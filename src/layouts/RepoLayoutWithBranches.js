import { BranchIcon } from "@/icons/branch";
import { CodeIcon } from "@/icons/code";
import { CommandLineIcon } from "@/icons/commandLins";
import { CommitIcon } from "@/icons/commit";
import { CopyIcon } from "@/icons/copy";
import { GraphIcon } from "@/icons/graph";
import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import { SettingsIcon } from "@/icons/settings";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function RepoLayoutWithBranches(page) {
  const [isPublic, setIsPublic] = useState(true);
  const { query, asPath } = useRouter();
  const [branches, setBranches] = useState([]);
  const basePath = `/${query.userName}/${query.repoName}/`;

  const getActiveTab = () => {
    if (asPath.includes(basePath + "branches")) return "branches";
    if (asPath.includes(basePath + "commits/")) return "commits";
    if (asPath.includes(basePath + "settings")) return "settings";
    if (asPath.includes(basePath + "graph")) return "graph";
    return "home";
  };

  const activeTab = useMemo(() => getActiveTab(), [asPath]);

  useEffect(() => {
    axios.post("/api/hello", query).then((res) => setBranches(res.data));
  }, []);

  return (
    <div>
      <div>
        <section className="p-4">
          {/* //? Title section */}
          <div className="flex items-center gap-5">
            {isPublic ? <PublicIcon /> : <LockIcon />}
            <h1 className="text-2xl text-blue-500">
              <Link href={`/${query.userName}`}>{query.userName}</Link>
              <span> / </span>
              <Link href={basePath}>{query.repoName}</Link>
            </h1>
            <span className="badge">{isPublic ? "Public" : "Private"}</span>
          </div>

          {/* //? Tabs */}
          <div className="tabs mt-4 border-b-4">
            <Link href={basePath}>
              <a
                className={`tab gap-2 px-4 text-xl ${
                  activeTab === "home" && "tab-active"
                }`}
              >
                <CodeIcon />
                <span>Code</span>
              </a>
            </Link>
            <Link href={basePath + "branches"}>
              <a
                className={`tab gap-2 px-4 text-xl ${
                  activeTab === "branches" && "tab-active"
                }`}
              >
                <BranchIcon />
                <span>Branches</span>
              </a>
            </Link>
            <Link href={basePath + "commits/main"}>
              <a
                className={`tab gap-2 px-4 text-xl ${
                  activeTab === "commits" && "tab-active"
                }`}
              >
                <CommitIcon />
                <span>Commits</span>
              </a>
            </Link>
            <Link href={basePath + "graph"}>
              <a
                className={`tab gap-2 px-4 text-xl ${
                  activeTab === "graph" && "tab-active"
                }`}
              >
                <GraphIcon />
                <span>Graph</span>
              </a>
            </Link>
            <Link href={basePath + "settings"}>
              <a
                className={`tab gap-2 px-4 text-xl ${
                  activeTab === "settings" && "tab-active"
                }`}
              >
                <SettingsIcon />
                <span>Settings</span>
              </a>
            </Link>
          </div>

          {/* //? Other section */}
          <div className="flex items-center justify-between py-4">
            {/* //@ Branches */}
            <div className="flex gap-2 items-center">
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
                      <Link
                        href={`${basePath}tree/${branch.name}`}
                        key={branch.objectId}
                      >
                        <li>
                          <a>{branch.name}</a>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
              <h1 className="flex gap-2 items-center">
                <BranchIcon />
                {branches.length}
                <span className="text-secondary">branches</span>
              </h1>
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
                  className="dropdown-content menu p-2 shadow-xl border bg-base-100 rounded-box w-[20rem]"
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
                        className="input input-bordered"
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
                </div>
              </div>
            </div>
          </div>
        </section>
        {page}
      </div>
    </div>
  );
}
