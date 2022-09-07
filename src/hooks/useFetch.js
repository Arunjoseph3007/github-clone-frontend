import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetch = (key, url) => {
  const { isLoading, error, data } = useQuery([key], () =>
    axios.get(url).then((res) => res.data)
  );

  return { isLoading, error, data };
};
