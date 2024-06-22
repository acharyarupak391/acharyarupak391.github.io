import React from "react";
import Wrapper from "./Wrapper";
import Title from "./Title";

const ProfilePic = "/assets/profile.jpg";

function AboutMe() {
  return (
    <Wrapper id="aboutme">
      <Title>01. About Me</Title>

      <div className="flex-row lg:flex lg:pt-[44px] gap-20">
        <div className="lg:w-[50%] mt-4 lg:mt-0 space-y-4">
          <p>
            Hi there! I&apos;m Rupak, a passionate{" "}
            <span className="text-greenAccent">full-stack</span> web developer
            with a knack for creating responsive and user-friendly web
            applications. Over the years, I&apos;ve honed my skills in front-end
            and back-end technologies, including{" "}
            <span className="text-greenAccent">Next.js</span>,{" "}
            <span className="text-greenAccent">React</span>,{" "}
            <span className="text-greenAccent">Node.js</span>, and more. I love
            turning complex problems into simple, beautiful solutions that make
            users&apos; lives easier.
          </p>

          <p>
            My journey in web development has been exciting, with projects
            ranging from building a{" "}
            <span className="text-greenAccent">web3-based</span> cryptocurrency
            insurance platform to real-time payment negotiation systems.
            I&apos;m also well-versed in working with{" "}
            <span className="text-greenAccent">databases</span>, implementing
            smart contracts, and integrating APIs to create seamless digital
            experiences.
          </p>

          <p>
            Feel free to check out my{" "}
            <span className="text-greenAccent">GitHub</span> to see some of my
            projects, and don&apos;t hesitate to reach out if you&apos;d like to
            collaborate or just chat about tech!
          </p>
        </div>
        <div className="relative mt-10 lg:mt-0 bg-cover lg:translate-x-0 h-[350px] lg:h-[400px] w-full lg:w-[300px] flex-1 bg-about flex items-center justify-center rounded-tl-[32px] rounded-br-[32px] group">
          <div className="absolute inset-0 z-0 w-full rounded-tl-[32px] rounded-br-[32px] h-full bg-black bg-opacity-10 backdrop-blur-[3px] transition-all grayscale group-hover:grayscale-0" />

          <img
            src={ProfilePic}
            alt="Profile Pic"
            className="w-[270px] md:w-[320px] rounded-[3px] z-10 rounded-tl-[32px] rounded-br-[32px] grayscale transition-all group-hover:grayscale-0 group-hover:scale-110"
          />
          <div className="w-full h-full border-2 rounded-[3px] rounded-br-[32px] border-greenAccent absolute top-2  left-2 border-t-0 border-l-0 "></div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AboutMe;
