"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const NavbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => {
  const active = usePathname() === props.href;

  return (
    <Link
      data-active={active}
      className="flex rounded-xl px-4 py-3 data-[active='true']:bg-gray-50 data-[active='true']:text-indigo-600"
      ref={ref}
      {...props}
    ></Link>
  );
});

NavbarLink.displayName = "NavbarLink";

export default NavbarLink;
