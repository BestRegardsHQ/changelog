import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Center,
  Container,
  em,
  getBreakpointValue,
  Image,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { TranslucentButton } from "./transluscent-button";

function TryJuneBanner() {
  const theme = useMantineTheme();
  const sm = getBreakpointValue(theme.breakpoints.sm);
  const isMobileViewport = useMediaQuery(`(max-width: ${em(sm)})`);

  return (
    <Container size="xl">
      <Space h={isMobileViewport ? "10vh" : "10vh"} />

      <Image
        pb="5vh"
        src={
          isMobileViewport
            ? "https://www.bestregards.me/images/brand/mobile_logo_text.svg"
            : "https://www.bestregards.me/images/brand/logo_text.svg"
        }
      />

      <Center mb="xl">
        <Box>
          <Button size="xl" component="a" href="https://www.bestregards.me/signup" compact>
            Create your free account
          </Button>
          <Space h="xl" />
        </Box>
      </Center>

      <Text pt="5vh" pb="5vh" align="center" color="dimmed" size="md">
        For creators, by creators <br />
        <Text component="span" size="sm">
          {" "}
          &copy; 2024
        </Text>
      </Text>
    </Container>
  );
}

export default TryJuneBanner;
