"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

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
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title of your post"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=""
      />
      <input
        type="text"
        placeholder="Share your thoughts with the world!"
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
