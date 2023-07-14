import React, { useState } from "react";
import Logo from "/logo.svg";
import Button from "./Button";
import { RESUME_URL } from "../utils/constants";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu(e) {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  return (
    <header className="relative w-full">
      <nav className="h-[100px] flex mx-[30px] lg:mx-[70px] pt-[20px] lg:pt-[26px] items-center justify-between text-[17px]">
        <div className="h-full">
          <img src={Logo} alt="Logo" className="h-full" />
        </div>
        {/* Links for desktop and tablet devices */}
        <div className="hidden lg:flex justify-center items-center gap-[55px]">
          <ul className="flex gap-[42px] text-sm text-bluePrimary font-semibold">
            <li>
              <a href="#aboutme">01. About</a>
            </li>

            <li>
              <a href="#experience">02. Experience</a>
            </li>

            <li>
              <a href="#skills">03. Skills</a>
            </li>

            <li>
              <a href="#education">04. Education</a>
            </li>

            <li>
              <a href="#contact">05. Contact</a>
            </li>
          </ul>
          <div>
            <Button
              title="Resume"
              href={RESUME_URL}
              classes="border border-greenAccent px-[49px] text-sm text-greenAccent "
            />
          </div>
        </div>

        <svg
          onClick={(e) => toggleMenu()}
          className="flex w-8 cursor-pointer lg:hidden"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"
            fill="rgba(100,255,218,1)"
          ></path>
        </svg>
      </nav>
      <div className="">
        <nav className="">
          <ul
            className={`flex-row ${
              isOpen ? "translate-x-0" : "translate-x-[100%] hidden"
            } text-bluePrimary font-semibold   lg:hidden  
            absolute top-[100px] left-0 right-0 bottom-0  bg-bgPrimary text-center
            h-[60vh]  border-b-2 border-greenAccent `}
          >
            <li className="pt-10">
              <a href="#aboutme" onClick={(e) => setTimeout(toggleMenu, 500)}>
                01. About
              </a>
            </li>

            <li className="pt-10">
              <a
                href="#experience"
                onClick={(e) => setTimeout(toggleMenu, 500)}
              >
                02. Experience
              </a>
            </li>

            <li className="pt-10">
              <a href="#skills" onClick={(e) => setTimeout(toggleMenu, 500)}>
                03. Skills
              </a>
            </li>

            <li className="pt-10">
              <a href="#education" onClick={(e) => setTimeout(toggleMenu, 500)}>
                04. Education
              </a>
            </li>

            <li className="pt-10">
              <a href="#contact" onClick={(e) => setTimeout(toggleMenu, 500)}>
                05. Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
