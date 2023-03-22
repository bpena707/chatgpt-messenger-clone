import openai from "../../lib/chatgpt"
import type { NextApiRequest, NextApiResponse } from "next"

// options that are returned in the select fields
type Option = {
    value: string
    label: string
}

//returning a type of data option which is an array expected in value-label pairs
type Data ={
    modelOptions: Option[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    //list all the models and pass the data from it data.data because it is inside the data block
    const models = await openai.listModels().then((res) => res.data.data)

    const modelOptions = models.map((model) => ({
        value: model.id,
        label: model.id,
    }))

    //returned in the response statement with 200 code
    res.status(200).json({
        modelOptions,
    })
}