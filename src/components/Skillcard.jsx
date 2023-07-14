import React from "react";
function Skillcard({ src, alt, classes, ...rest }) {
  return (
    <div className="w-[250px] h-[200px] p-8 bg-white rounded-[10px] flex justify-center items-center">
      <img src={src} alt={alt} className={`${classes || ""}`} {...rest} />
    </div>
  );
}

export default Skillcard;
