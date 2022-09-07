import DiffSection from "@/components/DiffSection";
import { gitCompareRepos } from "@/utils/gitCompareRepos";
import PullRequestLayout from "@/layouts/PullRequestLayout";
import { useRouter } from "next/router";
import { format } from "timeago.js";

export default function PullRequestFilesPage({ data }) {
  const { query } = useRouter();

  return (
    <div>
      <div className="p-3 w-4/5 mx-auto">
        {/* //? Head Section */}
        <div className="bg-neutral-focus p-4 rounded-t-lg text-white">
          <h1 className="font-semibold text-xl mb-4">{data.message}</h1>
          <p>
            {data.authorName}{" "}
            <span className="font-thin">commited {format(data.createdAt)}</span>
          </p>
        </div>

        {/* //? Diff Section */}
        {data.body
          .split("\ndiff --git")
          .filter((a) => a)
          .map((section, i) => (
            <DiffSection section={section} key={i} />
          ))}
      </div>
    </div>
  );
}

PullRequestFilesPage.getLayout = PullRequestLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const pullRequest = ctx.params.pullRequest;

  const { data, error } = gitCompareRepos(pathName, "arun/cello-draw");

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
