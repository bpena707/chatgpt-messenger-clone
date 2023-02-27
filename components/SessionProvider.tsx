'use client'
// components are also server components by default hence the use client 

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";
// import { type } from "os";
// import { ReactNode } from "react";

type Props = {
    children: React.ReactNode
    session: Session | null
}


export function SessionProvider({ children, session }: Props){
    // wrapping the children in the session functionality 
    return <Provider>{children}</Provider>
}