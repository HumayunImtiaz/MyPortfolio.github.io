import Title from "./Title.tsx";
import ProjectsCard from "./ProjectsCard";

import projectOne from '../assets/images/projects/projectOne.png';
import projectFour from '../assets/images/projects/projectFour.png';
import projectFive from '../assets/images/projects/projectFive.png';
import projectTwoo from '../assets/images/projects/projectTwoo.png';
import projectTwo from '../assets/images/projects/projectTwo.png';
import projectThree from '../assets/images/projects/projectThree.jpeg';


import { FadeIn } from "./FadeIn";

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <div className="flex justify-center items-center text-center">
          <Title
            title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK"
            des="My Projects"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
          <ProjectsCard
            title="E-Commerce Marketplace Platform"
            des="Full-stack marketplace with Next.js, TypeScript, Node.js/Express (MVC), JWT auth, role-based access, Socket.io real-time features, Neon PostgreSQL + Prisma."
            src={projectFour}
          />
          <ProjectsCard
            title="AI Resume & GitHub Analyzer"
            des="Intelligent analysis tool using Google Gemini API for automated resume parsing and GitHub profile evaluation with real-time AI-generated feedback."
            src={projectTwo}
          />
          <ProjectsCard
            title="Real-Time Chat Application"
            des="Next.js + TypeScript frontend with Socket.io bi-directional messaging. Node.js/Express MVC backend with PostgreSQL (Supabase) and Knex query builder."
            src={projectThree}
          />
          <ProjectsCard
            title="Restaurant Dining Experience"
            des="Frontend project showcasing responsive UI design using React.js, Tailwind CSS, and third-party REST API integration."
            src={projectOne}
          />
          <ProjectsCard
            title="Outfit Cart — E-Commerce"
            des="Frontend e-commerce application with modern UI, cart management, and responsive design built with React.js and Tailwind CSS."
            src={projectFive}
          />
          <ProjectsCard
            title="MovieLand — Movie Search App"
            des="Movie search application built with React.js integrating third-party REST APIs for dynamic content fetching and responsive UI."
            src={projectTwoo}

          />

        </div>
      </FadeIn>
    </section>
  );
};

export default Projects;
