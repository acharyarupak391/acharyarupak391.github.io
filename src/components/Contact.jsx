import React from "react";
import Github from "../assets/socials/github.svg";
import Instagram from "../assets/socials/instagram.svg";
import Linkedin from "../assets/socials/linkedin.svg";
import Twitter from "../assets/socials/twitter.svg";
import MailOutline from "../assets/MailOutline.svg";

function Contact() {
  return (
    <section
      id="contact"
      className="mx-[30px] md:mx-[70px] lg:mx-[290px] mt-[60px] pt-10 lg:mt-[150px] pb-[100px]"
    >
      <div className="">
        <h3 className="lg:text-[24px] md:text-base text-center  font-semibold  text-greenAccent">
          06 . what’s next?
        </h3>
        <h1 className="text-center  font-bold lg:text-[60px] md:text-[48px] text-4xl mt-4  lg:mt-5  text-bluePrimary">
          Get in Touch!
        </h1>
        <p className="mt-6 text-center lg:mt-14 md:mt-4 text-bluePrimary">
          Ready for a conversation? Let's connect and shape the future together
        </p>
        <div className="flex justify-center items-center mt-[56px]">
          <ul className="flex justify-between items-center  w-[266px]  ">
            <li className="w-[24px]">
              <a
                href="https://github.com/acharyarupak391"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Github} alt="Github" />
              </a>
            </li>
            <li className="w-[24px]">
              <a
                href="https://www.instagram.com/acharyarupak391"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Instagram} alt="Instagram" />
              </a>
            </li>
            <li className="w-[24px]">
              <a
                href="https://www.linkedin.com/in/acharyarupak391/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Linkedin} alt="Linkedin" />
              </a>
            </li>
            <li className="w-[24px]">
              <a
                href="https://twitter.com/acharyarupak391"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Twitter} alt="Twitter" />
              </a>
            </li>
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
    </section>
  );
}

export default Contact;
