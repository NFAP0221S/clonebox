"use server";

import prisma from "@/f.shared/lib/client";

export const getFriendRequests = async (userId: string) => {
  return prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });
};