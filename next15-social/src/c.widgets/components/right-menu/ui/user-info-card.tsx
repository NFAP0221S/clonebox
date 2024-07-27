import Link from 'next/link'
import Image from 'next/image'
import { User } from '@prisma/client'
import { auth } from '@clerk/nextjs/server';
import { UserInfoCardInteraction } from '@/d.features/user-info';
import { formatDate } from '@/f.shared/utils/formatDate';
import { isUserBlocked as isUserBlockedFn } from '@/e.entities/action/block/block-service';
import { 
  isFollowing as isFollowingFn,
  isFollowingRequestSent as isFollowingRequestSentFn
} from '@/e.entities/action/follow/follow-service';


export async function UserInfoCard({user}: IUserInfoCard<User>) {
  const formattedDate = formatDate(user.createdAt)
  
  const { userId: currentUserId } = auth();
  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  if (currentUserId) {
    isUserBlocked = await isUserBlockedFn(currentUserId, user.id);
    isFollowing = await isFollowingFn(currentUserId, user.id);
    isFollowingSent = await isFollowingRequestSentFn(currentUserId, user.id);
  }
  
  return (
    <div className='p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4'>
      {/* TOP */}
      <div className='flex justify-between items-center font-medium'>
        <span className='text-gray-500'>User Information</span>
        <Link href='/' className='text-blue-500 text-xs'>See all</Link>
      </div>
      {/* BOTTOM */}
      <div className='flex flex-col gap-4 text-gray-500'>
        <div className='flex items-center gap-2'>
          <span className='text-xl text-black'>
            {user.name && user.surname
                  ? user.name + " " + user.surname
                  : user.username}
          </span>
          <span className='text-sm'>@{user.username}</span>
        </div>

        {user.description &&
          <p>{user.description}</p>
        }

        {user.city &&
          <div className='flex items-center gap-2'>
            <Image src="/map.png" alt='' width={16} height={16}/>
            <span>
              Living in <b>{user.city}</b>
            </span>
          </div>
        }
        {user.school &&
          <div className='flex items-center gap-2'>
            <Image src="/school.png" alt='' width={16} height={16}/>
            <span>
              Went to <b>{user.school}</b>
            </span>
          </div>
        }
        {user.work &&
          <div className='flex items-center gap-2'>
            <Image src="/work.png" alt='' width={16} height={16}/>
            <span>
              Works at <b>{user.work}.</b>
            </span>
          </div>
        }
        <div className='flex items-center justify-between'>
          {user.website &&
            <div className='flex gap-1 items-center'>
              <Image src="/link.png" alt='' width={16} height={16}/>
              <Link href={user.website} className='text-blue-500 font-medium'>
                {user.website}
              </Link>
            </div>
          }
          <div className='flex gap-1 items-center'>
            <Image src="/date.png" alt='' width={16} height={16}/>
            <span>Joined {formattedDate}</span>
          </div>
        </div>
        {currentUserId && currentUserId !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  )
}
