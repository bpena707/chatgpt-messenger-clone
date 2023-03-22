'use client'

import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow  from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();

  // goes through and grabs the list of the chats from the firebase data
  const [chats, loading, error] = useCollection
  (
    session && query(collection(db, 'users', session.user?.email!, 
    'chats'), orderBy("createdAt", "asc"))
  )

  console.log(chats)
  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                {/* NewChat */}
                <NewChat />

                <div className="hidden sm-inline">
                  <ModelSelection  />
                </div>

                    {/* Map through the ChatRows through every chat*/}
                    {chats?.docs.map(chat => (
                      <ChatRow key={chat.id} id={chat.id} />
                    ))}

            </div>
        </div>

        {/* if there is a session show me the user image dont use component to avoid whitelisting url */}
        {session && (
          <img 
            onClick={() => signOut()}
            src={session.user?.image!} 
            alt="profile pic"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 
            hover:opacity-50"
          />
        )}
    </div>
  )
}

export default SideBar