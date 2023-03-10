'use client'

import { db } from "@/firebase"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"

import { FormEvent, useState } from "react"

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt]= useState("")
    const { data: session } = useSession()

    const sendMessage =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // defensive programming 
        if(!prompt) return

        // trimming the function to get rid of whitespace. storing in a local variable 
        const input = prompt.trim()
        setPrompt("")

        // message that is created in the back
        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }
        
        // adds message into the database
        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message)

            // toast notification

            
    }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
        <form 
            className="p-5 space-x-5 flex"
            onSubmit={sendMessage}
        >
            {/* state is used so that if there in no session it can be disabled */}
            <input 
                className="bg-transparent focus:outline-none flex-1
                disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={!session}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message here..."
            />
            <button 
                disabled={!prompt || !session} 
                type="submit"
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded
                disabled:cursor-not-allowed disabled:bg-gray-300"
            >
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
            </button>
        </form>

        <div>
            {/* model selection */}
        </div>
    </div>
  )
}

export default ChatInput