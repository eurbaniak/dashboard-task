import { Container, Flex, SegmentedControl, Title } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchJobs } from "./store/features/jobs/jobsSlice";
import CleaningsTable from "./components/cleaningsTable";
import { ErrorPage } from "./components/ErrorPage";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.data);
  const status = useSelector((state: RootState) => state.jobs.status);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (status === "failed") {
    return <ErrorPage />;
  }

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
        />
        <CleaningsTable jobs={jobs} />
      </Flex>
    </Container>
  );
};

export default App;
