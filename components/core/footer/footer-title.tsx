import React from "react";
import { Text } from "@mantine/core";

type Props = {
  children: React.ReactNode;
  mode?: "light" | "dark";
};

export function FooterTitle(props: Props) {
  return (
    <Text fw="bold" color={props.mode === "dark" ? "white" : "landing.black"}>
      {props.children}
    </Text>
  );
}
