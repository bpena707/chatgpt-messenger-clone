'use client'

import { db } from "../firebase"
import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"
import Message from "./Message"

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
    <div className="flex-1">
        
        {messages?.docs.map((message)=> (
            <Message key={message.id} message={message.data()}/> //message data from firebase that is output 
        ))}

    </div>
  )
}

export default Chat