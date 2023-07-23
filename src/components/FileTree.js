import { DocumentIcon } from "@/icons/documents";
import { FolderIcon } from "@/icons/folder";
import { useState } from "react";

const SPACE = 20;

export default function FileTree({
  files,
  name = "root",
  depth = 0,
  prefix = "",
}) {
  const isFile = !!files?.file?.contents;
  const [show, setShow] = useState(false);

  if (isFile) {
    return (
      <div
        style={{ paddingLeft: depth * SPACE + 4 + "px" }}
        className="flex gap-2 items-center p-1 hover:bg-gray-200 cursor-pointer"
      >
        <DocumentIcon />{" "}
        <p>
          {name}
        </p>
      </div>
    );
  }
  const filesAndDirectories = Object.keys(files.directory);

  return (
    <div>
      <div
        onClick={() => setShow((s) => !s)}
        style={{ paddingLeft: depth * SPACE + 4 + "px" }}
        className="flex gap-2 items-center p-1 hover:bg-gray-200 cursor-pointer"
      >
        <FolderIcon /> <p>{name}</p>
      </div>
      <div className={show ? "block" : "hidden"}>
        {filesAndDirectories
          .filter((dir) => files.directory[dir].directory)
          .map((elm) => (
            <FileTree
              prefix={prefix + "/" + elm}
              key={elm}
              files={files.directory[elm]}
              depth={depth + 1}
              name={elm}
            />
          ))}
        {filesAndDirectories
          .filter((elm) => !files?.directory?.[elm]?.directory)
          .map((elm) => (
            <FileTree
              key={elm}
              prefix={prefix + "/" + elm}
              files={files.directory[elm]}
              depth={depth + 1}
              name={elm}
            />
          ))}
      </div>
    </div>
  );
}
