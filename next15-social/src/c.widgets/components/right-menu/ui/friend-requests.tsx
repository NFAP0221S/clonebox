import React from 'react'
import Link from 'next/link'
import { auth } from '@clerk/nextjs/server';
import { getFriendRequests } from '@/e.entities/follow';
import { FriendRequestList } from './friend-request-list';

export async function FriendRequests() {

  const { userId } = auth();

  if (!userId) return null;

  const requests = await getFriendRequests(userId);

  if (requests.length === 0) return null;
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>Friend Requests</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
      </div>
      {/* USER */}
      <FriendRequestList requests={requests}/>
    </div>
  )
}
