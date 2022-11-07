import SearchRepo from "@/components/SearchRepo";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

export default function SearchPage(props) {
  const { query } = useRouter();
  const searchWord = query.q || "";
  const repos = [
    {
      name: "Bhavik1",
      username: "Tester1",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik2",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik3",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik4",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik5",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik6",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik7",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik8",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik9",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik10",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik11",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik12",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik13",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik14",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik15",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik16",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik17",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik18",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik19",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik20",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik21",
      username: "Tester2",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik14",
      username: "Tester8",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik14",
      username: "Tester5",
      createdAt: "20-05-2020",
    },
    {
      name: "Bhavik14",
      username: "Tester3",
      createdAt: "20-05-2020",
    },
  ];
  let pageDetails={
    curPage: 0,
    noPages: 2,
    repoLimit: 10,
    totalRepos:repos.length,
  }
  return (
    <div className="">
      <SearchRepo repos={repos} heading={"Results Match on : " + searchWord} pageDetails={pageDetails} />
    </div>
  );
}

SearchPage.getLayout = MainLayout;
