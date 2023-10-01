import { Table, ScrollArea, Skeleton } from "@mantine/core";
import { useState } from "react";
import classes from "./table.module.css";
import cx from "clsx";
import { JobT } from "@interfaces/index";
import {
  cleaningTypeFormatter,
  executionDateFormat,
  contractPeriodicityFormat,
} from "./helpers";

type Props = {
  jobs: JobT[];
};

const CleaningsTable = ({ jobs }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  if (jobs.length === 0) {
    return <Skeleton w="100%" h={500} />;
  }

  const groupedRows: JSX.Element[] = [];

  const jobsByLocation: { [key: string]: JobT[] } = {};

  jobs.forEach((row) => {
    const key = `${row.location}`;
    if (!jobsByLocation[key]) {
      jobsByLocation[key] = [];
    }

    jobsByLocation[key].push(row);
  });

  for (const key in jobsByLocation) {
    if (Object.prototype.hasOwnProperty.call(jobsByLocation, key)) {
      const locationJobs = jobsByLocation[key];

      // Location row
      const locationRow = (
        <Table.Tr
          key={`${key}_location`}
          style={{ border: "1px solid #373A40" }}
        >
          <Table.Td rowSpan={locationJobs.length + 1}>{key}</Table.Td>
        </Table.Tr>
      );

      const dataRows = locationJobs.map((job) => (
        <Table.Tr key={job.uuid} style={{ border: "none" }}>
          <Table.Td>{cleaningTypeFormatter(job.type)}</Table.Td>
          <Table.Td>
            {executionDateFormat(job.executionDate, job.duration)}
          </Table.Td>
          <Table.Td>
            {contractPeriodicityFormat(job.contractPeriodicity)}
          </Table.Td>
          <Table.Td>{job.agent}</Table.Td>
        </Table.Tr>
      ));

      groupedRows.push(locationRow, ...dataRows);
    }
  }

  return (
    <ScrollArea
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      w="100%"
      h={500}
    >
      <Table miw={700} verticalSpacing="md">
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Location</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Date & Time</Table.Th>
            <Table.Th>Repetition</Table.Th>
            <Table.Th>Batmaid</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{groupedRows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default CleaningsTable;
