// this is where the connection to  chatGPT will happen 
// this is a helper function to help carry out chatgpt functionality 
import openai from "./chatgpt";

// take what the user passed in and make request to chatgpt aka a completion
const query =async (prompt: string, chatId: string, model: string) => {
    const res  = await openai
        .createCompletion({
            model,
            prompt,
            temperature: 0.4, //more creative answers 
            top_p: 1, 
            max_tokens: 1000,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        //then gets the response back including data and choices for text
        .then(res => res.data.choices[0].text)
        .catch(
            err => `ChatGPT was unable to find an answer for that! (Error: ${err.message})`
        )
        return res
}

export default query 