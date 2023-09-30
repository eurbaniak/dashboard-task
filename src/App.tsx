import { Container, Flex, Title } from "@mantine/core";

function App() {
  return (
    <Container fluid p={10}>
      <Flex justify="center" align="flex-start" direction="column" p={20}>
        <Title order={2}>All my cleanings</Title>
      </Flex>
    </Container>
  );
}

export default App;
