import * as React from "react";
import VoteButton from "./votes.client";
import ChevronsUpIcon from "./icons/chevrons-up";
import * as schema from "~/server/db/schema";
import { db } from "~/server/db";
import { eq, sum, count, sql, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs";
import { cn } from "~/lib/utils";

const Votes = async ({
  parentId,
  parentType = "post",
  orientation = "vertical",
}: {
  parentId: string;
  parentType: "comment" | "post";
  orientation?: "horizontal" | "vertical";
}) => {
  const session = auth();

  const userId = session.userId!;

  const userVoteDB = userId
    ? db
        .select({
          values: sum(schema.votes.value).mapWith(Number),
        })
        .from(schema.votes)
        .where(
          and(
            eq(schema.votes.userId, userId),
            eq(
              parentType === "comment"
                ? schema.votes.commentId
                : schema.votes.postId,
              parentId,
            ),
          ),
        )
        .limit(1)
    : [];

  const votesDB = db
    .select({
      value: sum(schema.votes.value).mapWith(Number),
    })
    .from(schema.votes)
    .where(
      eq(
        parentType === "comment" ? schema.votes.commentId : schema.votes.postId,
        parentId,
      ),
    )
    .groupBy(schema.votes.postId);

  const [votesResolved, userVoteResolved] = await Promise.all([
    votesDB,
    userVoteDB,
  ]);

  const votes = votesResolved[0];
  const userVote = userVoteResolved[0];

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        orientation === "vertical" && "flex-col",
      )}
    >
      <VoteButton type="upvote" parentId={parentId} parentType={parentType}>
        <ChevronsUpIcon
          className={cn(userVote?.values === 1 && "text-indigo-500")}
        />
      </VoteButton>
      <span>{votes?.value ?? 0}</span>
      <VoteButton type="downvote" parentId={parentId} parentType={parentType}>
        <ChevronsUpIcon
          className={cn(
            userVote?.values === -1 && "text-indigo-500",
            "rotate-180",
          )}
        />
      </VoteButton>
    </div>
  );
};

export default Votes;
