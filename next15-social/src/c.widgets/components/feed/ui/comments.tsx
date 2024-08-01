import { $image } from "@/f.shared/dummy"
import prisma from "@/f.shared/lib/client";
import Image from "next/image"
import { CommentList } from "./comment-list";

export async function Comments({postId}:IComment) {
  const comments = await prisma.comment.findMany({
    where:{
      postId,
    },
    include:{
      user:true
    }
  })
  return (
    <div className="">
      {/* WRITE */}
      <CommentList comments={comments} postId={postId}/>
    </div>
  );
}
