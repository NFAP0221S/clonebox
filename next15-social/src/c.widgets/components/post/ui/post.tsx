import React from "react"
import Image from "next/image"
import { Comments } from "@/c.widgets/components/comments"

export function Post() {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/17351400/pexels-photo-17351400.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt='' 
            width={40} 
            height={40} 
            className="w-10 h-10 rounded-full" 
          />
          <span className="font-medium">정규식</span>
        </div>
        <Image src="/more.png" alt='' width={16} height={16} />
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image 
            src="https://images.pexels.com/photos/17351400/pexels-photo-17351400.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt='' 
            fill 
            className="object-cover rounded-md" 
          />
        </div>
        <p>안녕하세요 ㅋㅋㅋ</p>
      </div>
      {/* INTERACTION */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image 
              src="/like.png" 
              alt='' 
              width={16} 
              height={16}  
              className="cursor-pointer" 
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image 
              src="/comment.png" 
              alt='' 
              width={16} 
              height={16}  
              className="cursor-pointer" 
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image 
              src="/share.png" 
              alt='' 
              width={16} 
              height={16}  
              className="cursor-pointer" 
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  )
}
