import path from "path";
import fs from "fs";
import { Feed } from "feed";

const MDX_DIR = "changelogs";

export const generateRssFeed = async () => {
  const siteURL = "https://changelog.bestregards.me";
  const date = new Date();
  const author = {
    name: "BestRegards",
    link: "https://twitter.com/BestRegardsHQ",
  };

  const feed = new Feed({
    title: "BestRegards Changelog",
    description: "How BestRegards gets better every week",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, BestRegards`,
    updated: date, // today's date
    generator: "Feed for BestRegards changelog",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json format
    },
    author,
  });

  const changelogFileObjects = fs.readdirSync(path.join(process.cwd(), "pages", MDX_DIR), {
    withFileTypes: true,
  });

  const changelogFiles = await Promise.allSettled(
    changelogFileObjects.map((file) => import(`../pages/changelogs/${file.name}`))
  );

  const changelogsMeta = changelogFiles
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  changelogsMeta.forEach((changelog) => {
    const { title, description, content, publishedAt, slug, headerImage } = changelog;
    const url = `${siteURL}/changelogs/${slug}`;
    feed.addItem({
      title: title,
      id: url,
      link: url,
      description: description,
      content: content,
      image: headerImage,
      date: new Date(publishedAt),
    });
  });

  console.debug("-------------------");
  console.debug("Generating RSS feed");
  console.debug("-------------------");
  const Rssfeed = feed.rss2();

  console.debug("-------------------");
  console.debug("Writing RSS feed to public/rss.xml");
  console.debug("-------------------");

  fs.writeFileSync("./public/rss.xml", Rssfeed, "utf8");
};
