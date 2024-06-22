import { classNames } from "@/utils/classnames";
import React from "react";

function Skillcard({ src, alt, classes, ...rest }) {
  return (
    <div className="w-full sm:w-36 h-32 sm:h-24 px-6 py-2 bg-white rounded-[10px] flex justify-center items-center group">
      <img
        src={src}
        alt={alt}
        className={classNames(
          "object-contain h-full grayscale group-hover:grayscale-0 mix-blend-multiply",
          classes
        )}
        {...rest}
      />
    </div>
  );
}

export default Skillcard;
