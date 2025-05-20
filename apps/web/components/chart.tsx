'use client";';
import { SemesterChartPoint, SemesterSummaryTuple } from "@diu-cgpa/types";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CgpaLineChart({ cgpaData }: { cgpaData: SemesterSummaryTuple[] }) {
  const lastItem = cgpaData.at(-1);
  if (lastItem && lastItem[0] === "Final Year Project") {
    cgpaData.pop();
  }
  const { resolvedTheme: mode } = useTheme();
  const chartData: SemesterChartPoint[] = cgpaData.map(([name, year, _, sgpa]) => ({
    semester: `${name} ${year}`,
    sgpa,
  }));
  const categories = cgpaData.map(([semester, year]) => [semester, year]);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar" as const,
      background: mode === "dark" ? "#000" : "#fff",
    },
    fill: {
      colors: ["#006FEE"],
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 15,
        dataLabels: {
          position: "top" as const,
        },
        columnWidth: "40%",
      },
    },

    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toFixed(2),
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: [mode === "dark" ? "#fff" : "#000"],
      },
    },
    // annotations: { yaxis: [{ y: cgpa, borderColor: "#00E396", label: { borderColor: "#00E396", style: { color: "#fff", background: "#00E396" }, text: `CGPA: ${cgpa}` } }] },
    xaxis: {
      categories,
      labels: {
        rotate: 0,
        style: {
          colors: mode === "dark" ? "#fff" : "#000",
        },
      },
      position: "bottom" as const,
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.0,
            opacityTo: 0.0,
          },
        },
      },
      tooltip: { enabled: true },
    },
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    // toolbar: { show: true,  },
    yaxis: {
      floating: true,
      min: 0,
      max: 4,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: false,
        formatter: (val: number) => val.toFixed(2),
        style: { colors: mode === "dark" ? "#fff" : "#000" },
      },
    },
    title: {
      text: "GPA Per Semester",
      align: "left" as const,
      style: {
        color: mode === "dark" ? "#fff" : "#000",
      },
    },
    theme: { mode: mode === "dark" ? "dark" : mode === "light" ? "light" : undefined },
  };

  const series = [
    {
      name: "SGPA",
      data: chartData.map((d) => d.sgpa),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto overflow-x-auto">
      <div style={{ minWidth: `${categories.length * 80}px` }} className="overflow-hidden">
        <Chart options={options} series={series} type="bar" height={400} width="100%" />
      </div>
    </div>
  );
}
