import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
  title: string;
  des: string;
  src: string;
  links?: { label: string; href: string }[];
}

const ProjectsCard = ({ title, des, src, links = [] }: Props) => {
  return (
    <article className="w-full p-4 xl:px-8 h-full rounded-lg shadow-shadowOne flex flex-col bg-gradient-to-r from-bodyColor to-[#202327] group hover:bg-gradient-to-b hover:from-gray-900 hover:to-[#202327] transition-colors duration-500">
      <div className="w-full h-[80%] overflow-hidden rounded-lg">
        <img
          className="w-full h-60 object-cover group-hover:scale-105 duration-300"
          src={src}
          alt={`${title} preview`}
        />
      </div>
      <div className="w-full mt-5 flex flex-1 flex-col gap-5">
        <div>
          <h3 className="text-base uppercase text-designColor font-normal">
            {title}
          </h3>
          <p className="text-sm tracking-wide mt-3 hover:text-gray-100 duration-300">
            {des}
          </p>
        </div>
        {links.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-designColor/30 bg-designColor/5 px-3 py-2 text-xs font-medium text-gray-200 transition-colors hover:border-designColor hover:bg-designColor/10 hover:text-designColor"
              >
                {label}
                <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectsCard;
