
import { FaReact, FaDocker, FaCode, FaCodepen, FaNodeJs, FaRobot } from "react-icons/fa";
import Card from "./Card";
import Title from "./Title.tsx";
import { FadeIn } from "./FadeIn";


const Feature = () => {
  return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title="Features" des="What I Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
          <Card
            title="Full-Stack Development"
            des="Building scalable web applications end-to-end using Next.js, React.js, Node.js, Express.js with TypeScript across the MERN and PERN stacks."
            icon={<FaReact />}
          />
          <Card
            title="AI Integration & LLM Apps"
            des="Integrating Google Gemini API to build intelligent tools like AI-powered Resume Analyzers and GitHub Profile evaluators with real-time AI feedback."
            icon={<FaRobot />}
          />
          <Card
            title="Database Architecture"
            des="Designing efficient database schemas with PostgreSQL, MongoDB, Prisma ORM, Knex, Supabase, and Neon for optimized, scalable data management."
            icon={<FaCode />}
          />
          <Card
            title="Real-Time Applications"
            des="Architecting real-time features using Socket.io with bi-directional messaging, concurrent session handling, and event-driven Webhook workflows."
            icon={<FaCodepen />}
          />
          <Card
            title="REST API & Backend Design"
            des="Building robust REST APIs with Node.js/Express following MVC architecture, JWT authentication, role-based access control, and Multer/Cloudinary integration."
            icon={<FaNodeJs />}
          />
          <Card
            title="DevOps & Deployment"
            des="Containerizing apps with Docker, deploying on Vercel, Render, Railway, and Hugging Face Spaces. Experienced in Git workflows and Agile/Scrum delivery."
            icon={<FaDocker />}
          />
        </div>
      </FadeIn>
    </section>
  );
};

export default Feature;
