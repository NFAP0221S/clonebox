'use client'

import { switchFollow } from "@/d.features/follow/switch-follow";
import { useOptimistic, useState } from "react";

export function UserInfoCardInteraction({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: IUserInfoCardInteraction) {

  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  })

  const follow = async () => {
    // switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: prev.following && false,
        followingRequestSent:
          !prev.following && !prev.followingRequestSent ? true : false,
      }));
    } catch (err) {}
  };

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {userState.following
          // {optimisticState.following
            ? "Following"
            : userState.followingRequestSent
            // : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      {/* <form action={block} className="self-end ">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form> */}
    </>
  )
}
