"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import ContentTextarea from "./content-textarea";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import UserAvatar from "./user-avatar";
import { Card } from "./ui/card";

export function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
      setContent("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ title, content });
      }}
      className="flex-grow"
    >
      <Card className="focus-within:shadow-post flex w-full gap-4 p-4 transition-shadow duration-300">
        <UserAvatar size="sm" />
        <div className="flex flex-grow flex-col gap-3">
          <input
            type="text"
            placeholder="Title of your post"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus-visible:outline-none"
          />
          <ContentTextarea
            placeholder="Share your thoughts with the world!"
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
