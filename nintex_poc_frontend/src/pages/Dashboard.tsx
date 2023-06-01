import React, { useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { BarChart } from "../components/BarChart";
import { Grid } from "@mantine/core";
import { StatsRing, StatsRingProps } from "../components/GroupStats";
import { api_origin } from "../Api";

const data : StatsRingProps['data'] = [
      {
        "label": "Total number of case",
        "stats": "0",
        "progress": 0,
        "color": "teal",
        "icon": "file"
      },
      {
        "label": "Completed",
        "stats": "0",
        "progress": 0,
        "color": "blue",
        "icon": "up"
      },
      {
        "label": "InProgress",
        "stats": "0",
        "progress": 0,
        "color": "grape",
        "icon": "up"
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
      fetch(`${api_origin}/getNumberOfCaseStatus`)
      .then((res)=>res.json())
      .catch((err)=>({error: String(err)}))
      .then((json)=> { 
      // console.log('CaseCount', json.recordset);
      let comCount = +json.recordset[0].progressCount || 0
      let inCount = +json.recordset[1].progressCount || 0
      let newCount = +json.recordset[2].progressCount || 0
      let susCount = +json.recordset[3].progressCount || 0
      let totalCount = comCount + inCount + newCount + susCount
      setCaseCount([
        {
          "label": "Total number of case",
          "stats": `${totalCount}`,
          "progress": 100,
          "color": "teal",
          "icon": "file"
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
          "icon": "up"
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
