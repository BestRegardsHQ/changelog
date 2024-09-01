import { Box, Image, Skeleton } from "@mantine/core";
import dayjs from "dayjs";
import { IImagePreviewMeta } from "lib/models/view";
import { useRouter } from "next/router";

interface ISubGridProps {
  changelogs: IImagePreviewMeta[];
  rowLength?: number;
}

const LargeSubGrid = (props: ISubGridProps) => {
  const { changelogs, rowLength } = props;
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "grid",
        gap: "2px",
        gridTemplateColumns: `repeat(${changelogs.length}, 1fr)`,
      }}
    >
      {changelogs.map(({ imageUrl, slug, publishedAt }, subI) => (
        <Box key={subI}>
          <Image
            src={imageUrl}
            alt={slug}
            height={rowLength - 1 <= 4 ? "198px" : "98px"}
            width={`${400 / changelogs.length - 2}px`}
            sx={{
              cursor: "pointer",
              objectFit: "cover",
            }}
            withPlaceholder
            placeholder={
              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <Skeleton
                  height={rowLength - 1 <= 4 ? "198px" : "98px"}
                  width={`${400 / changelogs.length - 2}px`}
                />
              </Box>
            }
            onClick={() => {
              const date = dayjs(publishedAt);
              const targetDate = date.format("MMM YYYY");
              const year = date.format("YYYY");
              const hash = targetDate.replace(/[\s_]+/g, "-").toLowerCase();

              router.push(`/years/${year}#${hash}`, undefined, { scroll: true });
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default LargeSubGrid;
