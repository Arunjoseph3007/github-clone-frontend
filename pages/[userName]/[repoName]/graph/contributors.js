import GraphLayout from "@/layouts/GraphLayout";
import { gitContributionStats } from "@/utils/gitContributionStats";
import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ContributorStatPage({ data }) {
  const [selectedField, setSelectedField] = useState("commits");

  const commitDataForChart = {
    options: {
      chart: {
        id: "Contributor Stats",
      },
      labels: data.map((a) => a.user),
    },
    series: data.map((a) => a[selectedField]),
  };

  return (
    <div>
      <div className="p-3 px-10 mx-auto">
        <h1 className="text-2xl font-semibold">Contribution Stats</h1>

        {/* //$ Chart */}
        {typeof window !== "undefined" && (
          <Chart
            options={commitDataForChart.options}
            series={commitDataForChart.series}
            labels={commitDataForChart.labels}
            type="donut"
            width={700}
          />
        )}

        {/* //$ Control buttons */}
        <div className="flex gap-3 my-5">
          {["insertions", "deletions", "commits"].map((item) => (
            <button
              onClick={() => setSelectedField(item)}
              className="btn"
              key={item}
            >
              {item}
            </button>
          ))}
        </div>

        {/* //$ Contributors List */}
        <div className="grid grid-cols-2 gap-4">
          {data.map((userDetails) => (
            <div
              className="border rounded p-3 flex flex-col gap-2"
              key={userDetails.user}
            >
              <h1 className="text-xl font-semibold py-2">{userDetails.user}</h1>
              <hr />
              <p>
                <span className="text-green-600">
                  Insertions : {userDetails.insertions}++
                </span>
              </p>
              <p>
                <span className="text-red-600">
                  Deletions : {userDetails.deletions}--
                </span>
              </p>
              <p>
                <span className="text-gray-600">Net : {userDetails.net}</span>
              </p>
              <p>
                <span className="text-gray-600">
                  Commits : {userDetails.commits}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ContributorStatPage.getLayout = GraphLayout;

export const getServerSideProps = async (ctx) => {
  const pathName = `${ctx.params.userName}/${ctx.params.repoName}`;

  const { data, commitData, error } = gitContributionStats(pathName);

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
