import Link from "next/link";
import { useRouter } from "next/router";
import MainRepoLayout from "./MainRepoLayout";

function Layout(page) {
  const { query } = useRouter();
  const baseUrl = `/${query.userName}/${query.repoName}/graph/`;

  return (
    <div className="px-3  flex">
      <div className="w-[20vw] flex flex-col rounded-md">
        <Link href={baseUrl + "commit-activity"}>
          <a className="btn btn-outline">commit activity</a>
        </Link>
        <Link href={baseUrl + "contributors"}>
          <a className="btn btn-outline">contributors</a>
        </Link>
      </div>
      <div className="divider divider-horizontal"></div>
      {page}
    </div>
  );
}

export default function GraphLayout(page) {
  return MainRepoLayout(Layout(page));
}
