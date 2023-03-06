import ChatInput from "../../../components/ChatInput"
import Chat from "../../../components/Chat"

// enforce props to get the id as a string
type Props  = {
  params: {
    id: string
  }
}

// destructure params to get be able to pass the id in the function to the components below
function ChatPage({params: { id } }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id}/>
      <ChatInput chatId={id}/>
    </div>
  )
}

export default ChatPage