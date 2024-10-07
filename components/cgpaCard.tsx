import { CircularProgress } from "@nextui-org/progress";

const CGPACard = ({ cgpa }: { cgpa: string }) => {
  return (
    <CircularProgress
      classNames={{
        svg: "w-52 h-52 drop-shadow-md",
        value: "text-3xl font-semibold",
      }}
      formatOptions={{
        style: "decimal",
        maximumFractionDigits: 2,
      }}
      maxValue={4.0}
      showValueLabel={true}
      strokeWidth={4}
      value={Number(cgpa)}
    />
  );
};

export default CGPACard;
