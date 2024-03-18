"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "~/lib/utils";
import { cva } from "class-variance-authority";

const variants = cva("flex items-center rounded-xl px-4 py-3 ", {
  variants: {
    status: {
      active: "bg-gray-50 text-indigo-600",
      inactive: "",
    },
    elements: {
      icon: "gap-2",
      text: "",
    },
  },
  defaultVariants: {
    status: "inactive",
  },
});

const NavbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { icon?: boolean }
>(({ className, icon, ...props }, ref) => {
  const active = usePathname() === props.href;

  return (
    <Link
      data-active={active}
      className={cn(
        variants({
          status: active ? "active" : "inactive",
          elements: icon ? "icon" : "text",
        }),
        className,
      )}
      ref={ref}
      {...props}
    ></Link>
  );
});

NavbarLink.displayName = "NavbarLink";

export default NavbarLink;
