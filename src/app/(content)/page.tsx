import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CreatePost } from "../_components/create-post";
import Posts from "../_components/posts";
import NavbarLink from "../_components/navbar/link";

export default async function Home() {
  return (
    <>
      <CreatePost />
      <Posts />
    </>
  );
}
