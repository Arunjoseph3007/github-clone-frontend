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
            className="border-b text-white border-gray-500 p-2 flex justify-between w-full"
            key={dir.objectId}
          >
            <span className="w-10">
              <FolderIcon />
            </span>
            <div className="flex items-center flex-1">
              <Link
                href={`/${userName}/${repoName}/tree/${branch}/${dir.name}`}
              >
                <a className="w-1/3 cursor-pointer">
                  {dir.name.split("/").pop()}
                </a>
              </Link>
              <Link href={`/${userName}/${repoName}/commit/${dir.lastCommit}`}>
                <a
                  data-tip={dir.author}
                  className="w-2/3 text-sm text-gray-300 "
                >
                  {dir.lastCommitMessage}
                </a>
              </Link>
            </div>
            <p>{format(dir.lastCommitDate)}</p>
          </div>
        ))}

        {/* //? Files */}
        {data.files.map((file, i) => (
          <div
            className="border-b text-white border-gray-500 p-2 flex justify-between w-full"
            key={file.objectId}
          >
            <span className="w-10">
              <LanguageIcon name={file.name} />
            </span>
            <div className="flex items-center flex-1">
              <Link
                href={`/${userName}/${repoName}/blob/${branch}/${file.name}`}
              >
                <a className="w-1/3 cursor-pointer">
                  {file.name.split("/").pop()}
                </a>
              </Link>
              <Link href={`/${userName}/${repoName}/commit/${file.lastCommit}`}>
                <a
                  data-tip={file.author}
                  className="w-2/3 text-sm text-gray-300 "
                >
                  {file.lastCommitMessage}
                </a>
              </Link>
            </div>
            <p>{format(file.lastCommitDate)}</p>
          </div>
        ))}
      </div>
    </>
  );
}
