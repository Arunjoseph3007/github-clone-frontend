import FileViewer from "@/components/FileViewer";
import { gitShow } from "@/utils/gitShow";
import { useRouter } from "next/router";

export default function BlobPage({ data, fileName }) {
  const router = useRouter();

  const extenstion = fileName.split(".").pop();

  return (
    <div>
      <header className="p-3 text-xl">
        <h1>User name: {router.query.userName}</h1>
        <h1>Repo name: {router.query.repoName}</h1>
        <h1>Branch name: {router.query.branch}</h1>
        <h1>file name: {fileName}</h1>
      </header>
      <div className="p-3 w-full max-w-[1000px] mx-auto">
        <FileViewer data={data} fileName={fileName} extension={extenstion} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const filePath = ctx.params["path"].join("/");
  const branch = ctx.params.branch;

  const { data, error } = gitShow(pathName, filePath, branch);

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      fileName: ctx.params["path"].pop(),
    },
  };
};
