import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import * as React from "react";
import { CreatePost } from "../_components/create-post";
import NavbarLink from "../_components/navbar/link";
import Posts from "../_components/posts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh]">
      <aside className="flex w-72 flex-shrink-0 flex-grow-0 flex-col justify-between border-r border-gray-200 py-6 pl-4 pr-5">
        <nav className="flex flex-col items-stretch">
          <NavbarLink href="/">Home</NavbarLink>
          <NavbarLink href="/my-posts">My Posts</NavbarLink>
        </nav>

        <div>
          <SignedOut>
            <Link href="/sign-up">Sign up</Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </aside>
      <main>{children}</main>
    </div>
  );
}
