import React from "react";
import Skillcard from "./Skillcard";
import { skills } from "../utils/data";
import Wrapper from "./Wrapper";

import Slider from "./Slider";
import Title from "./Title";

function Skills() {
  return (
    <Wrapper id="skills">
      <Title>03. Skills</Title>

      <Slider
        list={skills}
        renderer={(skill) => (
          <Skillcard
            src={skill.Logo}
            alt={`Logo for ${skill.name}`}
            classes={skill.classes}
            title={skill.name}
          />
        )}
        className="mt-10 lg:mt-24"
        options={{
          pagination: false,
          arrows: false,
          autoplay: true,
          interval: 1500,
          speed: 2000,
          perPage: 5,
          breakpoints: {
            1130: {
              perPage: 4,
            },
            1024: {
              perPage: 3,
            },
            640: {
              perPage: 1,
              pagination: true,
            },
          },
        }}
      />
    </Wrapper>
  );
}

export default Skills;
