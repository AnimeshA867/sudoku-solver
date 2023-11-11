"use client";

import React from "react";

const SolveButton = ({ solveSudoku }: { solveSudoku: any }) => {
  return (
    <button
      className="border  ring-4 hover:bg-gradient-to-r from-red-500 via-purple-500 to-blue-500  py-3 px-8 text-[30px] font-semibold rounded-full group w-full"
      onClick={solveSudoku}
    >
      <span className=" group-hover:text-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
        Solve
      </span>
    </button>
  );
};

export default SolveButton;
