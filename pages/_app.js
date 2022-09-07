//@ Global Styles
import "../styles/globals.css";
//@ Highlight.js Styles
import "highlight.js/styles/github.css";
//@ ProgressBar
import ProgressBar from "nextjs-progressbar";
//@ React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/reactQuery";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressBar />
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}

export default MyApp;
