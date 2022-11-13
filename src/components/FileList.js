import { FolderIcon } from "@/icons/folder";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import BreadCrumbs from "./BreadCrumbs";
import LanguageIcon from "./LanguageIcon";

export default function FileList({ data }) {
  const router = useRouter();
  const len = data.files.length + data.dirs.length;
  const dirLen = data.dirs.length;
  let { userName, repoName, branch } = router.query;
  branch = branch ?? "main";

  return (
    <>
      <BreadCrumbs />
      <div className="table w-full">
        {/* //? Directories */}
        {data.dirs.map((dir, i) => (
          <div
            className={`${
              i !== len - 1 && "border-b"
            } text-white border-gray-500 p-2 py-3 flex gap-4 w-full`}
            key={dir.objectId}
          >
            <span className="w-10">
              <FolderIcon />
            </span>
            <Link href={`/${userName}/${repoName}/tree/${branch}/${dir.name}`}>
              <a className="w-full md:w-[250px] max-w-[170px] text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">
                {dir.name.split("/").pop()}
              </a>
            </Link>
            <Link href={`/${userName}/${repoName}/commit/${dir.lastCommit}`}>
              <a
                data-tip={dir.author}
                className="w-full hidden md:block text-ellipsis overflow-hidden whitespace-nowrap text-sm text-gray-300 "
              >
                {dir.lastCommitMessage}
              </a>
            </Link>
            <p className="shrink-0 hidden md:block">
              {format(dir.lastCommitDate)}
            </p>
          </div>
        ))}

        {/* //? Files */}
        {data.files.map((file, i) => (
          <div
            className={`${
              dirLen + i !== len - 1 && "border-b"
            } text-white border-gray-500 p-2 py-3 flex gap-2 w-full`}
            key={file.objectId}
          >
            <span className="w-10">
              <LanguageIcon name={file.name} />
            </span>
            <Link href={`/${userName}/${repoName}/blob/${branch}/${file.name}`}>
              <a className="flex-1 md:w-[250px] w-[170px] dot-dot-dot cursor-pointer">
                {file.name.split("/").pop()}
              </a>
            </Link>
            <Link href={`/${userName}/${repoName}/commit/${file.lastCommit}`}>
              <a
                data-tip={file.author}
                className="flex-1 hidden md:block dot-dot-dot text-sm text-gray-300 "
              >
                {file.lastCommitMessage}
              </a>
            </Link>
            <p className="shrink-0 hidden md:block">
              {format(file.lastCommitDate)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
