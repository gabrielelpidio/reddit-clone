import * as React from "react";
import { db } from "~/server/db";

const Posts = async () => {
  const posts = await db.query.posts.findMany({ with: { author: true } });
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By: {post.author?.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
