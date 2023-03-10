import Login from '../components/Login';
import { SessionProvider } from '../components/SessionProvider'
import SideBar from '../components/SideBar'
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth";
import '../styles/globals.css'
import ClientProvider from '../components/ClientProvider';


// server components are allowed to be async functions
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      {/* all pages are injected into the children property below for layouit  */}
      <body>
        {/* all children have ability to share session state */}
        <SessionProvider session={session}>
          {/* ternary operator to display login if session in on or not */}
          {!session ? (
            <Login />

          ):(
            <div className='flex'>
          <div className='bg-[#202123] max-w-xs h-screen 
          overflow-y-auto md:min-w-[20rem]'>
            {/* Sidebar */}
            <SideBar />
          </div>
          

          {/* Client Provider - Toast Notification  injected here*/}
          <ClientProvider />

          <div className='bg-[#343541] flex-1'>{children}</div>
        </div>
          )  }
          
        </SessionProvider>
      </body>
    </html>
  )
}
