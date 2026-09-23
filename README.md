# 🚀 Humayun Imtiaz — Full-Stack Developer Portfolio

A modern, responsive developer portfolio built with **React, TypeScript, and Vite**, featuring an AI-powered portfolio assistant using **Retrieval-Augmented Generation (RAG)**.

The AI assistant can answer questions about my **skills, experience, education, projects, and professional background** by retrieving relevant information from my resume.

---

## ✨ Features

- 🎨 Modern and responsive portfolio UI
- ⚡ React + TypeScript + Vite
- 🤖 AI-powered portfolio assistant
- 🔎 Retrieval-Augmented Generation (RAG)
- 📄 Resume-based knowledge retrieval
- 🧠 Gemini embeddings and AI generation
- 🗄️ Pinecone vector database
- 🔐 Server-side API architecture
- 📱 Fully responsive design
- 🚀 Vercel deployment

---

## 🤖 AI Portfolio Assistant

The portfolio includes an AI assistant that can answer questions about my professional background.

For example:

- What technologies does Humayun work with?
- What projects has Humayun built?
- What is Humayun's professional experience?
- What is Humayun's educational background?
- What are Humayun's GitHub and LinkedIn profiles?

Instead of putting the entire resume directly into the AI prompt, the assistant uses **RAG** to retrieve relevant information before generating an answer.

---

## 🧠 RAG Architecture

### Knowledge Ingestion

```text
Resume PDF
    ↓
Text Extraction
    ↓
Chunking
    ↓
Gemini Embeddings
    ↓
Pinecone Vector Database


The resume is:

Extracted from the PDF
Split into smaller chunks
Converted into vector embeddings using Gemini
Stored in Pinecone with the original text as metadata
User Query
User Question
      ↓
ChatBot UI
      ↓
/api/chat
      ↓
Gemini Embedding
      ↓
Pinecone Similarity Search
      ↓
Relevant Resume Chunks
      ↓
Gemini
      ↓
Grounded Answer

This allows the assistant to retrieve the most relevant information instead of relying on a large hardcoded prompt.

🛠️ Tech Stack
Frontend
React
TypeScript
Vite
CSS
AI / RAG
Google Gemini
Gemini Embeddings
Pinecone
Retrieval-Augmented Generation (RAG)
Backend
Vercel Serverless Functions
Node.js
PDF Processing
pdf-parse
Deployment
Vercel
📁 Project Structure
Portfolio/
├── api/
│   └── chat.ts
│
├── public/
│   └── resume.pdf
│
├── scripts/
│   └── ingest.ts
│
├── src/
│   ├── components/
│   │   └── ChatBot.tsx
│   └── ...
│
├── .env.example
├── vite.config.ts
├── package.json
└── README.md
Important Files

src/components/ChatBot.tsx

Handles the portfolio assistant UI and communicates with the backend API.

api/chat.ts

Server-side RAG endpoint that:

Receives the user's question
Generates the query embedding
Searches Pinecone
Retrieves relevant resume chunks
Sends the retrieved context to Gemini
Returns the generated response

scripts/ingest.ts

Handles the document ingestion pipeline:

Extracts text from the resume
Creates chunks
Generates embeddings
Uploads vectors to Pinecone

public/resume.pdf

The main knowledge source used by the RAG system.

⚙️ Local Setup
1. Clone the repository
git clone https://github.com/HumayunImtiaz/MyPortfolio.github.io.git

cd MyPortfolio.github.io
2. Install dependencies
npm install
3. Configure Environment Variables

Create a .env file:

GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=portfolio-rag

Never commit your .env file or expose API keys in client-side code.

4. Ingest the Resume

Run:

npx tsx scripts/ingest.ts

This will:

Extract text from the resume
Split it into chunks
Generate embeddings
Upload the vectors to Pinecone
5. Start the Development Server
npm run dev
🔐 Security

API keys are kept on the server side and are not exposed to the browser.

The frontend communicates with the backend through:

ChatBot.tsx
     ↓
/api/chat

The backend handles communication with:

Gemini
   +
Pinecone

Sensitive credentials are stored using environment variables.

📊 Context Injection vs RAG

The original version of the portfolio assistant used context injection, where a large amount of information was directly included in the prompt.

Context Injection
User Question
      ↓
Large Hardcoded Context
      ↓
Gemini
      ↓
Answer
RAG
User Question
      ↓
Query Embedding
      ↓
Vector Search
      ↓
Relevant Context
      ↓
Gemini
      ↓
Answer

With RAG, the system retrieves relevant information first and then provides that context to the language model.

This makes the knowledge layer easier to maintain and allows the model to work with information relevant to the specific question.

🎯 Why I Built This

I wanted my portfolio to be more than just a collection of projects.

Instead of simply displaying my resume, I built an AI assistant that can interact with my professional information.

While building this project, I explored:

Embeddings
Vector databases
Semantic similarity search
Retrieval-Augmented Generation
Document chunking
PDF data extraction
Serverless APIs
Secure API key management
AI-powered applications
🚀 Deployment

The portfolio is deployed using Vercel.

Production architecture:

React Portfolio
      ↓
Vercel
      ↓
Serverless API
      ↓
Pinecone
      ↓
Gemini
👨‍💻 About Me

I'm Humayun Imtiaz, a Software Engineer and Full-Stack Developer focused on building modern web applications and AI-powered solutions.

Core Areas
Full-Stack Development
React
Next.js
Node.js
Express.js
MERN Stack
PERN Stack
TypeScript
REST APIs
PostgreSQL
MongoDB
AI / RAG Applications
🔗 Connect With Me

🌐 Portfolio:
https://humayunimtiaz.vercel.app

💻 GitHub:
https://github.com/HumayunImtiaz

💼 LinkedIn:
https://www.linkedin.com/in/humayunimtiaz/

⭐ Feedback

If you find this project interesting, feel free to explore the code, open an issue, or connect with me.

Built with ❤️ by Humayun Imtiaz
