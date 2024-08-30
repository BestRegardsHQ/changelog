import { Box, Image, Stack } from "@mantine/core";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IGridProps } from "./grid-interfaces";

const MediumGrid = (props: IGridProps) => {
  const { changelogs } = props;
  const router = useRouter();

  return changelogs.length < 9 ? (
    <Stack spacing="8px">
      {changelogs
        .reverse()
        .reduce((result, item, index) => {
          const rowIndex = Math.floor(index / 3);
          if (!result[rowIndex]) {
            result[rowIndex] = [];
          }
          result[rowIndex].push(item);
          return result;
        }, [])
        .reverse()
        .map((rowItems, i) => (
          <Box
            sx={{
              display: "grid",
              gap: "8px",
              templateColumns: `repeat(${rowItems.length}, 1fr)`,
            }}
            key={i}
          >
            {rowItems.reverse().map(({ imageUrl, slug }, index) =>
              imageUrl ? (
                <motion.div
                  layoutId={i === 0 && props.isFirstItem ? rowItems[0].slug : ``}
                  initial={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 0,
                  }}
                  style={{ height: "100%" }}
                >
                  <Image
                    key={index}
                    src={imageUrl}
                    alt={slug}
                    height="100%"
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              ) : (
                <Box bg="#F1F3F5" h="full" w="full" />
              )
            )}
          </Box>
        ))}
    </Stack>
  ) : (
    <Box
      sx={{
        display: "grid",
        gap: "8px",
        templateColumns: "repeat(8, 1fr)",
        templateRows: "repeat(7, 1fr)",
        height: "100%",
        maxHeight: "601px",
      }}
    >
      {changelogs.slice(0, 9).map(({ imageUrl, slug, publishedAt }, index) => (
        <Box
          key={index}
          sx={{
            rowSpan: [0, 2, 3].includes(index) ? 3 : 2,
            colSpan: [1, 3, 6].includes(index) ? 4 : 2,
          }}
        >
          <motion.div
            layoutId={index === 0 && props.isFirstItem ? slug : ``}
            initial={{
              scale: 1,
            }}
            transition={{
              duration: 0,
            }}
            style={{ height: "100%" }}
          >
            <Image
              src={imageUrl}
              alt={slug}
              height="100%"
              width="100%"
              sx={{
                cursor: "pointer",
                objectFit: "cover",
              }}
              onClick={() => {
                const date = dayjs(publishedAt);
                const targetDate = date.format("MMM YYYY");
                const year = date.format("YYYY");
                const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

                router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
              }}
            />
          </motion.div>
        </Box>
      ))}
    </Box>
  );
};

export default MediumGrid;
