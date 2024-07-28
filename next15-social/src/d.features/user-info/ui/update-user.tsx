import { User } from '@prisma/client'
import React from 'react'

export function UpdateUser({user}: IUpdateUser<User>) {
  return (
    <div className='flex flex-col gap-6'>
      UpdateUser
    </div>
  )
}
