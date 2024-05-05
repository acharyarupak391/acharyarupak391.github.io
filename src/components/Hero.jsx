import React from "react";
import Button from "./Button";
import { RESUME_URL } from "../utils/constants";
import { socials } from "../utils/data";
function Hero() {
  return (
    <section className="flex mx-[30px] lg:mx-[70px]">
      <div className="fixed bottom-0 hidden lg:flex">
        <ul className="flex-col items-center justify-center flex gap-[30px]">
          {socials.map(({ name, link, iconSrc }, idx) => (
            <li className="w-[24px]" key={idx}>
              <a target="_blank" href={link}>
                <img src={iconSrc} alt={`${name} logo`} />
              </a>
            </li>
          ))}

          <li className="w-[24px]">
            <div className="border-2 rounded-sm border-blueAccent w-[2px] h-[130px] mx-auto "></div>
          </li>
        </ul>
      </div>

      <div className="md:mx-[30px] lg:mx-[115px] mt-[66px] w-[830px]">
        <p className="text-greenAccent">Hi, my name is</p>
        <h1 className=" text-[36px] md:text-[56px] lg:text-[88px] leading-[100%] font-bold text-bluePrimary">
          Rupak Acharya.
        </h1>
        <h1 className="text-[32px] md:text-[46px] lg:text-[68px] font-bold text-blueAccent">
          Software Engineer
        </h1>
        <p className="lg:leading-[131%]  text-blueAccent font-inter w-[80%] mt-4 mb-[58px]">
          I am an enthusiastic and keen learner in the field of computers,
          programming and current technological issues. I have been involved in
          programming for more than 4 years now and currently involved as a
          Professional{" "}
          <span className="text-greenAccent">Full Stack Developer</span>.
        </p>

        <Button
          title={"Checkout my Resume!"}
          classes={
            " border text-greenAccent mx-auto md:mx-0 font-semibold border-greenAccent w-[260px] text-[14px] px-[34px] py-[29px] "
          }
          target="_blank"
          href={RESUME_URL}
        />
      </div>
      <div className="fixed bottom-0 right-0 hidden lg:flex">
        <ul className="right-0 flex-row justify-center items-centerh-full ">
          <li className="top-0 rotate-90 translate-x-10 translate-y-0">
            <a
              href="mailto:acharyarupak391@gmail.com"
              target="_blank"
              className="text-sm transition-colors ease-in hover:text-greenAccent"
            >
              acharyarupak391@gmail.com
            </a>
          </li>
          <li className="pt-[30px] w-[24px] translate-x-[142px] translate-y-[100px] ">
            <div className="border-2 rounded-sm border-blueAccent w-[2px] h-[230px] "></div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
