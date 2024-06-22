import { projects } from "@/utils/data";
import Slider from "./Slider";
import Title from "./Title";
import Wrapper from "./Wrapper";

const GithubIcon = "/assets/socials/github.svg";
const WWWIcon = "/assets/socials/www.svg";

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full md:max-w-[75%] mx-auto rounded-lg overflow-hidden h-full flex flex-col">
      <div className="relative flex justify-center flex-grow bg-black">
        <div className="absolute w-full h-full bg-project-gradient" />
        <img
          src={project.image}
          alt={`Project ${project.name} image`}
          className="object-contain object-center h-full max-h-[500px]"
        />

        <div className="absolute bottom-0 left-0 p-4 space-y-2 text-gray-200">
          <p className="text-lg font-bold">{project.name}</p>
          <p className="text-sm text-gray-300">{project.tech}</p>
          <div className="flex items-center gap-4">
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
        renderer={(project, i) => <ProjectCard project={project} />}
        lastSlide={
          <div className="w-full relative md:max-w-[75%] mx-auto h-full bg-black overflow-hidden transition-all rounded-lg group [background-size:100%] hover:[background-size:200%] bg-[url(/assets/projects/github-profile.png)]">
            <div className="absolute inset-0 flex flex-col justify-center w-full h-full gap-2 p-8 bg-black bg-opacity-40 backdrop-blur-[8px]">
              <p className="text-lg font-light text-gray-300">
                Want to see more of my works?
              </p>
              <a
                href="https://github.com/acharyarupak391"
                target="_blank"
                className="flex items-center gap-3 font-mono text-xl font-semibold text-gray-100 border-b-2 border-transparent group-hover:border-gray-400 w-max"
              >
                Checkout my Github Profile{" "}
                <img
                  src={GithubIcon}
                  height={24}
                  width={24}
                  alt="Github icon"
                />
              </a>
            </div>
          </div>
        }
        options={{
          type: "slide",
          pagination: false,
          breakpoints: {
            768: {
              arrows: false,
              pagination: true,
            },
          },
        }}
      ></Slider>
    </Wrapper>
  );
};

export default Projects;
