import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`rounded-full animate-spin ease duration-300 w-5 h-5 border-t-2 border-l-2 border-white`}
      ></div>
    </div>
  );
};

export default Spinner;
