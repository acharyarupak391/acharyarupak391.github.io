import React from "react";

function SidebarIcon({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16 18v2H5v-2h11zm5-7v2H3v-2h18zm-2-7v2H8V4h11z"
      ></path>
    </svg>
  );
}

export default SidebarIcon;
