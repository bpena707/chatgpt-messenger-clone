import { DocumentData } from "firebase/firestore";

type Props = {
    message: DocumentData
}

// this will contain the actual message content which get passed to chat component
function Message({ message }: Props ) {
  return (
    <div>Message</div>
  )
  
}

export default Message