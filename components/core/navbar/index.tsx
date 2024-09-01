import { Box, Container, Group, Header, Image } from "@mantine/core";
import { TranslucentButton } from "../transluscent-button";

function Navbar() {
  return (
    <Container size="xl">
      <Group>
        <Box component="a" href="/">
          <Header
            height="max-content"
            p="md"
            sx={{
              border: 0,
              background: "rgb(5, 5, 10)",
            }}
          >
            <Image src="/logo.svg" alt="BestRegards logo" width={200} mr="auto" />
          </Header>
        </Box>

        <TranslucentButton component="a" href="https://www.bestregards.me" ml="auto">
          Log in
        </TranslucentButton>
      </Group>
    </Container>
  );
}

export default Navbar;
