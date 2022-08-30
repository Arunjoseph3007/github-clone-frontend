import { FolderIcon } from "@/icons/folder";
import Link from "next/link";
import { useRouter } from "next/router";
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
        {data.dirs.map((dir, i) => (
          <div
            className="border-b text-white border-gray-500 p-2 flex justify-around w-full"
            key={dir.objectId}
          >
            <p className="w-20">{i + 1}</p>
            <span className="w-20">
              <FolderIcon />
            </span>
            <Link href={`/${userName}/${repoName}/tree/${branch}/${dir.name}`}>
              <p className="w-1/2 cursor-pointer">
                {dir.name.split("/").pop()}
              </p>
            </Link>
            <p className="w-full">{dir.objectId}</p>
          </div>
        ))}
        {data.files.map((file, i) => (
          <div
            className="border-b text-white border-gray-500 p-2 flex justify-around w-full"
            key={file.objectId}
          >
            <p className="w-20">{i + 1 + dirLen}</p>
            <span className="w-20">
              <LanguageIcon name={file.name} />
            </span>
            <Link href={`/${userName}/${repoName}/blob/${branch}/${file.name}`}>
              <p className="w-1/2 cursor-pointer">
                {file.name.split("/").pop()}
              </p>
            </Link>
            <p className="w-full">{file.objectId}</p>
          </div>
        ))}
      </div>
    </>
  );
}
