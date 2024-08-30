import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useEffect, useState } from "react";
import { Box, Group, Stack, Text } from "@mantine/core";

import usePageStatusStore from "lib/state/use-page-status-store";
import BackButton from "components/core/timeline/back-button";
import usePreviousPageUrl from "lib/state/use-previous-page-url-store";

export interface TimelineProps {
  date: string;
  children: ReactNode;
  id?: string;
  className?: string;
}

const Timeline = (props: TimelineProps) => {
  const { children, date } = props;
  const { prevUrl } = usePreviousPageUrl();

  const router = useRouter();
  const pageStatus = usePageStatusStore();
  const isLargerThan768 = useMediaQuery("(min-width: 768px)");

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(router.pathname.includes("/changelogs"));
  }, [router.pathname, isLargerThan768]);

  return (
    <Group
      id={props.id}
      className={props.className}
      display="flex"
      spacing={0}
      pt={isOpen ? (isLargerThan768 ? 28 : 8) : 0}
      px={isOpen ? 4 : 0}
      sx={(t) => ({
        minWidth: "100%",
        alignItems: "start",
        position: "relative",
        justifyContent: "center",
        visibility: pageStatus.isLoading ? "hidden" : "visible",

        [t.breakpoints.lg]: {
          minWidth: "834px",
        },
      })}
    >
      {isLargerThan768 && (
        <Stack
          top={isOpen ? "" : "-8px"}
          w="120px"
          spacing={4}
          sx={{
            position: "relative",
          }}
        >
          {isOpen && <BackButton />}

          <Text
            color="#868E96"
            w="125px"
            sx={{
              alignItems: "start",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {date}
            </motion.div>
          </Text>
        </Stack>
      )}
      <Group
        spacing={isOpen ? 0 : 8}
        display="relative"
        id={date.replace(/[\s_]+/g, "-").toLowerCase()}
        className="timeline-item"
        sx={{
          alignItems: "start",
        }}
      >
        {!isOpen && (
          <motion.div
            initial={{
              opacity: router.pathname.includes("/year") || prevUrl.includes("/year") ? 0 : 1,
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: isOpen ? "hidden" : "flex",
              alignItems: "start",
              justifyContent: "center",
              height: "100%",
              width: "10px",
              position: "absolute",
            }}
            hidden={isOpen}
          >
            <Box
              style={{
                height: "8px",
                width: "8px",
                background: "#0D131B",
                borderRadius: "100%",
                zIndex: 10,
              }}
            />
            <Box
              style={{
                position: "absolute",
                height: "100%",
                width: "2px",
                background: "#E9ECEF",
                zIndex: 5,
              }}
            />
          </motion.div>
        )}
        <Stack
          sx={(t) => ({
            alignItems: "start",
            gap: 0,
            [t.breakpoints.lg]: {
              gap: 2,
            },
          })}
        >
          {!isLargerThan768 && (
            <Stack
              top="-8px"
              spacing={4}
              mb={4}
              sx={{
                position: "relative",
              }}
            >
              {isOpen && <BackButton />}
              <Text color="#868E96" w="full">
                {date}
              </Text>
            </Stack>
          )}
          {children}
        </Stack>
      </Group>
    </Group>
  );
};

export default Timeline;
