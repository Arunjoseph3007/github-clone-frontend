import GraphLayout from "@/layouts/GraphLayout";
import { gitCommitFrequency } from "@/utils/gitCommitFrequency";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CommitActivityPage({ data }) {
  const commitData = {
    options: {
      chart: {
        id: "Commit Percentage",
      },
      xaxis: {
        categories: data.map((a) => new Date(a.date).toDateString()),
      },
    },
    series: [
      {
        name: "Total Commits by",
        data: data.map((a) => a.commits),
      },
    ],
  };

  const weeklyData = {
    options: {
      chart: {
        id: "Commit Frequency",
      },
      xaxis: {
        categories: data.map((a) => new Date(a.date).toDateString()),
      },
    },
    series: [
      {
        name: "Commits per week",
        data: data.map((a) => a.commits),
      },
    ],
  };

  return (
    <div>
      <div className="p-3 px-10 mx-auto">
        <h1 className="text-2xl font-semibold">Commit Frequency</h1>
        {typeof window !== "undefined" && (
          <Chart
            options={weeklyData.options}
            series={weeklyData.series}
            type="bar"
            width={800}
            height={500}
          />
        )}
        {typeof window !== "undefined" && (
          <Chart
            options={commitData.options}
            series={commitData.series}
            type="area"
            width={800}
            height={500}
          />
        )}
      </div>
    </div>
  );
}

CommitActivityPage.getLayout = GraphLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;

  const { data, error } = gitCommitFrequency(pathName);

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
