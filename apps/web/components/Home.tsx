"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

import CGPACard from "./cgpaCard";
import InfoCard from "./infocard";

import { calculateCgpa } from "@/utils/calculate";
import { SemesterSummaryTuple } from "@diu-cgpa/types";
import { useTranslations } from "next-intl";
import CgpaLineChart from "./chart";

const HomePage = ({ baseApi }: { baseApi: string }) => {
  const studentIDRef = useRef<HTMLInputElement | null>(null);
  const projectCreditRef = useRef<HTMLInputElement | null>(null);
  const projectResultRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState<{ [key: string]: any }[]>([]);
  const [calculated, setCalculated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkImproved, setCheckImproved] = useState(false);
  const [checkProject, setCheckProject] = useState(false);
  const t = useTranslations("HomePage");
  // Improvement checkbox & notice
  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoading) {
      setCheckImproved(e.target.checked);
      if (e.target.checked) {
        toast.info(t("action-info-te"), {
          duration: 5000,
          position: "bottom-right",
        });
      }
    }
  };

  // Calculate handler
  const calculateCgpHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // const studentID = (studentIDRef.current?.value || '').replace(/\s+/g, ' ').trim();

    const studentID = studentIDRef?.current?.value?.replace(/\s+/g, " ").trim();

    let projectCredit = 0;
    let projectResult = 0;

    if (checkProject) {
      projectCredit = Number(projectCreditRef?.current?.value?.replace(/\s+/g, " ").trim());
      projectResult = Number(projectResultRef.current?.value?.replace(/\s+/g, " ").trim());
      if (!projectCredit) {
        toast.warning(t("action-wrn-project-credit"));

        return;
      }
      if (!projectResult) {
        toast.warning(t("action-wrn-project-res"));

        return;
      }
    }

    if (!studentID) {
      toast.warning(t("action-wrn-id"));

      return;
    }
    setIsLoading(true);
    calculateCgpa(studentID, checkImproved, checkProject, projectCredit, projectResult, baseApi)
      .then(([inc, evp, result]) => {
        if (evp) {
          toast.warning(t("action-err-result"));
        }
        if (Number(inc) == 1) {
          toast.error(t("action-err-result"));
        } else {
          toast.success(t("action-success"));
        }
        setResult(result);
        setCalculated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.message === "Invalid ID") {
          toast.error(t("action-err-id"));
        } else {
          toast.error(t("action-err-network"));
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      {!calculated && (
        <>
          <form className="flex flex-col items-center justify-center gap-3" onSubmit={calculateCgpHandler}>
            <Input ref={studentIDRef} className="max-w-xs" label={t("student-id")} type="text" />
            <div className="flex gap-3">
              <Button color="primary" disabled={isLoading} isLoading={isLoading} radius="full" type="submit">
                {isLoading ? t("calculating") : t("calculate")}
              </Button>
            </div>
            <div className="relative">
              <div className="flex flex-col gap-4">
                <Switch isDisabled={isLoading} size="sm" onChange={onChangeCheckBox}>
                  {t("improve")}
                </Switch>
                <Switch isDisabled={isLoading} size="sm" onChange={() => setCheckProject(!checkProject)}>
                  {t("project")}
                </Switch>
              </div>
              {checkProject && (
                <div className="flex flex-col-2 gap-4 sm:absolute -bottom-[5rem] mt-8 w-48">
                  <Input ref={projectCreditRef} className="max-w-xs" defaultValue="6" isDisabled={isLoading} label={t("credit")} size="sm" type="number" />
                  <Input ref={projectResultRef} className="max-w-xs" isDisabled={isLoading} label={t("result")} placeholder="4" size="sm" type="number" />
                </div>
              )}
            </div>
          </form>
        </>
      )}

      {calculated && (
        <>
          <CGPACard cgpa={result[1][0]} />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{result[0]?.name}</h1>
          <h5 className="text-2xl text-gray-900 dark:text-white">{result[0]?.program}</h5>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
            <InfoCard name="Semesters" value={checkProject ? (result[2]?.length || 0) - 1 : result[2]?.length || 0} />
            <InfoCard name="Batch" value={result[0]?.batch} />
            <InfoCard name="Credits" value={result[1][1]} />
            <InfoCard name="Department" value={result[0]?.department} />
            <InfoCard name="Faculty" value={result[0]?.faculty} />
            <InfoCard name="Campus" value={result[0]?.campus} />
          </div>
          <div className="grid place-content-center pt-4">
            {/* <CgpaLineChart cgpaData={result[2] as SemesterSummaryTuple[]} cgpa={Number(result[1][0])} /> */}
            <CgpaLineChart cgpaData={result[2] as SemesterSummaryTuple[]} />
          </div>
          <div className="flex">
            <Button
              color="primary"
              radius="full"
              onClick={() => {
                setCalculated(false);
                setResult([]);
                setIsLoading(false);
                setCheckImproved(false);
                setCheckProject(false);
              }}
            >
              {t("calculate-again")}
            </Button>
            {/* {console.log(result)} */}
          </div>

          <div className="col-span-6 w-full ">
            <Table aria-label="Example static collection table ">
              <TableHeader>
                <TableColumn>{t("semester")}</TableColumn>
                <TableColumn>{t("credit")}</TableColumn>
                <TableColumn>{t("sgpa")}</TableColumn>
              </TableHeader>
              <TableBody>
                {result[2]?.map((sem: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{sem[0] + " " + sem[1]}</TableCell>
                    <TableCell>{sem[2]}</TableCell>
                    <TableCell>{sem[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
