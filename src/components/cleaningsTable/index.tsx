import { useMemo } from "react";
import { Table, Skeleton, Alert, Center } from "@mantine/core";
import { JobT } from "@interfaces/index";
import {
  cleaningTypeFormatter,
  executionDateFormat,
  contractPeriodicityFormat,
} from "./helpers";
import CleaningTableBase from "./components/CleaningTableBase";

type Props = {
  jobs: JobT[];
  isLoading: boolean;
};

const CleaningsTable = ({ jobs, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton w="100%" h={500} />;
  }

  if (jobs.length === 0) {
    return (
      <CleaningTableBase>
        <Table.Caption>
          <Center mt={50}>
            <Alert
              variant="light"
              color="cyan"
              radius="md"
              title="No cleaning records found."
            />
          </Center>
        </Table.Caption>
      </CleaningTableBase>
    );
  }

  const groupedRows: JSX.Element[] = useMemo(() => {
    const result: JSX.Element[] = [];
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

        result.push(locationRow, ...dataRows);
      }
    }

    return result;
  }, [jobs]);

  return (
    <CleaningTableBase>
      <Table.Tbody>{groupedRows}</Table.Tbody>
    </CleaningTableBase>
  );
};

export default CleaningsTable;
