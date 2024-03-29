'use client'

import { db } from "../firebase"
import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import Message from "./Message"
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"

type Props = {
    chatId: string
}

function Chat({ chatId }: Props) {
    const {data: session} = useSession()

    // mapping from the collection.Check if the session and query exist before mapping to database
    const [messages] = useCollection(session && query(
        collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    ))
  return (
    // mapping the data from the database and injecting into the component for output
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {messages?.empty && (
            <>
                <p className="mt-10 text-center text-white">
                    Type prompt below to get started
                </p>
                <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
            </>
        )}
        
        {messages?.docs.map((message)=> (
            <Message key={message.id} message={message.data()}/> //message data from firebase that is output 
        ))}

    </div>
  )
}

export default Chat