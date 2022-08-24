import CommitsList from "@/components/CommitsList";
import { gitLogBranch } from "@/utils/gitLogBranch";
import { useRouter } from "next/router";

export default function CommitsPage({ data }) {
  const router = useRouter();

  return (
    <div>
      <header className="p-7 text-xl">
        <h1>User name: {router.query.userName}</h1>
        <h1>Repo name: {router.query.repoName}</h1>
        <h1>Branch name: {router.query.branch}</h1>
      </header>
      <div className="p-3 w-4/5 mx-auto">
        <CommitsList data={data} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const branch = ctx.params.branch;

  const { data, error } = gitLogBranch(pathName, branch);

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
