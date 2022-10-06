import { gitLs } from "@/utils/gitLs";
import FileList from "@/components/FileList";
import ReadmeViewer from "@/components/ReadmeViewer";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import RepoHeader from "@/components/RepoHeader";

export default function TreePage({ data }) {

  return (
    <div>
      <RepoHeader />
      <div className="p-3 m-10 rounded-xl bg-neutral-focus">
        <FileList data={data} />
      </div>
      <ReadmeViewer text={data.Readme} />
    </div>
  );
}

TreePage.getLayout = MainRepoLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const filePath = ".";
  const branch = "main";

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
