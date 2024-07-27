"use server";

import prisma from "@/f.shared/lib/client";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deletePost = async ({ postId }: IDeletePost) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId,
      },
    });
    revalidatePath("/");
  } catch (err) {
    console.log(err);
  }
};
