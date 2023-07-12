import React from "react";
function Skillcard({ src, alt, classes }) {
  return (
    <div className="w-[250px] h-[200px] p-8 bg-white rounded-[10px] flex justify-center items-center">
      <img src={src} alt={alt} className={`${classes || ""}`} />
    </div>
  );
}

export default Skillcard;
