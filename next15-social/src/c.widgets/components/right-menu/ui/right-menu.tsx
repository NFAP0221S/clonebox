import React from 'react'
import { FriendRequests } from './friend-requests'
import { BirthDays } from './birthdays'
import { Ad } from './ad'
import { UserInfoCard } from './user-info-card'
import { UserMediaCard } from './user-media-card'

interface Props {
  userId?: string
}

export function RightMenu({userId}: Props) {
  return (
    <div className='flex flex-col gap-6'>
      {userId && (
        <>
          <UserInfoCard userId={userId}/>
          <UserMediaCard userId={userId}/>
        </>
      )}
      <FriendRequests />
      <BirthDays />
      <Ad size='md' />
    </div>
  )
}
