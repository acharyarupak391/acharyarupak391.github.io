import React from "react";
import ProfilePic from "../assets/profile.jpg";

function AboutMe() {
  return (
    <section
      id="aboutme"
      className=" mx-[30px] md:mx-[70px] lg:mx-[180px] mt-[140px] pt-10"
    >
      <div className="flex items-center justify-start gap-4">
        <h1 className=" text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          01. About Me
        </h1>
        <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
      </div>
      <div className="flex-row lg:flex items-center lg:pt-[44px] gap-20">
        <div className="lg:w-[50%] mt-4 lg:mt-0">
          <p>
            As a passionate and avid learner in the realm of computers and
            programming, I find myself captivated by the ever-evolving landscape
            of technology. Hailing from the enchanting city of Kathmandu in
            Nepal, my journey as a software engineer has been nothing short of
            exhilarating. Armed with a B.Tech in{" "}
            <span className="text-greenAccent">
              Computer Science and Engineering
            </span>{" "}
            from MRCET College in Hyderabad, I have honed my skills in various
            domains, including{" "}
            <span className="text-greenAccent">
              web development, machine learning, AWS, OOPs, Python, and React
            </span>
            .
          </p>
          <br />
          <p>
            With an insatiable curiosity and an unwavering dedication to
            excellence, I embark on each project with boundless enthusiasm.
            Beyond my technical prowess, my social skills serve as the catalyst
            for effective collaboration and seamless teamwork. Together, we can
            bring innovation to life in the most enchanting ways imaginable.
          </p>
        </div>
        <div className="relative  mt-10 lg:mt-0 lg:ml-0 md:ml-[20%] ml-[10%]  lg:translate-x-0">
          <img
            src={ProfilePic}
            alt="Profile Pic"
            className="w-[240px] h-[250px] md:w-[300px] md:h-[300px] rounded-[3px]"
          />
          <div className="w-[240px] h-[250px] md:w-[300px] md:h-[300px]  border-2 rounded-[3px] border-greenAccent absolute top-2  left-2 border-t-0 border-l-0 "></div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
