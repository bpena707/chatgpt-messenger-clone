// this is where we will get the api key
import { Configuration, OpenAIApi } from "openai"

// connection to api using the key 
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export default openai