import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CreatePost } from "../_components/create-post";
import Posts from "../_components/posts";
import NavbarLink from "../_components/navbar/link";

export default async function Home() {
  return (
    <div className="flex">
      <div className="w-[143px] flex-shrink flex-grow-0"></div>
      <section className="mr-auto flex max-h-[100dvh] w-full max-w-[600px] flex-shrink-0 flex-col gap-10 overflow-hidden py-6">
        <CreatePost />
        <Posts />
      </section>
    </div>
  );
}
