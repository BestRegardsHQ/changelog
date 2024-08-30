import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Box, Group, Image, Stack } from "@mantine/core";

import { IGridProps } from "./grid-interfaces";

const SmallGrid = (props: IGridProps) => {
  const { changelogs } = props;
  const router = useRouter();

  return (
    <Group h="100%" mah="360px" maw={"682px"}>
      <Box w="100%">
        <motion.div
          layoutId={props.isFirstItem ? changelogs[0].slug : ``}
          initial={{
            scale: 1,
          }}
          transition={{
            duration: 0,
          }}
          style={{ overflow: "hidden" }}
        >
          <Image
            src={changelogs[0]?.imageUrl}
            alt={changelogs[0]?.slug}
            sx={(t) => ({
              cursor: "pointer",
              objectFit: "cover",
              minHeight: "176px",
              [t.breakpoints.lg]: {
                minHeight: "360px",
              },
            })}
            onClick={() => {
              const date = dayjs(changelogs[0]?.publishedAt);
              const targetDate = date.format("MMM YYYY");
              const year = date.format("YYYY");
              const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

              router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
            }}
          />
        </motion.div>
      </Box>
      <Stack w="176px" h="100%">
        {changelogs.slice(1, changelogs.length).map(({ imageUrl, slug, publishedAt }, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={slug}
            mah="176px"
            height="100%"
            maw="176px"
            sx={{
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => {
              const date = dayjs(publishedAt);
              const targetDate = date.format("MMM YYYY");
              const year = date.format("YYYY");
              const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

              router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
            }}
          />
        ))}
      </Stack>
    </Group>
  );
};

export default SmallGrid;
