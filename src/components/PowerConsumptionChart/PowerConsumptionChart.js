import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    Stack,
} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const data = [
    { month: 'Jan', consumed: 25 },
    { month: 'Feb', consumed: 30 },
    { month: 'Mar', consumed: 50 },
    { month: 'Apr', consumed: 35 },
    { month: 'May', consumed: 45 },
    { month: 'Jun', consumed: 55 },
    { month: 'Jul', consumed: 70 },
    { month: 'Aug', consumed: 60 },
];

function PowerConsumptionChart() {
    const [timeRange, setTimeRange] = React.useState('Month');

    return (
        <Card
            sx={{
                maxWidth: 800,
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                    }}
                >
                    <Typography variant="h6" component="div">
                        Power Consumed (Rồi sửa sau)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            size="small"
                            sx={{
                                minWidth: 100,
                                '& .MuiSelect-select': {
                                    py: 0.5,
                                },
                            }}
                        >
                            <MenuItem value="Day">Day</MenuItem>
                            <MenuItem value="Week">Week</MenuItem>
                            <MenuItem value="Month">Month</MenuItem>
                            <MenuItem value="Year">Year</MenuItem>
                        </Select>
                        <KeyboardArrowRightIcon />
                    </Box>
                </Box>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 2 }}
                >
                    <ElectricBoltIcon sx={{ color: '#FF9A7B' }} />
                    <Typography variant="body1" color="text.secondary">
                        Electricity Consumed
                    </Typography>
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        sx={{ ml: 'auto' }}
                    >
                        73% Spending
                    </Typography>
                </Stack>

                <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="colorConsumed"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#FF9A7B"
                                        stopOpacity={0.2}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#FF9A7B"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#999' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#999' }}
                                ticks={[0, 25, 50, 75, 100]}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow:
                                        '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="consumed"
                                stroke="#FF9A7B"
                                fill="url(#colorConsumed)"
                                strokeWidth={2}
                                dot={{ fill: '#FF9A7B', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PowerConsumptionChart;
