//@ Global Styles
import "../styles/globals.css";
//@ Highlight.js Styles
import "highlight.js/styles/github.css";
//@ ProgressBar
import ProgressBar from "nextjs-progressbar";
//@ SEO Component
import SEO from "@/components/SEO";
// @ Toast Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// @ Contexts
import AuthProvider from "@/context/userContext";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
      <AuthProvider>
        <SEO />
        <ProgressBar />
        {getLayout(<Component {...pageProps} />)}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
  );
}

export default MyApp;
