export interface StudentInfo {
  studentId: string;
  studentName: string;
  semesterId: string | number;
  progShortName: string;
  batchNo: string;
  deptShortName: string;
  facShortName: string;
  campusName: string;
  shift: string;
}

export interface SingleResult {
  semesterId: number;
  semesterName: string;
  semesterYear: number;
  studentId: string;
  courseId: string;
  customCourseId: string;
  courseTitle: string;
  totalCredit: number;
  grandTotal: number | null;
  pointEquivalent: number;
  gradeLetter: string;
  cgpa: number;
  blocked: string;
  blockCause: string | null;
  tevalSubmitted: string;
  teval: string;
  semesterAccountsClearance: string | null;
}

export interface Semester extends Array<SingleResult> {}

export interface StudentResultData {
  studentInfoObj: StudentInfo;
  semesterResults: Semester[];
}

export interface SemesterSummaryTuple extends Array<string | number> {
  0: string;
  1: number;
  2: number;
  3: number;
}

export interface SemesterChartPoint {
  semester: string;
  sgpa: number;
}
