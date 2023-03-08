import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import axios from "@/libs/axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SettingsPage({ data }) {
  const router = useRouter();
  const [repoDesc, setRepoDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [repoName, setRepoName] = useState(router.query.repoName);

  // $ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `/main/update-repo-detail/?is_public=${isPublic ? 1 : 0}&repo_name=${
          router.query.repoName
        }`
      );

      toast.success("Repo updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    try {
      const { data } = await axios.delete(
        `/main/update-repo-detail/?repo_name=${router.query.repoName}`
      );

      toast.success("Repo updated successfully");
      router.push(`/${router.query.userName}`);
    } catch (error) {}
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-3">
      <h2 className="text-4xl font-semibold">Settings</h2>
      <div className="divider" />

      {/* //$ Form */}
      <form onSubmit={handleSubmit} className="form-control ">
        <label htmlFor="repo-name-input" className="label">
          Repository name
        </label>
        <input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          id="repo-name-input"
          type="text"
          pattern="[a-zA-Z0-9\-_]{4,32}"
          title="A string consisting alphabets, numbers and characters - or _ with length not more than 32 characters and not less than 4 characters"
          className="input input-secondary input-bordered invalid:input-error"
          required
        />
        <label htmlFor="desc-input" className="label">
          Description
        </label>
        <textarea
          rows={5}
          value={repoDesc}
          onChange={(e) => setRepoDesc(e.target.value)}
          id="desc-input"
          type="text"
          className="textarea textarea-bordered"
        />

        {/* //@ Radio buttons */}
        <div className="my-4">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="radio"
              name="radio-public"
              className="radio"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <PublicIcon />
            <label>
              <h4>Public</h4>
              <p className="text-sm text-secondary">
                Anyone on the internet can see this repository. You choose who
                can commit.
              </p>
            </label>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="radio"
              name="radio-private"
              className="radio"
              checked={!isPublic}
              onChange={(e) => setIsPublic(!e.target.checked)}
            />
            <LockIcon />
            <label>
              <h4>Private</h4>
              <p className="text-sm text-secondary">
                You choose who can see and commit to this repository.
              </p>
            </label>
          </div>
        </div>

        <button className="btn" type="submit">
          Update Repository
        </button>
      </form>
      <hr />
      <button
        data-tip="This is irrreversible once deleted you won't be able to retireve this repository"
        className="tooltip tooltip-bottom tooltip-error btn btn-error w-full mt-4 text-white tracking-widest"
      >
        Delete Repository
      </button>
    </div>
  );
}

SettingsPage.getLayout = MainRepoLayout;

//! To avoid Error
export const getServerSideProps = async (ctx) => {
  return { props: { data: null } };
};
