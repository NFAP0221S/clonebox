import Image from "next/image";

export function Stories() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        {/* <StoryList stories={stories} userId={currentUserId}/> */}
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          {/* <Image src="https://imgaes.pexels.com/photos/13172901/pexels-photo-13172901.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt="" width={15} height={15}  /> */}
          <span className="font-medium">Ricky</span>
        </div>
      </div>
    </div>
  );
}
