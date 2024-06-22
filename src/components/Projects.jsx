import { projects } from "@/utils/data";
import Slider from "./Slider";
import Title from "./Title";
import Wrapper from "./Wrapper";
import useMediaQuery from "@/hooks/useMediaQuery";

const GithubIcon = "/assets/socials/github.svg";
const WWWIcon = "/assets/socials/www.svg";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full md:max-w-[75%] mx-auto rounded-lg overflow-hidden">
      <div className="relative">
        <div className="absolute w-full h-full bg-project-gradient" />
        <img src={project.image} alt={`Project ${project.name} image`} />

        <div className="absolute bottom-0 left-0 p-4 space-y-2 text-gray-200">
          <p className="text-lg font-bold">{project.name}</p>
          <p className="text-sm text-gray-300">{project.tech}</p>
          <div>
            <a href={project.github} target="_blank" className="flex gap-2">
              <img src={GithubIcon} alt="Github icon" width={16} height={16} />
              <span className="text-sm text-gray-300">View on Github</span>
            </a>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                className="flex items-center gap-2"
              >
                <img src={WWWIcon} alt="WWW icon" width={16} height={16} />
                <span className="text-sm text-gray-300">View app</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 text-sm text-gray-100 bg-gray-800">
        {project.description}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <Wrapper className="mt-20" id={"projects"}>
      <Title>04. Projects</Title>

      <Slider
        list={projects}
        className="mt-10 lg:mt-24"
        renderer={(project) => <ProjectCard project={project} />}
        options={{
          breakpoints: {
            768: {
              arrows: false,
            },
          },
        }}
      ></Slider>
    </Wrapper>
  );
};

export default Projects;
