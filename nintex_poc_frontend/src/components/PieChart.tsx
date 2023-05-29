import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { api_origin } from '../Api';

ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
  labels: ['HKG', 'KLN', 'NT'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 33],
      backgroundColor: [
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  const [thisYear, setThisYear] = useState<any>(data);
  useEffect(() => {
    fetch(`${api_origin}/getDistrict`)
      .then((res) => res.json())
      .catch((err) => ({ error: String(err) }))
      .then((json) => {
        console.log("getDistrict", json.recordset)
        setThisYear({
          labels: ['HKG', 'KLN', 'NT'],
          datasets: [
            {
              label: '# of Votes',
              data: [+json.recordset[0].districtCount, +json.recordset[1].districtCount, +json.recordset[2].districtCount],
              backgroundColor: [
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
              ],
              borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1,
            },
          ],
        })
      });
  }, [])
  return <>
            <h3 style = {{textAlign : 'center'}}>
              District
            </h3>
            <Pie data={thisYear} />
          </>
}
