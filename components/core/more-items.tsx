import { Box } from "@mantine/core";

const MoreItems = (props: { numberOfItems: number }) => {
  const { numberOfItems } = props;

  return (
    <Box
      px="xs"
      py={3}
      right={4}
      bottom={4}
      bg="indigo"
      color="white"
      sx={(t) => ({
        zIndex: 999,
        fontWeight: 500,
        fontSize: "12px",
        borderRadius: 999,
        textAlign: "center",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "14.52px",
        boxShadow: t.shadows.lg,
      })}
    >
      +{numberOfItems}
    </Box>
  );
};

export default MoreItems;
