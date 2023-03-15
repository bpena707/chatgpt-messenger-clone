// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // destructiing what we send to the ChatInput as the request body 
    const{ prompt,chatId, model,session } =req.body

    // fail safes if prompt and id are not passed
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

  res.status(200).json({ name: 'John Doe' })
}
