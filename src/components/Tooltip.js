import React, { useState } from "react";

const Tooltip = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [title, setTitle] = useState(props.title);

  const handleClick = async () => {
    if (!props.copyText) return;
    await navigator.clipboard.writeText(props.copyText).then(
      function () {
        setTitle("Copied to clipboard!");
      },
      function () {
        console.log("copy Failed");
      }
    );
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTitle(props.title);
  };

  return (
    <div
      style={{
        display: "inherit",
        position: "relative",
        margin: 0,
        padding: 0,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {props.children}
      <p className={`tooltip-outer`}>
        <p
          className={`tooltip ${isHovering ? "show" : "hide"} ${
            title !== props.title ? "copy" : ""
          }`}
        >
          {title}
        </p>
      </p>
    </div>
  );
};

export default Tooltip;
