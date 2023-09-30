import { Table, ScrollArea, Flex, Skeleton } from "@mantine/core";
import { useState } from "react";
import classes from "./table.module.css";
import { JobT } from "../../utils/types";
import cx from "clsx";

type Props = {
  data: JobT[];
};

const CleaningsTable = ({ data }: Props) => {
  const [scrolled, setScrolled] = useState(false);

  const generateTableCells = (locationData: JobT[], property: keyof JobT) =>
    locationData.map((row, index) => (
      <Flex align="flex-start" direction="column" key={index}>
        <Table.Td>{row[property]}</Table.Td>
      </Flex>
    ));

  const groupCleaningsByLocation: Record<string, JobT[]> = data.reduce(
    (acc: any, row: any) => {
      if (!acc[row.location]) {
        acc[row.location] = [];
      }
      acc[row.location].push(row);
      return acc;
    },
    {}
  );

  if (data.length === 0) {
    return <Skeleton w="100%" h={500} />;
  }

  const properties: (keyof JobT)[] = [
    "type",
    "executionDate",
    "contractPeriodicity",
    "agent",
  ];

  const headerNames: string[] = [
    "Type",
    "Date & Time",
    "Repetition",
    "Batmaid",
  ];

  const rows = Object.entries(groupCleaningsByLocation).map(
    ([location, locationData]) => (
      <Table.Tr key={location}>
        <Table.Td>{location}</Table.Td>
        {properties.map((property) => (
          <Table.Td key={property} p={0}>
            {generateTableCells(locationData, property)}
          </Table.Td>
        ))}
      </Table.Tr>
    )
  );

  return (
    <ScrollArea
      h={500}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      w="100%"
    >
      <Table miw={700} verticalSpacing="lg">
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
        >
          <Table.Tr>
            <Table.Th>Address</Table.Th>
            {headerNames.map((headerName, index) => (
              <Table.Th key={index}>{headerName}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default CleaningsTable;
