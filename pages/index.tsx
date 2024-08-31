import React from "react";
import { useRouter } from "next/router";
import { Center, SegmentedControl, Space, Stack, Text, Title } from "@mantine/core";

import Years from "components/layout/years";
import Weeks from "components/layout/weeks";
import Months from "components/layout/months";
import { generateRssFeed } from "lib/generate-rss-feed";
import { getArticleSlugs } from "lib/get-articles-slugs";
import { MainLayout } from "components/layout/main-layout";
import useTimelineStore from "lib/state/use-timeline-store";
import { generateLatestChangelogsJson } from "lib/generate-latest-json";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";

const ITEMS_PER_PAGE = 4;

export interface IPageProps {
  slugs: string[];
  changelogsMap: { months: IAggregatedChangelogs; years: IAggregatedChangelogs };
  totalItems: { weeks: number; months: number; years: number };
}

type TimelineView = "weeks" | "months" | "years";

const Page = ({ slugs, changelogsMap, totalItems }: IPageProps) => {
  const timeline = useTimelineStore();
  const router = useRouter();
  const page = parseInt((router.query?.page || "0") as string);

  const [timelineView, setTimelineView] = React.useState<TimelineView>("weeks");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // window.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [timeline.view]);

  const isInBlogPage = router.pathname.startsWith("/changelogs/");

  return (
    <MainLayout
      page={page}
      itemsPerPage={ITEMS_PER_PAGE}
      totalItems={{
        weeks: totalItems.weeks,
        months: totalItems.months,
        years: totalItems.years,
      }}
    >
      <Space h="xl" />

      <Center>
        <SegmentedControl
          size="md"
          radius="xl"
          value={timelineView}
          onChange={(value: TimelineView) => {
            setTimelineView(value);
          }}
          data={[
            { label: "Weeks", value: "weeks" },
            { label: "Months", value: "months" },
            { label: "Years", value: "years" },
          ]}
        />
      </Center>

      {!isInBlogPage && (
        <Stack spacing="sm">
          <Space h="xl" />

          <Title
            order={1}
            sx={{
              fontSize: "4rem",
            }}
          >
            Changelog
          </Title>
          <Text
            size="lg"
            color="dimmed"
            sx={{
              fontWeight: 500,
            }}
          >
            New features, improvements, and fixes every week
          </Text>
        </Stack>
      )}

      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />

      {(() => {
        switch (timelineView) {
          case "weeks":
            return <Weeks slugs={slugs} />;

          case "months":
            return <Months monthChangelogsMap={changelogsMap.months} />;

          case "years":
            return <Years yearChangelogsMap={changelogsMap.years} />;

          default:
            break;
        }
      })()}
    </MainLayout>
  );
};

export async function getStaticProps({ params }) {
  await generateRssFeed();
  await generateLatestChangelogsJson();
  const slugs = getArticleSlugs();

  const results = await Promise.allSettled(slugs.map((slug) => import(`./changelogs/${slug}.mdx`)));

  const meta = results
    .map((res) => res.status === "fulfilled" && res.value.meta)
    .filter((item) => item);

  meta.sort((a, b) => {
    const dateB = new Date(b.publishedAt);
    const dateA = new Date(a.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });

  const start = parseInt(params?.page ?? 0) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const recents = meta.slice(start, end).map((item) => item.slug);

  // aggregate images for monthly changelogs
  const monthChangelogsMap: IAggregatedChangelogs = meta.reduce((acc, item, index) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const key = `${year}-${month}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      imageUrl: item.headerImage,
      slug: item.slug,
      publishedAt: item.publishedAt,
      weeklyViewPage: Math.floor(index / ITEMS_PER_PAGE),
    } as IImagePreviewMeta);
    return acc;
  }, {});

  const recentMonthChangelogsMap: IAggregatedChangelogs = Object.keys(monthChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = monthChangelogsMap[key];
      return acc;
    }, {});

  const yearsChangelogsMap: IAggregatedChangelogs = meta.reduce((acc, item, index) => {
    const date = new Date(item.publishedAt);
    const year = date.getFullYear().toString();
    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push({
      imageUrl: item.headerImage,
      slug: item.slug,
      publishedAt: item.publishedAt,
      weeklyViewPage: Math.floor(index / ITEMS_PER_PAGE),
      monthlyViewPage: Math.floor(
        (Object.keys(monthChangelogsMap)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .indexOf(`${year}-${date.getMonth() + 1}`) +
          1) /
          ITEMS_PER_PAGE
      ),
    } as IImagePreviewMeta);
    return acc;
  }, {});

  const recentYearsChangelogsMap: IAggregatedChangelogs = Object.keys(yearsChangelogsMap)
    .slice(start, end)
    .reduce((acc, key) => {
      acc[key] = yearsChangelogsMap[key];
      return acc;
    }, {});

  return {
    props: {
      slugs: recents,
      changelogsMap: { months: recentMonthChangelogsMap, years: recentYearsChangelogsMap },
      totalItems: {
        weeks: slugs.length,
        months: Object.keys(monthChangelogsMap).length,
        years: Object.keys(yearsChangelogsMap).length,
      },
    },
    revalidate: 1,
  };
}

export default Page;
