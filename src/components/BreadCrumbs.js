import Link from "next/link";
import { useRouter } from "next/router";

export default function BreadCrumbs({ path }) {
  const { query } = useRouter();

  const baseUrl = `/${query.userName}/${query.repoName}/`;

  return (
    <div class="breadcrumbs pb-3 mb-3 border-b">
      <ul>
        <li>
          <Link href={baseUrl}>
            <a>{query.repoName}</a>
          </Link>
        </li>
        {[...query.path]?.slice(0, -1)?.map((elm, i, arr) => (
          <li key={i}>
            <Link
              href={`${baseUrl}/tree/${query.branch}/${arr
                .slice(0, i + 1)
                .join("/")}`}
            >
              <a>{elm}</a>
            </Link>
          </li>
        ))}
        <li>
          <a>{[...query?.path]?.pop()}</a>
        </li>
      </ul>
    </div>
  );
}
