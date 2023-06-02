import { Container, Grid, SimpleGrid, Skeleton } from "@mantine/core";
import MyExistCase from "../components/MyExistCase";
import MyWaitingCase from "../components/MyWaitingCase";

export default function MyCase() {
  return (
    <div>
      <h2>My Case</h2>
      <SimpleGrid cols={1} spacing="xs" style={{ marginBottom: "15px"}}>
          <MyWaitingCase />
      </SimpleGrid>
      <SimpleGrid cols={1} spacing="xs">
          <MyExistCase />
      </SimpleGrid>
    </div>
  );
}
