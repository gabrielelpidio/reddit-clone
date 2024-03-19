"use client";

import * as React from "react";
import BaseVoteButton from "./ui/vote-button";
import ChevronsUpIcon from "./icons/chevrons-up";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export type VoteButtonProps = {
  type: "upvote" | "downvote";
  parentId: string;
  parentType: "comment" | "post";
  voted?: boolean;
} & { children: React.ReactNode };

const VoteButton = ({
  type,
  parentId,
  parentType,
  children,
  voted,
}: VoteButtonProps) => {
  const votesMutation = api.vote.send.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const router = useRouter();

  return (
    <BaseVoteButton
      className={cn(voted && "text-indigo-500")}
      onClick={(e) => {
        e.preventDefault();
        votesMutation.mutate({
          parentId,
          parentType,
          value: type === "upvote" ? "up" : "down",
        });
        router.refresh();
      }}
    >
      {children}
    </BaseVoteButton>
  );
};

export default VoteButton;
