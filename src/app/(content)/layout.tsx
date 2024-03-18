import { SignedOut, SignedIn } from "@clerk/nextjs";
import * as React from "react";
import NavbarLink from "../_components/navbar/link";
import HomeIcon from "../_components/icons/home";
import LogInIcon from "../_components/icons/log-in";
import CommentText from "../_components/icons/comment-text";
import UserProfile from "../_components/navbar/UserButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[100dvh]">
      <aside className="flex w-72 flex-shrink-0 flex-grow-0 flex-col justify-between border-r border-gray-200 py-6 pl-4 pr-5">
        <nav className="flex flex-col items-stretch">
          <NavbarLink href="/" icon>
            <HomeIcon /> Home
          </NavbarLink>
          <SignedIn>
            <NavbarLink href="/my-posts" icon>
              <CommentText /> My Posts
            </NavbarLink>
          </SignedIn>
          <SignedOut>
            <NavbarLink href="/sign-in" icon>
              <LogInIcon />
              Log in
            </NavbarLink>
          </SignedOut>
        </nav>

        <div>
          <SignedIn>
            <UserProfile />
          </SignedIn>
        </div>
      </aside>
      <main className="w-full flex-shrink flex-grow">{children}</main>
    </div>
  );
}
