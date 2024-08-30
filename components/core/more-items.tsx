import { Box } from "@mantine/core";

const MoreItems = (props: { numberOfItems: number }) => {
  const { numberOfItems } = props;

  return (
    <Box
      w={10}
      h={6}
      display="flex"
      bottom={4}
      right={4}
      color="white"
      sx={{
        zIndex: 999,
        fontWeight: 500,
        fontSize: "12px",
        borderRadius: 999,
        textAlign: "center",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "14.52px",
      }}
      bg="linear-gradient(180deg, #6868F7 0%, #4C40D9 100%)"
    >
      +{numberOfItems}
    </Box>
  );
};

export default MoreItems;
