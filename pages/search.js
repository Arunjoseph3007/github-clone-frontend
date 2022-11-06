import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

export default function SearchPage(props) {
  const { query } = useRouter();
  const searchWord = query.q || "";

  return <h1>search: {searchWord}</h1>;
}

SearchPage.getLayout = MainLayout;
