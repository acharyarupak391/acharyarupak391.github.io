import React, { useState } from "react";
import { experience } from "../utils/data";
import { classNames } from "../utils/classnames";
import Wrapper from "./Wrapper";
import Title from "./Title";

function Experience() {
  const [expData, setexpData] = useState(experience[0]);
  const handleClick = (ev, id) => {
    let data = experience.filter((e) => e.id === id)[0];
    setexpData(data);
  };
  return (
    <Wrapper id="experience">
      <Title>02. Where I&apos;ve worked</Title>
      {/* Experience tabs */}
      <div className="flex-row mt-10 lg:mt-24 md:flex">
        <div className="md:mr-10">
          <ul
            id="scrollbar"
            className="flex overflow-x-scroll border-b border-b-blueAccent md:border-b-0 md:overflow-visible md:border-l-blueAccent md:border-l md:block space-y-[28px]"
          >
            {experience.map(({ companyName, id }) => (
              <li key={id}>
                <button
                  onClick={(ev) => handleClick(ev, id)}
                  className={classNames(
                    "transition-all ease-in-out md:w-[200px] w-[250px] h-[40px] md:h-14 rounded-r-sm p-9 md:p-3  flex items-center justify-center hover:text-greenAccent",
                    expData.id === id &&
                      "bg-blueAccent border-l-greenAccent border-l-4  bg-opacity-10 text-greenAccent"
                  )}
                >
                  {companyName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="pt-5 text-xl font-semibold font-inter text-bluePrimary ">
            {expData.role}{" "}
            <span className="text-greenAccent hover:underline-offset-4 hover:underline ">
              @{expData.companyName}
            </span>
          </h2>
          <p className="mt-[10px]">{expData.timespan}</p>
          <ul className="list-disc list-outside mt-[30px]">
            {expData.description.map((data, index) => (
              <li key={index} className="mt-[10px]">
                {data}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default Experience;
