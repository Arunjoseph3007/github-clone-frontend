import { useUser } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CommitForm({
  fileName,
  commitMsg,
  setCommitMsg,
  handleSubmit,
}) {
  const { user } = useUser();
  const router = useRouter();

  if (user)
    return (
      <div className="p-3 m-5 lg:m-10 flex items-start gap-4">
        <img
          className="avatar w-[4rem] aspect-square object-cover rounded-full"
          src={user.photoUrl}
        />
        <form
          onSubmit={handleSubmit}
          className="shadow-xl border p-4 flex-1 rounded"
        >
          <h1 className="text-2xl font-semibold">Commit changes</h1>
          <input
            type="text"
            value={commitMsg}
            required
            onChange={(e) => setCommitMsg(e.target.value)}
            placeholder={`Update ${fileName}`}
            className="input input-bordered w-full rounded mt-3"
          />
          <div className="flex mt-4 gap-4">
            <button
              type="submit"
              disabled={!commitMsg}
              className="btn btn-success "
            >
              Commit changes
            </button>
            <Link href={router.asPath.replace("/edit/", "/blob/")}>
              <a className="btn btn-error">Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    );

  return (
    <div className="p-3 m-5 lg:m-10 text-center font-bold text-2xl">
      Please login to commit
    </div>
  );
}
