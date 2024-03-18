import * as React from "react";
import VoteButton from "./ui/vote-button";
import ChevronsUpIcon from "./icons/chevrons-up";

const Votes = () => {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <VoteButton>
        <ChevronsUpIcon />
      </VoteButton>
      <span>105</span>
      <VoteButton>
        <ChevronsUpIcon className="rotate-180" />
      </VoteButton>
    </div>
  );
};

export default Votes;
