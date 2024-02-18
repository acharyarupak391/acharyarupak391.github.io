import React from "react";
import { trainings } from "../utils/data";

function Trainings() {
  return (
    <section className="mx-[30px] md:mx-[70px] lg:mx-[180px] mt-[66px] lg:mt-[132px]">
      <div className="flex items-center justify-start gap-4">
        <h1 className=" text-[24px] md:text-[32px] font-bold  text-bluePrimary">
          05. Some Noteworthy Trainings and Certifications
        </h1>
      </div>
      <div className="grid md:grid-cols-2 md:gap-[66px] lg:grid-cols-3 lg:gap-[77px] md:mt-[66px] mt-[56px] lg:mt-[84px]">
        {trainings.map(({ title, from, info, date }, idx) => (
          <div
            className="md:w-[300px] w-[340px] md:h-[280px] h-[320px] px-6 md:px-[42px] bg-blueBg rounded-[5px] mx-auto lg:mx-0 mb-14"
            key={idx}
          >
            <p className="pt-[32px] font-bold uppercase text-bluePrimary">
              {title}
            </p>
            <p className="mt-1 text-sm font-semibold font-inter">{from}</p>
            <p className="mt-10 text-xs md:mt-4">{info}</p>
            <p className="float-right mt-20 text-sm font-semibold font-inter md:mt-9">
              {date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Trainings;
