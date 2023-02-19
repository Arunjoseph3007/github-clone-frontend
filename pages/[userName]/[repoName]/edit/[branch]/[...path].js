import CommitForm from "@/components/CommitForm";
import FileEditor from "@/components/FileEditor";
import RepoHeader from "@/components/RepoHeader";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import { gitShow } from "@/utils/gitShow";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function EditPage({ data, fileName }) {
  const [commitMsg, setCommitMsg] = useState("");
  const [content, setContent] = useState(data);
  const router = useRouter();
  const filePath = router.asPath.split("/").slice(5).join("/");
  const branch = router.query.branch;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `/api/${router.query.userName}/${router.query.repoName}/edit`,
        { content, commitMsg, filePath, branch }
      );

      if (res.status == 200) {
        toast.success("Commited successfully");
        router.push(router.asPath.replace("/edit/", "/blob/"));
      }
    } catch (error) {
      console.log(error);
      toast.error("Couldn`t Commit chnages");
    }
  };

  return (
    <div>
      <RepoHeader />
      <div className="p-3 m-5 lg:m-10 bg-neutral-focus">
        <FileEditor content={content} setContent={setContent} />
      </div>
      <CommitForm
        handleSubmit={handleSubmit}
        fileName={fileName}
        commitMsg={commitMsg}
        setCommitMsg={setCommitMsg}
      />
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
