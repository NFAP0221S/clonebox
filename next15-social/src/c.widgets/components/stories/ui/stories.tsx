import Image from "next/image";

export function Stories() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        {/* <StoryList stories={stories} userId={currentUserId}/> */}
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src="https://images.pexels.com/photos/17351400/pexels-photo-17351400.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
          <span className="font-medium">Ricky</span>
        </div>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image src="https://images.pexels.com/photos/17351400/pexels-photo-17351400.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={80} height={80} className="w-20 h-20 rounded-full ring-2" />
          <span className="font-medium">Ricky</span>
        </div>
      </div>
    </div>
  );
}