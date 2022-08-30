import { useState } from "react";

export default function CreateRepoPage() {
  const [repoName, setRepoName] = useState("");
  const [repoDesc, setRepoDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <h1>Create a Repository</h1>
      <p>
        A repository contains all project files, including the revision history.
      </p>
      {isPublic ? "hey" : "hi"}
      <hr />
      <form className="form-control ">
        <label htmlFor="repo-name-input" className="label">
          Repository name
        </label>
        <input
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          id="repo-name-input"
          type="text"
          className="input input-bordered"
        />
        <label htmlFor="desc-input" className="label">
          Description
        </label>
        <input
          value={repoDesc}
          onChange={(e) => setRepoDesc(e.target.value)}
          id="desc-input"
          type="text"
          className="input input-bordered"
        />

        {/* //@ Radio buttons */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="radio"
              name="radio-1"
              className="radio"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label>
              <h4>Public</h4>
              <p>
                Anyone on the internet can see this repository. You choose who
                can commit.
              </p>
            </label>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <input
              type="radio"
              name="radio-1"
              className="radio"
              checked={!isPublic}
              onChange={(e) => setIsPublic(!e.target.checked)}
            />
            <label>
              <h4>Private</h4>
              <p>You choose who can see and commit to this repository.</p>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
