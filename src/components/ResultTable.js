import React from "react";
import { Table } from "flowbite-react";

const ResultTable = (props) => {
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Semester</Table.HeadCell>
        <Table.HeadCell>Credit</Table.HeadCell>
        <Table.HeadCell>SGPA</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {props.resultsList.map((semester) => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={semester[0] + semester[1]}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{semester[0] + " " + semester[1]}</Table.Cell>
            <Table.Cell>{semester[2]}</Table.Cell>
            <Table.Cell>{semester[3]}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ResultTable;
