import DiffSection from "@/components/DiffSection";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import { gitShowCommit } from "@/utils/gitShowCommit";
import { useRouter } from "next/router";
import { format } from "timeago.js";

export default function CommitPage({ data }) {
  const router = useRouter();

  return (
    <div>
      <div className="p-3 w-4/5 mx-auto">
        {/* //? Head Section */}
        <div className="bg-neutral-focus p-4 rounded-t-lg text-white">
          <h1 className="font-semibold text-xl mb-4">{data.message}</h1>
          <p>
            {data.authorName}{" "}
            <span className="font-thin">
              commited {format(data.authorDate)}
            </span>
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

CommitPage.getLayout = MainRepoLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const commitId = ctx.params.commitId;

  const { data, error } = gitShowCommit(pathName, commitId);

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
