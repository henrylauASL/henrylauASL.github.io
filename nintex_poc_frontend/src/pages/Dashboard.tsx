import React, { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import { Grid } from "@mantine/core";
import { StatsRing, StatsRingProps } from "../components/GroupStats";

const data : StatsRingProps['data'] = [
      {
        "label": "Total number of case",
        "stats": "0",
        "progress": 0,
        "color": "teal",
        "icon": "up"
      },
      {
        "label": "Completed",
        "stats": "0",
        "progress": 0,
        "color": "blue",
        "icon": "up"
      },
      {
        "label": "In Progress",
        "stats": "0",
        "progress": 0,
        "color": "grape",
        "icon": "down"
      },
      {
        "label": "New",
        "stats": "0",
        "progress": 0,
        "color": "red",
        "icon": "down"
      }
      ,
      {
        "label": "Suspended",
        "stats": "0",
        "progress": 0,
        "color": "orange",
        "icon": "down"
      }
    ]

  
export default function Dashboard() {
  const [caseCount, setCaseCount] = useState<StatsRingProps['data']>(data);
  useEffect(()=>{
      fetch(`http://localhost:8000/getNumberOfCaseStatus`)
      .then((res)=>res.json())
      .catch((err)=>({error: String(err)}))
      .then((json)=> { 
      // console.log('CaseCount', json.recordset);
      const comCount = json.recordset[0].progressCount
      const inCount = json.recordset[1].progressCount
      const newCount = json.recordset[2].progressCount
      const susCount = json.recordset[3].progressCount
      const totalCount = comCount + inCount + newCount + susCount
      setCaseCount([
        {
          "label": "Total number of case",
          "stats": `${totalCount}`,
          "progress": 100,
          "color": "teal",
          "icon": "up"
        },
        {
          "label": "Completed",
          "stats": `${comCount}`,
          "progress": comCount/totalCount*100,
          "color": "blue",
          "icon": "up"
        },
        {
          "label": "In Progress",
          "stats": `${inCount}`,
          "progress": inCount/totalCount*100,
          "color": "grape",
          "icon": "down"
        },
        {
          "label": "New",
          "stats": `${newCount}`,
          "progress": newCount/totalCount*100,
          "color": "red",
          "icon": "down"
        }
        ,
        {
          "label": "Suspended",
          "stats": `${susCount}`,
          "progress": susCount/totalCount*100,
          "color": "orange",
          "icon": "down"
        }
      ])
      });
  },[])
  return (
    
    <div>
      <h2>Dashboard</h2>
        <StatsRing data={ caseCount }/>
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
