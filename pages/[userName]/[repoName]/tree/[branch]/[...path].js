import FileList from "@/components/FileList";
import { gitLs } from "@/utils/gitLs";
import { useRouter } from "next/router";

export default function TreePage({ data }) {
  const router = useRouter();

  return (
    <div>
      <header className="p-3 text-xl">
        <h1>User name: {router.query.userName}</h1>
        <h1>Repo name: {router.query.repoName}</h1>
        <h1>Branch name: {router.query.branch}</h1>
      </header>
      <div className="p-3 bg-neutral-focus w-full max-w-[1000px] mx-auto">
        <FileList data={data} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const filePath = ctx.params["path"]?.join("/") || ".";
  const branch = ctx.params.branch;

  const { data, error } = gitLs(pathName, filePath, branch);

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
