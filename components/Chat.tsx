'use client'

import { db } from "../firebase"
import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useCollection } from "react-firebase-hooks/firestore"

type Props = {
    chatId: string
}

function Chat({ chatId }: Props) {
    const {data: session} = useSession()

    // mapping for the collection if the session and query exist before mapping to database
    const [messages] = useCollection(session && query(
        collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    ))
  return (

    <div className="flex-1">Chat</div>
  )
}

export default Chat