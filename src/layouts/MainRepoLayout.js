// @ Components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// @ cons
import { BranchIcon } from "@/icons/branch";
import { CodeIcon } from "@/icons/code";
import { CollaboratorsIcon } from "@/icons/collaborators";
import { CommitIcon } from "@/icons/commit";
import { GraphIcon } from "@/icons/graph";
import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import { PullRequestIcon } from "@/icons/pullrequest";
import { SettingsIcon } from "@/icons/settings";
import { StarIcon } from "@/icons/star";
// @ Utilities
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

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

            <div className="hidden md:flex items-center gap-5 py-3">
              <Link href={basePath + "fork"}>
                <button className="btn gap-2">
                  <BranchIcon />
                  <span>fork</span>
                </button>
              </Link>
              <button className="btn gap-2">
                <StarIcon />
                <span>star</span>
              </button>
            </div>
          </div>

          {/* //? Tabs */}
          <div className="tabs mt-4 border-b-4 overflow-y-scroll overflow-x-hidden whitespace-nowrap">
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
      </div>
      <Footer />
    </div>
  );
}
