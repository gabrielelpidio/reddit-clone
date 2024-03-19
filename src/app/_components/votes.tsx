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
}: {
  parentId: string;
  parentType: "comment" | "post";
}) => {
  const session = auth();

  const userId = session.userId!;

  const userVote = db.$with("sq").as(
    db
      .select({
        value: sum(schema.votes.value).mapWith(Number).as("value"),
      })
      .from(schema.votes)
      .where(
        and(eq(schema.votes.userId, userId), eq(schema.votes.postId, parentId)),
      )
      .limit(1),
  );

  const votesDB = await db
    .select({
      postId: schema.votes.postId,
      value: sum(schema.votes.value).mapWith(Number),
      userVote: sum(userVote.value).mapWith(Number),
    })
    .from(schema.votes)
    .where((table) => eq(table.postId, parentId))
    .groupBy(schema.votes.postId);

  const votes = votesDB[0];

  console.log(votes);

  return (
    <div className="flex flex-col items-center gap-2.5">
      <VoteButton type="upvote" parentId={parentId} parentType={parentType}>
        <ChevronsUpIcon
          className={cn(votes?.userVote === 1 && "text-indigo-500")}
        />
      </VoteButton>
      <span>{votes?.value ?? 0}</span>
      <VoteButton type="downvote" parentId={parentId} parentType={parentType}>
        <ChevronsUpIcon
          className={cn(
            votes?.userVote === -1 && "text-indigo-500",
            "rotate-180",
          )}
        />
      </VoteButton>
    </div>
  );
};

export default Votes;
