import { gitLs } from "@/utils/gitLs";
import { useRouter } from "next/router";
import FileList from "@/components/FileList";
import MainRepoLayout from "@/layouts/MainRepoLayout";

export default function TreePage({ data }) {
  const router = useRouter();

  return (
    <div>
      <div className="p-3 my-10 rounded-xl bg-neutral-focus w-full max-w-[1000px] mx-auto">
        <FileList data={data} />
      </div>
    </div>
  );
}

TreePage.getLayout = MainRepoLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;
  const filePath = ".";
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
