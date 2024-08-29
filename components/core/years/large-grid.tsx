import { Box, Grid, GridItem, HStack, Image, Skeleton, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IGridProps } from "./grid-interfaces";
import LargeSubGrid from "./large-sub-grid";

const LargeGrid = (props: IGridProps) => {
  const { changelogs } = props;
  const router = useRouter()

  return (
    <Grid
      gap={"2px"}
      templateColumns="repeat(1, 1fr)"
      templateRows={`repeat(${Math.floor(changelogs.slice(0, 27).length / 9)}, 1fr)`}
      height="100%"
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
          <GridItem rowSpan={1} key={i}>
            <HStack spacing="2px">
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
                      objectFit={"cover"}
                      fallback={
                        <Box overflow="hidden">
                          <Skeleton
                            height="198px"
                            width={rowItems.length === 1 ? "100%" : "282px"}
                          />
                        </Box>
                      }
                      onClick={() => {
                        const date = dayjs(rowItems[0].publishedAt);
                        const targetDate = date.format("MMM YYYY");
                        const year = date.format("YYYY");
                        const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

                        router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
                      }}
                    />
                  </motion.div>
                  <VStack spacing="2px">
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
                  </VStack>
                </>
              )}
              {i % 2 === 1 && (
                <>
                  <VStack spacing="2px">
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
                  </VStack>
                  <Image
                    src={rowItems[rowItems.length - 1].imageUrl}
                    alt={rowItems[rowItems.length - 1].slug}
                    h="198px"
                    w={rowItems.length === 1 ? "100%" : "282px"}
                    objectFit={"cover"}
                    fallback={
                      <Box overflow="hidden">
                        <Skeleton height="198px" width={rowItems.length === 1 ? "100%" : "282px"} />
                      </Box>
                    }
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
            </HStack>
          </GridItem>
        ))}
    </Grid>
  );
};

export default LargeGrid;
