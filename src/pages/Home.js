import React, { useRef, useState } from "react";
import ForkMe from "../components/ui/ForkMe";
import { FiChevronRight } from "react-icons/fi";
import { calculateCgpa } from "../utils/utils";
import StatsCard from "../components/StatsCard";
import CgpaCard from "../components/CgpaCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResultTable from "../components/ResultTable";
import { Accordion, Spinner, ToggleSwitch, DarkThemeToggle, useThemeMode } from "flowbite-react";

const Home = () => {
  const studentIDRef = useRef();
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode, toggleMode] = useThemeMode("dark");
  const [checkImproved, setCheckImproved] = useState(false);
  const onChangeCheckBox = (e) => {
    if (!isLoading) {
      setCheckImproved(e);
      if (e) {
        toast.info("Make Sure All Teaching Evaluations Are Completed!", {
          position: "bottom-center",
        });
      }
    }
  };

  const calculateCgpHandler = () => {
    const studentID = studentIDRef.current.value.replace(/\s+/g, " ").trim();
    if (!studentID) {
      toast.warn("Blank Student ID!");
      return;
    }
    setIsLoading(true);
    calculateCgpa(studentID, checkImproved)
      .then(([evp, result]) => {
        if (evp) {
          toast.warning("Teaching Evaluation Pending! Calculation may not be correct.");
        }
        setResult(result);
        setIsLoading(false);
        toast.success("Action Successful!");
      })
      .catch((err) => {
        toast.error("Network Error!");
        setIsLoading(false)
        console.log(err);
      });
  };

  const calculateAgainCgpHandler = () => {
    setResult(false);
    setIsLoading(false);
  };

  return (
    <div>
      <DarkThemeToggle onClick={toggleMode} className="absolute right-0 mt-2 mr-2" />
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
                  className="text-center rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white dark:bg-gray-800 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 text-2xl focus:ring-primary-500 focus:border-transparent"
                  placeholder="191-15-12000"
                />
              </div>
            </>
          )}
          {result && (
            <>
              <CgpaCard cgpa={result[1][0]} /> <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{result[0]["name"]}</h1>
              <h5 className="text-2xl text-gray-900 dark:text-white">{result[0]["program"]}</h5>
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
          {!result && (
            <>
              <div className="flex flex-col mb-6 lg:mb-8 space-y-4  justify-center sm:space-y-0 sm:space-x-4">
                <button onClick={calculateCgpHandler} disabled={isLoading} className="inline-flex justify-center items-center bg-primary-600 rounded-full text-white px-4 py-3 transition duration-300 ease-in-out hover:primary-800 mr-6 ml-6">
                  {isLoading ? (
                    <>
                      Loading... <Spinner aria-label="Loading..." color="purple" className="ml-2 mb-1" size="sm" />
                    </>
                  ) : (
                    <>
                      Calculate <FiChevronRight />
                    </>
                  )}
                </button>
              </div>
              <div className="flex mb-6 lg:mb-8 space-y-4 flex-row justify-center sm:space-y-0 sm:space-x-4">
                <ToggleSwitch checked={checkImproved} label="Attended Improvement" onChange={onChangeCheckBox} />
              </div>
            </>
          )}
        </div>
      </section>
      <ToastContainer autoClose={3000} theme={mode} />
    </div>
  );
};

export default Home;
