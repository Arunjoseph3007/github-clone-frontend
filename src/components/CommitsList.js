import { CodeIcon } from "@/icons/code";
import { CopyIcon } from "@/icons/copy";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "timeago.js";

export default function CommitsList({ data }) {
  const len = data.length;
  const { query } = useRouter();

  return (
    <div className="table w-full">
      {data.map((commit, i) => {
        return (
          <div
            className="border border-gray-500 p-2 my-2 rounded-md flex justify-betwwen items-center w-full "
            key={commit.objectId}
          >
            <div className="w-2/3">
              <p className="cursor-pointer mb-1 text-xl font-semibold">
                {commit.message}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-sm">{commit.authorName}</p>
                <p className="text-sm font-thin">
                  commited {format(commit.date)}
                </p>
              </div>
            </div>
            <div className="btn-group">
              <button
                className="btn tooltip tooltip-bottom"
                data-tip="copy full SHA code"
              >
                <CopyIcon />
              </button>
              <Link
                href={`/${query.userName}/${query.repoName}/commit/${commit.objectId}/`}
              >
                <button
                  className="tooltip tooltip-bottom btn border-x-4"
                  data-tip="View Details of the Commit"
                >
                  {commit.objectId.slice(0, 6)}
                </button>
              </Link>
              <Link
                href={`/${query.userName}/${query.repoName}/tree/${commit.objectId}/`}
              >
                <button
                  data-tip="Browse repo at this point in history"
                  className="tooltip tooltip-bottom tooltip-primary btn"
                >
                  <CodeIcon />
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
