import dayjs from "dayjs";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import { Box, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import MediumGrid from "components/core/years/medium-grid";
import LargeGrid from "components/core/years/large-grid";
import MoreItems from "components/core/more-items";
import SmallGrid from "components/core/years/small-grid";
import { IAggregatedChangelogs, IImagePreviewMeta } from "lib/models/view";

import Timeline from "../../components/layout/timeline";

interface IYearsProps {
  yearChangelogsMap: IAggregatedChangelogs;
}

const Years = ({ yearChangelogsMap }: IYearsProps) => {
  const isLargerThan768 = useMediaQuery("(min-width: 768px)");

  const sortedYearKeys = Object.keys(yearChangelogsMap || {}).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  const sortedChangelogsByYear: IImagePreviewMeta[][] = sortedYearKeys.map((year) => {
    return yearChangelogsMap[year];
  });

  return (
    <>
      {sortedChangelogsByYear.map((changelogs, index) => (
        <Timeline key={index} date={dayjs(sortedYearKeys[index]).format("YYYY")}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              display="flex"
              pb={index === sortedChangelogsByYear.length - 1 ? 0 : { xs: 12, sm: 16, md: 20 }}
            >
              <Stack
                onClick={() => {}}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Box
                  maw="682px"
                  w={{
                    xs: "100%",
                    sm: "100%",
                    md: "682px",
                  }}
                  display="flex"
                  onClick={() => {}}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    transition: "box-shadow 0.3s",
                    "& img": {
                      transition: "box-shadow 0.3s",
                    },
                    ":hover": {
                      boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                      "& img": {
                        boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                >
                  {changelogs.length > 27 && <MoreItems numberOfItems={changelogs.length - 27} />}
                  {changelogs.length === 3 && (
                    <LazyLoad height="421px" once>
                      <SmallGrid changelogs={changelogs} />
                    </LazyLoad>
                  )}
                  {((changelogs.length <= 9 && changelogs.length !== 3) || !isLargerThan768) && (
                    <LazyLoad
                      height={changelogs.length < 9 ? "300px" : "681px"}
                      offset={!isLargerThan768 ? 100 : 0}
                      once
                    >
                      <MediumGrid changelogs={changelogs} isFirstItem={index === 0} />
                    </LazyLoad>
                  )}
                  {changelogs.length > 9 && isLargerThan768 && (
                    <LazyLoad height="678px" offset={0} once>
                      <LargeGrid changelogs={changelogs} isFirstItem={index === 0} />
                    </LazyLoad>
                  )}
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </Timeline>
      ))}
    </>
  );
};

export default Years;
