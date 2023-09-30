import { Container, Flex, Title } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { fetchJobs } from "./store/features/jobs/jobsSlice";
import CleaningsTable from "./components/cleaningsTable";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.data);
  const status = useSelector((state: RootState) => state.jobs.status);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  console.log(jobs);

  if (status === "loading") {
    return <div>...</div>;
  }

  if (status === "failed") {
    return <div>{status}</div>;
  }

  return (
    <Container fluid p={10}>
      <Flex justify="center" align="flex-start" direction="column" p={20}>
        <Title order={2} mb={50}>
          All my cleanings
        </Title>
        <CleaningsTable data={jobs} />
      </Flex>
    </Container>
  );
};

export default App;
