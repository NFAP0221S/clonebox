import Link from 'next/link'
import Image from 'next/image'
import { $image } from '@/f.shared/dummy'

export function BirthDays() {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>Birthdays</span>
      </div>
      {/* USER */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Image 
            src={$image} 
            width={40} 
            height={40} 
            alt='' 
            className='w-10 h-10 rounded-full object-cover'
          />
          <span>이xx</span>
        </div>
        <div className='flex gap-3 justify-end'>
          <button className='bg-blue-500 text-white text-xs px-2 py-1 rounded-md'>Celebrate</button>
        </div>
      </div>
      {/* UPCOMING */}
      <div className='p-4 bg-slate-100 rounded-lg flex items-center gap-4'>
        <Image src='/gift.png' width={24} height={24} alt=''/>
        <Link href="/" className='flex flex-col gap-1 text-xs'>
          <span className='text-gray-700 font-semibold'>
            생일이 다가오는 사람
          </span>
          <span className='text-gray-500'>
            16명이 생일이 다가오고 있습니다.
          </span>
        </Link>
      </div>
    </div>
  )
}
