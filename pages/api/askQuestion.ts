// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '../../lib/queryAPI';
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from "firebase-admin"
import { adminDb } from '@/firebaseAdmin';

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // destructiing what we send to the ChatInput as the request body basically stripping out all the values from the chatinput file 
    const{ prompt,chatId, model,session } =req.body

    // fail safes if prompt and id are not passed to check and make sure all details are gathered
    if(!prompt) {
        res.status(400).json({answer: "Please provide a prompt!"});
        return
    }

    if(!chatId){
        res.status(400).json({answer: "Please provide a valid chat ID!"});
        return 
    }

    // ChatGPT Query
    const response = await query(prompt, chatId, model)

    // this is the message response from chatGPT 
    const message: Message = {
        text: response || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: "https://links.papareact.com/89k"
        }
    }

    //admin firestore details to create a document from the backend server which needs the admin priveledge below and passed onto firebase
    await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message)

    // generated response is returned as the message text
  res.status(200).json({ answer: message.text })
}
