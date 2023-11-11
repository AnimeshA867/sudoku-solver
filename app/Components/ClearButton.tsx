import React from "react";

const ClearButton = ({ clearBoard }: { clearBoard: any }) => {
  return (
    <button
      className="border  ring-4 bg-yellow-700 hover:bg-yellow-100  py-3 px-8 text-[30px] font-semibold rounded-full group w-full"
      onClick={clearBoard}
    >
      <span className=" text-white group-hover:bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 group-hover:text-transparent group-hover:bg-clip-text">
        Clear
      </span>
    </button>
  );
};

export default ClearButton;
