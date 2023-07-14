import React from "react";
import { education } from "../utils/data";
import { classNames } from "../utils/classnames";

function Education() {
  return (
    <section
      id="education"
      className="mx-[30px] md:mx-[70px] lg:mx-[290px] mt-[60px] pt-10 lg:mt-[160px]"
    >
      <div className="flex items-center gap-4">
        {" "}
        <h1 className="text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          04. Education
        </h1>
        <div className="border-2  w-[130px] md:w-[230px] h-[1px] border-blueAccent "></div>
      </div>{" "}
      <div className="lg:mt-[92px] md:mt-[66px] mt-10 mx-auto space-y-14">
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
    </section>
  );
}

export default Education;
