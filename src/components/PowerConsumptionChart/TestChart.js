import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
} from 'chart.js';
import io from 'socket.io-client';

ChartJS.register(Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend);

const LightStatusChart = () => {
    const [logs, setLogs] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_SERVER_URL}`);
        socket.on('connect', () => {
            console.log('Client connected');
            socket.emit('status');  // Gửi yêu cầu lấy logs
        });
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
        const latestStatuses = {}; // Lưu trạng thái của mỗi thiết bị theo thời gian
        
        // Lấy 10 bản ghi mới nhất
        const limitedLogs = logs.slice(-10);
        
        // Tạo tập hợp nhãn (labels) chung cho tất cả các thiết bị và sắp xếp theo thứ tự thời gian
        limitedLogs.forEach((log) => {
            const timestamp = new Date(log.timestamp).toLocaleTimeString();
            if (!labels.includes(timestamp)) {
                labels.push(timestamp); // Thu thập các thời điểm duy nhất cho labels
            }
        });
    
        // Sắp xếp nhãn theo thứ tự thời gian tăng dần
        labels.sort((a, b) => {
            return new Date(`1970/01/01 ${a}`) - new Date(`1970/01/01 ${b}`);
        });
    
        // Khởi tạo datasets cho từng thiết bị
        labels.forEach((label) => {
            limitedLogs.forEach((log) => {
                if (!datasets[log.deviceId]) {
                    datasets[log.deviceId] = {
                        label: `Device ${log.deviceId}`,
                        data: new Array(labels.length).fill(null), // Tạo mảng dữ liệu với độ dài bằng số nhãn
                        borderColor:
                            log.deviceId === 'Led1'
                                ? 'rgba(54, 162, 235, 0.8)'
                                : 'rgba(255, 99, 132, 0.8)',
                        backgroundColor:
                            log.deviceId === 'Led1'
                                ? 'rgba(54, 162, 235, 0.2)'
                                : 'rgba(255, 99, 132, 0.2)',
                        pointBackgroundColor: log.deviceId === 'Led1' ? 'blue' : 'red',
                        pointBorderWidth: 2,
                        fill: true,
                        tension: 0.5,
                        borderWidth: 2,
                    };
                }
    
                // Tìm vị trí của nhãn hiện tại trong labels và chèn trạng thái của thiết bị
                const index = labels.indexOf(label);
                if (new Date(log.timestamp).toLocaleTimeString() === label) {
                    datasets[log.deviceId].data[index] = log.status === 'ON' ? 1 : 0;
                }
            });
        });
    
        // Đảm bảo mỗi thiết bị có đủ dữ liệu
        Object.keys(datasets).forEach(deviceId => {
            // Điền trạng thái của thiết bị nếu chưa có giá trị tại một thời điểm
            for (let i = 1; i < labels.length; i++) {
                if (datasets[deviceId].data[i] === null) {
                    datasets[deviceId].data[i] = datasets[deviceId].data[i - 1]; // Giữ trạng thái của lần trước
                }
            }
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
