import React from 'react';
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
      text: 'Number of case',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const lastYear = [
  {month: 'January', count: 10},
  {month: 'February', count: 99},
  {month: 'March', count: 77},
  {month: 'April', count: 69},
  {month: 'May', count: 80},
  {month: 'June', count: 99},
  {month: 'July', count: 91},
  {month: 'August', count: 88},
  {month: 'September', count: 76},
  {month: 'October', count: 88},
  {month: 'November', count: 52},
  {month: 'December', count: 70},
]

const thisYear = [
  {month: 'January', count: 33},
  {month: 'February', count: 89},
  {month: 'March', count: 58},
  {month: 'April', count: 64},
  {month: 'May', count: 70},
]

export const data = {
  labels : lastYear.map((x)=>x.month),
  datasets: [
    {
      label: '2022',
      data: lastYear.map((x) => x.count),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '2023',
      data: thisYear.map((x) => x.count),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
