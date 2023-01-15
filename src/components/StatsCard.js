import React from "react";
import { Card } from "flowbite-react";

const StatsCard = (props) => {
  let value = String(props.value);
  if (value.includes("City")) {
    value = "City";
  } else if (value.includes("DSC")) {
    value = "DSC";
  }
  return (
    <div className="max-w-xs w-40 m-4">
      <Card>
        <h5 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{props.name}</p>
      </Card>
    </div>
  );
};

export default StatsCard;
