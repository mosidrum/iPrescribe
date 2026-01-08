import { Paper, Typography, Box, Stack, Skeleton, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StarIcon from '@mui/icons-material/Star';
import MedicationIcon from '@mui/icons-material/Medication';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { palette } from '../../theme/theme';

const ICONS = {
    patients: { icon: PeopleIcon, color: '#EBF5FF', iconColor: palette.chart.blue },
    doctors: { icon: LocalHospitalIcon, color: '#ECFDF3', iconColor: palette.status.verified.text },
    reviews: { icon: StarIcon, color: '#FFF9EB', iconColor: palette.chart.orange },
    consultations: { icon: EventAvailableIcon, color: '#F2F4F7', iconColor: '#344054' },
    prescriptions: { icon: MedicationIcon, color: '#FEF3F2', iconColor: '#B42318' },
    default: { icon: PeopleIcon, color: '#F2F4F7', iconColor: '#344054' },
};

interface StatCardProps {
    label: string;
    value: number;
    trend: number;
    trendLabel: string;
    icon: 'patients' | 'doctors' | 'reviews' | 'consultations' | 'prescriptions' | 'default';
    loading?: boolean;
}

export const StatCard = ({ label, value, trend, trendLabel, icon, loading }: StatCardProps) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const iconConfig = ICONS[icon] || ICONS.default;
    const IconComponent = iconConfig.icon;

    if (loading) {
        return (
            <Paper elevation={0} sx={{ p: 3, borderRadius: 1, bgcolor: 'background.paper', height: '100%' }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="circular" width={40} height={40} />
                </Stack>
                <Skeleton variant="rectangular" height={40} width="40%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" />
            </Paper>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                bgcolor: 'background.paper',
                border: isDark ? '1px solid #333' : `1px solid ${palette.ui.dividerLight}`,
                height: '100%'
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    {label}
                </Typography>
                <Box sx={{
                    bgcolor: isDark ? `${iconConfig.color}20` : iconConfig.color,
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <IconComponent sx={{ color: iconConfig.iconColor, fontSize: 20 }} />
                </Box>
            </Stack>

            <Typography variant="h4" fontWeight={600} sx={{ mb: 1 }}>
                {value.toLocaleString()}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: trend >= 0 ? 'success.main' : 'error.main' }}>
                    {trend >= 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                    <Typography variant="caption" fontWeight={600}>
                        {Math.abs(trend * 100).toFixed(2)}%
                    </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                    {trendLabel}
                </Typography>
            </Stack>
        </Paper>
    );
};
