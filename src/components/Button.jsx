import React from "react";

function Button({ title, classes, href }) {
  return (
    <a
      href={href}
      download
      className={` w-[160px] h-[40px] rounded-[9px]  flex justify-center items-center ${classes} hover:bg-greenAccent hover:bg-opacity-40 ease-in transition-all`}
    >
      {title}
    </a>
  );
}

export default Button;
