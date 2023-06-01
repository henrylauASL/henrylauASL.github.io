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
    // <>
    //   <div style={{ padding : "5px", boxShadow: "2px 2px 10px rgb(128, 128, 128)", marginBottom : "10px"}}>
    //     <MyNewCase/>
    //   </div>
    //   <div style={{ boxShadow: "2px 2px 10px rgb(128, 128, 128)"}}>
    //     <MyExistCase />
    //   </div>
    // </>
  );
}
