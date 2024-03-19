"use client";
import * as React from "react";
import {
  useUser,
  UserProfile as UserProfileClerk,
  useAuth,
  useSession,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "@clerk/nextjs/server";
import { LogOutIcon } from "lucide-react";

const UserProfile = () => {
  const [open, setOpen] = React.useState(false);
  const user = useUser();
  const auth = useAuth();
  if (!user.isLoaded || !user.isSignedIn) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-4 px-4 py-2 hover:bg-gray-50"
        onClick={() => setOpen((o) => !o)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={user.user?.imageUrl}
          alt={user.user?.fullName ?? "User profile picture"}
          className="size-8 rounded-full object-cover"
        />
        <span className="w-full truncate">{user.user?.fullName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => auth.signOut()}>
          <LogOutIcon className="mr-2 h-4 w-4" />

          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
