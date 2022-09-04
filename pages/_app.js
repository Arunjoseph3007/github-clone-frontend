import "../styles/globals.css";
import "highlight.js/styles/github.css";
import ProgressBar from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <ProgressBar />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
