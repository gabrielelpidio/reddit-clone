"use client";
import * as React from "react";
import { useUser } from "@clerk/nextjs";

const UserProfile = () => {
  const user = useUser();
  if (!user.isLoaded || !user.isSignedIn) return null;
  return (
    <div className="flex items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img
        src={user.user?.imageUrl}
        alt={user.user?.fullName ?? "User profile picture"}
        className="size-8 rounded-full object-cover"
      />
      <span className="w-full truncate">{user.user?.fullName}</span>
    </div>
  );
};

export default UserProfile;
