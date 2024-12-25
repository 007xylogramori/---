import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getEmbeddings=async(text)=>{
    const model = genAI.getGenerativeModel({ model: "text-embedding-004"});
    const result = await model.embedContent(text);
    console.log(text,"\n",result.embedding.values);
    return result.embedding.values
}

export { getEmbeddings };

