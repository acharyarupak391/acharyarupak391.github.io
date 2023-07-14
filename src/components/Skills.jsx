import React from "react";
import Skillcard from "./Skillcard";
import { skills } from "../utils/data";

function Skills() {
  return (
    <section
      id="skills"
      className="mx-[30px] md:mx-[70px] lg:mx-[180px] mt-[66px] pt-10"
    >
      <div className="flex items-center justify-start gap-4">
        <h1 className=" text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          03. Skills
        </h1>
        <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-[66px] md:mt-[66px] mt-[56px] gap-10 lg:grid-cols-3 lg:gap-[77px] mx-auto w-fit lg:mt-[84px]">
        {skills.map(({ Logo, name, classes }, i) => (
          <Skillcard
            src={Logo}
            alt={`Logo for ${name}`}
            key={i}
            classes={classes}
            title={name}
          />
        ))}
      </div>
    </section>
  );
}

export default Skills;
