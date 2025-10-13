import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AdminHome = () => {
  const summaryData = [
    { label: 'Revenue', value: 1000, color: 'bg-purple-500' },
    { label: 'Customers', value: 1500, color: 'bg-yellow-400' },
    { label: 'Products', value: 103, color: 'bg-pink-400' },
    { label: 'Orders', value: 500, color: 'bg-blue-400' },
  ];

  const barData = {
    labels: ['Dessert', 'Pizza', 'Salad', 'Soup'],
    datasets: [
      {
        label: 'Sold',
        data: [30, 35, 20, 25],
        backgroundColor: ['orange', 'blue', 'green', 'red'],
      },
    ],
  };

  const pieData = {
    labels: ['Dessert', 'Pizza', 'Salad', 'Soup'],
    datasets: [
      {
        data: [21, 25, 28, 31],
        backgroundColor: ['blue', 'red', 'orange', 'green'],
      },
    ],
  };

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Hi, Welcome Back!</h2>

      {/* Summary Boxes */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`p-4 text-white rounded shadow ${item.color}`}
          >
            <h3 className="text-lg">{item.label}</h3>
            <p className="text-2xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Items Sold</h3>
          <Bar data={barData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Category Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
