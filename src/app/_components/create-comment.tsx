"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import type * as schema from "~/server/db/schema";
import { Button } from "./ui/button";
import ContentTextarea from "./content-textarea";
import { Card } from "./ui/card";
import { title } from "process";
import UserAvatar from "./current-user-avatar";

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
      <Card className="focus-within:shadow-post flex w-full gap-4 p-4 transition-shadow duration-300">
        <UserAvatar size="sm" />
        <div className="flex flex-grow flex-col gap-3">
          <ContentTextarea
            placeholder="Comment your thoughts"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            className="[field-sizing:content] focus-visible:outline-none"
          />
          <hr className="divide-x" />
          <div className="flex justify-end">
            <Button
              type="submit"
              className=""
              size="sm"
              disabled={createPost.isPending}
            >
              {createPost.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
