import React from "react";
import { education } from "../utils/data";
import { classNames } from "../utils/classnames";
import Wrapper from "./Wrapper";
import Title from "./Title";

function Education() {
  return (
    <Wrapper id="education">
      <Title>05. Education</Title>
      <div className="mx-auto mt-10 lg:mt-24 space-y-14">
        {education.map(({ title, institutionName, text, date }, idx) => (
          <div
            className={classNames(
              "md:w-[532px] w-[340px] md:h-[230px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14",
              idx % 2 !== 0 && "lg:ml-[50%]"
            )}
            key={idx}
          >
            <p className="pt-[32px] font-bold text-[14px] md:text-[16px] uppercase text-bluePrimary">
              {title}
            </p>
            <p className="mt-4 font-semibold uppercase font-inter">
              {institutionName}
            </p>
            <p className="md:w-[420px] mt-4">{text}</p>
            <p className="float-right mt-10 font-semibold uppercase font-inter md:mt-1">
              {date}
            </p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default Education;
