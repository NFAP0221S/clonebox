import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { $image } from '@/f.shared/dummy'

export function FriendRequests() {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>Friend Requests</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
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
          <Image 
            src='/accept.png' 
            width={20} 
            height={20} 
            alt='' 
            className='cursor-pointer'
          />
          <Image 
            src='/reject.png' 
            width={20} 
            height={20} 
            alt='' 
            className='cursor-pointer'
          />
        </div>
      </div>
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
          <Image 
            src='/accept.png' 
            width={20} 
            height={20} 
            alt='' 
            className='cursor-pointer'
          />
          <Image 
            src='/reject.png' 
            width={20} 
            height={20} 
            alt='' 
            className='cursor-pointer'
          />
        </div>
      </div>
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
          <Image 
            src='/accept.png' 
            width={20} 
            height={20} 
            alt='' 
            className='cursor-pointer'
          />
          <Image 
            src='/reject.png' 
            width={20} 
            height={20} 
            alt='' 
            className='cursor-pointer'
          />
        </div>
      </div>
    </div>
  )
}
