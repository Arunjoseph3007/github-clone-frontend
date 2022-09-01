import { BranchIcon } from "@/icons/branch";
import { CodeIcon } from "@/icons/code";
import { CommitIcon } from "@/icons/commit";
import { GraphIcon } from "@/icons/graph";
import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import { SettingsIcon } from "@/icons/settings";

import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function MainRepoLayout(page) {
  const [isPublic, setIsPublic] = useState(true);
  const { query, asPath } = useRouter();
  const basePath = `/${query.userName}/${query.repoName}/`;

  const getActiveTab = (path) => {
    if (path.includes(basePath + "branches")) return "branches";
    if (path.includes(basePath + "commits/")) return "commits";
    if (path.includes(basePath + "settings")) return "settings";
    if (path.includes(basePath + "graph")) return "graph";
    return "home";
  };

  const activeTab = useMemo(() => {
    return getActiveTab(asPath);
  }, [asPath, basePath]);

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
        </section>
        {page}
      </div>
    </div>
  );
}
