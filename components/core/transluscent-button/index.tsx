import {
  Button,
  ButtonProps,
  DefaultMantineColor,
  createPolymorphicComponent,
} from "@mantine/core";
import React, { forwardRef } from "react";

type Props = ButtonProps & {
  color: DefaultMantineColor;
  onClick?: () => void;
};

export const _Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, color = "green", ...props }, ref) => (
    <Button
      {...props}
      ref={ref}
      sx={(t) => ({
        border: 0,
        backgroundColor: t.fn.rgba(t.colors[color][6], 0.1),
        color: t.colors[color][5],
        ":hover": {
          backgroundColor: t.fn.rgba(t.colors[color][6], 0.2),
        },
      })}
    >
      {children}
    </Button>
  )
);

export const TranslucentButton = createPolymorphicComponent<"button", ButtonProps>(_Button);
