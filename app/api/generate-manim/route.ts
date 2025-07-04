import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
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
  const code = await result.response.text();
  const [inserted] = await db
    .insert(projects)
    .values({ prompt, code })
    .returning();

  return new Response(JSON.stringify({ id: inserted.id }), { status: 200 });
}
