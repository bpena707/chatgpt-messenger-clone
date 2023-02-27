'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

function NewChat() {
  // router to direct to new screen. always import from next/navigation
    const router = useRouter()

  // pulls the users information  from session 
  const { data:session } = useSession()

  //pushes vlaue into firestor database 
  const createNewChat =async () => {
    const
  }

  return (
    <div onClick={createNewChat} className='border border-gray-700 chatRow'>
        <PlusIcon className='h-4 w-4' />
        <p>New Chat</p>
    </div>
  )
}

export default NewChat