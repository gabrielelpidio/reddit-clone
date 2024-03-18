import * as React from "react";
import { db } from "~/server/db";
import { CreateComment } from "./create-comment";
import Comments from "./comments";

const Posts = async () => {
  const posts = await db.query.posts.findMany({ with: { author: true } });
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>By: {post.author?.username}</p>
          <CreateComment postId={post.id} />
          <Comments postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
