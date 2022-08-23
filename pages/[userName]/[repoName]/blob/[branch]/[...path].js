import { gitShow } from "@/utils/gitShow";
import { useRouter } from "next/router";

export default function BlobPage({ data }) {
  const router = useRouter();

  return (
    <div>
      <header className="p-3 text-xl">
        <h1>User name: {router.query.userName}</h1>
        <h1>Repo name: {router.query.repoName}</h1>
        <h1>Branch name: {router.query.branch}</h1>
        <h1>remaining path: {router?.query?.path?.join("/")}</h1>
      </header>
      <div className="p-3 w-full max-w-[1000px] mx-auto">
        <div className="mockup-code">
          {data.split("\n").map((line, i, arr) => (
            <pre
              style={{ color: `hsl(${(360 * i) / arr.length}, 50%, 65%)` }}
              data-prefix={i}
              key={i}
            >
              <code>{line}</code>
            </pre>
          ))}
        </div>
      </div>
    </div>
  );
}

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
    },
  };
};
