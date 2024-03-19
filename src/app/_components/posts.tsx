import * as React from "react";
import { db } from "~/server/db";
import PostCard from "./post-card";

const Posts = async () => {
  const posts = await db.query.posts.findMany({ with: { author: true } });
  return (
    <div className="h-full flex-shrink flex-grow overflow-auto">
      <div className="flex h-full flex-col pr-2">
        {posts.map((post, index) => (
          <React.Fragment key={post.id}>
            {index !== 0 && <hr className="divide-x bg-gray-200" />}
            <PostCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Posts;
