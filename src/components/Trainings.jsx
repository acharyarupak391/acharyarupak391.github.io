import React from "react";
import { trainings } from "../utils/data";
import Wrapper from "./Wrapper";
import Title from "./Title";

function Trainings() {
  return (
    <Wrapper>
      <Title>05. Trainings and Certifications</Title>
      <div className="grid md:grid-cols-2 md:gap-[66px] lg:grid-cols-3 lg:gap-[77px] mt-10 lg:mt-24">
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
    </Wrapper>
  );
}

export default Trainings;
