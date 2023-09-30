import {
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Image,
} from "@mantine/core";
import image from "../../assets/error.svg";
import classes from "./error.module.css";
import { IconReload } from "@tabler/icons-react";

export function ErrorPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container className={classes.root} p={50}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Error.</Title>
          <Text c="dimmed" size="lg">
            An error occurred during the data retrieval process.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={handleRefresh}
            leftSection={<IconReload size={14} />}
          >
            Refresh
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
}
