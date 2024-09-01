import Link from "next/link";
import Head from "next/head";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Group, Space, Stack } from "@mantine/core";

import Navbar from "components/core/navbar";
import { Footer } from "components/core/footer";
import TryBanner from "components/core/try-banner";
import useTimelineStore from "lib/state/use-timeline-store";
import usePageStatusStore from "lib/state/use-page-status-store";
import useAnimatePageStore from "lib/state/use-animate-page-store";

export interface MainLayoutProps {
  page?: number;
  children: ReactNode;
  itemsPerPage?: number;
  totalItems?: {
    weeks: number;
    months: number;
    years: number;
  };
  infiniteScrollingView?: "year" | "month";
}

export const MainLayout = ({
  page,
  children,
  itemsPerPage,
  totalItems,
  infiniteScrollingView,
}: MainLayoutProps) => {
  const metaTitle = `${
    infiniteScrollingView ? "" : page > 0 ? `Page ${page} -` : ""
  } BestRegards Changelog`;
  const timeline = useTimelineStore();
  const { animatePage, setAnimatePage } = useAnimatePageStore();
  const router = useRouter();
  const pageStatus = usePageStatusStore();

  React.useEffect(() => {
    const hash = window?.location.hash ?? "";

    timeline.setView(
      hash ? (hash === "#months" ? "months" : hash === "#years" ? "years" : "weeks") : "weeks"
    );
  }, []);

  React.useEffect(() => {
    router.events.on("routeChangeStart", (url: string) => {
      if (!url.includes("/changelogs/")) {
        window.scrollTo({
          top: 0,
        });
      }

      pageStatus.setIsLoading(true);

      if (url.includes("/years") && !url.includes("/months")) {
        timeline.setView("months");
      } else if (url.includes("/years") && url.includes("/months")) {
        timeline.setView("weeks");
      }
    });

    router.events.on("routeChangeComplete", (url: string) => {
      pageStatus.setIsLoading(false);

      if (url.includes("/years") && !url.includes("/months")) {
        timeline.setView("months");
      } else if (url.includes("/years") && url.includes("/months")) {
        timeline.setView("weeks");
      }
    });
  }, []);

  const hasMorePage =
    !infiniteScrollingView &&
    page !== undefined &&
    page < Math.floor(totalItems[timeline.view] / itemsPerPage) - 1;

  const isInBlogPage = router.pathname.startsWith("/changelogs/");

  return (
    <>
      {!isInBlogPage && (
        <Head>
          <title>{metaTitle}</title>
          <link rel="icon" href="/favicon.svg" />
          <meta name="title" content={metaTitle} />
          <meta
            name="description"
            content="Discover new updates and improvements to BestRegards."
          />
          <meta name="image" content="/changelog.png" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://changelog.bestregards.me" />
          <meta property="og:title" content={metaTitle} />
          <meta
            property="og:description"
            content="Discover new updates and improvements to BestRegards."
          />
          <meta property="og:image" content="/changelog.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://changelog.bestregards.me" />
          <meta name="twitter:title" content={metaTitle} />
          <meta
            name="twitter:description"
            content="Discover new updates and improvements to BestRegards."
          />
          <meta name="twitter:image" content="https://changelog.bestregards.me/social.png" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="BestRegards Changelog"
            href="https://changelog.bestregards.me/rss.xml"
          />
        </Head>
      )}

      <Box px="sm">
        <motion.div
          initial={animatePage ? "hidden" : "visible"}
          animate="visible"
          onAnimationComplete={() => {
            setAnimatePage(false);
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6 } },
            }}
          >
            <Navbar />
          </motion.div>

          <Container
            py="xl"
            size="xl"
            sx={(t) => ({
              zIndex: 10,
              background: t.colors.dark[7],
              borderRadius: t.radius.lg,
            })}
          >
            <Stack
              spacing={8}
              w="full"
              sx={{
                alignItems: "center",
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
                }}
              >
                {children}
              </motion.div>

              <motion.div
                hidden={!!infiniteScrollingView}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
                }}
              >
                <Stack
                  sx={(t) => ({
                    [t.breakpoints.xs]: {
                      alignItems: "stretch",
                    },

                    [t.breakpoints.md]: {
                      alignItems: "center",
                    },
                  })}
                >
                  {page === 0 && hasMorePage ? (
                    <Link href={`/page/1#${timeline.view}`}>
                      <Button
                        color="indigo"
                        sx={{
                          padding: "0.75rem 3.5rem",
                        }}
                      >
                        Load more
                      </Button>
                    </Link>
                  ) : (
                    <Group align="center" spacing={4}>
                      {page > 0 && (
                        <Link href={`/page/${page - 1}${"#" + timeline.view}`}>
                          <Button color="indigo">Previous page</Button>
                        </Link>
                      )}
                      {hasMorePage && (
                        <Link href={`/page/${page + 1}${"#" + timeline.view}`}>
                          <Button color="indigo">Next page</Button>
                        </Link>
                      )}
                    </Group>
                  )}
                </Stack>
              </motion.div>
            </Stack>

            <Space h="xl" />
          </Container>
        </motion.div>

        <>
          <motion.div
            initial={{ opacity: animatePage ? 0 : 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <TryBanner />

            <Footer />
          </motion.div>
        </>
      </Box>
    </>
  );
};
