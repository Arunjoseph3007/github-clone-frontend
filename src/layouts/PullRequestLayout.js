import { PullRequestIcon } from "@/icons/pullrequest";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import MainRepoLayout from "./MainRepoLayout";

function Layout(page) {
  const { query, asPath } = useRouter();
  const baseUrl = `/${query.userName}/${query.repoName}/pull/${query.pullRequest}/`;

  const getActiveTab = (path) => {
    if (path.endsWith("files")) return "files";
    if (path.endsWith("files/")) return "files";
    if (path.endsWith("commits")) return "commits";
    if (path.endsWith("commits/")) return "commits";
    return "home";
  };

  const activeTab = useMemo(() => {
    return getActiveTab(asPath);
  }, [asPath]);

  return (
    <div className="px-3 mx-auto">
      <div className="flex justify-between items-center ">
        <h3 className="font-semibold text-3xl m-2 flex items-center gap-7">
          <span className="text-green-500 scale-150">
            <PullRequestIcon />
          </span>
          <span>Pull Request</span>
          <span className="font-light text-gray-600 ">
            # {query.pullRequest}
          </span>
        </h3>
        <div className="tabs">
          <Link href={baseUrl}>
            <a className={`tab ${activeTab === "home" && "tab-active"}`}>
              Home
            </a>
          </Link>
          <div className="divider divider-horizontal" />
          <Link href={baseUrl + "files"}>
            <a className={`tab ${activeTab === "files" && "tab-active"}`}>
              Files
            </a>
          </Link>
          <div className="divider divider-horizontal" />
          <Link href={baseUrl + "/commits"}>
            <a className={`tab ${activeTab === "commits" && "tab-active"}`}>
              Commits
            </a>
          </Link>
        </div>
      </div>

      <div className="divider" />
      {page}
    </div>
  );
}

export default function PullRequestLayout(page) {
  return MainRepoLayout(Layout(page));
}
