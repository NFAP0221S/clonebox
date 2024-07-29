"use server";

import prisma from "@/f.shared/lib/client";

export const isUserBlocked = async (currentUserId: string, userId: string) => {
  const blockRes = await prisma.block.findFirst({
    where: {
      blockerId: currentUserId,
      blockedId: userId,
    },
  });
  return !!blockRes;
};