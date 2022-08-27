import { gitShowBranches } from "@/utils/gitShowBranches";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BranchesPage({ data }) {
  const router = useRouter();
  const len = data.length;

  return (
    <div>
      <header className="p-3 text-xl">
        <h1>User name: {router.query.userName}</h1>
        <h1>Repo name: {router.query.repoName}</h1>
      </header>
      <div className="p-3 my-10 rounded-xl bg-neutral-focus w-full max-w-[1000px] mx-auto">
        {data.map((branch, i) => (
          <div
            style={{ color: `hsl(${(360 * i) / len},50%,50%)` }}
            className="flex justify-between border-b border-gray-500 p-2 "
            key={branch.objectId}
          >
            <Link
              href={`/${router.query.userName}/${router.query.repoName}/tree/${branch.name}`}
            >
              <h1 className="w-1/3 cursor-pointer">{branch.name}</h1>
            </Link>
            <h1 className="w-1/3">{branch.objectId}</h1>
            <h1 className="w-1/3">{branch.commit}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;

  const { data, error } = gitShowBranches(pathName);

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
