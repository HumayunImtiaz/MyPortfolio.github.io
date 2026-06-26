import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2022 - Present</p>
          <h2 className="text-3xl md:text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Software Engineer - Full-Stack"
            subTitle="Virtue Netz (Jan 2025 - Present)"
            result="On-site"
            des="Developed production-grade apps using Next.js & PostgreSQL. Built eCommerce & pet services apps, architected real-time chat, and integrated Gemini AI."
          />
          <ResumeCard
            title="Teaching Assistant - C++ & Web Dev"
            subTitle="KFUEIT (Sep 2022 - Jun 2024)"
            result="On-site"
            des="Guided 50+ students in OOP, Data Structures & Algorithms. Debugged React.js and Node.js student projects with constructive feedback."
          />
        </div>
      </div>
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">Recent</p>
          <h2 className="text-3xl md:text-4xl font-bold">Key Projects</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="E-Commerce Marketplace Platform"
            subTitle="Next.js, Node.js, PostgreSQL, Prisma"
            result="Full-Stack"
            des="Built a scalable marketplace with JWT auth, multi-vendor support, secure uploads, and real-time features using Socket.io."
          />
          <ResumeCard
            title="AI Resume & GitHub Analyzer"
            subTitle="Next.js, TypeScript, Gemini API"
            result="AI/LLM"
            des="Smart tool integrated with Next.js frontend and Google Gemini API for automated resume parsing and intelligent profile insights."
          />
          <ResumeCard
            title="Real-Time Chat Application"
            subTitle="Next.js, Express, Supabase"
            result="WebSockets"
            des="Bi-directional messaging platform with concurrent session handling, built on MVC architecture and optimized PostgreSQL."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
