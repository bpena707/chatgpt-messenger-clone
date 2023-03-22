import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData
}

// this will contain the actual message content which get passed to chat component
function Message({ message }: Props ) {

  // determine if i am ChatGPT and not robot
  const isChatGPT = message.user.name === "chatGPT"
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
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