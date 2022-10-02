import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import MainRepoLayout from "@/layouts/MainRepoLayout";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SettingsPage({ data }) {
  const router = useRouter();
  const [repoDesc, setRepoDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [repoName, setRepoName] = useState(router.query.repoName);

  // $ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-3">
      <h2 className="text-3xl font-semibold">Settings</h2>
      <form onSubmit={handleSubmit} className="form-control ">
        <label htmlFor="repo-name-input" className="label">
          Repository name
        </label>
        <input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          id="repo-name-input"
          type="text"
          pattern="[a-zA-Z0\-9_]{4,32}"
          title="A string consisting alphabets, numbers and characters - or _ with length not more than 32 characters and not less than 4 characters"
          className="input input-secondary input-bordered invalid:input-error"
          required
        />
        <label htmlFor="desc-input" className="label">
          Description
        </label>
        <textarea
          rows={5}
          columns={5}
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
    </div>
  );
}

SettingsPage.getLayout = MainRepoLayout;

//! To avoid Error
export const getServerSideProps = async (ctx) => {
  return { props: { data: null } };
};
