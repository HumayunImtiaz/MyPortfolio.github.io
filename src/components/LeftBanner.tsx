import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaFacebookF,  FaLinkedinIn, FaReact, FaWhatsapp , } from "react-icons/fa";
import { SiTailwindcss, } from "react-icons/si";
import { FadeIn } from "./FadeIn";
import { BsDatabase, BsGithub } from "react-icons/bs";


const LeftBanner = () => {
  const [text] = useTypewriter({
    words: ["Software Engineer.", "MERN STACK developer.", "Software Developer Life Cycle."],
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
        Proficient in JavaScript, React, HTML, CSS, and Tailwind CSS, React.js, API ,OOP, MySQL and familiar with Mongodb, React-Native ,for developing engaging, responsive interfaces.
        Experienced with SDLC principles and a range of programming languages like C++ and Java.
        Strong communication skills, enabling effective collaboration with cross-functional teams and clients.

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
              <BsDatabase/>
            </span>
            <span className="bannerIcon">
              <SiTailwindcss />
            </span>
            <span className="bannerIcon">
              < BsGithub/>
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default LeftBanner;
