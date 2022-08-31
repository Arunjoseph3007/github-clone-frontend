import CommitsList from "@/components/CommitsList";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import { gitLogBranch } from "@/utils/gitLogBranch";
import { useRouter } from "next/router";

export default function CommitsPage({ data }) {
  const router = useRouter();

  return (
    <div>
      <div className="p-3 w-4/5 mx-auto">
        <CommitsList data={data} />
      </div>
    </div>
  );
}

CommitsPage.getLayout=MainRepoLayout

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
