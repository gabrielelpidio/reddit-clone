import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CreatePost } from "./_components/create-post";
import Posts from "./_components/posts";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SignedOut>
        <Link href="/sign-up">Sign up</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <section>
        <CreatePost />
        <Posts />
      </section>
    </main>
  );
}
