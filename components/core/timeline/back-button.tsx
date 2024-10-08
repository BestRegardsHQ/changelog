import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Text } from "@mantine/core";
import { motion } from "framer-motion";

import usePreviousPageUrl from "lib/state/use-previous-page-url-store";

const BackButton = () => {
  const { prevUrl } = usePreviousPageUrl();
  const router = useRouter();

  const [, setIsLoading] = useState(false);

  return (
    <Box
      display="flex"
      onClick={() => {
        if (prevUrl) {
          router.push(prevUrl);
          setIsLoading(true);
        } else {
          router.push("/");
          setIsLoading(true);
        }
      }}
      sx={(t) => ({
        gap: "5px",
        alignItems: "center",
        justifyContent: "start",
        cursor: "pointer",
        ".arrow-line": {
          transition: "fill 0.2s ease",
        },
        ".arrow-head": {
          transition: "stroke 0.2s ease",
        },
        ".back-button-text": {
          transition: "color 0.2s ease",
        },
        ":hover": {
          color: t.colors.green[6],

          ".arrow-line": {
            fill: t.colors.green[6],
          },
          ".arrow-head": {
            stroke: t.colors.green[6],
          },
          ".back-button-text": {
            color: t.colors.green[6],
          },
        },
      })}
    >
      <svg
        width="11"
        height="10"
        viewBox="0 0 11 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2_2540)">
          <path
            d="M1.25 5.75L10.25 5.75C10.6642 5.75 11 5.41421 11 5C11 4.58579 10.6642 4.25 10.25 4.25L1.25 4.25C0.835787 4.25 0.5 4.58579 0.5 5C0.5 5.41421 0.835787 5.75 1.25 5.75Z"
            fill="transparent"
            className="arrow-line"
          />
          <path
            className="arrow-head"
            d="M5.25 9L1.25 5L5.25 1"
            stroke="#868E96"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_2540">
            <rect width="11" height="10" fill="white" transform="translate(11 10) rotate(-180)" />
          </clipPath>
        </defs>
      </svg>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <Text
          color="dimmed"
          sx={(t) => ({
            ":hover": {
              color: t.colors.green[6],
            },
          })}
        >
          Back
        </Text>
      </motion.div>
    </Box>
  );
};

export default BackButton;
