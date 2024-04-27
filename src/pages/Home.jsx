import { Accordion, DarkThemeToggle, Spinner, Table, TextInput, ToggleSwitch } from 'flowbite-react';
import { useRef, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CgpaCard from '../components/CgpaCard';
import ResultTable from '../components/ResultTable';
import StatsCard from '../components/StatsCard';
import ForkMe from '../components/ui/ForkMe';
import { calculateCgpa } from '../utils/utils';

const Home = ({ darkMode }) => {
  const studentIDRef = useRef();
  const projectCrRef = useRef();
  const projectResRef = useRef();
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkImproved, setCheckImproved] = useState(false);
  const [checkProject, setCheckProject] = useState(false);
  const customThemeToggleSwitch = {
    toggle: {
      base: 'after:rounded-full rounded-full border group-focus:ring-4 group-focus:ring-cyan-500/25',
      checked: {
        on: 'after:bg-white after:translate-x-full',
        off: 'after:bg-gray-400 dark:after:bg-gray-500 border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700',
      },
    },
  };
  const onChangeCheckBox = (e) => {
    if (!isLoading) {
      setCheckImproved(e);
      if (e) {
        toast.info('Make Sure All Teaching Evaluations Are Completed!', {
          position: 'bottom-center',
        });
      }
    }
  };
  const calculateCgpHandler = (e) => {
    e.preventDefault();
    const studentID = studentIDRef.current.value.replace(/\s+/g, ' ').trim();
    let projectCredit = 0;
    let projectResult = 0;
    if (checkProject) {
      projectCredit = projectCrRef.current.value.replace(/\s+/g, ' ').trim();
      projectResult = projectResRef.current.value.replace(/\s+/g, ' ').trim();
      if (!projectCredit) {
        toast.warn('Fill up total project credits!');
        return;
      }
      if (!projectResult) {
        toast.warn('Fill up project grade!');
        return;
      }
    }

    if (!studentID) {
      toast.warn('Blank Student ID!');
      return;
    }

    setIsLoading(true);
    calculateCgpa(studentID, checkImproved, checkProject, projectCredit, projectResult)
      .then(([inc, evp, result]) => {
        if (evp) {
          toast.warning('Teaching Evaluation Pending! Calculation May Not Be Correct.');
        }
        if (Number(inc) == 1) {
          toast.error('Could Not Fetch All Results!');
        } else {
          toast.success('Action Successful!');
        }
        setResult(result);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error('Network Error!');
        setIsLoading(false);
        console.log(err);
      });
  };

  const calculateAgainCgpHandler = () => {
    setResult(false);
    setIsLoading(false);
  };

  return (
    <div>
      <DarkThemeToggle theme={`dark`} className="absolute right-0 mt-2 mr-2" />
      <section className="bg-white dark:bg-gray-900 flex min-h-[90vh]">
        <form className="py-8 px-4 m-auto mx-auto max-w-screen-xl text-center align-middle align-center justify-center">
          {!result && (
            <>
              <ForkMe />
              <div className=" relative mb-8">
                <input type="text" id="studentID" ref={studentIDRef} className="text-center rounded-3xl border-transparent flex-1 appearance-none border border-gray-300 w-3/4 py-2 px-4 bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 text-2xl focus:ring-primary-500 focus:border-transparent" placeholder="191-15-12000" />
              </div>
            </>
          )}
          {result && (
            <>
              <CgpaCard cgpa={result[1][0]} /> <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{result[0]['name']}</h1>
              <h5 className="text-2xl text-gray-900 dark:text-white">{result[0]['program']}</h5>
              <div className="flex flex-wrap justify-center">
                <StatsCard name="Semesters" value={checkProject ? result[2].length - 1 : result[2].length} />
                <StatsCard name="Batch" value={result[0]['batch']} />
                <StatsCard name="Credits" value={result[1][1]} />
                <StatsCard name="Department" value={result[0]['department']} />
                <StatsCard name="Faculty" value={result[0]['faculty']} />
                <StatsCard name="Campus" value={result[0]['campus']} />
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
                <button type="submit" onClick={calculateCgpHandler} disabled={isLoading} className="inline-flex justify-center items-center bg-primary-600 rounded-full text-white px-4 py-3 transition duration-300 ease-in-out hover:primary-800 mr-6 ml-6">
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

              <div className="flex mb-6 lg:mb-8 space-y-4 justify-center sm:space-y-0 sm:space-x-4">
                <ToggleSwitch theme={customThemeToggleSwitch} checked={checkImproved} label="Attended Improvement" onChange={onChangeCheckBox} />
              </div>
              <div className="flex mb-6 lg:mb-8 space-y-4 justify-center sm:space-y-0 sm:space-x-4">
                <ToggleSwitch theme={customThemeToggleSwitch} checked={checkProject} label="Include Project Result" onChange={setCheckProject} />
              </div>
              {checkProject && (
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Credits</Table.HeadCell>
                    <Table.HeadCell>Result</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <TextInput id="small" type="number" sizing="sm" placeholder="6" defaultValue="6" ref={projectCrRef} />
                      </Table.Cell>
                      <Table.Cell>
                        <TextInput id="small" type="number" step="0.01" sizing="sm" placeholder="4.0" ref={projectResRef} />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              )}
            </>
          )}
        </form>
      </section>
      <ToastContainer autoClose={3000} theme={darkMode} />
    </div>
  );
};

export default Home;
