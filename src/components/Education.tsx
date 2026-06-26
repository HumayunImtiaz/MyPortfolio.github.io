import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2016 - 2024</p>
          <h2 className="text-3xl md:text-4xl font-bold">Education Quality</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="B.Sc. Software Engineering"
            subTitle="KFUEIT, Rahim Yar Khan (2020 - 2024)"
            result="CGPA 3.51/4.0 (Grade A)"
            des="Completed a robust Software Engineering degree with focus on SDLC, OOP, Algorithms, and Data Structures."
          />
          <ResumeCard
            title="FSC Pre-Engineering"
            subTitle="Brookfield Collage (2018 - 2020)"
            result="76%"
            des="Studied foundational courses in mathematics, physics, and chemistry, building a strong analytical base for engineering."
          />
          <ResumeCard
            title="Metric"
            subTitle="The Knowledge House School (2016 - 2018)"
            result="79%"
            des="Secondary education covering essential sciences and mathematics leading into higher education."
          />
        </div>
      </div>
      {/* part Two */}

      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2023 - 2026</p>
          <h2 className="text-3xl md:text-4xl font-bold">Certifications & Training</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Google AI Essentials"
            subTitle="Coursera - (Apr 2026)"
            result="Certified"
            des="Earned Google AI Essentials certification to apply foundational AI concepts and LLMs effectively in development pipelines."
          />
          <ResumeCard
            title="Full-Stack Software Engineering"
            subTitle="CMIT (Government-Certified)"
            result="Completed"
            des="Government-certified training gaining hands-on industry experience in modern web development technologies."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Education;
