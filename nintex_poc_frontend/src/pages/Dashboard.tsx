import React from "react";
import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import { Grid } from "@mantine/core";
import { StatsRing, StatsRingProps } from "../components/GroupStats";

const data : StatsRingProps['data'] = [
      {
        "label": "Total number of case",
        "stats": "432",
        "progress": 65,
        "color": "teal",
        "icon": "up"
      },
      {
        "label": "Completed",
        "stats": "400",
        "progress": 72,
        "color": "blue",
        "icon": "up"
      },
      {
        "label": "Pending",
        "stats": "32",
        "progress": 52,
        "color": "red",
        "icon": "down"
      }
    ]
  
  
export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
        <StatsRing data={ data }/>
      <Grid display="flex" justify="space-around">
        <Grid.Col lg={7.5} md={6}>
          <BarChart />
        </Grid.Col>
        <Grid.Col lg={4} md={6}>
          <PieChart />
        </Grid.Col>
      </Grid>
    </div>
  );
}
