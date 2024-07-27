import React, { Suspense } from 'react'
import { FriendRequests } from './friend-requests'
import { BirthDays } from './birthdays'
import { Ad } from './ad'
import { UserInfoCard } from './user-info-card'
import { UserMediaCard } from './user-media-card'
import { User } from '@prisma/client'

export function RightMenu({user}: IRightMenu<User>) {
  return (
    <div className='flex flex-col gap-6'>
      {user && (
        <>
          <Suspense fallback="loding...">
           <UserInfoCard user={user}/>
          </Suspense>
          <Suspense fallback="loding...">
            <UserMediaCard user={user}/>
          </Suspense>
        </>
      )}
      <FriendRequests />
      <BirthDays />
      <Ad size='md' />
    </div>
  )
}
