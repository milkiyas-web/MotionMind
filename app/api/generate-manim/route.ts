import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config({ path: ".env.local" });
export async function POST(req: Request) {
  const { prompt } = await req.json();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(
    ` Generate a manimCE Python code for this animation idea:\n\n ${prompt}`
  );
  const response = await result.response;
  const text = response.text();

  return new Response(JSON.stringify({ text }), { status: 200 });
}
