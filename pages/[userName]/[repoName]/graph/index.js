import MainRepoLayout from "@/layouts/MainRepoLayout";
import { gitGraph } from "@/utils/gitGraph";
import { useRouter } from "next/router";

const formatGraph = (graph) => (
  <>
    {graph.split("").map((elm, i) => (
      <span style={{ color: `hsl(${i * 50},50%,50%)` }} key={i}>
        {elm}
      </span>
    ))}
  </>
);

export default function GraphPage({ data }) {
  const router = useRouter();

  return (
    <div>
      <div className="p-3 w-full max-w-[1000px] mx-auto">
        <div className="bg-neutral-focus p-4 font-mono mockup-code">
          {data
            .split("\n")
            .filter((a) => a)
            .map((line, i, arr) => {
              const [graph, text] = line.split("||||||||________||||||||");
              return (
                <pre
                  className="w-full"
                  style={{ color: `hsl(${(360 * i) / arr.length}, 50%, 65%)` }}
                  data-prefix={i}
                  key={i}
                >
                  <code
                    className={`${text && "tooltip tooltip-right"}`}
                    data-tip={text}
                  >
                    {formatGraph(graph)}
                  </code>
                  <code className="text-sm ml-3">{text && text}</code>
                </pre>
              );
            })}
        </div>
      </div>
    </div>
  );
}

GraphPage.getLayout = MainRepoLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;

  const { data, error } = gitGraph(pathName);

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
