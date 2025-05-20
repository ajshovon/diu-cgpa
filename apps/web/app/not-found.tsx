import React from "react";
import { BsRobot } from "react-icons/bs";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-[100%]">
      <BsRobot className="text-3xl text-center" />
      <h1 className="font-bold md:text-5xl text-4xl mt-2">404</h1>
      <div className="text-center">
        <p>Oops, page not found…</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
