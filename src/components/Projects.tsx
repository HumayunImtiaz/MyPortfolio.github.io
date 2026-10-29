import Title from "./Title.tsx";
import ProjectsCard from "./ProjectsCard";

import projectOne from '../assets/images/projects/projectOne.png';
import projectFour from '../assets/images/projects/projectFour.png';
import projectFive from '../assets/images/projects/projectFive.png';
import quickSwitch247 from '../assets/images/projects/quickSwitch247.png';
import kitchenKonnect from '../assets/images/projects/kitchenKonnect.png';
import projectTwoo from '../assets/images/projects/projectTwoo.png';
import projectTwo from '../assets/images/projects/projectTwo.png';
import projectThree from '../assets/images/projects/projectThree.png';
import neonCinema from '../assets/images/projects/neonCinema.png';


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
            title="VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK "
            des="My Projects"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
          <ProjectsCard
            title="Neon Cinema"
            des="Cinematic AI creative studio inspired by Higgsfield AI, built with Next.js, TypeScript, Tailwind CSS, and Supabase. Features responsive UI, media galleries, AI generation interfaces, authentication, animations, and Vercel deployment."
            src={neonCinema}
            links={[
              {
                label: "Live Demo",
                href: "https://8x-z9k5.vercel.app/",
              },
            ]}
          />
          <ProjectsCard
            title="Quick Switch 24/7"
            des="Full-stack logistics platform with account-scoped authentication and RBAC. Built with Next.js, NestJS, PostgreSQL, Knex.js, and Docker, with scalable modules for products, carrier inventory, pricing, and wallet transactions. Bulk CSV uploads are validated and staged before reaching live tables."
            src={quickSwitch247}
            links={[
              {
                label: "Customer Portal",
                href: "https://staging-port.quickswitch247.com/login",
              },
            ]}
          />
          <ProjectsCard
            title="E-Commerce Marketplace Platform"
            des="Full-stack marketplace with Next.js, TypeScript, Node.js/Express (MVC), JWT auth, role-based access, Socket.io real-time features, Neon PostgreSQL + Prisma."
            src={projectFour}
            links={[
              {
                label: "Admin Panel",
                href: "https://ecommerce-admin-panel-nine-psi.vercel.app/login",
              },
              {
                label: "Vendor Store",
                href: "https://ecommerce-vendor-store.vercel.app/login",
              },
              {
                label: "Customer Store",
                href: "https://ecommerce-user-store.vercel.app/",
              },
            ]}
          />
          <ProjectsCard
            title="The Kitchen Konnect"
            des="Production-ready culinary marketplace built on the MERN stack and launched publicly. Includes user accounts and authentication, flexible product management designed to adapt to changing requirements, and a responsive front end built for ongoing handover and maintenance."
            src={kitchenKonnect}
            links={[
              {
                label: "Live Website",
                href: "https://www.thekitchenkonnect.com/",
              },
            ]}
          />
          <ProjectsCard
            title="AI Resume & GitHub Analyzer"
            des="Intelligent analysis tool using Google Gemini API for automated resume parsing and GitHub profile evaluation with real-time AI-generated feedback."
            src={projectTwo}
            links={[
              {
                label: "Live Analyzer",
                href: "https://developer-portfolio-analyzer-eight.vercel.app/",
              },
            ]}
          />
          <ProjectsCard
            title="Real-Time Chat Application"
            des="Next.js + TypeScript frontend with Socket.io bi-directional messaging. Node.js/Express MVC backend with PostgreSQL (Supabase) and Knex query builder."
            src={projectThree}
            links={[
              {
                label: "Live Chat",
                href: "https://chat-application-frontend-sooty.vercel.app/",
              },
            ]}
          />
          <ProjectsCard
            title="Restaurant Dining Experience"
            des="Frontend project showcasing responsive UI design using React.js, Tailwind CSS, and third-party REST API integration."
            src={projectOne}
            links={[
              {
                label: "Live Restaurant",
                href: "https://restaurant-rouge-tau.vercel.app/",
              },
            ]}
          />
          <ProjectsCard
            title="Outfit Cart — E-Commerce"
            des="Frontend e-commerce application with modern UI, cart management, and responsive design built with React.js and Tailwind CSS."
            src={projectFive}
            links={[
              {
                label: "Live Outfit Cart",
                href: "https://outfit-cart-uvyz.vercel.app/",
              },
            ]}
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
