import React, { useEffect, useState } from "react";
import Button from "./Button";
import { RESUME_URL } from "../utils/constants";
import SidebarIcon from "../icons/SidebarIcon";
import XIcon from "../icons/XIcon";
import { navLinks } from "../utils/data";

const Logo = "/logo.svg";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!window || !document) return;

    function handleDocumentClick(e) {
      e.stopPropagation();
      // e.preventDefault();
      const clickedInside = e.target.closest("header");
      const clickedButton = e.target.closest("button#menu-toggle-btn");

      if (clickedButton) {
        setIsOpen((prev) => !prev);
        return;
      }

      if (!clickedInside) setIsOpen(false);
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-bgPrimary">
      <nav className="h-[100px] flex mx-[30px] lg:mx-[70px] pt-[20px] lg:pt-[26px] items-center justify-between text-[17px]">
        <div className="h-full">
          <img src={Logo} alt="Logo" className="h-full" />
        </div>
        {/* Links for desktop and tablet devices */}
        <div className="hidden lg:flex justify-center items-center gap-[55px]">
          <ul className="flex gap-[42px] text-sm text-bluePrimary font-semibold">
            {navLinks.map(({ link, text }, idx) => (
              <li key={idx}>
                <a href={link}>{text}</a>
              </li>
            ))}
          </ul>

          <div>
            <Button
              title="Resume"
              href={RESUME_URL}
              classes="border border-greenAccent px-[49px] text-sm text-greenAccent "
              target="_blank"
            />
          </div>
        </div>

        <button className="text-greenAccent lg:hidden" id="menu-toggle-btn">
          {isOpen ? <XIcon /> : <SidebarIcon />}
          <span className="sr-only">Sidebar toggle button</span>
        </button>
      </nav>

      <div>
        <nav>
          <ul
            className={`flex-row ${
              isOpen ? "translate-x-0" : "translate-x-[100%] hidden"
            } text-bluePrimary font-semibold   lg:hidden  
            absolute top-[100px] left-0 right-0 bottom-0  bg-bgPrimary text-center
            h-[60vh]  border-b-2 border-greenAccent `}
          >
            {navLinks.map(({ link, text }, idx) => (
              <li className="pt-10" key={idx}>
                <a
                  href={link}
                  onClick={(e) => setTimeout(() => setIsOpen(false), 100)}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
