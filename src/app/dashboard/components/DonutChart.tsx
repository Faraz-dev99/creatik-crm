import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Satisfied', value: 25 },
  { name: 'Unsatisfied', value: 75 },
    { name: 'Neutral', value: 40 },
  { name: 'Happy', value: 55 },
];

const COLORS = ['#F87171', '#0EA5E9','#10B981', '#FBBF24', '#A78BFA']; // pink and blue

const DonutChart = () => {
  return (
    <div className="w-full h-full  p-4 bg-white  shadow-md">
      <h2 className="text-lg font-bold mb-2 text-blue-600">New Users</h2>
      <div className=' p-4 max-md:-scale-50'>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          
          <Legend layout="horizontal" verticalAlign="bottom" align="center"  wrapperStyle={{ marginTop: 20 }}
            />
            
        </PieChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutChart;