'use client'

import { switchBlock } from "@/e.entities/action/block/switch-block";
import { switchFollow } from "@/e.entities/action/follow/switch-follow";
import { useOptimistic, useReducer } from "react";

export function UserInfoCardInteraction({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: IUserInfoCardInteraction) {

  const initialState = {
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  };

  const [userState, dispatch] = useReducer((state: IUserState, action: Action) => {
    switch (action.type) {
      case 'TOGGLE_FOLLOWING':
        return {
          ...state,
          following: state.following ? false : state.following,
          followingRequestSent: !state.following && !state.followingRequestSent,
        };
      case 'BLOCK':
        return {
          ...state,
          blocked: !state.blocked,
        };
      default:
        return state;
    }
  }, initialState);

  const updateState = (state: IUserState, value: TFollowBlock) => {
    if (value === "follow") {
      return {
        ...state,
        following: state.following && false,
        followingRequestSent:
          !state.following && !state.followingRequestSent ? true : false,
      };
    } else {
      return { ...state, blocked: !state.blocked };
    }
  };

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    updateState
  );

  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      dispatch({ type: 'BLOCK' });
    } catch (err) {}
  };


  const block = async () => {
    switchOptimisticState("block");
    try {
      await switchBlock(userId);
      dispatch({ type: 'TOGGLE_FOLLOWING' });
    } catch (err) {}
  };

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end ">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  )
}
