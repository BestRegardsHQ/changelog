import React from "react";
import Link from "next/link";
import { Box, Button, Container, Stack, Text, Title } from "@mantine/core";

import { PageSectionProps } from "lib/models/page-section-props";
import { NextResponsiveImage } from "components/core/next-responsive-image";

interface TryJuneBannerProps extends PageSectionProps {
  subheading?: string;
  heading?: string | React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  buttonHrefType?: "external" | "internal";
  mode?: "light" | "dark";
}

function TryJuneBanner(props: TryJuneBannerProps) {
  const {
    heading = <>Set up BestRegards in 2 minutes</>,
    description = <>Description ...</>,
    buttonText = "Get started for free",
    buttonHref = "https://analytics.june.so/start",
    buttonHrefType = "external",
    mode = "light",
  } = props;

  const LinkOrFragment =
    buttonHrefType === "external"
      ? React.Fragment
      : (linkProps: { children: React.ReactNode }) => (
          <Link href={buttonHref} passHref prefetch={false} {...linkProps} />
        );

  return (
    <Container size="lg" position="relative" px={[0, 0, 12, 12, 40]} {...props._wrapper}>
      {/* Glowing background */}
      {mode === "dark" && (
        <Box
          pos="absolute"
          bg="purple.500"
          opacity={0.5}
          top="64px"
          bottom="64px"
          left="-16px"
          right="-16px"
          sx={{
            zIndex: "auto",
            filter: "blur(200px)",
          }}
        />
      )}
      <Box
        {...(mode === "dark" && {
          bg: "purple.900",
          border: "2px solid",
          borderColor: "purple.800",
          borderRadius: "2xl",
          filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.2))",
        })}
        sx={(t) => ({
          position: "relative",
          padding: 8,
          [t.breakpoints.lg]: {
            padding: "16 20",
          },
        })}
      >
        {/* Background with opacity */}
        <Box
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.05}
          bg="linear-gradient(129.77deg, #ADABFF 16.97%, #9C88DD 64.88%, #CB8AE8 94.21%);"
          sx={(t) => ({
            borderRadius: "2xl",
            position: "absolute",
          })}
        />
        {/* Background grid */}
        <Box
          right={0}
          bottom={0}
          top={0}
          sx={{
            position: "absolute",
          }}
        >
          <NextResponsiveImage
            h="full"
            src="/try-june-bg-grid.svg"
            alt="Background grid"
            sx={(t) => ({
              aspectRatio: "0.7788018433",
              visibility: "hidden",
              [t.breakpoints.lg]: {
                visibility: "visible",
              },
            })}
          />
        </Box>
        <Stack align="center" spacing={6}>
          <Stack align="center" spacing={4} pos="relative">
            <Title order={2} align={"center"}>
              {heading}
            </Title>
            <Text
              size="md"
              align={"center"}
              sx={(t) => ({
                [t.breakpoints.lg]: {
                  maxWidth: "75%",
                },
              })}
            >
              {description}
            </Text>
          </Stack>
          <LinkOrFragment>
            <Button
              w="full"
              component="a"
              size="md"
              variant="gradient"
              rel="noreferrer noopener"
              className="g-conversion-button"
              sx={(t) => ({
                [t.breakpoints.lg]: {
                  width: "unset",
                },
              })}
              {...(buttonHrefType === "external" && { href: buttonHref })}
            >
              {buttonText}
            </Button>
          </LinkOrFragment>
        </Stack>
      </Box>
    </Container>
  );
}

export default TryJuneBanner;
