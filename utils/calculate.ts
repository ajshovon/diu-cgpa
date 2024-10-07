import { SingleResult } from "./type";

const getStudentInfo = async (id: string) => {
  try {
    const response = await fetch("/api/result/full?id=" + id);
    const data = await response.json();

    // need to update the backend
    data.inc = 0;

    return data;
  } catch (error) {
    throw error;
  }
};

const dupeResults: any[][] = [];

const calculateSgpaManual = (semester: SingleResult[]) => {
  let sc = 0;
  let weighted: number = 0;
  let semesterName = "";
  let semesterYear = 0;
  let wa = 0;

  for (let c of semester) {
    if (c["gradeLetter"] != "F") {
      semesterName = c["semesterName"];
      semesterYear = c["semesterYear"];
      weighted = weighted + c?.totalCredit * c?.pointEquivalent;
      sc = sc + Number(c["totalCredit"]);
    }
  }
  wa = Number((weighted / sc).toFixed(2));

  // [semesterName, semesterYear, semesterCredits, sgpa]
  return [semesterName, semesterYear, sc, wa];
};

export const calculateCgpa = async (id: string, improvement: boolean, checkProject: boolean, projectCredit: number, projectResult: number) => {
  const { inc, studentInfoObj, semesterResults } = await getStudentInfo(id);
  let credits = 0;
  let weighted = 0;
  const resultsList = [];

  for (let semester of semesterResults) {
    if (!Boolean(improvement)) {
      let sgpa = 0;
      let semesterCredits = [];
      let semesterName = "";
      let semesterYear = "";
      let drop = false;

      for (const course of semester) {
        if (course["gradeLetter"] == "F") {
          drop = true;
          break;
        }
        if (course["cgpa"]) {
          sgpa = parseFloat(course["cgpa"]);
          semesterName = course["semesterName"];
          semesterYear = course["semesterYear"];
        }
        semesterCredits.push(Number(course["totalCredit"]));
      }
      if (!Boolean(drop)) {
        let sc;

        sc = semesterCredits.reduce((a, b) => a + b, 0);
        credits = credits + semesterCredits.reduce((a, b) => a + b, 0); //sum of the array
        resultsList.push([semesterName, semesterYear, sc, sgpa]);
      } else {
        // console.log(semester);
        let c = calculateSgpaManual(semester);

        credits = credits + Number(c[2]);
        resultsList.push(c);
      }
    } else {
      let sgpa;
      let semesterName;
      let semesterYear;
      let scredit = 0;

      for (const course of semester) {
        scredit = scredit + Number(course["totalCredit"]);
        if (course["gradeLetter"] != "F") {
          let n = course["courseId"];
          let c = course["totalCredit"];
          let r = course["pointEquivalent"];
          let tmpObj = [n, c, r];
          let marked = false;

          if (course["cgpa"]) {
            sgpa = parseFloat(course["cgpa"]);
            semesterName = course["semesterName"];
            semesterYear = course["semesterYear"];
          }
          for (let i in dupeResults) {
            if (dupeResults[i][0] == n) {
              if (parseFloat(r) > parseFloat(dupeResults[i][2])) {
                dupeResults[i][2] = r;
              }
              marked = true;
            }
          }
          if (!Boolean(marked)) {
            dupeResults.push(tmpObj);
          }
        }
      }
      resultsList.push([semesterName, semesterYear, scredit, sgpa]);
    }
  }

  if (checkProject) {
    credits = credits + Number(projectCredit);
    resultsList.push(["Final Year Project", "", Number(projectCredit), projectResult]);
    if (improvement) {
      dupeResults.push(["Project", Number(projectCredit), projectResult]);
    }
  }

  if (improvement) {
    let wd = 0;
    let cd = 0;
    let evp = false;

    for (let i of dupeResults) {
      if (i[2]) {
        wd = wd + parseFloat(i[1]) * parseFloat(i[2]);
        cd = cd + parseFloat(i[1]);
      } else {
        evp = true;
      }
    }
    let cgpa = (wd / cd).toFixed(2);

    semesterResults.length = 0;
    dupeResults.length = 0;

    return [inc, evp, [studentInfoObj, [cgpa, cd], resultsList]];
  } else {
    let evp = false;

    for (let i of resultsList) {
      weighted = weighted + parseFloat(i[2]) * parseFloat(i[3]);
    }

    let cgpa = (weighted / credits).toFixed(2);

    semesterResults.length = 0;
    dupeResults.length = 0;

    resultsList.sort((a, b) => {
      const seasonOrder: { [key: string]: number } = { Spring: 1, Summer: 2, Fall: 3 };

      if (a[1] === b[1]) {
        return seasonOrder[a[0]] - seasonOrder[b[0]];
      }

      return a[1] - b[1];
    });
    resultsList.sort((a, b) => {
      if (a[0] === "Final Year Project") {
        return 1;
      }
      if (b[0] === "Final Year Project") {
        return -1;
      }

      return 0;
    });

    return [inc, evp, [studentInfoObj, [cgpa, credits], resultsList]];
  }
};
