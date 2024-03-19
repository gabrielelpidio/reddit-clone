"use client";
import * as React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";
import UserRoundIcon from "./icons/user";

const UserAvatar = ({
  size,
}: {
  size?: React.ComponentPropsWithoutRef<typeof Avatar>["size"];
}) => {
  const user = useUser();
  return (
    <Avatar size={size}>
      {user.user?.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.user.imageUrl}
          className="size-full rounded-full object-cover"
          alt={user.user.fullName ?? "Profile picture"}
        ></img>
      ) : (
        <AvatarFallback>
          <UserRoundIcon className="size-8" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
