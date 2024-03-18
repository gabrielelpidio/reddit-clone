import * as React from "react";
import { db } from "~/server/db";
import { CreateComment } from "./create-comment";
import type * as schema from "~/server/db/schema";

type PostId = (typeof schema.posts.$inferSelect)["id"];

const Comments = async ({ postId }: { postId: PostId }) => {
  const comments = await db.query.comments.findMany({
    with: { author: true },
  });

  type Comment = (typeof comments)[number];

  const groupedComments = comments.reduce(
    (acc, comment) => {
      if (comment.parentId) {
        if (!acc[comment.parentId]) {
          acc[comment.parentId] = [];
        }
        acc[comment.parentId]?.push(comment);
      }
      return acc;
    },
    {} as Record<PostId, typeof comments>,
  );

  const rootComments = comments.filter((comment) => !comment.parentId);

  type CommentWithChildren = Comment & {
    children: CommentWithChildren[];
  };

  const buildTree = (comment: Comment): CommentWithChildren => {
    const children = groupedComments[comment.id] ?? [];
    return {
      ...comment,
      children: children.map(buildTree),
    };
  };

  const tree = rootComments.map(buildTree);

  const renderTree = (comment: (typeof tree)[number]) => {
    console.log(comment);
    return (
      <div key={comment.id} className="pl-2">
        <p>{comment.comment}</p>
        <p>By: {comment.author?.username}</p>
        <CreateComment postId={postId} parentId={comment.id} />
        {comment.children.map((children) => renderTree(children))}
      </div>
    );
  };

  return <div>{tree.map(renderTree)}</div>;
};

export default Comments;
