import { db } from "../firebase"
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { collection, orderBy, query } from "firebase/firestore"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"

type Props = {
    id: string
  }

function ChatRow({id}: Props) {

    // pathname to highlight the chat that Im in 
    const pathname = usePathname() //helps read the current url pathname 
    const router = useRouter //change routes inside client 
    const { data: session } = useSession() // used to check if someone is logged in 
    const [active, setActive] = useState(false) //see if user is active 

    // if chat im in is active i need the messages call to useCollection to  query it
    // ordered by created at date. collection from firestore and the paths
    const [messages] = useCollection(
        collection(db, "users", session?.user?.email!, "chats", id, "messages")
    )

    // useEffect to determine if chat is active or not 
    useEffect(() => {
        if (!pathname) return 

        setActive(pathname.includes(id))
    },[pathname])

  return ( 
    <Link 
        href={`/chat/${id}`} 
        className={`chatRow justify-center-center ${active && "bg-gray-700/50"}`} 
    >
        <ChatBubbleLeftIcon className="h-5 w-5" />

        
        <p className="flex-1 hidden md:inline-flex truncate">
            {/* pull the last bit of text from the chat or say new chat  */}
            {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>
        
        <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" />

    </Link>
  )
}

export default ChatRow