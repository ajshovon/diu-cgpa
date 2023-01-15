import React from "react";
import { FiGithub, FiChevronRight } from "react-icons/fi";

const ForkMe = () => {
  return (
    <a
      href="https://github.com/shovon668/diu-cgpa"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
      role="alert"
    >
      <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">
        <FiGithub />
      </span>{" "}
      <span className="text-sm font-medium">Fork me on github!</span>
      <FiChevronRight />{" "}
    </a>
  );
};

export default ForkMe;
