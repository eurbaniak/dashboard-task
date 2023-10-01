import { ScrollArea, Table } from "@mantine/core";
import React, { useState } from "react";
import cx from "clsx";
import classes from "./table.module.css";

type Props = {
  children: React.ReactNode;
};

const CleaningTableBase = ({ children }: Props) => {
  const [scrolled, setScrolled] = useState(false);

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
        {children}
      </Table>
    </ScrollArea>
  );
};

export default CleaningTableBase;
