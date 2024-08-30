import { Box, Group, Image, Stack } from "@mantine/core";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IGridProps } from "./grid-interfaces";
import LargeSubGrid from "./large-sub-grid";

const LargeGrid = (props: IGridProps) => {
  const { changelogs } = props;
  const router = useRouter();

  return (
    <Box
      sx={{
        gap: "2px",
        display: "grid",
        height: "100%",
        templateColumns: "repeat(1, 1fr)",
        templateRows: `repeat(${Math.floor(changelogs.slice(0, 27).length / 9)}, 1fr)`,
      }}
    >
      {changelogs
        .slice(0, 27)
        .reduce((result, item, index) => {
          const rowIndex = Math.floor(index / 9);
          if (!result[rowIndex]) {
            result[rowIndex] = [];
          }
          result[rowIndex].push(item);

          return result;
        }, [])
        .map((rowItems, i) => (
          <Box
            key={i}
            sx={{
              rowSpan: 1,
            }}
          >
            <Group spacing="2px">
              {i % 2 === 0 && (
                <>
                  <motion.div
                    layoutId={i === 0 && props.isFirstItem ? rowItems[0].slug : ``}
                    initial={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 0,
                    }}
                  >
                    <Image
                      src={rowItems[0].imageUrl}
                      alt={rowItems[0].slug}
                      h="198px"
                      w={rowItems.length === 1 ? "100%" : "282px"}
                      sx={{
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        const date = dayjs(rowItems[0].publishedAt);
                        const targetDate = date.format("MMM YYYY");
                        const year = date.format("YYYY");
                        const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

                        router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
                      }}
                    />
                  </motion.div>
                  <Stack spacing="2px">
                    {rowItems
                      .slice(1, rowItems.length)
                      .reduce((result, item, index) => {
                        const rowIndex = Math.floor(index / 4);
                        if (!result[rowIndex]) {
                          result[rowIndex] = [];
                        }
                        result[rowIndex].push(item);

                        return result;
                      }, [])
                      .map((subGridRowItems, subIndex) => (
                        <LargeSubGrid
                          key={subIndex}
                          changelogs={subGridRowItems}
                          rowLength={rowItems.length}
                        />
                      ))}
                  </Stack>
                </>
              )}
              {i % 2 === 1 && (
                <>
                  <Stack spacing="2px">
                    {rowItems
                      .slice(0, rowItems.length - 1)
                      .reduce((result, item, index) => {
                        const rowIndex = Math.floor(index / 4);
                        if (!result[rowIndex]) {
                          result[rowIndex] = [];
                        }
                        result[rowIndex].push(item);

                        return result;
                      }, [])
                      .map((subGridRowItems, subIndex) => (
                        <LargeSubGrid
                          key={subIndex}
                          changelogs={subGridRowItems}
                          rowLength={rowItems.length}
                        />
                      ))}
                  </Stack>
                  <Image
                    src={rowItems[rowItems.length - 1].imageUrl}
                    alt={rowItems[rowItems.length - 1].slug}
                    h="198px"
                    w={rowItems.length === 1 ? "100%" : "282px"}
                    sx={{
                      cursor: "pointer",
                      objectFit: "cover",
                    }}
                    onClick={() => {
                      const date = dayjs(rowItems[rowItems.length - 1].publishedAt);
                      const targetDate = date.format("MMM YYYY");
                      const year = date.format("YYYY");
                      const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

                      router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
                    }}
                  />
                </>
              )}
            </Group>
          </Box>
        ))}
    </Box>
  );
};

export default LargeGrid;
