import DiffSection from "@/components/DiffSection";
import { gitShowCommit } from "@/utils/gitShowCommit";
import { useRouter } from "next/router";
import { format } from "timeago.js";

export default function CommitPage({ data }) {
  const router = useRouter();

  return (
    <div>
      <header className="p-7 text-xl">
        <h1>User name: {router.query.userName}</h1>
        <h1>Repo name: {router.query.repoName}</h1>
        <h1>Commit Id name: {router.query.commitId}</h1>
      </header>
      <div className="p-3 w-4/5 mx-auto">
        {/* //? Head Section */}
        <div className="bg-neutral-focus p-4 rounded-t-lg">
          <h1 className="font-semibold text-xl mb-4">{data.message}</h1>
          <p>
            {data.authorName}{" "}
            <span className="font-thin">
              commited {format(data.authordate)}
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
