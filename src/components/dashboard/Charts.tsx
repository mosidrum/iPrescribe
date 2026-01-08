import { memo } from 'react';
import { Box, Paper, Typography, Stack, useTheme } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    type ChartOptions
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { palette } from '../../theme/theme';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const commonOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: palette.primary.dark,
            titleColor: palette.primary.contrastText,
            bodyColor: palette.primary.contrastText,
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
                label: (context: any) => `${context.parsed.y || context.parsed} ${context.dataset.label || ''}`,
            }
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
                drawBorder: false,
            },
            ticks: {
                font: {
                    family: 'Montserrat',
                    size: 10,
                },
                color: '#98A2B3'
            }
        },
        y: {
            grid: {
                color: '#F2F4F7',
                borderDash: [5, 5],
                drawBorder: false,
            },
            ticks: {
                font: {
                    family: 'Montserrat',
                    size: 10,
                },
                color: '#98A2B3',
                stepSize: 20
            },
            border: {
                display: false
            }
        },
    },
    layout: {
        padding: 0
    }
};

export const LineChart = memo(({ data, color = palette.chart.blue, label = 'Value' }: { data: { label: string; value: number }[]; color?: string; label?: string }) => {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: label,
                data: data.map(d => d.value),
                borderColor: color,
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, `${color}40`);
                    gradient.addColorStop(1, `${color}00`);
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointBackgroundColor: palette.primary.contrastText,
                pointBorderColor: color,
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    return (
        <Box sx={{ width: '100%', height: 200 }}>
            <Line options={commonOptions} data={chartData} />
        </Box>
    );
});

export const BarChart = memo(({ data }: { data: { label: string; value: number; value2?: number }[] }) => {
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: 'Doctors',
                data: data.map(d => d.value),
                backgroundColor: palette.chart.orange,
                borderRadius: 4,
                barThickness: 6,
            },
            {
                label: 'Patients',
                data: data.map(d => d.value2),
                backgroundColor: palette.chart.blue,
                borderRadius: 4,
                barThickness: 6,
            },
        ],
    };

    return (
        <Box sx={{ width: '100%', height: 200 }}>
            <Bar options={commonOptions} data={chartData} />
        </Box>
    );
});

export const DonutChart = memo(({ data }: { data: { label: string; value: number }[] }) => {
    const total = data.reduce((acc, current) => acc + current.value, 0);
    const maxVal = Math.max(...data.map(d => d.value));
    const percentage = total > 0 ? Math.round((maxVal / total) * 100) : 0;
    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                data: data.map(d => d.value),
                backgroundColor: [palette.chart.red, palette.chart.orange, palette.chart.green, palette.chart.blue],
                borderWidth: 0,
                cutout: '75%',
            },
        ],
    };

    const options: any = {
        ...commonOptions,
        scales: {
            x: { display: false },
            y: { display: false }
        },
        plugins: {
            ...commonOptions.plugins,
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <Box sx={{ position: 'relative', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut options={options} data={chartData} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" fontWeight="bold">{percentage}%</Typography>
            </Box>
        </Box>
    );
});

interface ChartWidgetProps {
    title: string;
    type: 'line' | 'bar' | 'donut';
    data: any;
    legend?: boolean;
    color?: string;
    label?: string;
}

export const ChartWidget = memo(({ title, type, data, legend, color, label }: ChartWidgetProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
                border: isDark ? '1px solid #333' : `1px solid ${palette.ui.dividerLight}`,
                height: '100%',
                bgcolor: 'background.paper',
                transition: 'all 0.3s ease'
            }}
        >
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600} sx={{ fontFamily: 'Montserrat' }}>{title}</Typography>
                <MoreHorizIcon color="action" />
            </Stack>

            {type === 'line' && <LineChart data={data} color={color} label={label} />}
            {type === 'bar' && <BarChart data={data} />}
            {type === 'donut' && (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                        <DonutChart data={data} />
                    </Box>
                    {legend && (
                        <Stack spacing={2} sx={{ minWidth: 100 }}>
                            {data.map((d: any, i: number) => (
                                <Stack key={d.label} direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: [palette.chart.red, palette.chart.orange, palette.chart.green, palette.chart.blue][i] }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">{d.label}</Typography>
                                        <Typography variant="subtitle2" fontWeight={700}>{d.value}</Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </Stack>
            )}
        </Paper>
    );
});
