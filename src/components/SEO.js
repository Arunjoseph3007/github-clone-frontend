import { NextSeo } from "next-seo";

export default function SEO() {
  return (
    <NextSeo
      defaultTitle="Gitbase"
      titleTemplate="Gitbase | %s"
      description="A database for git repositories, similar to github"
      openGraph={{
        url: "http://gitbase.sytes.net",
        title: "Gitbase",
        description: "A database for git repositories, similar to github",
        images: [
          {
            url: "https://raw.githubusercontent.com/Arunjoseph3007/github-clone-frontend/main/public/logo2.png",
            width: 800,
            height: 600,
            alt: "Logo",
            type: "image/jpeg",
          },
        ],
        site_name: "Gitbase",
      }}
    />
  );
}
