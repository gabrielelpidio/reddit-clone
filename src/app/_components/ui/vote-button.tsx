import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "~/lib/utils";

const buttonVariants = cva("size-5 flex items-center justify-center", {
  variants: {
    variant: {
      active: "text-indigo-500",
      default: "",
    },
  },
});

export interface VoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const BaseVoteButton = React.forwardRef<HTMLButtonElement, VoteButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
BaseVoteButton.displayName = "Button";

export default BaseVoteButton;
