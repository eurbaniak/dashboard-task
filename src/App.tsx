import { Container, Flex, SegmentedControl, Title } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchJobs } from "./store/features/jobs/jobsSlice";
import CleaningsTable from "./components/cleaningsTable";
import { ErrorPage } from "./components/ErrorPage";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.data);
  const status = useSelector((state: RootState) => state.jobs.status);
  const [selectedSegment, setSelectedSegment] = useState("Upcoming");
  const currentDate = new Date();
  const isLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleSegmentChange = useCallback(
    (value: React.SetStateAction<string>) => {
      setSelectedSegment(value);
    },
    []
  );

  if (status === "failed") {
    return <ErrorPage />;
  }

  const filteredJobs = useMemo(() => {
    return selectedSegment === "Upcoming"
      ? jobs.filter((job) => new Date(job.executionDate) > currentDate)
      : jobs.filter((job) => new Date(job.executionDate) <= currentDate);
  }, [jobs, currentDate, selectedSegment]);

  return (
    <Container fluid p={10}>
      <Flex justify="center" align="flex-start" direction="column" p={20}>
        <Title order={2}>All my cleanings</Title>
        <SegmentedControl
          color="cyan"
          data={["Previous", "Upcoming"]}
          mt={50}
          mb={50}
          size="lg"
          value={selectedSegment}
          onChange={handleSegmentChange}
        />
        <CleaningsTable jobs={filteredJobs} isLoading={isLoading} />
      </Flex>
    </Container>
  );
};

export default App;
