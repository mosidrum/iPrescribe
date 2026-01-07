import { Box, Paper, Typography, Stack } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const LineChart = ({ data, color = '#2E90FA' }: { data: { label: string; value: number }[]; color?: string }) => {
    if (!data || data.length === 0) return null;

    const width = 100;
    const height = 50;
    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    const range = max - min || 1;

    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d.value - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <Box sx={{ width: '100%', height: 150, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                {[0, 25, 50, 75, 100].map(p => (
                    <line key={p} x1="0" y1={p / 2} x2="100" y2={p / 2} stroke="#EAECF0" strokeWidth="0.5" strokeDasharray="2" />
                ))}

                <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * width;
                    const y = height - ((d.value - min) / range) * height;
                    return (
                        <circle key={i} cx={x} cy={y} r="2" fill="#fff" stroke={color} strokeWidth="1.5" />
                    );
                })}
            </svg>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                {data.filter((_, i) => i % 2 === 0).map((d) => (
                    <Typography key={d.label} variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        {d.label}
                    </Typography>
                ))}
            </Stack>
        </Box>
    );
};

export const BarChart = ({ data }: { data: { label: string; value: number; value2?: number }[] }) => {
    if (!data || data.length === 0) return null;

    const width = 100;
    const height = 50;
    const max = Math.max(...data.map(d => Math.max(d.value, d.value2 || 0)));

    return (
        <Box sx={{ width: '100%', height: 150 }}>
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                {data.map((d, i) => {
                    const barWidth = 2;
                    const x = (i / data.length) * width + (width / data.length) / 2;
                    const h1 = (d.value / max) * height;
                    const h2 = ((d.value2 || 0) / max) * height;

                    return (
                        <g key={i}>
                            <rect x={x - barWidth - 0.5} y={height - h1} width={barWidth} height={h1} fill="#F79009" rx="1" />
                            {d.value2 && <rect x={x + 0.5} y={height - h2} width={barWidth} height={h2} fill="#2E90FA" rx="1" />}
                        </g>
                    );
                })}
            </svg>
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                {data.filter((_, i) => i % 3 === 0).map((d) => (
                    <Typography key={d.label} variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        {d.label}
                    </Typography>
                ))}
            </Stack>
        </Box>
    );
};

export const DonutChart = ({ data }: { data: { label: string; value: number }[] }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    let currentAngle = 0;
    const radius = 40;
    const center = 50;

    // Colors paralleling Design
    const colors = ['#F04438', '#F79009', '#12B76A', '#2E90FA'];

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150 }}>
            <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EAECF0" strokeWidth="15" />
                    {data.map((d, i) => {
                        const percentage = d.value / total;

                        // Large arc flag
                        const largeArc = percentage > 0.5 ? 1 : 0;

                        const startAngle = currentAngle;
                        const endAngle = currentAngle + (percentage * 360);

                        const x1 = center + radius * Math.cos(Math.PI * startAngle / 180);
                        const y1 = center + radius * Math.sin(Math.PI * startAngle / 180);
                        const x2 = center + radius * Math.cos(Math.PI * endAngle / 180);
                        const y2 = center + radius * Math.sin(Math.PI * endAngle / 180);

                        const pathData = [
                            `M ${center} ${center}`,
                            `L ${x1} ${y1}`,
                            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                            `Z`
                        ].join(' ');

                        currentAngle += percentage * 360;

                        return (
                            <path key={i} d={pathData} fill={colors[i % colors.length]} />
                        )
                    })}
                    <circle cx="50" cy="50" r="25" fill="#ffffff" />
                </svg>
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" fontWeight="bold">30%</Typography>
                </Box>
            </Box>
        </Box>
    );
}

interface ChartWidgetProps {
    title: string;
    type: 'line' | 'bar' | 'donut';
    data: any;
    legend?: boolean;
}

export const ChartWidget = ({ title, type, data, legend }: ChartWidgetProps) => {
    return (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #EAECF0', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="body1" fontWeight={600}>{title}</Typography>
                <MoreHorizIcon color="action" />
            </Stack>

            {type === 'line' && <LineChart data={data} />}
            {type === 'bar' && <BarChart data={data} />}
            {type === 'donut' && (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                        <DonutChart data={data} />
                    </Box>
                    {legend && (
                        <Stack spacing={1} sx={{ minWidth: 100 }}>
                            {data.map((d: any, i: number) => (
                                <Stack key={d.label} direction="row" spacing={1} alignItems="center">
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: ['#F04438', '#F79009', '#12B76A', '#2E90FA'][i] }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" display="block">{d.label}</Typography>
                                        <Typography variant="body2" fontWeight={600}>{d.value}</Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </Stack>
            )}
        </Paper>
    );
};
