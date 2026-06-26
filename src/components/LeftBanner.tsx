import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaFacebookF, FaLinkedinIn, FaReact, FaWhatsapp, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiPostgresql } from "react-icons/si";
import { FadeIn } from "./FadeIn";



const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ["Full-Stack Software Engineer.", "MERN / PERN Stack Developer.", "AI Integration Specialist."],
    loop: true,
    typeSpeed: 25,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <FadeIn className="w-full lgl:w-1/2 flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h4 className=" text-lg font-normal">WELCOME TO MY WORLD</h4>
        <h1 className="text-6xl font-bold text-white">
        I'm <span className="text-designColor blue">Humayun Imtiaz</span>
        </h1>
        <h2 className="text-4xl font-bold text-white">
          a <span>{text}</span>
          <Cursor cursorStyle="|" cursorColor="#ff014f" />
        </h2>
        <p className="text-base font-bodyFont leading-6 tracking-wider">
        Full-Stack Software Engineer with 2+ years of professional experience building scalable, user-facing web applications using MERN and PERN stacks. Proficient in Next.js, TypeScript, PostgreSQL, Prisma, Docker, Socket.io, and AI API integration (Google Gemini). B.Sc. Software Engineering graduate with 3.51 GPA (Grade A).

        </p>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 lgl:gap-0 justify-between">
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            Find me in
          </h2>
          <div className="flex gap-4">
            <a href="https://wa.link/zv3t1u" target="_blank">
              <span className="bannerIcon">
                <FaWhatsapp />
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/humayun-imtiaz-a8501b266/"
              target="_blank"
            >
              <span className="bannerIcon">
                <FaLinkedinIn/>
              </span>
            </a>
            <a href="https://www.facebook.com/humayun.humayunimtiaz" target="_blank">
              <span className="bannerIcon">
                <FaFacebookF  />
              </span>
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-base uppercase font-titleFont mb-4">
            BEST SKILL ON
          </h2>
          <div className="flex gap-4">
            <span className="bannerIcon">
              <FaReact />
            </span>
            <span className="bannerIcon">
              <FaNodeJs />
            </span>
            <span className="bannerIcon">
              <SiTypescript />
            </span>
            <span className="bannerIcon">
              <SiPostgresql />
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default LeftBanner;
