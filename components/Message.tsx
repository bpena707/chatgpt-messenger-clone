import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData
}

// this will contain the actual message content which get passed to chat component
function Message({ message }: Props ) {
  return (
    <div>
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
            <img 
            src={message.user.avatar} alt="" className="h-8 w-8"/>
            <p className="pt-1 text-sm">
                {message.text}
            </p>
        </div>
    </div>
  )
  
}

export default Message