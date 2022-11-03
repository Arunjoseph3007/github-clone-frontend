//@ Global Styles
import "../styles/globals.css";
//@ Highlight.js Styles
import "highlight.js/styles/github.css";
//@ ProgressBar
import ProgressBar from "nextjs-progressbar";
//@ React Query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/reactQuery";
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
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default MyApp;
