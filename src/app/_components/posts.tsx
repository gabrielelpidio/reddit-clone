import * as React from "react";
import { db } from "~/server/db";
import PostCard from "./post-card";
import Link from "next/link";

const Posts = async ({ userId }: { userId?: string }) => {
  const posts = await db.query.posts.findMany({
    with: { author: true },
    ...(userId ? { where: (table, { eq }) => eq(table.authorId, userId) } : {}),
  });
  return (
    <div className="h-full flex-shrink flex-grow overflow-auto">
      <div className="flex h-full flex-col pr-2">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            {index !== 0 && <hr className="divide-x bg-gray-200" />}
            <Link href={`/posts/${post.id}`} className="py-10">
              <PostCard post={post} />
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Posts;
