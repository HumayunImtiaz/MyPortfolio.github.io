import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFParse } from "pdf-parse";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;

if (!GEMINI_API_KEY) {
  console.error("ERROR: GEMINI_API_KEY is not set in .env");
  process.exit(1);
}
if (!PINECONE_API_KEY || PINECONE_API_KEY === "your_pinecone_key_here") {
  console.error("ERROR: PINECONE_API_KEY is not set in .env — please replace 'your_pinecone_key_here' with your real Pinecone API key.");
  process.exit(1);
}
if (!PINECONE_INDEX_NAME) {
  console.error("ERROR: PINECONE_INDEX_NAME is not set in .env");
  process.exit(1);
}

// Use @google/genai SDK (v1 endpoint) which supports gemini-embedding-2 returning 3072 dims
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY as string });

const pc = new Pinecone({ apiKey: PINECONE_API_KEY as string });

// Simple chunking function with overlap
function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
}

// Generate embedding using @google/genai SDK (gemini-embedding-2 = 3072 dims)
async function getEmbedding(text: string): Promise<number[]> {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-2",
    contents: text,
  });
  return result.embeddings?.[0]?.values ?? [];
}

async function main() {
  try {
    const pdfPath = path.join(__dirname, "../public/resume.pdf");
    console.log(`Loading PDF from ${pdfPath}...`);

    if (!fs.existsSync(pdfPath)) {
      console.error("resume.pdf not found in public directory.");
      process.exit(1);
    }

    const dataBuffer = fs.readFileSync(pdfPath);

    // pdf-parse v2 API: pass { data: buffer } to constructor, then call .getText()
    const parser = new PDFParse({ data: dataBuffer });
    const pdfResult = await parser.getText();
    const text = pdfResult.text;
    console.log(`PDF loaded. Raw text length: ${text.length} characters.`);


    console.log("Extracting and chunking text...");
    // Clean up excessive whitespace
    const cleanText = text.replace(/\n+/g, "\n").replace(/\s{2,}/g, " ").trim();
    const chunks = chunkText(cleanText, 1000, 200);
    
    console.log(`Created ${chunks.length} chunks.`);

    const index = pc.Index(PINECONE_INDEX_NAME as string);
    const vectors = [];

    console.log("Generating embeddings and preparing vectors...");
    for (let i = 0; i < chunks.length; ++i) {
      const chunk = chunks[i];
      const values = await getEmbedding(chunk);
      
      vectors.push({
        id: `chunk-${i}`,
        values,
        metadata: {
          source: "resume.pdf",
          chunkIndex: i,
          text: chunk,
        },
      });
      // Delay slightly to respect rate limits if needed
      await new Promise((r) => setTimeout(r, 200));
    }

    console.log(`Uploading ${vectors.length} vectors to Pinecone index "${PINECONE_INDEX_NAME}"...`);
    // Upsert in batches of 100
    for (let i = 0; i < vectors.length; i += 100) {
      const batch = vectors.slice(i, i + 100);
      await index.upsert(batch);
    }
    
    console.log(`Successfully ingested and uploaded ${vectors.length} chunks!`);
    
  } catch (error) {
    console.error("Ingestion failed:", error);
  }
}

main();
