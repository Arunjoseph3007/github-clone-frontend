// @ Components
import Footer from "@/components/Footer";
import ForkStar from "@/components/ForkStar";
import Navbar from "@/components/Navbar";
// @ cons
import { BranchIcon } from "@/icons/branch";
import { CodeIcon } from "@/icons/code";
import { CollaboratorsIcon } from "@/icons/collaborators";
import { CommitIcon } from "@/icons/commit";
import { GraphIcon } from "@/icons/graph";
import { LaunchIcon } from "@/icons/launch";
import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import { PullRequestIcon } from "@/icons/pullrequest";
import { SettingsIcon } from "@/icons/settings";

import axios from "@/libs/axios";
// @ Utilities
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

// $ Array of tabs
const PAGES = [
  { title: "home", icon: <CodeIcon />, link: "" },
  { title: "branches", icon: <BranchIcon />, link: "branches" },
  { title: "Pull requests", icon: <PullRequestIcon />, link: "pulls" },
  { title: "commits", icon: <CommitIcon />, link: "commits/main" },
  { title: "graph", icon: <GraphIcon />, link: "graph" },
  {
    title: "collaborators",
    icon: <CollaboratorsIcon />,
    link: "collaborators",
  },
  { title: "settings", icon: <SettingsIcon />, link: "settings" },
];

// & UI
export default function MainRepoLayout(page) {
  const [isPublic, setIsPublic] = useState(true);
  const [isStar, setIsStar] = useState(false);
  const [show, setShow] = useState(true);
  const { query, asPath } = useRouter();
  const basePath = `/${query.userName}/${query.repoName}/`;
  const getActiveTab = (path) => {
    if (path.includes(basePath + "branches")) return "branches";
    if (path.includes(basePath + "collaborators")) return "collaborators";
    if (path.includes(basePath + "commits/")) return "commits";
    if (path.includes(basePath + "settings")) return "settings";
    if (path.includes(basePath + "pull")) return "Pull requests";
    if (path.includes(basePath + "graph")) return "graph";
    return "home";
  };

  // Star Post
  async function Star_Repo() {
    const userName = query.userName;
    const repoName = query.repoName;

    if (!isStar) {
      const res = await axios.post(
        `/main/star-repo/?user_name=${userName}&repo_name=${repoName}`
      );
    } else {
      const res = await axios.delete(
        `/main/star-repo-detail/?user_name=${userName}&repo_name=${repoName}`
      );
    }
    getDetails();
  }

  // Is Starred?
  async function getDetails() {
    const userName = query.userName;
    const repoName = query.repoName;
    const res = await axios.get(
      `/main/star-repo-detail/?user_name=${userName}&repo_name=${repoName}`
    );
    // if (res.data.is_starred)
    setIsStar(res.data?.is_starred ? true : false);
    setIsPublic(res.data.is_public);
    setShow(localStorage.getItem("token") ? true : false);
  }
  useEffect(() => {
    getDetails();
  }, []);

  const activeTab = useMemo(() => {
    return getActiveTab(asPath);
  }, [asPath, basePath]);

  return (
    <div>
      <Navbar />
      <div>
        <section className="p-4">
          {/* //? Title section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {isPublic ? <PublicIcon /> : <LockIcon />}
              <h1 className="text-lg md:text-2xl text-blue-500 dot-dot-dot">
                <Link href={`/${query.userName}`}>{query.userName}</Link>
                <span>/</span>
                <Link href={basePath}>{query.repoName}</Link>
              </h1>
              <span className="badge">{isPublic ? "Public" : "Private"}</span>
            </div>

            <ForkStar
              basePath={basePath}
              isStar={isStar}
              Star_Repo={Star_Repo}
            />
          </div>
          {/* //? Tabs */}
          <div className="tabs mt-4 border-b-4 overflow-y-scroll overflow-x-hidden  whitespace-nowrap">
            {PAGES.map(({ icon: PageIcon, ...page }) => (
              <Link href={basePath + page.link} key={page.title}>
                <a
                  className={`tab gap-2 px-4 text-lg ${
                    activeTab.toUpperCase() === page.title.toUpperCase() &&
                    "tab-active"
                  }`}
                >
                  <span className="scale-75">{PageIcon}</span>
                  <span className="capitalize">{page.title}</span>
                </a>
              </Link>
            ))}
          </div>
        </section>
        {page}

        <Link
          href={`/${query.userName}/${query.repoName}/launch/${
            query.branch || query.commitId || "main"
          }`}
        >
          <a
            data-tip="LAUNCH"
            className="fixed bg-gray-200 bottom-5 right-5 p-3 shadow-[0px_6px_8px_#00000055] rounded-full tooltip tooltip-success tooltip-left before:font-bold before:text-white"
          >
            <LaunchIcon />
          </a>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
