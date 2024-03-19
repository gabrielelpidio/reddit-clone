import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import UserRoundIcon from "./icons/user";
import Votes from "./votes";
import type * as schema from "~/server/db/schema";

type Post = typeof schema.posts.$inferSelect & {
  author: typeof schema.users.$inferSelect;
};

const formatDateToNow = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  if (hours < 24) {
    return `${hours} hours`;
  }
  if (days < 7) {
    return `${days} days`;
  }
  if (weeks < 4) {
    return `${weeks} weeks`;
  }
  if (months < 12) {
    return `${months} months`;
  }
  return `${years} years`;
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <Link
        className="flex items-center gap-4 py-10"
        href={`/posts/${post.id}`}
      >
        <Votes parentId={post.id} parentType="post" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarImage src={post.author.profilePicture ?? undefined} />
              <AvatarFallback>
                <UserRoundIcon className="size-8" />
              </AvatarFallback>
            </Avatar>
            <div className="text-gray-600">
              Posted by {post.author.username}
              {" " + formatDateToNow(post.createdAt) + " "}
              ago
            </div>
          </div>

          <h3 className="font-medium text-gray-900">{post.title}</h3>
          <p className="text-gray-700">{post.content}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
