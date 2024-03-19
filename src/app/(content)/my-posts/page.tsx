import { SignedIn, auth } from "@clerk/nextjs";
import { CreatePost } from "~/app/_components/create-post";
import Posts from "~/app/_components/posts";

export default async function MyPosts() {
  const session = auth();
  return (
    <section className="mr-auto flex max-h-[100dvh] w-full max-w-[600px] flex-shrink-0 flex-col gap-10 overflow-hidden py-6">
      <SignedIn>
        <CreatePost />
      </SignedIn>
      <Posts userId={session.userId!} />
    </section>
  );
}
