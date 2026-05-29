import {
    GoogleGenerativeAI,
    SchemaType,
    type Schema,
} from "@google/generative-ai";
import {GOOGLE_GEMINI_KEY} from "../lib/constants"

if (!GOOGLE_GEMINI_KEY){
    throw new Error("GOOGLE_GEMINI_KEY is not set");
}
const ai = new GoogleGenerativeAI(GOOGLE_GEMINI_KEY);

export async function runLLM(prompt: string){
    const config = {
        temperature : 0.2,
        maxOutputTokens: 8000,
        responseMimeType: "application/json",
    }

const model = ai.getGenerativeModel({
    model : "gemini-2.5-flash",
    generationConfig: config,
})
const res = await model.generateContent((prompt));
const rawText = res.response.text();

const cleaned = rawText
    .replace(/```json\n?|```/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .trim();
  return JSON.parse(cleaned);

}

const test = await runLLM("how many days are there in a january");
console.log(test);

