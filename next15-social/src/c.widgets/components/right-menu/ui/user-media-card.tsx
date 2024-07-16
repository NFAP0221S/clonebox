import Link from 'next/link'
import Image from 'next/image'
import { $image } from '@/f.shared/dummy'

interface Props {
  userId?: string
}

export function UserMediaCard({userId}: Props) {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>User Media</span>
        <Link href='/' className='text-blue-500 text-xs'>
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <div className='flex gap-4 justify-between flex-wrap'>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
        <div className='relative w-1/5 h-24'>
          <Image 
            src={$image} 
            alt='' 
            fill
            className='object-cover rounded-md'
          />
        </div>
      </div>
    </div>
  )
}
