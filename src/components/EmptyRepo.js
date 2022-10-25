import { CopyIcon } from "@/icons/copy";
import { useRouter } from "next/router";

export default function EmptyRepo() {
  const { asPath } = useRouter();
  const url = `http://gitbase.sytes.net${asPath}.git`;

  return (
    <div className="p-3 m-5 lg:m-10 rounded-xl border flex flex-col gap-3">
      {/* //$ Quick setup */}
      <div>
        <h1 className="text-2xl font-semibold">
          Quick setup if you have done this before
        </h1>
        <div className="form-control mt-3">
          <label className="input-group">
            <span>HTTP</span>
            <input
              type="text"
              readOnly
              defaultValue={url}
              className="input input-bordered flex-1 font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="btn"
            >
              <CopyIcon />
            </button>
          </label>
        </div>
      </div>

      <div className="divider" />
      {/* //$ New Repo */}
      <div>
        <h1 className="text-2xl mb-3 font-semibold">
          Or create a new repository on the command line
        </h1>
        <div className="mockup-code">
          <pre data-prefix=">">
            <code>{`echo "# emptyTestRepo" >> README.md`}</code>
          </pre>
          <pre data-prefix=">">
            <code>git init</code>
          </pre>
          <pre data-prefix=">">
            <code>git commit -m "first commit"</code>
          </pre>
          <pre data-prefix=">">
            <code>{`git branch -M main`}</code>
          </pre>
          <pre data-prefix=">">
            <code>git remote add origin {url}</code>
          </pre>
          <pre data-prefix=">">
            <code>git push -u origin main</code>
          </pre>
        </div>
      </div>

      <div className="divider" />
      {/* //$ Existing Repo */}
      <div>
        <h1 className="text-2xl mb-3 font-semibold">
          Or push an existing repository from the command line
        </h1>
        <div className="mockup-code">
          <pre data-prefix=">">
            <code>git remote add origin {url}</code>
          </pre>
          <pre data-prefix=">">
            <code>{`git branch -M main`}</code>
          </pre>
          <pre data-prefix=">">
            <code>git push -u origin main</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
