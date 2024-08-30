import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import { MdxMeta } from "lib/models/mdx-meta";
import { ReactNode } from "@mdx-js/react/lib";
import { MDXProvider } from "@mdx-js/react";
import usePreviousPageUrl from "lib/state/use-previous-page-url-store";
import { Box, Flex, Image, List, Stack, Text, Title } from "@mantine/core";

import Timeline from "./layout/timeline";
import { MainLayout } from "./layout/main-layout";
import { Contributors } from "./core/contributors";

import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  // @ts-expect-error
  h1: (props) => <Title size={1} color="#000" {...props} />,
  // @ts-expect-error
  h2: (props) => <Text fw="bold" size="xl" mt={12} mb={6} {...props} />,
  p: (props) => (
    // @ts-expect-error
    <Text
      my={6}
      color="#495057"
      size="sm"
      sx={{
        lineHeight: "24px",
      }}
      {...props}
    />
  ),
  a: (props) => (
    <Text component="a" href={props.href} rel="noopener noreferrer" color="#6868F7" fw="bold">
      {props.children}
    </Text>
  ),
  // @ts-expect-error
  ul: (props) => <List spacing={4} {...props} />,
  // @ts-expect-error
  ol: (props) => <List spacing={4} {...props} />,
  li: (props) => (
    // @ts-expect-error
    <List.Item
      color="#495057"
      sx={{
        fontSize: "16px",
        lineHeight: "32px",
        ":before": {
          content: "unset",
        },
      }}
      {...props}
    />
  ),
};

export interface MdxLayoutProps {
  meta: MdxMeta;
  children: ReactNode;
  hideLayout?: boolean;
  hideHead?: boolean;
  hideAuthors?: boolean;
  imagePreviewMode?: boolean;
  tags?: string[];
  index?: number;
  isInfiniteScrollingView?: boolean;
}

export const MdxLayout = (props: MdxLayoutProps) => {
  const title = `${props.meta.title} | June Changelog`;
  const description = "Discover new updates and improvements to June.";
  const url = "https://changelog.june.so";

  const { setPrevUrl } = usePreviousPageUrl();
  const router = useRouter();
  React.useLayoutEffect(() => {
    // using a timeout to wait for the page to render and get the right scroll position
    const timeout = setTimeout(() => {
      const month = router.asPath.split("month=")[1];

      const articleMonth = dayjs(props.meta.publishedAt).format("MM");

      // if the current article is the first one in the page
      // and the month is different from the current month
      // scroll to the month
      if (month && month !== articleMonth && props.index === 0 && props.hideLayout) {
        const element = document.querySelector(`.timeline-month-${month}`);
        const rect = element?.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect?.top + scrollTop;

        window.scrollTo({
          behavior: "smooth",
          top: top - 70,
        });
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [router.asPath]);

  if (props.imagePreviewMode) {
    return (
      <Image
        src={props.meta.headerImage}
        alt={props.meta.title}
        height="100%"
        sx={{
          objectFit: "cover",
        }}
      />
    );
  }

  const shouldAnimateFromPreviousPage =
    props.hideLayout && props.isInfiniteScrollingView && props.index === 0;

  const isInBlogPage = router.pathname.startsWith("/changelogs/");

  const MDX = () => (
    <MDXProvider components={components}>
      {!props.hideHead && (
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta name="image" content={props.meta.headerImage} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={props.meta.headerImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={url} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={props.meta.headerImage} />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="June Changelog"
            href="https://changelog.june.so/rss.xml"
          />
        </Head>
      )}
      <Timeline
        date={dayjs(props.meta.publishedAt).format("MMM DD YYYY")}
        className={`timeline-month-${dayjs(props.meta.publishedAt).format("MM")}`}
      >
        <Box w="100%" maw="682px">
          {/* Article header */}
          <Stack
            align="start"
            sx={(t) => ({
              gap: 4,
              [t.breakpoints.lg]: {
                gap: 6,
              },
            })}
          >
            {props.tags !== undefined && (
              <Flex gap={2}>
                {props.tags?.map((tag, index) => (
                  <Box
                    h="22px"
                    bg="#F1F3F5"
                    color="#0D131B"
                    px={2}
                    top="-8px"
                    mb="-10px"
                    sx={{
                      position: "relative",
                      fontWeight: 500,
                      lineHeight: "21px",
                      borderRadius: "full",
                      fontSize: "14px",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Flex>
            )}
            <motion.div
              layoutId={shouldAnimateFromPreviousPage ? `${props.meta.slug}` : ``}
              initial={{
                opacity: shouldAnimateFromPreviousPage ? 1 : 0,
                y: shouldAnimateFromPreviousPage ? 0 : 20,
                scale: shouldAnimateFromPreviousPage ? 0.9 : 1,
              }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6 }, scale: 1 }}
              style={{ width: "100%", overflow: "hidden", borderRadius: "16px", height: "100%" }}
            >
              {isInBlogPage ? (
                <Image
                  src={props.meta.headerImage}
                  alt={props.meta.title}
                  w="full"
                  sx={(t) => ({
                    height: "100%",
                    [t.breakpoints.lg]: {
                      height: "360px",
                    },
                    objectFit: "cover",
                    cursor: props.hideLayout ? "pointer" : "default",
                    ":hover": {
                      boxShadow: props.hideLayout ? "0px 2px 4px 0px rgba(0, 0, 0, 0.1)" : "",
                    },
                  })}
                />
              ) : (
                <Link href={`/changelogs/${props.meta.slug}`}>
                  <Image
                    src={props.meta.headerImage}
                    alt={props.meta.title}
                    w="full"
                    sx={(t) => ({
                      height: "100%",
                      [t.breakpoints.lg]: {
                        height: "360px",
                      },
                      objectFit: "cover",
                      cursor: props.hideLayout ? "pointer" : "default",
                      ":hover": {
                        boxShadow: props.hideLayout ? "0px 2px 4px 0px rgba(0, 0, 0, 0.1)" : "",
                      },
                    })}
                    onClick={() => {
                      setPrevUrl(router.asPath);
                    }}
                  />
                </Link>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: shouldAnimateFromPreviousPage ? 0 : 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
            >
              {isInBlogPage ? (
                <h1
                  className={`article-title text-gray-900 font-hero text-[24px] leading-[32px] font-bold ${
                    props.hideLayout
                      ? "cursor-pointer hover:underline underline-offset-[3px]"
                      : "cursor-text hover:no-underline"
                  }`}
                >
                  {props.meta.title}
                </h1>
              ) : (
                <Link href={`/changelogs/${props.meta.slug}`}>
                  <h2
                    className={`article-title text-gray-900 font-hero text-[24px] leading-[32px] font-bold ${
                      props.hideLayout
                        ? "cursor-pointer hover:underline underline-offset-[3px]"
                        : "cursor-text hover:no-underline"
                    }`}
                    onClick={() => {
                      setPrevUrl(router.asPath);
                    }}
                  >
                    {props.meta.title}
                  </h2>
                </Link>
              )}
            </motion.div>
          </Stack>
          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: props.hideLayout ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } }}
          >
            <div className="pb-16 text-lg leading-8 text-gray-700 font-hero">{props.children}</div>
          </motion.div>
          {/* Article authors */}
          {!props.hideAuthors && <Contributors authors={props.meta.authors} />}
        </Box>
      </Timeline>
    </MDXProvider>
  );

  return isInBlogPage ? (
    <MainLayout>
      <MDX />
    </MainLayout>
  ) : (
    <MDX />
  );
};
