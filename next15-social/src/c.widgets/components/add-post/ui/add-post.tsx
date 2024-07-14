import Image from 'next/image'

export function AddPost() {
  return (
    <div className='p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm' title='포스터 추가'>
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/17351400/pexels-photo-17351400.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* POST */}
      <div className='flex-1'>
        {/* TEXT INPUT */}
        <div className='flex gap-4'>
          <textarea placeholder='어떤 생각을 하시나요?' className='flex-1 bg-slate-100 rounded-lg p-2'></textarea>
          <Image
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
        </div>
        {/* POST OPTIONS */}
        <div className='flex items-center gap-4 mt-4 text-gray-400 flex-wrap'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src="/addImage.png" alt="" width={20} height={20} />  
            Photo
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src="/addVideo.png" alt="" width={20} height={20} />  
            Video
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src="/poll.png" alt="" width={20} height={20} />  
            Poll
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
            <Image src="/addEvent.png" alt="" width={20} height={20} />  
            Event
          </div>
        </div>
      </div>
    </div>
  )
}
