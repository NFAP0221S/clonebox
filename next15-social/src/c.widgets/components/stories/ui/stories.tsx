import { $image } from "@/f.shared/dummy";
import Image from "next/image";

export function Stories() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide" title="스토리">
      <div className="flex gap-8 w-max">
        {/* <StoryList stories={stories} userId={currentUserId}/> */}
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src={$image} alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
          <span className="font-medium">이xx</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src={$image} alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
          <span className="font-medium">박xx</span>
        </div>
      </div>
    </div>
  );
}
