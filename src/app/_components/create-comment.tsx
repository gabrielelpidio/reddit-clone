"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import type * as schema from "~/server/db/schema";

type PostId = (typeof schema.posts.$inferSelect)["id"];
type CommentId = (typeof schema.comments.$inferSelect)["id"];

export function CreateComment({
  parentId,
  postId,
}: {
  parentId?: CommentId;
  postId: PostId;
}) {
  const router = useRouter();
  const [content, setContent] = useState("");

  const createPost = api.comment.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setContent("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ content, postId, parentId });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Comment your thoughts"
        name="content"
        onChange={(e) => setContent(e.target.value)}
        className=""
      />
      <button type="submit" className="" disabled={createPost.isPending}>
        {createPost.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
