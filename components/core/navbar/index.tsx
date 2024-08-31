import { Header, Image } from "@mantine/core";

function Navbar() {
  return (
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
  );
}

export default Navbar;
