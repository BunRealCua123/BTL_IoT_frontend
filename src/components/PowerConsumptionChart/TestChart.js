import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import io from 'socket.io-client';

ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend);

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

    const limitedLogs = logs.slice(-10); // Lấy 10 bản ghi mới nhất

    limitedLogs.forEach(log => {
      const timestamp = new Date(log.timestamp).toLocaleTimeString();

      if (!labels.includes(timestamp)) {
        labels.push(timestamp); // Thu thập các thời điểm duy nhất cho labels
      }

      if (!datasets[log.deviceId]) {
        datasets[log.deviceId] = {
          label: `Device ${log.deviceId}`,
          data: [],
          borderColor: log.deviceId === "Led1" ? 'rgba(54, 162, 235, 0.8)' : 'rgba(255, 99, 132, 0.8)',
          backgroundColor: log.deviceId === "Led1" ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)',
          pointBackgroundColor: log.deviceId === "Led1" ? 'blue' : 'red',
          pointBorderWidth: 2,
          fill: true,
          tension: 0.5,
          borderWidth: 2,
        };
      }

      datasets[log.deviceId].data.push(log.status === 'ON' ? 1 : 0);
    });

    const chartDatasets = Object.values(datasets);

    return {
      labels,
      datasets: chartDatasets,
    };
  };

  const chartData = processData();

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      if (chartInstance) {
        chartInstance.destroy(); // Hủy biểu đồ cũ
      }
    }
  }, [logs]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'LED Light Status Over Time',
        font: {
          size: 20,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: (value) => (value === 1 ? 'ON' : 'OFF'),
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default LightStatusChart;
