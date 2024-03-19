import * as React from "react";
import { db } from "~/server/db";
import { CreateComment } from "./create-comment";
import type * as schema from "~/server/db/schema";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { UserRoundIcon } from "lucide-react";
import { formatDateToNow } from "~/lib/utils";
import Votes from "./votes";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";
import CommentIcon from "./icons/comment";

type PostId = (typeof schema.posts.$inferSelect)["id"];
type Comment = typeof schema.comments.$inferSelect & {
  author: typeof schema.users.$inferSelect;
};

const Comments = async ({ postId }: { postId: PostId }) => {
  const comments = await db.query.comments.findMany({
    with: { author: true },
    where: (table, { eq }) => eq(table.postId, postId),
  });

  type CommentQuery = (typeof comments)[number];

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

  type CommentWithChildren = CommentQuery & {
    children: CommentWithChildren[];
  };

  const buildTree = (comment: CommentQuery): CommentWithChildren => {
    const children = groupedComments[comment.id] ?? [];
    return {
      ...comment,
      children: children.map(buildTree),
    };
  };

  const tree = rootComments.map(buildTree);

  const renderTree = (comment: (typeof tree)[number], divider = false) => {
    return (
      <>
        {divider && <hr className="divide-x bg-gray-200" />}
        <CommentCard key={comment.id} comment={comment}>
          {comment.children.length > 0 ? (
            <div className="pl-8">
              {comment.children.map((v) => renderTree(v))}
            </div>
          ) : null}
        </CommentCard>
      </>
    );
  };

  return (
    <div className="flex h-full flex-shrink flex-grow flex-col gap-6 overflow-auto pr-2">
      {tree.map((v, i) => renderTree(v, i !== 0))}
    </div>
  );
};

type CommentCardProps = { comment: Comment } & {
  children: React.ReactNode;
};

const CommentCard = ({ children, comment }: CommentCardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            {comment.author.profilePicture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={comment.author.profilePicture}
                className="size-full rounded-full object-cover"
                alt={comment.author.firstName + " " + comment.author.lastName}
              ></img>
            ) : (
              <AvatarFallback>
                <UserRoundIcon className="size-8" />
              </AvatarFallback>
            )}
          </Avatar>
          <div className="text-gray-600">
            Posted by {comment.author.username}
            {" " + formatDateToNow(comment.createdAt) + " "}
            ago
          </div>
        </div>

        <p className="text-gray-800">{comment.comment}</p>
        <Collapsible className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Votes
              parentType="comment"
              orientation="horizontal"
              parentId={comment.id}
            />
            <CollapsibleTrigger className="flex items-center gap-2 transition-colors data-[state='open']:text-indigo-500">
              <CommentIcon />
              Reply
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <CreateComment postId={comment.postId} parentId={comment.id} />
          </CollapsibleContent>
        </Collapsible>
      </div>
      {children}
    </div>
  );
};

export default Comments;
