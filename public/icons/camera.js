import React from "react";

function Camera() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
        <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    </>
  );
}

export default Camera;
