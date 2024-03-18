import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { CreatePost } from "./_components/create-post";
import Posts from "./_components/posts";

export default async function Home() {
  return (
    <main className="flex h-[100dvh]">
      <aside className="flex w-72 flex-shrink-0 flex-grow-0 flex-col justify-between border-r border-gray-200 py-6 pl-4 pr-5">
        <div className="flex">
          <nav className="pl-4">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/my-posts">My Posts</Link>
              </li>
            </ul>
          </nav>
          <hr className="divide-y" />
        </div>

        <div>
          <SignedOut>
            <Link href="/sign-up">Sign up</Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </aside>
      <section>
        <CreatePost />
        <Posts />
      </section>
    </main>
  );
}
