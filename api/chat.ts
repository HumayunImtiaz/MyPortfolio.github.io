import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const PINECONE_API_KEY = process.env.PINECONE_API_KEY || "";
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// Use exactly what the user specified for embeddings
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
// Using gemini-2.5-flash as the main LLM (was used originally in ChatBot.tsx)
const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const pc = new Pinecone({ apiKey: PINECONE_API_KEY });

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!GEMINI_API_KEY || !PINECONE_API_KEY || !PINECONE_INDEX_NAME) {
      return res.status(500).json({ error: "Server configuration error: missing API keys." });
    }

    // 1. Generate embedding for user question
    const embedResult = await embeddingModel.embedContent(message);
    const queryEmbedding = embedResult.embedding.values;

    // 2. Query Pinecone for relevant chunks
    const index = pc.Index(PINECONE_INDEX_NAME);
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    // 3. Extract context from Pinecone matches
    const contexts = queryResponse.matches
      ?.map((match) => match.metadata?.text)
      .filter((text) => text)
      .join("\n\n---\n\n") || "";

    // 4. Build prompt
    const SYSTEM_PROMPT = `
You are a helpful, professional, and friendly AI assistant for Humayun Imtiaz's portfolio.
Your job is to answer questions about Humayun's skills, experience, projects, and education using ONLY the following context from his resume.

CRITICAL INSTRUCTIONS:
- Answer ONLY using the information provided in the RESUME CONTEXT below.
- Do NOT guess, hallucinate, or invent information, links, or skills that are not explicitly present in the context.
- If the user asks about something not in the context, politely respond that the information is not available in the provided resume/context, but they can reach out to him directly.
- If asked for links (GitHub, LinkedIn, live projects), provide them EXACTLY as they appear in the context.
- Keep responses concise, professional, and conversational (1-3 sentences max).

RESUME CONTEXT:
${contexts}
`;

    // 5. Send to Gemini
    const result = await chatModel.generateContent([
      { text: SYSTEM_PROMPT },
      { text: `User request: ${message}` }
    ]);
    const responseText = result.response.text();

    return res.status(200).json({ answer: responseText });

  } catch (error: any) {
    console.error("API Chat Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
