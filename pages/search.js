import SearchRepo from "@/components/SearchRepo";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

export default function SearchPage(props) {
  const { query } = useRouter();
  const searchWord = query.q || "";
  const repos = [
    {
      name: "Bhavik",
      username: "Tester1",
      createdAt: '20-05-2020'
    },
    {
      name: "Bhavik2",
      username: "Tester2",
      createdAt: '20-05-2020'
    },
  ]
  return(
    <div>
      <SearchRepo repos={repos} heading={"Results Match on : "+searchWord}/>
    </div>
  ) ;
}

SearchPage.getLayout = MainLayout;

