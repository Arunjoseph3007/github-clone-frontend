import { gitLs } from "@/utils/gitLs";
import { gitCheckEmpty } from "@/utils/gitCheckEmpty";
import FileList from "@/components/FileList";
import ReadmeViewer from "@/components/ReadmeViewer";
import RepoHeader from "@/components/RepoHeader";
import EmptyRepo from "@/components/EmptyRepo";
import MainRepoLayout from "@/layouts/MainRepoLayout";

export default function TreePage({ data, isEmpty }) {
  if (isEmpty) return <EmptyRepo />;

  return (
    <div>
      <RepoHeader />
      <div className="p-3 m-5 lg:m-10 rounded-xl bg-neutral-focus">
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
    const isEmpty = gitCheckEmpty(pathName);
    if (isEmpty) return { props: { data: null, isEmpty } };

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
