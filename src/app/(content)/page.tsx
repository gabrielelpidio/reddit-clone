import { SignedIn } from "@clerk/nextjs";
import { CreatePost } from "../_components/create-post";
import Posts from "../_components/posts";

export default async function Home() {
  return (
    <>
      <SignedIn>
        <CreatePost />
      </SignedIn>
      <Posts />
    </>
  );
}
