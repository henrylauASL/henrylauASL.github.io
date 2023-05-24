import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const lastYear = [
  {month: 'January', count: 5},
  {month: 'February', count: 8},
  {month: 'March', count: 10},
  {month: 'April', count: 8},
  {month: 'May', count: 12},
  {month: 'June', count: 16},
  {month: 'July', count: 17},
  {month: 'August', count: 9},
  {month: 'September', count: 30},
  {month: 'October', count: 23},
  {month: 'November', count: 18},
  {month: 'December', count: 29},
]

export function BarChart() {
  const [thisYear, setThisYear] = useState<any>([]);
  useEffect(()=>{
    fetch(`http://localhost:8000/getCaseMonth `)
    .then((res)=>res.json())
    .catch((err)=>({error: String(err)}))
    .then((json)=> {
      console.log("getCaseMonth", json.recordset)
      setThisYear(json.recordset)
    });
  },[])

   const data = {
    labels : lastYear.map((x)=>x.month),
    datasets: [
      {
        label: '2022',
        data: lastYear.map((x) => x.count),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: '2023',
        data: thisYear.map((x:any) => x.num_records),
        backgroundColor: 'rgba(53, 162, 235, 1)',
      },
    ],
  };
  return <>
          <h3 style = {{textAlign : 'center'}}>
            Number of case
          </h3>
          <Bar options={options} data={data} />
        </>
}
