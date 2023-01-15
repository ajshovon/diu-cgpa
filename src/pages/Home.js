import React, { useRef } from "react";
import ForkMe from "../components/ui/ForkMe";
import { FiChevronRight } from "react-icons/fi";
import { calculateCgpa } from "../utils/utils";
import StatsCard from "../components/StatsCard";
import CgpaCard from "../components/CgpaCard";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResultTable from "../components/ResultTable";
import LoadingButton from "../components/ui/LoadingButton";
import { Accordion } from "flowbite-react";

const Home = () => {
  const studentIDRef = useRef();

  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateCgpHandler = () => {
    const studentID = studentIDRef.current.value.replace(/\s+/g, " ").trim();
    if (!studentID) {
      toast.warn("Blank Student ID!");
      return;
    }
    setIsLoading(true);
    calculateCgpa(studentID)
      .then((result) => {
        setResult(result);
        setIsLoading(false);
        toast.success("Action Successful!");
      })
      .catch((err) => console.log(err));
  };

  const calculateAgainCgpHandler = () => {
    setResult(false);
    setIsLoading(false);
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 flex min-h-[90vh]">
        <div className="py-8 px-4 m-auto mx-auto max-w-screen-xl text-center align-middle align-center justify-center">
          {!result && (
            <>
              <ForkMe />
              <div className=" relative mb-8">
                <input
                  type="text"
                  id="studentID"
                  ref={studentIDRef}
                  className="text-center rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 text-2xl focus:ring-primary-500 focus:border-transparent"
                  placeholder="191-15-12000"
                />
              </div>
            </>
          )}
          {result && (
            <>
              <CgpaCard cgpa={result[1][0]} /> <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{result[0]["name"]}</h1>
              <h5 className="text-2xl">{result[0]["program"]}</h5>
              <div className="flex flex-wrap justify-center">
                <StatsCard name="Semester" value={result[2].length + "th"} />
                <StatsCard name="Batch" value={result[0]["batch"]} />
                <StatsCard name="Credits" value={result[1][1]} />
                <StatsCard name="Department" value={result[0]["department"]} />
                <StatsCard name="Faculty" value={result[0]["faculty"]} />
                <StatsCard name="Campus" value={result[0]["campus"]} />
              </div>
              {!isLoading && (
                <div className="flex flex-col mb-2 mt-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                  <button onClick={calculateAgainCgpHandler} className="disabled:bg-opacity-50 inline-flex justify-center items-center bg-primary-600 rounded-full text-white px-4 py-3 transition duration-300 ease-in-out hover:primary-800 mr-6 ml-6">
                    Calculate Again <FiChevronRight />
                  </button>
                </div>
              )}
              <Accordion alwaysOpen={true} className="mt-6">
                <Accordion.Panel>
                  <Accordion.Title>Semester Wise Results</Accordion.Title>
                  <Accordion.Content>
                    <ResultTable resultsList={result[2]} />
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </>
          )}
          {!isLoading && !result && (
            <div className="disabled:bg-opacity-50 flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <button onClick={calculateCgpHandler} className="inline-flex justify-center items-center bg-primary-600 rounded-full text-white px-4 py-3 transition duration-300 ease-in-out hover:primary-800 mr-6 ml-6">
                Calculate <FiChevronRight />
              </button>
            </div>
          )}
          {isLoading && <LoadingButton />}
        </div>
      </section>
    </div>
  );
};

export default Home;
