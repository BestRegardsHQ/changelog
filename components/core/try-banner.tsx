import React from "react";
import {
  em,
  Box,
  Text,
  Group,
  Image,
  Space,
  Button,
  Center,
  Container,
  useMantineTheme,
  getBreakpointValue,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function TryJuneBanner() {
  const theme = useMantineTheme();
  const sm = getBreakpointValue(theme.breakpoints.sm);
  const isMobileViewport = useMediaQuery(`(max-width: ${em(sm)})`);

  return (
    <Container size="xl">
      <Space h="10vh" />

      <Image
        pb="5vh"
        src={
          isMobileViewport
            ? "https://www.bestregards.me/images/brand/mobile_logo_text.svg"
            : "https://www.bestregards.me/images/brand/logo_text.svg"
        }
      />

      <Group
        sx={{
          justifyContent: "center",
        }}
        mb="xl"
      >
        <a
          href="https://www.producthunt.com/posts/bestregards?embed=true&utm_source=badge-top-post-topic-badge&utm_medium=badge&utm_souce=badge-bestregards"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=454223&theme=dark&period=weekly&topic_id=164"
            alt="BestRegards - Never&#0032;pay&#0032;another&#0032;email&#0032;marketing&#0032;subscription | Product Hunt"
            style={{
              width: "250px",
              height: "54px",
            }}
            width="250"
            height="54"
          />
        </a>

        <a
          href="https://www.producthunt.com/posts/bestregards?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-bestregards"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=454223&theme=dark&period=daily"
            alt="BestRegards - Never&#0032;pay&#0032;another&#0032;email&#0032;marketing&#0032;subscription | Product Hunt"
            style={{
              width: "250px",
              height: "54px",
            }}
            width="250"
            height="54"
          />
        </a>
      </Group>

      <Center mb="xl">
        <Box>
          <Button size="lg" component="a" href="https://www.bestregards.me/signup">
            Create your free account
          </Button>
          <Space h="xl" />
        </Box>
      </Center>
    </Container>
  );
}

export default TryJuneBanner;
