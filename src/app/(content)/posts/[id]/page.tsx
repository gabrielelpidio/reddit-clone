import { SignedIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";
import Comments from "~/app/_components/comments";
import { CreateComment } from "~/app/_components/create-comment";
import PostCard from "~/app/_components/post-card";
import { db } from "~/server/db";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await db.query.posts.findFirst({
    where: (table, { eq }) => eq(table.id, id),
    with: { author: true },
  });

  if (!post) {
    notFound();
  }
  return (
    <section className="mr-auto flex max-h-[100dvh] w-full max-w-[600px] flex-shrink-0 flex-col gap-6 overflow-hidden py-6">
      <Link href="/" className="flex items-center gap-4 text-gray-800">
        <ArrowLeft className="size-5 stroke-current" />
        Back to posts
      </Link>
      <PostCard post={post}></PostCard>
      <SignedIn>
        <CreateComment postId={post.id} />
      </SignedIn>
      <hr className="py divide-x bg-gray-200" />
      <h4 className="text-sm font-medium"> All comments </h4>
      <Comments postId={post.id}></Comments>
    </section>
  );
};

export default Page;
