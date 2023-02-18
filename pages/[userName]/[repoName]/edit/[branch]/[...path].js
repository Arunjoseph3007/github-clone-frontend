import FileEditor from "@/components/FileEditor";
import RepoHeader from "@/components/RepoHeader";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import { gitShow } from "@/utils/gitShow";

export default function EditPage({ data, fileName }) {
  return (
    <div>
      <RepoHeader />
      <div className="p-3 m-5 lg:m-10 bg-neutral-focus">
        <FileEditor data={data} fileName={fileName} />
      </div>
    </div>
  );
}

EditPage.getLayout = MainRepoLayout;

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
