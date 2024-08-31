import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode, useEffect, useState } from "react";
import { Box, Group, Space, Stack, Text } from "@mantine/core";

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
      spacing="lg"
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
          spacing={2}
          top={isOpen ? "" : "-8px"}
          sx={{
            position: "relative",
          }}
        >
          {isOpen && <BackButton />}

          <Text size="sm" color="dimmed">
            {date}
          </Text>
        </Stack>
      )}

      <Group
        display="relative"
        id={date.replace(/[\s_]+/g, "-").toLowerCase()}
        className="timeline-item"
      >
        {!isOpen && isLargerThan768 && (
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
              sx={(t) => ({
                zIndex: 10,
                height: "8px",
                width: "8px",
                borderRadius: "100%",
                background: t.colors.green[6],
              })}
            />
            <Box
              sx={(t) => ({
                position: "absolute",
                height: "100%",
                width: "2px",
                zIndex: 5,
                background: t.colors.dark[3],
                opacity: 0.4,
              })}
            />
          </motion.div>
        )}

        {!isOpen && <Space w="xl" />}

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
              <Text color="dimmed">{date}</Text>
            </Stack>
          )}

          {children}
        </Stack>
      </Group>
    </Group>
  );
};

export default Timeline;
