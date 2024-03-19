import * as React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import UserRoundIcon from "./icons/user";
import Votes from "./votes";
import type * as schema from "~/server/db/schema";
import { formatDateToNow } from "~/lib/utils";

type Post = typeof schema.posts.$inferSelect & {
  author: typeof schema.users.$inferSelect;
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="flex items-center gap-4">
      <Votes parentId={post.id} parentType="post" />
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            {post.author.profilePicture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.author.profilePicture}
                className="size-full rounded-full object-cover"
                alt={post.author.firstName + " " + post.author.lastName}
              ></img>
            ) : (
              <AvatarFallback>
                <UserRoundIcon className="size-8" />
              </AvatarFallback>
            )}
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
    </div>
  );
};

export default PostCard;
