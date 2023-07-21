import React, { useState } from "react";
import "../index.css";
import { experience } from "../utils/data";
import { classNames } from "../utils/classnames";

function Experience() {
  const [expData, setexpData] = useState(experience[0]);
  const handleClick = (ev, id) => {
    let data = experience.filter((e) => e.id === id)[0];
    setexpData(data);
  };
  return (
    <section
      id="experience"
      className="mx-[30px] md:mx-[70px] lg:mx-[290px]  mt-[60px] pt-4 lg:mt-[160px]"
    >
      <div className="flex items-center gap-4">
        {" "}
        <h1 className="text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          02. Where I’ve Worked
        </h1>
        <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
      </div>{" "}
      {/* Experience tabs */}
      <div className="flex-row md:flex ">
        <div className="m-0 mt-5 md:mt-10 md:m-10">
          <ul
            id="scrollbar"
            className="flex overflow-x-scroll border-b border-b-blueAccent md:border-b-0 md:overflow-visible md:border-l-blueAccent md:border-l md:block"
          >
            {experience.map(({ companyName, id }) => (
              <li key={id}>
                <button
                  onClick={(ev) => handleClick(ev, id)}
                  className={classNames(
                    "transition-all ease-in-out md:mt-[28px] md:w-[200px] w-[250px] h-[40px] md:h-14 rounded-r-sm p-9 md:p-3  flex items-center justify-center hover:text-greenAccent",
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
        <div className="mt-10 ">
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
    </section>
  );
}

export default Experience;
