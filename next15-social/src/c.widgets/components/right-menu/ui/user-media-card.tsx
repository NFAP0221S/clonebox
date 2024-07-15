import Link from 'next/link'
import React from 'react'

interface Props {
  userId?: string
}

export function UserMediaCard({userId}: Props) {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>User Media</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
      </div>
    </div>
  )
}
