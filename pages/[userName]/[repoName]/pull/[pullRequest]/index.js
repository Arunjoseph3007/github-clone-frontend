import PullRequestLayout from "@/layouts/PullRequestLayout";
import { useRouter } from "next/router";
import { format } from "timeago.js";

export default function PullRequestPage({ data }) {
  const { query } = useRouter();

  return (
    <div>
      <div className="p-3 w-4/5 mx-auto">
        {/* //? Head Section */}
        <div className="bg-neutral-focus p-4 rounded-t-lg text-white">
          <h1 className="font-semibold text-xl mb-4">{data.message}</h1>
          <p>
            {data.authorName}{" "}
            <span className="font-thin">
              commited {format(data.createdAt)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

PullRequestPage.getLayout = PullRequestLayout;

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      data: {
        message: "my random message",
        authorName: "Arun joseph",
        createdAt: "Tue Aug 2 18:13:25 2022 +0530",
      },
    },
  };
};
