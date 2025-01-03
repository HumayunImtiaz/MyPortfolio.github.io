import Title from "./Title.tsx";
import ProjectsCard from "./ProjectsCard";

import projectOne from '../assets/images/projects/projectOne.jpg';
import projectFour from '../assets/images/projects/projectFour.jpg';
import projectFive from '../assets/images/projects/projectFive.jpg';

import projectTwo from '../assets/images/projects/projectTwo.jpg';
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
            title="Currency Changer"
            des=" This tool is used to convert the currency. In javascript using fetch API"
            src={projectFour}
          />
          <ProjectsCard
            title="TCI-Space honed in React.js"
            des=" This project was a deep dive into creating a responsive and intuitive user interface, 
                 combining design precision with a seamless user experience!"
            src={projectTwo}
          />
          <ProjectsCard
            title="Amazon Clone in Tailwind CSS"
            des="Make Amazon Clone Using Taiwind CSS acces many properties of Tailwind CSS!"
            src={projectThree}
          />
          <ProjectsCard
            title="Mediplus Clone"
            des="As the frontend developer for Mediplus, I focused on creating a user-friendly, 
                 intuitive interface that enhances the healthcare experience for users. "
            src={projectOne}
          />
          <ProjectsCard
            title="CUSTUM VICHLES WRAP & SIGN"
            des="Custom vichles wrap make the fully responsive clone according to requirement"
            src={projectFive}
          />
          <ProjectsCard
           title="TCI-Space honed in React.js"
           des=" This project was a deep dive into creating a responsive and intuitive user interface, 
                combining design precision with a seamless user experience!"
            src={projectTwo}

          />

        </div>
      </FadeIn>
    </section>
  );
};

export default Projects;
