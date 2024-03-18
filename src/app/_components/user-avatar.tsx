"use client";
import * as React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";

const UserAvatar = ({
  size,
}: {
  size?: React.ComponentPropsWithoutRef<typeof Avatar>["size"];
}) => {
  const user = useUser();
  return (
    <Avatar size={size}>
      <AvatarImage src={user.user?.imageUrl} />
      <AvatarFallback>User</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
