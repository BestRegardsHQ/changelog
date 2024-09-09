import React from "react";
import dayjs from "dayjs";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Box, em, getBreakpointValue, Group, Image, Stack, useMantineTheme } from "@mantine/core";

import MoreItems from "components/core/more-items";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";

import Timeline from "./timeline";

interface IMonthsProps {
  monthChangelogsMap: IAggregatedChangelogs;
  isInfiniteScrollingView?: boolean;
}

const Months = ({ monthChangelogsMap, isInfiniteScrollingView }: IMonthsProps) => {
  const router = useRouter();
  const theme = useMantineTheme();
  const sm = getBreakpointValue(theme.breakpoints.sm);
  const isMobileViewport = useMediaQuery(`(max-width: ${em(sm)})`);

  const sortedChangelogsArrayByMonth: IImagePreviewMeta[][] = Object.keys(monthChangelogsMap || {})
    .sort((a, b) => {
      const dateB = new Date(b);
      const dateA = new Date(a);
      return dateB.getTime() - dateA.getTime();
    })
    .map((date) => {
      return monthChangelogsMap[date];
    });

  // check for query params: year = YYYY on load, if so scroll to that year
  React.useLayoutEffect(() => {
    // if year && the first item in sortedChangelogsArrayByMonth is not the year, scroll to that year

    const year = router.asPath.split("year=")[1];

    if (
      year &&
      sortedChangelogsArrayByMonth[0] &&
      dayjs(sortedChangelogsArrayByMonth[0][0].publishedAt).format("YYYY") !== year
    ) {
      const yearIndex = sortedChangelogsArrayByMonth.findIndex((changelogs) => {
        return dayjs(changelogs[0].publishedAt).format("YYYY") === year;
      });
      if (yearIndex !== -1) {
        window.scrollTo({
          top: document.getElementById(`timeline-month-${yearIndex}`)?.offsetTop - 70,
          behavior: "smooth",
        });
      }
    }
  }, [router.asPath, monthChangelogsMap]);

  const handleFindWeekChangelog = (publishedAt: string) => {
    const date = dayjs(publishedAt);
    const targetDate = date.format("MMM DD YYYY");
    const month = date.format("MM");
    const year = date.format("YYYY");
    const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

    router.push(`/years/${year}/months/${month}#${hash}`, undefined, {
      scroll: true,
    });
  };

  return (
    <>
      {sortedChangelogsArrayByMonth.map((changelogs, index) => (
        <Timeline
          id={`timeline-month-${index}`}
          key={index}
          date={dayjs(Object.keys(monthChangelogsMap)[index]).format("MMM YYYY")}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              mb="xl"
              display="flex"
              pb={
                index === sortedChangelogsArrayByMonth.length - 1
                  ? 0
                  : {
                      xs: "12px",
                      sm: "16px",
                      md: "20px",
                    }
              }
              sx={{}}
            >
              <Stack
                sx={{
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "16px",
                }}
                mb="xl"
              >
                <Box
                  sx={(t) => ({
                    objectFit: "cover",
                    maxWidth: "682px",
                    position: "relative",
                    "& img": {
                      transition: "box-shadow 0.3s",
                    },
                    "&:hover img": {
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                    },
                    width: "100%",
                    height: "360px",
                    ...(isMobileViewport && {
                      height: "100%",
                      maxWidth: "100%",
                    }),
                  })}
                  display="flex"
                  onClick={() => {}}
                >
                  <LazyLoad height="100%" once>
                    {changelogs.length > 3 && <MoreItems numberOfItems={changelogs.length - 3} />}
                    {changelogs.length <= 2 ? (
                      <Box
                        sx={{
                          display: "grid",
                          gap: "8px",
                          templateColumns:
                            changelogs.length === 1 ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
                        }}
                        h="100%"
                      >
                        {changelogs.map(({ imageUrl, slug, publishedAt }, index) => (
                          <Box key={index}>
                            <motion.div
                              layoutId={index === 0 && isInfiniteScrollingView ? slug : ``}
                              initial={{
                                scale: index === 0 && isInfiniteScrollingView ? 0.7 : 1,
                                opacity: 1,
                              }}
                              animate={{
                                scale: 1,
                              }}
                              transition={{ duration: 0.6 }}
                              style={{ height: "100%", width: "100%" }}
                            >
                              <Image
                                src={imageUrl}
                                alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                                sx={(t) => ({
                                  objectFit: "cover",
                                  cursor: "pointer",
                                  height: "360px",
                                  minHeight: "360px",
                                  width: "682px",
                                  ...(isMobileViewport && {
                                    height: "176px",
                                    width: "100%",
                                    minHeight: "100%",
                                  }),
                                })}
                                onClick={() => {
                                  handleFindWeekChangelog(publishedAt);
                                }}
                              />
                            </motion.div>
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Group
                        h="100%"
                        sx={{
                          gap: 0,
                        }}
                      >
                        <motion.div
                          layoutId={
                            index === 0 && isInfiniteScrollingView ? changelogs[0]?.slug : ``
                          }
                          initial={{
                            scale: index === 0 && isInfiniteScrollingView ? 0.7 : 1,
                            opacity: 1,
                          }}
                          animate={{
                            scale: 1,
                          }}
                          transition={{ duration: 0.6 }}
                          style={{ overflow: "hidden", height: "100%", flex: "3 1 0" }}
                        >
                          <Image
                            src={changelogs[0]?.imageUrl}
                            alt={`${Object.keys(monthChangelogsMap)[index]} - ${0}`}
                            sx={() => ({
                              minWidth: "176px",
                              objectFit: "cover",
                              width: "682px",
                              minHeight: "360px",
                              cursor: "pointer",
                              ...(isMobileViewport && {
                                width: "100%",
                                minHeight: "176px",
                              }),
                            })}
                            styles={{
                              root: {
                                height: "100%",
                              },
                              imageWrapper: {
                                height: "100%",
                              },
                              figure: {
                                height: "100%",
                              },
                              image: {
                                height: "100% !important",
                              },
                            }}
                            onClick={() => {
                              handleFindWeekChangelog(changelogs[0].publishedAt);
                            }}
                          />
                        </motion.div>

                        <Stack
                          h="100%"
                          spacing={0}
                          sx={{
                            flex: "1 1 0",
                          }}
                        >
                          {changelogs.slice(1, 3).map(({ imageUrl, publishedAt }, index) => (
                            <Image
                              key={index}
                              src={imageUrl}
                              alt={`${Object.keys(monthChangelogsMap)[index]} - ${index}`}
                              mah="50%"
                              maw="176px"
                              sx={(t) => ({
                                objectFit: "cover",
                                cursor: "pointer",
                              })}
                              styles={{
                                root: {
                                  height: "100%",
                                },
                                imageWrapper: {
                                  height: "100%",
                                },
                                figure: {
                                  height: "100%",
                                },
                                image: {
                                  height: "100% !important",
                                  borderLeft: "2px solid transparent",
                                  ...(index === 0 && {
                                    borderBottom: "2px solid transparent",
                                  }),
                                },
                              }}
                              onClick={() => {
                                handleFindWeekChangelog(publishedAt);
                              }}
                            />
                          ))}
                        </Stack>
                      </Group>
                    )}
                  </LazyLoad>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </Timeline>
      ))}
    </>
  );
};

export default Months;
