import React from 'react'
import { FriendRequests } from './friend-requests'
import { BirthDays } from './birthdays'
import { Ad } from './ad'

interface Props {
  userId?: string
}

export function RightMenu({userId}: Props) {
  return (
    <div className='flex flex-col gap-6'>
      <FriendRequests />
      <BirthDays />
      <Ad size='md' />
    </div>
  )
}
