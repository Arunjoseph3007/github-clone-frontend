import Head from "next/head";

const SEO = ({ page = "" }) => {
  return (
    <Head>
      <title>
        Arun Joseph{" "}
        {page === "/"
          ? ""
          : " | " + page.charAt(1).toUpperCase() + page.slice(2)}
      </title>
    </Head>
  );
};

export default SEO;
