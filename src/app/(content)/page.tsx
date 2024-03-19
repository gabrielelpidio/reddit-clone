import { SignedIn } from "@clerk/nextjs";
import { CreatePost } from "../_components/create-post";
import Posts from "../_components/posts";

export default async function Home() {
  return (
    <section className="mr-auto flex max-h-[100dvh] w-full max-w-[600px] flex-shrink-0 flex-col gap-10 overflow-hidden py-6">
      <SignedIn>
        <CreatePost />
      </SignedIn>
      <Posts />
    </section>
  );
}
