
import {
  FaBolt,
  FaBrain,
  FaLock,
  FaReact,
  FaServer,
  FaTachometerAlt,
} from "react-icons/fa";
import Title from "./Title.tsx";
import { FadeIn } from "./FadeIn";

const capabilities = [
  {
    title: "Full-Stack Development",
    description:
      "Build complete MERN applications, from database schema and APIs to responsive interfaces that work with real-world data.",
    technologies: "React · Node.js · MongoDB",
    icon: <FaReact />,
  },
  {
    title: "Backend Engineering",
    description:
      "Design secure, maintainable REST services in Node.js or Python, with structure that can grow alongside the product.",
    technologies: "NestJS · FastAPI · Express",
    icon: <FaServer />  ,
  },
  {
    title: "Real-Time Features",
    description:
      "Create live dashboards, chat, and notification experiences that update as events happen, without waiting for a refresh.",
    technologies: "WebSockets · Socket.io · Live sync",
    icon: <FaBolt />,
  },
  {
    title: "Access Control & Analytics",
    description:
      "Build admin portals with granular roles and server-enforced permissions, then surface useful data through clear analytics.",
    technologies: "RBAC · JWT · Analytics",
    icon: <FaLock />,
  },
  {
    title: "Machine Learning & AI",
    description:
      "Train and integrate models for classification and data analysis, and bring AI-generated descriptions into useful workflows.",
    technologies: "Classification · Analysis · AI integration",
    icon: <FaBrain />,
  },
  {
    title: "Performance Optimization",
    description:
      "Profile bottlenecks, add targeted caching, and refactor critical paths. At VirtueNetz, this work delivered up to 60–70% gains in responsiveness.",
    technologies: "Profiling · Caching · Refactoring",
    icon: <FaTachometerAlt />,
  },
];

const Feature = () => {
  return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-gray-700"
    >
      <FadeIn>
        <Title title="2+ Years of Experience" des="What I Can Build" />
        <p className="-mt-8 mb-10 max-w-3xl text-base leading-7 text-gray-400">
          From data models and secure APIs to real-time, AI-powered product
          experiences, I turn ideas into reliable applications ready for real
          users.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map(({ title, description, technologies, icon }) => (
            <article
              key={title}
              className="group flex h-full min-h-[270px] flex-col rounded-lg border border-white/5 bg-gradient-to-br from-[#151d2b] to-[#101621] p-7 shadow-shadowOne transition duration-300 hover:-translate-y-1 hover:border-designColor/40"
            >
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-designColor/10 text-2xl text-designColor transition-colors group-hover:bg-designColor/15">
                {icon}
              </span>
              <h2 className="mb-3 font-titleFont text-xl font-bold text-gray-200">
                {title}
              </h2>
              <p className="mb-6 flex-1 text-sm leading-6 text-gray-400">
                {description}
              </p>
              <p className="border-t border-white/10 pt-4 text-xs font-medium tracking-wide text-designColor">
                {technologies}
              </p>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

export default Feature;
