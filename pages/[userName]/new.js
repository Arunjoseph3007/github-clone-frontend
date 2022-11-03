import { useUser } from "@/context/userContext";
import { LockIcon } from "@/icons/lock";
import { PublicIcon } from "@/icons/public";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateRepoPage() {
  const [repoName, setRepoName] = useState("");
  const [repoDesc, setRepoDesc] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const router = useRouter();

  //@ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/main/repo/`,
        {
          repo_name: repoName,
          is_public: isPublic,
        },
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data)
      // router.push(``)
    } catch (error) {
      setError(error);
      console.log(error)
    }
  };

  //@ Handle change
  const handleChange = (e) => {
    setRepoName(e.target.value);

    setError(!e.target.validity.valid);
  };

  //$ UI
  return (
    <div className="w-full max-w-[800px] mx-auto mt-[5rem]">
      <h1 className="text-3xl my-2">Create a Repository</h1>
      <p>
        A repository contains all project files, including the revision history.
      </p>
      <hr className="my-2" />

      {/* //? Form */}
      <form onSubmit={handleSubmit} className="form-control ">
        <label htmlFor="repo-name-input" className="label">
          Repository name
        </label>
        <input
          value={repoName}
          onChange={handleChange}
          id="repo-name-input"
          type="text"
          pattern="[a-zA-Z0-9_]{4,32}"
          title="A string consisting alphabets, numbers and characters - or _ with length not more than 32 characters and not less than 4 characters"
          className="input input-secondary input-bordered invalid:input-error"
          required
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
          Create Repository
        </button>
      </form>
    </div>
  );
}
