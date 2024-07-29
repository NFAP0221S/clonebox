"use server";

import prisma from "@/f.shared/lib/client";

export const isFollowing = async (currentUserId: string, userId: string): Promise<boolean> => {
  const followRes = await prisma.follower.findFirst({
    where: {
      followerId: currentUserId,
      followingId: userId,
    },
  });
  return !!followRes;
};

export const isFollowingRequestSent = async (currentUserId: string, userId: string): Promise<boolean> => {
  const followReqRes = await prisma.followRequest.findFirst({
    where: {
      senderId: currentUserId,
      receiverId: userId,
    },
  });
  return !!followReqRes;
};
