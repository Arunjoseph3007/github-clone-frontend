import SearchRepo from "@/components/SearchRepo";
import MainLayout from "@/layouts/MainLayout";
import axios from "@/libs/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage(props) {
  const { query } = useRouter();
  const searchWord = query.q || "";
  const [repos, setRepos] = useState([]);

  //$ Handles APi Fetching
  const getRepos = async () => {
    try {
      const res = await axios.get(`/main/reposearch/?reposearch=${searchWord}`);
      console.log(res.data);
      setRepos(
        res.data.map((repo) => ({
          name: repo.repo_name,
          description: "repo.desciption",
          username: "repo.user_name",
          createdAt: repo.date_of_creation,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepos();
  }, [query]);

  const repoLimit = 10;
  let pageDetails = {
    curPage: 0,
    repoLimit,
    noPages: Math.ceil(repos.length / repoLimit),
    totalRepos: repos.length,
  };

  return (
    <div className="">
      <SearchRepo
        repos={repos}
        heading={"Results Match on : " + searchWord}
        pageDetails={pageDetails}
      />
    </div>
  );
}

SearchPage.getLayout = MainLayout;
