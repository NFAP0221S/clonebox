import Image from "next/image"
import React, { Suspense } from "react"
import { Post as PostType, User } from "@prisma/client";
import { Comments } from "@/c.widgets/components/feed/index"
import { auth } from "@clerk/nextjs/server";
import { PostInteraction } from "@/d.features/post";

type FeedPostType = PostType & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

export function Post({ post }: IPost<FeedPostType>) {
  const { userId } = auth();
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            width={40}
            height={40}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {/* {userId === post.user.id && <PostInfo postId={post.id} />} */}
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              fill
              className="object-cover rounded-md"
              alt=""
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* INTERACTION */}
      <Suspense fallback="Loading...">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        {/* <Comments postId={post.id} /> */}
      </Suspense>
    </div>
  );
};
