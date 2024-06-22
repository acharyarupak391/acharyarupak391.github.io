import React from "react";
import { socials } from "../utils/data";
import Wrapper from "./Wrapper";

const MailOutline = "/assets/MailOutline.svg";

function Contact() {
  return (
    <Wrapper id="contact" className="pb-[100px]">
      <div className="">
        <h1 className="lg:text-[24px] md:text-base text-center  font-semibold  text-greenAccent">
          06 . what&apos;s next?
        </h1>
        <h2 className="text-center  font-bold lg:text-[60px] md:text-[48px] text-4xl mt-4  lg:mt-5  text-bluePrimary">
          Get in Touch!
        </h2>
        <p className="mt-6 text-center lg:mt-14 md:mt-4 text-bluePrimary">
          Ready for a conversation? Let&apos;s connect and shape the future
          together
        </p>
        <div className="flex justify-center items-center mt-[56px]">
          <ul className="flex justify-between items-center  w-[266px]">
            {socials.map(({ name, iconSrc, link }, idx) => (
              <li className="w-[24px]" key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <img src={iconSrc} alt={`${name} logo`} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="mailto:acharyarupak391@gmail.com"
          target="_blank"
          className={` flex gap-4 border text-center text-greenAccent
           font-semibold border-greenAccent w-fit md:text-[32px] md:px-6 px-3 py-4
           rounded-none ml-[50%] translate-x-[-50%] lg:mt-[120px] md:mt-[66px] mt-10
           hover:bg-blueAccent hover:bg-opacity-40 ease-in transition-all`}
        >
          Say Hello
          <img className="md:w-[32px]" src={MailOutline} alt="" />
        </a>
      </div>
    </Wrapper>
  );
}

export default Contact;
