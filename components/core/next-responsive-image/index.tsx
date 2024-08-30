import React from "react";
import NextImage, { ImageProps } from "next/image";
import { Box, BoxProps } from "@mantine/core";

export interface NextResponsiveImageProps extends BoxProps {
  src: ImageProps["src"];
  alt: ImageProps["alt"];
  fit?: ImageProps["objectFit"];
  _nextImage?: Omit<ImageProps, "src" | "alt" | "objectFit">;
}

export const NextResponsiveImage = ({
  src,
  alt,
  fit,
  _nextImage,
  ...boxProps
}: NextResponsiveImageProps) => {
  return (
    <Box
      {...boxProps}
      sx={{
        position: "relative",
      }}
    >
      <NextImage src={src} alt={alt} layout="fill" objectFit={fit || "contain"} {..._nextImage} />
    </Box>
  );
};
