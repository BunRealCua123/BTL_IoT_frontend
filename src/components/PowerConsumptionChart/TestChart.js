import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import io from 'socket.io-client';

ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement);

const LightStatusChart = () => {
  const [logs, setLogs] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    
    socket.on('status_logs', (newLogs) => {
      setLogs((prevLogs) => [...prevLogs, ...newLogs]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const processData = () => {
    const datasets = {};
    const labels = [];

    // Organize data by deviceId and limit each device's logs to the latest 10 entries
    const limitedLogs = logs.slice(-10); // Only keep the latest 10 logs

    limitedLogs.forEach(log => {
      const timestamp = new Date(log.timestamp).toLocaleString();

      if (!labels.includes(timestamp)) {
        labels.push(timestamp); // Collect unique timestamps for labels
      }

      if (!datasets[log.deviceId]) {
        datasets[log.deviceId] = {
          label: `Device ${log.deviceId}`,
          data: [],
          borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
          fill: true,
          tension: 0.4,
        };
      }

      datasets[log.deviceId].data.push(log.status === 'ON' ? 1 : 0);
    });

    // Convert the datasets object into an array for the chart
    const chartDatasets = Object.values(datasets);

    return {
      labels,
      datasets: chartDatasets,
    };
  };

  const chartData = processData();

  // Update the chart instance when data changes
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the old chart
      }
    }
  }, [logs]);

  return (
    <div>
      <h2>LED Light Status Over Time</h2>
      <Line ref={chartRef} data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default LightStatusChart;
