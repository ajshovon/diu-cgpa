import React from "react";
import { Spinner } from "flowbite-react";

const LoadingButton = () => {
  return (
    <div className="disabled:bg-opacity-50 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <button disabled className="inline-flex justify-center items-center bg-primary-500 rounded-full text-white px-4 py-3 transition duration-300 ease-in-out  mr-6 ml-6">
        <span className="pl-3">Loading...</span>
        <Spinner aria-label="Loading..." color="purple" className="ml-1 mb-1" size="sm" />
      </button>
    </div>
  );
};

export default LoadingButton;
