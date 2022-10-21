import { UserIcon } from "@/icons/user";
import { syntaxHighlight } from "@/libs/highlight";
import Link from "next/link";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import BreadCrumbs from "@/components/BreadCrumbs";
import { PreviousIcon } from "@/icons/previous";

export default function FileBlamer({ fileName, extension, data }) {
  const { query, asPath, pathname } = useRouter();

  //$ For images
  if (["jpg", "png"].includes(extension)) {
    return (
      <div tabIndex="1" className="collapse text-white collapse-arrow p-0">
        <div className="px-4">
          <BreadCrumbs />
        </div>
        <input type="checkbox" className="peer" />
        <div className="font-mono bg-neutral-focus mt-2 p-5 font-semibold rounded-t-md collapse-title ">
          <h1>Content in {fileName} is not text</h1>
          View Raw
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mockup-code bg-neutral-focus [font-family:monospace_!important]">
        <div className="px-4 flex justify-between items-center pb-3">
          <BreadCrumbs />
          <Link href={asPath.replace("/blame/", "/blob/")}>
            <a className="btn">Normal view</a>
          </Link>
        </div>
        {data.map((line, i, arr) => {
          const displayContent = !i || line.commitId !== arr[i - 1].commitId;

          return (
            <div
              className={`flex gap-2 ${
                displayContent && "border-t"
              } border-gray-800`}
              key={i}
            >
              <div className="w-[25rem] p-1 pr-3 flex items-center gap-3 shrink-0 border-r border-gray-800 text-sm">
                {displayContent && (
                  <>
                    <Link href={`/${line.commiter}`}>
                      <a
                        data-tip={line.commiter}
                        className="text-gray-500 text-xs tooltip tooltip-right tooltip-primary"
                      >
                        <UserIcon />
                      </a>
                    </Link>
                    <Link
                      href={`/${query.userName}/${query.repoName}/commit/${line.commitId}`}
                    >
                      <a className="flex-1 text-sm dot-dot-dot">
                        {line.summary}
                      </a>
                    </Link>
                    <p className="text-gray-300 text-xs shrink-0">
                      {format(line.authorTime)}
                    </p>
                  </>
                )}
              </div>
              <div className="w-10 flex justify-center items-center shrink-0 border-r text-gray-500 hover:text-white border-gray-800">
                {displayContent && line.previous && (
                  <Link
                    href={{
                      pathname,
                      query: { ...query, branch: line.previous },
                    }}
                  >
                    <a data-tip="Previous" className="tooltip tooltip-bottom">
                      <PreviousIcon />
                    </a>
                  </Link>
                )}
              </div>
              <pre
                className="p-1 target:bg-gray-300 flex-1"
                id={"L" + i}
                data-prefix={i}
              >
                <code
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(line.content),
                  }}
                />
              </pre>
            </div>
          );
        })}
      </div>
    </>
  );
}
